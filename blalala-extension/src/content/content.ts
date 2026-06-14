// This script will be executed upon popup UI button click. It is referenced in `popup.js` as callback for UI button clicks.
// As this script might be loaded several times, we use IIFE (Immediately Invoked Function Expression).
(() => {
    const textNodes = window.blalala?.getTextNodes();

    if (!textNodes) {
        console.warn("Blalala DOM scanner is not available.");
        return;
    }

    console.log(`Found ${textNodes.length} text nodes.`);

    for(let node of textNodes) {
        node.nodeValue = "";
    }
})();