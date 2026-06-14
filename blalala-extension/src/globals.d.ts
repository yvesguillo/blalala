// This script is implicitly loaded by the extension manager and holds global aliases and classes.

interface BlalalaParams {
    persona: string;
    tone: string;
    style: string;
    customInstruction: string;
}

interface BlalalaTextNode {
    node: Text;
    originalText: string;
}

interface BlalalaContentApi {
    getTextNodes(root?: Node): Text[];
    wrappTextNodes(nodes?: Text[]): BlalalaTextNode[];
    transformPage(params: BlalalaParams): Promise<void>;
    textNodes: Text[] | undefined;
    wrappedTextNodes: BlalalaTextNode[] | undefined;
}

interface Window {
    blalala?: BlalalaContentApi;
    browser_api: typeof chrome;
}