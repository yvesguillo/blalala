// This will be executed in a new process **each time** the submit button from popup.html is clicked. The Event callback for this click is defined in `popup.ts`.
// We use extensively `??` to avoid recreating methods that have already been declared.

window.blalala ??= {} as BlalalaContentApi;

window.blalala.getTextNodes ??= (root: Node = document.body): Text[] => {
    const iterator = document.createNodeIterator(
        root,
        NodeFilter.SHOW_TEXT
    );

    const nodes: Text[] = [];
    let current: Node | null;

    while ((current = iterator.nextNode())) {
        nodes.push(current as Text);
    }

    return nodes;
};

window.blalala.wrappTextNodes ??= (nodes: Text[]): BlalalaTextNode[] => {
    return nodes.map((node) => ({
        node,
        originalText: node.textContent ?? "",
    }));
};