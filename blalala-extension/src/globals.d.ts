interface BlalalaContentApi {
    getTextNodes(root?: Node): Text[];
}

interface Window {
    blalala?: BlalalaContentApi;
}

interface Window {
    browser_api: typeof chrome;
}