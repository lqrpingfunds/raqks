// js/copy.js
function copyScript() {
    const scriptCode = document.getElementById('scriptCode');
    const copyBtn = document.querySelector('.copy-btn');
    
    // Select text
    const range = document.createRange();
    range.selectNodeContents(scriptCode);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Copy to clipboard
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            // Visual feedback
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.classList.add('copied');
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy Script';
                copyBtn.classList.remove('copied');
            }, 2000);
            
            // Optional: Show notification
            showNotification('Script copied to clipboard!', 'success');
        }
    } catch (err) {
        console.error('Copy failed:', err);
        showNotification('Copy failed. Please select and copy manually.', 'error');
    }
    
    // Deselect text
    selection.removeAllRanges();
}

// Alternative method using Clipboard API
async function copyScriptModern() {
    const scriptCode = document.getElementById('scriptCode').textContent;
    const copyBtn = document.querySelector('.copy-btn');
    
    try {
        await navigator.clipboard.writeText(scriptCode);
        
        // Visual feedback
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy Script';
            copyBtn.classList.remove('copied');
        }, 2000);
        
        showNotification('Script copied to clipboard!', 'success');
    } catch (err) {
        console.error('Clipboard API failed:', err);
        // Fallback to traditional method
        copyScript();
    }
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(46, 204, 113, 0.9)' : 'rgba(231, 76, 60, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'success' ? 'rgba(46, 204, 113, 0.3)' : 'rgba(231, 76, 60, 0.3)'};
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update copy button to use modern method if available
document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn && navigator.clipboard) {
        copyBtn.onclick = copyScriptModern;
    }
});