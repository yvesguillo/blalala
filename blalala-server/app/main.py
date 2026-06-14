import os
import json
import httpx

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

# Config ######################################################################

debug = os.getenv("DEBUG", "false").lower() == "true"

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

# Model #######################################################################

class TransformRequest(BaseModel):
    text: str
    persona: str
    tone: str
    style: str
    custom_instruction: str = ""


class TransformResponse(BaseModel):
    text: str


# Routes ######################################################################

@app.post("/transform", response_model=TransformResponse)
async def transform(payload: TransformRequest) -> TransformResponse:
    return TransformResponse(
        text=f"[{payload.persona} / {payload.tone} / {payload.style}] {payload.text}"
    )

@app.get("/")
async def root():
    return {"message": f"It's alive! Ant it watch! (If `DEBUG` is `True`). Right now `DEBUG` is `{debug}`."}
