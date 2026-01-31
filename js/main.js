// js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add fade-in animation to all glass elements
    const glassElements = document.querySelectorAll('.glass');
    glassElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        // Just enhance the glass effect
        el.style.background = 'rgba(0, 0, 0, 0.05)';
        el.style.backdropFilter = 'blur(20px)';
        el.style.webkitBackdropFilter = 'blur(20px)';
    });
    
    // Add CSS for tags (same as before, just enhanced glass)
    const style = document.createElement('style');
    style.textContent = `
        .tag {
            display: inline-block;
            background: rgba(0, 0, 0, 0.08);
            backdrop-filter: blur(10px);
            color: var(--accent-color);
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            margin-right: 0.5rem;
            margin-top: 0.5rem;
            border: 1px solid rgba(0, 0, 0, 0.15);
        }
        
        .p-3 { padding: 1rem; }
        .p-4 { padding: 1.5rem; }
    `;
    document.head.appendChild(style);
    
    // Add hover effects (same as before)
    const cards = document.querySelectorAll('.feature-card, .creator-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});