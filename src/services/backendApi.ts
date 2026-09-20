/**
 * Frontend API client for communication with the LexiGuide AI FastAPI backend.
 * 
 * SECURITY NOTE:
 * - Never includes GEMINI_API_KEY.
 * - All Gemini authentication and LLM calls remain strictly server-side.
 */

export interface BackendHealthResponse {
  status: string;
  app: string;
  version: string;
}

export interface BackendSourceReference {
  page: number;
  snippet: string;
  relevance_score: number;
}

export interface BackendUploadResponse {
  document_id: string;
  filename: string;
  file_type: string;
  page_count: number;
  chunk_count: number;
  preview: string;
  uploaded_at: string;
}

export interface BackendAskResponse {
  document_id: string;
  question: string;
  answer: string;
  sources: BackendSourceReference[];
  disclaimer: string;
  status?: 'success' | 'rate_limited' | 'demo_mode' | 'error';
  fallback_used?: boolean;
}

export class BackendConnectionError extends Error {
  constructor(message = 'LexiGuide AI backend is unreachable. Make sure the FastAPI service is running.') {
    super(message);
    this.name = 'BackendConnectionError';
  }
}

export class BackendDocumentNotFoundError extends Error {
  public documentId: string;
  constructor(documentId: string, message = 'Document not found in server memory. The backend may have restarted.') {
    super(message);
    this.name = 'BackendDocumentNotFoundError';
    this.documentId = documentId;
  }
}

export class BackendApiError extends Error {
  public statusCode: number;
  public detail: string;

  constructor(statusCode: number, detail: string) {
    super(`API Error ${statusCode}: ${detail}`);
    this.name = 'BackendApiError';
    this.statusCode = statusCode;
    this.detail = detail;
  }
}

// Configurable base URL from Vite environment variable (defaults to local FastAPI backend)
export const getBackendBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return 'http://127.0.0.1:8000';
};

/**
 * Health check to probe whether the FastAPI backend is running.
 */
export async function checkBackendHealth(): Promise<BackendHealthResponse | null> {
  const baseUrl = getBackendBaseUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

    const response = await fetch(`${baseUrl}/health`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      return (await response.json()) as BackendHealthResponse;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Uploads a PDF or TXT file to the backend for page extraction and in-memory indexing.
 */
export async function uploadDocumentToBackend(file: File): Promise<BackendUploadResponse> {
  const baseUrl = getBackendBaseUrl();
  const formData = new FormData();
  formData.append('file', file, file.name);

  try {
    const response = await fetch(`${baseUrl}/api/documents/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let detail = `Upload failed with HTTP ${response.status}`;
      try {
        const errorJson = await response.json();
        if (errorJson.detail) {
          detail = typeof errorJson.detail === 'string' ? errorJson.detail : JSON.stringify(errorJson.detail);
        }
      } catch {
        // Fallback to text
        const text = await response.text().catch(() => '');
        if (text) detail = text;
      }
      throw new BackendApiError(response.status, detail);
    }

    return (await response.json()) as BackendUploadResponse;
  } catch (err: any) {
    if (err instanceof BackendApiError) {
      throw err;
    }
    throw new BackendConnectionError(
      `Could not connect to backend server at ${baseUrl}. Ensure uvicorn is running: ${err.message || err}`
    );
  }
}

/**
 * Submits a grounded question about a previously uploaded document to Gemini.
 */
export async function askBackendDocument(
  documentId: string,
  question: string
): Promise<BackendAskResponse> {
  const baseUrl = getBackendBaseUrl();
  const cleanQuestion = question.trim();

  if (!cleanQuestion) {
    throw new BackendApiError(400, 'Question cannot be empty.');
  }

  try {
    const response = await fetch(`${baseUrl}/api/documents/${encodeURIComponent(documentId)}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ question: cleanQuestion }),
    });

    if (response.status === 404) {
      throw new BackendDocumentNotFoundError(
        documentId,
        'Document session expired or server was restarted. Please re-upload your document to continue.'
      );
    }

    if (!response.ok) {
      let detail = `Server responded with HTTP ${response.status}`;
      try {
        const errorJson = await response.json();
        if (errorJson.detail) {
          detail = typeof errorJson.detail === 'string' ? errorJson.detail : JSON.stringify(errorJson.detail);
        }
      } catch {
        const text = await response.text().catch(() => '');
        if (text) detail = text;
      }
      throw new BackendApiError(response.status, detail);
    }

    return (await response.json()) as BackendAskResponse;
  } catch (err: any) {
    if (err instanceof BackendDocumentNotFoundError || err instanceof BackendApiError) {
      throw err;
    }
    throw new BackendConnectionError(
      `Failed to connect to Gemini backend at ${baseUrl}. Please verify the server is running.`
    );
  }
}
