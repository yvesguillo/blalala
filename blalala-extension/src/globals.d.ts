interface BlalalaContentApi {
    getTextNodes(root?: Node): Text[];
    wrappTextNodes(nodes?: Text[]): BlalalaTextNode[]
}

interface Window {
    blalala?: BlalalaContentApi;
}

interface Window {
    browser_api: typeof chrome;
}