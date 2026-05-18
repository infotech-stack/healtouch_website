// ============================================
// ANIMATED COUNTERS FOR STATISTICS
// Scroll-triggered number counting animation
// ============================================

class AnimatedCounters {
    constructor() {
        this.counters = [];
        this.hasAnimated = false;
        this.init();
    }

    init() {
        this.counters = document.querySelectorAll('.counter');
        if (this.counters.length === 0) return;
        
        // Use Intersection Observer for scroll-triggered animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateCounters();
                    this.hasAnimated = true;
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(document.querySelector('.trust-badges') || document.body);
        
        // Fallback: if observer doesn't trigger within 2 seconds, animate anyway
        setTimeout(() => {
            if (!this.hasAnimated) {
                this.animateCounters();
                this.hasAnimated = true;
            }
        }, 2000);
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = Math.ceil(target / 50); // Smooth animation over ~50 frames
            const duration = 2000; // 2 seconds
            const stepTime = duration / (target / increment);
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = current;
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AnimatedCounters();
});