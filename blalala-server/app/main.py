import os
import json
import httpx

from fastapi import FastAPI
from pydantic import BaseModel

debug = os.getenv("DEBUG", "false").lower() == "true"

app = FastAPI(
    docs_url="/docs" if debug else None,
    redoc_url="/redoc" if debug else None,
    openapi_url="/openapi.json" if debug else None,
)

@app.get("/")
async def root():
    return {"message": f"It's alive! Ant it watch! (If `DEBUG` is `True`). Right now `DEBUG` is `{debug}`."}
