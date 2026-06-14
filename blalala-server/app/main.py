import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.ollama_service import OllamaService
from app.services.transform_service import TransformService
from app.schemas.transform import TransformRequest, TransformResponse

# Config ######################################################################

debug = os.getenv("DEBUG", "false").lower() == "true"

ollama_service = OllamaService(
    base_url=os.getenv("OLLAMA_BASE_URL", "http://ollama:11434"),
    model=os.getenv("OLLAMA_MODEL", "qwen3:1.7b"),
    timeout=float(os.getenv("OLLAMA_TIMEOUT", "60")),
)

transform_service = TransformService(ollama_service)

app = FastAPI(
    docs_url="/docs" if debug else None,
    redoc_url="/redoc" if debug else None,
    openapi_url="/openapi.json" if debug else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Schemas #######################################################################




# Routes ######################################################################

@app.get("/")
async def root():
    return {"message": f"It's alive! Ant it watch! (If `DEBUG` is `True`). Right now `DEBUG` is `{debug}`."}

@app.post("/transform", response_model=TransformResponse)
async def transform_text(payload: TransformRequest) -> TransformResponse:
    transformed_text = await transform_service.transform(
        text=payload.text,
        persona=payload.persona,
        tone=payload.tone,
        style=payload.style,
        custom_instruction=payload.custom_instruction,
    )

    return TransformResponse(
        # original_text=payload.text,
        transformed_text=transformed_text,
    )