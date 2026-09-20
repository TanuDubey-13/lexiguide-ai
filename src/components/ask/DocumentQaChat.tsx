import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  MessageCircle,
  FileText,
  Sparkles,
  Bookmark,
  Layers,
  Trash2,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { QAMessage, LegalDocument } from '../../types/legal';
import { askDocument } from '../../services/aiService';
import { DemoModeBadge } from '../common/DemoModeBadge';
import { BackendDocumentNotFoundError } from '../../services/backendApi';
import { useDocument } from '../../context/DocumentContext';
import { SafeMarkdown } from '../common/SafeMarkdown';

interface DocumentQaChatProps {
  document: LegalDocument;
  initialMessages?: QAMessage[];
  prefilledQuery?: string;
  autoSubmit?: boolean;
}

export const DocumentQaChat: React.FC<DocumentQaChatProps> = ({
  document,
  initialMessages = [],
  prefilledQuery = '',
  autoSubmit = false,
}) => {
  const { reuploadCurrentDocument, backendStatus, refreshBackendStatus } = useDocument();
  const [messages, setMessages] = useState<QAMessage[]>(initialMessages);
  const [inputText, setInputText] = useState<string>(prefilledQuery);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReuploading, setIsReuploading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoSubmittedRef = useRef(false);

  const suggestedQuestions = [
    'What happens if I terminate early?',
    'Who is responsible for repairs?',
    'When is the security deposit returned?',
    'Can the rent be increased?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (prefilledQuery) {
      setInputText(prefilledQuery);
      if (autoSubmit && !hasAutoSubmittedRef.current) {
        hasAutoSubmittedRef.current = true;
        handleSend(prefilledQuery);
      }
    }
  }, [prefilledQuery, autoSubmit]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: QAMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const aiMsg = await askDocument(
        userMsg.text,
        document.id,
        document.backendDocumentId,
        document.name
      );
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('Error asking document:', err);
      if (err instanceof BackendDocumentNotFoundError) {
        const restartMsg: QAMessage = {
          id: `err-${Date.now()}`,
          sender: 'ai',
          text: 'The backend server was restarted or the document session in server memory expired. Please re-upload your document to continue real-time Gemini Q&A.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          errorType: 'not_found',
        };
        setMessages((prev) => [...prev, restartMsg]);
      } else {
        const errorMsg: QAMessage = {
          id: `err-${Date.now()}`,
          sender: 'ai',
          text: err?.detail || err?.message || 'Unable to retrieve answer from document. Please verify your backend server or try asking again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          errorType: 'general',
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReupload = async () => {
    setIsReuploading(true);
    const success = await reuploadCurrentDocument();
    setIsReuploading(false);

    if (success) {
      setMessages((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          sender: 'ai',
          text: `Document "${document.name}" was successfully re-indexed in server memory. You can now continue asking grounded questions!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } else {
      await refreshBackendStatus();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const isLiveBackendActive = Boolean(document.backendDocumentId && backendStatus === 'connected');

  return (
    <div className="flex flex-col h-[700px] max-h-[85vh] bg-white rounded-3xl border border-[#E2E8F0] shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-[#0B1F33] text-white px-5 py-4 border-b border-[#1E3A5F] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#1B365D] text-[#C49A3A]">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base tracking-wide">Document-Grounded AI</h2>
              {isLiveBackendActive ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Gemini 3.6 Flash Active
                </span>
              ) : document.isDemo ? (
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-400 text-amber-950">
                  DEMO
                </span>
              ) : (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                  Document-Grounded Mode
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <FileText className="w-3.5 h-3.5 text-[#C49A3A]" />
              <span className="font-mono text-white/90">{document.name}</span>
              <span>•</span>
              <span>{document.pageCount} pages</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isLiveBackendActive && <DemoModeBadge compact />}
          {messages.length > 0 && (
            <button
              onClick={handleClearChat}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors text-xs flex items-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              title="Clear conversation"
              aria-label="Clear conversation history"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Suggested Questions Pills */}
      <div className="px-5 py-3 bg-[#FAF9F5] border-b border-[#E2E8F0] overflow-x-auto">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold uppercase tracking-wider text-[#64748B] flex items-center gap-1 flex-shrink-0 text-[11px]">
            <HelpCircle className="w-3.5 h-3.5 text-[#C49A3A]" />
            Suggested:
          </span>
          <div className="flex items-center gap-2 flex-nowrap">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white hover:bg-[#102A43] text-[#102A43] hover:text-white border border-[#CBD5E1] font-medium text-xs transition-all shadow-subtle flex-shrink-0 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Stream */}
      <div
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#FDFBF7]"
        role="log"
        aria-live="polite"
        aria-label="Document Q&A Conversation"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#64748B] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#102A43]/5 flex items-center justify-center text-[#102A43]">
              <Sparkles className="w-6 h-6 text-[#C49A3A]" />
            </div>
            <h3 className="text-base font-bold text-[#102A43]">
              Ask anything about "{document.name}"
            </h3>
            <p className="text-xs sm:text-sm max-w-sm">
              Inquire about notice deadlines, refund rules, repair liabilities, or early termination penalties.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {suggestedQuestions.slice(0, 2).map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#102A43] bg-white px-3 py-2 rounded-xl border border-[#CBD5E1] hover:border-[#102A43] transition-all cursor-pointer"
                >
                  <span>{q}</span>
                  <ArrowRight className="w-3 h-3 text-[#C49A3A]" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              {msg.sender === 'user' ? (
                <div className="max-w-xl bg-[#102A43] text-white p-4 rounded-2xl rounded-tr-xs shadow-subtle space-y-1">
                  <div className="text-sm font-medium">{msg.text}</div>
                  <div className="text-[10px] text-white/60 text-right">{msg.timestamp}</div>
                </div>
              ) : (
                <div className="max-w-2xl bg-white border border-[#E2E8F0] rounded-2xl rounded-tl-xs shadow-card p-5 space-y-4">
                  {/* AI Badge */}
                  <div className="flex items-center justify-between border-b border-[#F1EFE9] pb-2.5 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1 rounded bg-[#102A43] text-white flex-shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-[#C49A3A]" />
                      </div>
                      <span className="font-bold text-[#102A43] tracking-tight">LexiGuide AI</span>
                      {msg.isRateLimited ? (
                        <>
                          <span className="text-[#CBD5E1] select-none text-xs hidden sm:inline">•</span>
                          <span className="inline-flex items-center text-[10px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300 shadow-2xs">
                            Document-Only Fallback
                          </span>
                        </>
                      ) : msg.isRealBackend ? (
                        <>
                          <span className="text-[#CBD5E1] select-none text-xs hidden sm:inline">•</span>
                          <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                            Gemini 3.6 Flash
                          </span>
                        </>
                      ) : null}
                    </div>
                    <span className="text-[10px] text-[#64748B]">{msg.timestamp}</span>
                  </div>

                  {/* Gemini Rate-Limited / Unavailable Notice */}
                  {msg.isRateLimited && (
                    <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>Gemini temporarily unavailable</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-normal">
                        Your document was still searched. LexiGuide will not guess when the answer is not supported by the document.
                      </p>
                    </div>
                  )}

                  {/* 1. Plain Language Answer */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">
                      Answer
                    </span>
                    <SafeMarkdown content={msg.text} />
                  </div>

                  {/* Re-upload Action if session expired */}
                  {msg.errorType === 'not_found' && (
                    <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200 text-xs text-amber-900 space-y-2">
                      <div className="flex items-center gap-2 font-semibold">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>Document session needs renewal</span>
                      </div>
                      <p className="text-amber-800 text-[11px]">
                        The FastAPI backend holds documents in memory for security. When the backend restarts, simply click below to re-index your document.
                      </p>
                      <button
                        onClick={handleReupload}
                        disabled={isReuploading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#102A43] hover:bg-[#0B1F33] text-white font-semibold text-xs shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isReuploading ? 'animate-spin' : ''}`} />
                        <span>{isReuploading ? 'Re-uploading...' : 'Re-upload Document Now'}</span>
                      </button>
                    </div>
                  )}

                  {/* 2 & 3. Source from uploaded document & Grounded document context */}
                  {((msg.sources && msg.sources.length > 0) || msg.sourceReference) && (
                    <div className="bg-[#FAF9F5] rounded-xl p-3.5 border border-[#E2E8F0] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#102A43] flex items-center gap-1.5">
                          <Bookmark className="w-3.5 h-3.5 text-[#C49A3A]" />
                          Source from uploaded document
                        </span>
                        <span className="text-[10px] text-[#64748B] font-mono">
                          Page reference
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {(msg.sources && msg.sources.length > 0 ? msg.sources : [msg.sourceReference!]).map(
                          (source, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border-l-4 border-[#C49A3A] border border-[#E2E8F0] shadow-2xs space-y-1.5">
                              <div className="flex items-center justify-between gap-2 text-[11px] text-[#64748B]">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-bold text-[#102A43] font-mono bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#CBD5E1]">Page reference: Page {source.page}</span>
                                  {source.clauseTitle && <span className="font-medium text-[#334E68]">• {source.clauseTitle}</span>}
                                </div>
                                {typeof source.relevanceScore === 'number' && (
                                  <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                    {Math.round(source.relevanceScore * 100)}% match
                                  </span>
                                )}
                              </div>
                              <div className="space-y-0.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                                  Grounded document context:
                                </span>
                                <p className="text-xs font-serif text-[#334E68] italic leading-relaxed pl-2.5 border-l-2 border-[#CBD5E1]">
                                  "{source.textSnippet}"
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Related Sections */}
                  {msg.relatedSections && msg.relatedSections.length > 0 && (
                    <div className="pt-2 border-t border-[#F1EFE9] flex items-center gap-2 text-xs text-[#64748B]">
                      <Layers className="w-3.5 h-3.5 text-[#102A43]" />
                      <span className="font-semibold text-[11px] uppercase tracking-wider">
                        Related sections:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.relatedSections.map((sec) => (
                          <span
                            key={sec}
                            className="bg-[#F1EFE9] text-[#102A43] px-2 py-0.5 rounded text-[11px] font-medium"
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4. Legal Disclaimer */}
                  <div className="pt-2 border-t border-[#F1EFE9] text-[11px] text-[#64748B] italic flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>
                      {msg.disclaimer || "Document-grounded AI assistance for informational purposes. Always consult a qualified attorney for legal counsel."}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start max-w-lg" role="status" aria-live="polite">
            <div className="bg-white border border-[#E2E8F0] rounded-2xl rounded-tl-xs p-4 shadow-subtle flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#C49A3A] animate-spin" />
              <span className="text-xs font-medium text-[#64748B]">
                {isLiveBackendActive
                  ? 'Retrieving document excerpts & generating answer with Gemini 3.6 Flash...'
                  : 'Synthesizing response and locating source references...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white border-t border-[#E2E8F0]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            id="qa-document-input"
            name="qa-document-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isLiveBackendActive
                ? `Ask Gemini 3.6 Flash about "${document.name}"...`
                : `Ask anything about "${document.name}"...`
            }
            aria-label={`Ask a question about ${document.name}`}
            disabled={isLoading}
            className="flex-1 bg-[#FAF9F5] border border-[#CBD5E1] focus:border-[#102A43] text-sm text-[#102A43] placeholder-[#64748B] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#102A43]/15 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-5 py-3 rounded-xl bg-[#102A43] hover:bg-[#0B1F33] text-white text-sm font-semibold shadow-sm transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#102A43]"
            aria-label="Send question"
          >
            <Send className="w-4 h-4 text-[#C49A3A]" />
            <span className="hidden sm:inline">Ask</span>
          </button>
        </form>
        <p className="text-[11px] text-[#64748B] mt-2 text-center">
          Answers are generated from the uploaded document text. Verify with a legal professional.
        </p>
      </div>
    </div>
  );
};
