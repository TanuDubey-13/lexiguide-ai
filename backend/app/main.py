"""FastAPI entry point for LexiGuide AI Backend."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from .models.schemas import HealthResponse
from .routes.documents import router as documents_router

app = FastAPI(
    title="LexiGuide AI API",
    description="Intelligent legal document comprehension, text extraction, and Gemini-grounded Q&A backend.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS configuration
# Allows local Vite development server and the deployed GitHub Pages frontend
ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "https://tanudubey-13.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(documents_router)


@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["system"],
    summary="Health check endpoint"
)
async def health_check():
    """Returns application health status and version."""
    return HealthResponse(
        status="ok",
        app="LexiGuide AI Backend",
        version="1.0.0"
    )


@app.get("/", include_in_schema=False)
async def root():
    """Redirect root path to interactive Swagger documentation."""
    return RedirectResponse(url="/docs")
