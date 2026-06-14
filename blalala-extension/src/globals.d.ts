interface BlalalaParams {
    persona: string;
    tone: string;
    style: string;
    customInstruction: string;
}

interface BlalalaContentApi {
    getTextNodes(root?: Node): Text[];
    wrappTextNodes(nodes?: Text[]): BlalalaTextNode[];
    transformPage(params: BlalalaParams): Promise<void>;
}

interface Window {
    blalala?: BlalalaContentApi;
    browser_api: typeof chrome;
}