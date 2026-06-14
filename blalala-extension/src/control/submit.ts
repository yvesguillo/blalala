// This will be executed in a new process each time the submit button from popup.html is clicked. The Event callback for this click is defined in popup.ts.

window.blalala ??= {} as BlalalaContentApi;

window.blalala.transformPage = async (params: BlalalaParams): Promise<void> => {
    // Some sanity check.
    // Why shall I test that here while I'm actually inside it? Mystery…
    if(!window.blalala) {
        console.warn("Blalala is not available.");
        return;
    }

    // Get Text Nodes or attempt collection if not done yet.
    if(!window.blalala.textNodes) {
        // Collect all texts nodes from document.
        window.blalala.textNodes = window.blalala?.getTextNodes();

        if (!window.blalala.textNodes) {
            console.warn("Blalala DOM Text Nodes scanner is not available.");
            return;
        }
    }

    // Get Blalala Wrapped Text Nodes or attempt collection if not done yet.
    if(!window.blalala.wrappedTextNodes) {
        // Collect all texts nodes from document.
        window.blalala.wrappedTextNodes = window.blalala?.wrappTextNodes(window.blalala.textNodes);

        if (!window.blalala.wrappedTextNodes) {
            console.warn("Blalala Text Nodes wrapper is not available.");
            return;
        }
    }

    // Process all wrapped Text Nodes for request.
    for (const wrappedNode of window.blalala.wrappedTextNodes) {
        const originalText = wrappedNode.originalText?.trim();

        if (!originalText) {
            continue;
        }

        // Async request build.
        const response = await fetch("http://127.0.0.1:3000/transform", { // Will put this URL in a configuration file.
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

        // Replace document text node content with request feedback.
        const data = await response.json();
        console.log(data.transformed_text);
        wrappedNode.node.textContent = data.transformed_text;
    }
};