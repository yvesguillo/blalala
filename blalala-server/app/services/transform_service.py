from app.services.ollama_service import OllamaService

class TransformService:
    def __init__(self, ollama_service: OllamaService) -> None:
        self.ollama_service = ollama_service

    async def transform(
        self,
        text: str,
        persona: str,
        tone: str,
        style: str,
        custom_instruction: str = "",
    ) -> str:
        system_prompt = self._build_system_prompt(
            persona=persona,
            tone=tone,
            style=style,
            custom_instruction=custom_instruction,
        )

        return await self.ollama_service.chat(
            system_prompt=system_prompt,
            user_prompt=text,
        )

    @staticmethod
    def _build_system_prompt(
        persona: str,
        tone: str,
        style: str,
        custom_instruction: str = "",
    ) -> str:
        prompt = (
            "You are a text transformation engine.\n"
            "Your task is to rewrite the given text while preserving its informations.\n"
            "Transformation instructions:\n"
            f"- Write as if you were a {persona or 'neutral writer'}.\n"
            f"- Use a {tone or 'neutral'} tone.\n"
            f"- Format the informations on a {style or 'neutral'} writing style.\n\n"
            "- Return only the transformed text.\n"
            "- Do not explain what you changed.\n"
            "- Do not remove important information.\n"
            "- Keep the original language unless explicitly instructed otherwise.\n\n"
        )

        if custom_instruction.strip():
            prompt += (
                "\nAdditional user instruction:\n"
                f"{custom_instruction.strip()}\n"
            )

        return prompt