// This script will be executed upon popup UI button click. It is referenced in `popup.js` as callback for UI button clicks.
// As this script might be loaded several times, we use IIFE (Immediately Invoked Function Expression).
(() => {
    const textNodes = window.blalala?.getTextNodes();

    if (!textNodes) {
        console.warn("Blalala DOM scanner is not available.");
        return;
    } else {
        const capturedWrappedNodes = window.blalala?.wrappTextNodes(textNodes);

        if(!capturedWrappedNodes) {
            console.warn("Could not build text node collection.");
            return;
        } else {
            for(let wrappedNode of capturedWrappedNodes) {
                wrappedNode.node.nodeValue = "";
            }
        }
    }
})();