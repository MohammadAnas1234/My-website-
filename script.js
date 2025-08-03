/* https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/32094f0ed7be0888e1ee8eb6f37ade05/b0c37a99-caaf-4c0d-9383-2fe193e30ba7/app.js */
// CampusHub Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling and active navigation state
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Update active navigation on page load
    updateActiveNavigation();
    
    // Notes filtering functionality
    const subjectFilter = document.querySelector('.filter-select:first-child');
    const courseFilter = document.querySelector('.filter-select:nth-child(2)');
    const noteCards = document.querySelectorAll('.note-card');
    
    function filterNotes() {
        const selectedSubject = subjectFilter.value;
        const selectedCourse = courseFilter.value;
        
        noteCards.forEach(card => {
            const noteSubject = card.querySelector('.note-subject').textContent;
            const noteCourse = card.querySelector('.note-course').textContent;
            
            let showCard = true;
            
            if (selectedSubject !== 'All Subjects' && noteSubject !== selectedSubject) {
                showCard = false;
            }
            
            if (selectedCourse !== 'All Courses' && noteCourse !== selectedCourse) {
                showCard = false;
            }
            
            if (showCard) {
                card.style.display = 'block';
                // Add a subtle animation when showing
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Add event listeners for filters
    if (subjectFilter && courseFilter) {
        subjectFilter.addEventListener('change', filterNotes);
        courseFilter.addEventListener('change', filterNotes);
    }
    
    // Button interactions
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add a ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            // Add ripple animation CSS if it doesn't exist
            if (!document.querySelector('#ripple-style')) {
                const style = document.createElement('style');
                style.id = 'ripple-style';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                    .btn {
                        position: relative;
                        overflow: hidden;
                    }
                `;
                document.head.appendChild(style);
            }
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Card hover effects enhancement
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .note-card, .forum-card, .event-card, .announcement-card, .feedback-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Dynamic statistics counter animation
    function animateCounter(element, start, end, duration) {
        let current = start;
        const increment = (end - start) / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            
            // Format the number with + suffix for display
            const displayValue = Math.floor(current);
            element.textContent = displayValue.toLocaleString() + '+';
        }, 16);
    }
    
    // Animate statistics when they come into view
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                
                animateCounter(element, 0, number, 2000);
                statsObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Search functionality for better user experience
    function createSearchableContent() {
        const searchableItems = [
            ...document.querySelectorAll('.note-card'),
            ...document.querySelectorAll('.forum-card'),
            ...document.querySelectorAll('.event-card'),
            ...document.querySelectorAll('.announcement-card'),
            ...document.querySelectorAll('.feedback-card')
        ];
        
        return searchableItems.map(item => ({
            element: item,
            text: item.textContent.toLowerCase(),
            section: item.closest('section').id
        }));
    }
    
    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        // Press 'h' to go to home
        if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const target = document.activeElement;
            if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Press 'n' to go to notes
        if (e.key === 'n' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const target = document.activeElement;
            if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                document.querySelector('#notes').scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Press 'f' to go to forums
        if (e.key === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const target = document.activeElement;
            if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                document.querySelector('#forums').scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
        }
    });
    
    // Enhanced accessibility
    function enhanceAccessibility() {
        // Add ARIA labels to interactive elements
        const interactiveElements = document.querySelectorAll('button, a, select');
        
        interactiveElements.forEach(element => {
            if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
                const text = element.textContent.trim() || element.value;
                if (text) {
                    element.setAttribute('aria-label', text);
                }
            }
        });
        
        // Add skip navigation link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.cssText = `
            position: absolute;
            left: -9999px;
            z-index: 999;
            padding: 8px;
            background: var(--color-surface);
            color: var(--color-text);
            text-decoration: none;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.left = '10px';
            this.style.top = '10px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.left = '-9999px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content landmark
        const mainContent = document.querySelector('.hero-section');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
    }
    
    enhanceAccessibility();
    
    // Performance optimization: Lazy load images if any are added
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    lazyLoadImages();
    
    // Console welcome message
    console.log(`
    ð Welcome to CampusHub!
    
    Keyboard shortcuts:
    - Press 'h' to go to Home
    - Press 'n' to go to Notes
    - Press 'f' to go to Forums
    - Press 'Escape' to close mobile menu
    
    Built with modern web technologies for the best user experience.
    `);
    
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { debounce };
}
