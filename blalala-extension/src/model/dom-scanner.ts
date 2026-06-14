interface BlalalaTextNode {
    node: Text;
    originalText: string;
}

window.blalala ??= {
    getTextNodes(root: Node = document.body): Text[] {
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
    },

    wrappTextNodes(nodes: Text[]): BlalalaTextNode[] {
        return nodes.map((node) => ({
            node,
            originalText: node.textContent ?? "",
        }));
    },
};