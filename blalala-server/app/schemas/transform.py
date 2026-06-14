from pydantic import BaseModel, Field

class TransformRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)
    persona: str = Field(default="")
    tone: str = Field(default="")
    style: str = Field(default="")
    custom_instruction: str = Field(default="")

class TransformResponse(BaseModel):
    # original_text: str
    transformed_text: str