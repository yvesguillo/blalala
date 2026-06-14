// This script will be executed upon extension popup activation and initialize popup UI. It is called from `popup.html`.

// Get the current tab of active window and define a callback function.
browser_api.tabs.query(
    { active: true, currentWindow: true }, // Tab selection criterias.

    // Callback.
    (tabs: chrome.tabs.Tab[]) => {
        const tabId = tabs[0]?.id; // Get Tab ID.

        // Exit if no Tab ID.
        if (tabId === undefined) {
            console.warn("No active tab found.");
            return;
        }

        // Execute scripts listed in `files` parameter, into the selected Tab.
        browser_api.scripting.executeScript({
            target: { tabId },
            files: ["content.js"],
        });
    }
);

// Set a click event callback on a `popup.html` element.
const switchButton = document.querySelector<HTMLButtonElement>("#switch");

switchButton?.addEventListener("click", () => {
    // Get the current tab of active window and define a callback function.
    browser_api.tabs.query(
        { active: true, currentWindow: true }, // Tab selection criterias.

        // Callback.
        (tabs: chrome.tabs.Tab[]) => {
            const tabId = tabs[0]?.id; // Get Tab ID.

            // Exit if no Tab ID.
            if (tabId === undefined) {
                console.warn("No active tab found.");
                return;
            }

            // Execute scripts listed in `files` parameter, into the selected Tab.
            browser_api.scripting.executeScript({
                target: { tabId },
                files: ["content.js"],
            });
        }
    );
});