// ============================================
// MAIN JAVASCRIPT - Global Site Functionality
// Mobile menu, scroll effects, FAQ accordion, etc.
// ============================================

// ========== MOBILE MENU TOGGLE ==========
const mobileMenuBtn = document.getElementById('mobileMenu');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle hamburger icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

// ========== DROPDOWN FOR MOBILE ==========
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    if (dropdownLink && window.innerWidth <= 1024) {
        dropdownLink.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    }
});

// ========== STICKY HEADER SCROLL EFFECT ==========
const header = document.querySelector('.sticky-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (header) {
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    }

    // Hide/show header on scroll (optional: hide on scroll down, show on scroll up)
    if (currentScroll > lastScroll && currentScroll > 300) {
        // Scrolling down
        if (header) header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        if (header) header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// ========== FAQ ACCORDION ==========
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                // Close other open FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        if (otherAnswer) otherAnswer.classList.remove('show');
                        if (otherQuestion) otherQuestion.classList.remove('active');
                    }
                });

                // Toggle current FAQ
                answer.classList.toggle('show');
                question.classList.toggle('active');
            });
        }
    });
}

// If FAQ items are dynamically loaded, call after DOM ready
document.addEventListener('DOMContentLoaded', initFaqAccordion);

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// ========== SCROLL REVEAL ANIMATIONS ==========
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.feature-card, .service-card, .blog-card, .about-content, .hero-content');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Add reveal styles
if (!document.querySelector('#reveal-styles')) {
    const revealStyles = document.createElement('style');
    revealStyles.id = 'reveal-styles';
    revealStyles.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .reveal-active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyles);
}

document.addEventListener('DOMContentLoaded', initScrollReveal);

// ========== LAZY LOADING IMAGES ==========
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// ========== GOOGLE REVIEWS SCHEMA ==========
const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "healtouch Physio & Rehab Centre",
    "image": "https://www.healtouchphysio.com/assets/images/logo.png",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
    },
    "telephone": "+91 9751633111",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127"
    }
};

const schemaScript = document.createElement('script');
schemaScript.type = 'application/ld+json';
schemaScript.textContent = JSON.stringify(reviewSchema);
document.head.appendChild(schemaScript);