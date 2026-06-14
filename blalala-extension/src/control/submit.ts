// This script will be executed upon popup UI button click. It is referenced in `popup.js` as callback for UI button clicks.
window.blalala ??= {} as BlalalaContentApi;

window.blalala.transformPage = async (params: BlalalaParams): Promise<void> => {
    const textNodes = window.blalala?.getTextNodes();

    if (!textNodes) {
        console.warn("Blalala DOM scanner is not available.");
        return;
    }

    for (const node of textNodes) {
        const originalText = node.textContent?.trim();

        if (!originalText) {
            continue;
        }

        const response = await fetch("http://127.0.0.1:3000/transform", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: originalText,
                persona: params.persona,
                tone: params.tone,
                style: params.style,
                custom_instruction: params.customInstruction,
            }),
        });

        if (!response.ok) {
            console.warn("Blalala API error:", response.status);
            continue;
        }

        const data = await response.json();

        node.textContent = data.text;
    }
};