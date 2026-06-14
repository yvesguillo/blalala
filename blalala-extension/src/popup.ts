// This script will be executed upon extension popup activation and initialize popup UI. It is called from `popup.html`.

const form = document.querySelector("#blalala-form") as HTMLFormElement | null;

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const params = {
        persona: String(formData.get("persona") ?? ""),
        tone: String(formData.get("tone") ?? ""),
        style: String(formData.get("style") ?? ""),
        customInstruction: String(formData.get("custom_instruct") ?? ""),
    };

    window.browser_api.tabs.query(
        { active: true, currentWindow: true },
        (tabs: chrome.tabs.Tab[]) => {
            const tabId = tabs[0]?.id;

            if (tabId === undefined) {
                console.warn("No active tab found.");
                return;
            }

            window.browser_api.scripting.executeScript(
                {
                    target: { tabId },
                    files: [
                        "./model/dom-scanner.js",
                        "./control/submit.js",
                    ],
                },
                () => {
                    window.browser_api.scripting.executeScript({
                        target: { tabId },
                        func: (params: BlalalaParams) => {
                            window.blalala?.transformPage(params);
                        },
                        args: [params],
                    });
                }
            );
        }
    );
});