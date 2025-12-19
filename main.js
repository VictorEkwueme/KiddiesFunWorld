// ============================================
// KIDDIES FUN WORLD - Main JavaScript
// ============================================

// ============================================
// Mobile Navigation Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnButton && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});

// ============================================
// Sticky Navigation on Scroll
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                    if (mobileMenuBtn) {
                        const icon = mobileMenuBtn.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        }
    });
});

// ============================================
// Animated Counter for Stats
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Trigger counter animation when element is in viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number[data-target]').forEach(stat => {
    observer.observe(stat);
});

// ============================================
// Gallery Filter Functionality
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// Form Validation and Submission
// ============================================

// Party Booking Form
const partyBookingForm = document.getElementById('partyBookingForm');
if (partyBookingForm) {
    partyBookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#EF4444';
                
                setTimeout(() => {
                    field.style.borderColor = '';
                }, 3000);
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Success! Your party booking request has been received. We\'ll contact you within 24 hours!', 'success');
            this.reset();
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#EF4444';
                
                setTimeout(() => {
                    field.style.borderColor = '';
                }, 3000);
            }
        });
        
        // Email validation
        const emailField = this.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = '#EF4444';
                setTimeout(() => {
                    emailField.style.borderColor = '';
                }, 3000);
            }
        }
        
        if (isValid) {
            // Show success message
            showNotification('Thank you for contacting us! We\'ll get back to you soon.', 'success');
            this.reset();
        } else {
            showNotification('Please check your information and try again.', 'error');
        }
    });
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}" style="font-size: 1.5rem;"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// Scroll Animations
// ============================================
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add animation to cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(`
        .facility-card, 
        .feature-card, 
        .testimonial-card, 
        .package-card,
        .activity-showcase,
        .program-showcase
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });
});

// ============================================
// Add current year to footer
// ============================================
const currentYear = new Date().getFullYear();
const footerBottoms = document.querySelectorAll('.footer-bottom p');
footerBottoms.forEach(footer => {
    footer.innerHTML = footer.innerHTML.replace('2024', currentYear);
});

// ============================================
// Lazy Loading Images (if actual images are added)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Prevent form double submission
// ============================================
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 3000);
        }
    });
});

// ============================================
// Accordion functionality (if needed)
// ============================================
document.querySelectorAll('.faq-item h3').forEach(question => {
    question.style.cursor = 'pointer';
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            answer.style.marginTop = '0';
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.marginTop = '1rem';
        }
    });
});

// ============================================
// Initialize tooltips (if using)
// ============================================
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: #1F2937;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 1000;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        
        this.addEventListener('mouseleave', function() {
            tooltip.remove();
        }, { once: true });
    });
});

// ============================================
// Loading Animation
// ============================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in effect to page content
    const mainContent = document.querySelector('body');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);
    }
});

// ============================================
// Console Welcome Message
// ============================================
console.log('%c🎪 Welcome to Kiddies Fun World! 🎉', 'color: #FF6B9D; font-size: 20px; font-weight: bold;');
console.log('%cWhere fun, laughter, and adventure begin!', 'color: #FDB833; font-size: 14px;');
console.log('%c💻 Looking for something? Contact us at info@kiddiesfunworld.com', 'color: #4ECDC4; font-size: 12px;');

// ============================================
// Performance Monitoring (Optional)
// ============================================
if (window.performance) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #10B981; font-weight: bold;');
        }, 0);
    });
}

// ============================================
// Export functions for testing (if needed)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        animateCounter
    };
}