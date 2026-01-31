const btn = document.getElementById("copyBtn");
const code = document.getElementById("scriptCode");

// Make absolutely sure the button is clickable
btn.style.pointerEvents = "auto";
btn.style.cursor = "pointer";
btn.style.zIndex = "99999";
btn.style.position = "absolute";

console.log("Copy script loaded");
console.log("Button found:", btn);
console.log("Code element found:", code);

// Add a simple test click
btn.addEventListener("mousedown", (e) => {
    console.log("Mouse DOWN on button");
    e.stopPropagation();
});

btn.addEventListener("click", async (e) => {
    console.log("CLICK EVENT FIRED!");
    e.preventDefault();
    e.stopPropagation();
    
    try {
        // Get text
        const textToCopy = code.textContent || code.innerText;
        console.log("Copying text:", textToCopy);
        
        // Try modern clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
            console.log("Clipboard API success");
        } else {
            // Fallback
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.select();
            textArea.setSelectionRange(0, 99999);
            
            const successful = document.execCommand("copy");
            document.body.removeChild(textArea);
            
            if (!successful) throw new Error("Fallback failed");
            console.log("Fallback success");
        }
        
        // Show success
        const originalHTML = btn.innerHTML;
        btn.innerHTML = "✓ Copied!";
        btn.classList.add("copied");
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove("copied");
        }, 1500);
        
    } catch (err) {
        console.error("Copy error:", err);
        
        // Show error
        const originalHTML = btn.innerHTML;
        btn.innerHTML = "❌ Click to Select";
        btn.style.background = "rgba(244, 67, 54, 0.3)";
        
        // Select text for manual copy
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = "";
        }, 3000);
    }
});

// Also make clickable on touch devices
btn.addEventListener("touchstart", (e) => {
    console.log("Touch event on button");
    e.preventDefault();
    btn.click();
});

// Double-check on page load
window.addEventListener("load", () => {
    console.log("Page loaded, button should work now");
    if (btn) {
        btn.style.pointerEvents = "auto";
        btn.style.cursor = "pointer";
    }
});