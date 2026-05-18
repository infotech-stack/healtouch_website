// ============================================
// TESTIMONIALS SLIDER WITH SWIPER
// Professional, Animated Testimonial Carousel
// ============================================

// Testimonials Data - Rich patient stories with ratings and conditions
const testimonialsData = [
    {
        id: 1,
        name: "Rajesh Kumar",
        location: "Chennai",
        rating: 5,
        text: "After months of debilitating lower back pain that kept me from playing with my kids, I finally found relief at healtouch. The therapists are incredibly knowledgeable and truly caring. Within 6 weeks of their comprehensive treatment plan, I was pain-free and back to my daily routine. The home exercise program they gave me has prevented any recurrence. Highly recommend!",
        avatar: "RK",
        condition: "Chronic Back Pain",
        date: "March 2025"
    },
    {
        id: 2,
        name: "Priya Sharma",
        location: "Chennai",
        rating: 5,
        text: "Excellent post-surgery rehabilitation after my total knee replacement. The team guided me through every stage of recovery with patience and expertise. They didn't just treat my knee; they educated me about my condition and recovery process. Now, just 4 months later, I can walk without pain, climb stairs easily, and even do my morning walks. Thank you healtouch for giving me my independence back!",
        avatar: "PS",
        condition: "Knee Replacement Rehab",
        date: "February 2025"
    },
    {
        id: 3,
        name: "Anand Venkatesh",
        location: "Chennai",
        rating: 5,
        text: "I suffered a severe ACL tear playing cricket. The sports rehabilitation program at healtouch got me back on the field in just 8 months. The sports-specific training and return-to-play assessment were thorough. Their advanced equipment and evidence-based approach made all the difference. I'm now playing better than before with no fear of re-injury. Best physiotherapy in Chennai, hands down!",
        avatar: "AV",
        condition: "Sports Injury (ACL)",
        date: "January 2025"
    },
    {
        id: 4,
        name: "Meena Rajan",
        location: "Chennai",
        rating: 5,
        text: "The women's health program helped me recover from diastasis recti after my second pregnancy. I had given up hope of ever having a flat tummy again. The therapists were understanding, respectful, and created a safe space for my recovery. The exercises were easy to follow and effective. My core strength has improved dramatically, and my back pain is completely gone. So grateful!",
        avatar: "MR",
        condition: "Postnatal Care / Diastasis Recti",
        date: "December 2024"
    },
    {
        id: 5,
        name: "Suresh Iyer",
        location: "Chennai",
        rating: 5,
        text: "I had chronic neck pain from 15+ years of desk work. The ergonomic assessment and posture correction program was a game-changer. They didn't just treat my symptoms; they fixed the root cause. No more tension headaches, and my productivity has improved dramatically. The workplace ergonomics advice was invaluable. Worth every rupee and more!",
        avatar: "SI",
        condition: "Neck Pain / Posture",
        date: "March 2025"
    },
    {
        id: 6,
        name: "Kavitha Srinivasan",
        location: "Chennai",
        rating: 5,
        text: "The clinical Pilates classes are amazing! I started with severe lower back pain and poor posture. After 12 weeks of reformer Pilates under expert guidance, my core strength has improved, my posture is better, and the back pain is completely gone. The instructors are highly trained and ensure proper form. I look forward to every session!",
        avatar: "KS",
        condition: "Clinical Pilates",
        date: "February 2025"
    }
];

// Initialize Swiper slider when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.getElementById('testimonialsSlider');
    
    if (sliderContainer) {
        // Generate testimonial slides dynamically
        sliderContainer.innerHTML = testimonialsData.map(testimonial => `
            <div class="swiper-slide">
                <div class="testimonial-card">
                    <div class="testimonial-avatar">
                        ${testimonial.avatar}
                    </div>
                    <div class="testimonial-rating">
                        ${generateStarRating(testimonial.rating)}
                    </div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <h4 class="testimonial-name">${testimonial.name}</h4>
                    <p class="testimonial-location">${testimonial.location}</p>
                    <p class="testimonial-condition">${testimonial.condition}</p>
                </div>
            </div>
        `).join('');
        
        // Initialize Swiper
        const swiper = new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1280: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            },
            effect: 'slide',
            speed: 800,
            grabCursor: true,
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
        });
        
        // Handle window resize - refresh swiper
        window.addEventListener('resize', function() {
            swiper.update();
        });
    }
    
    // Helper function to generate star rating HTML
    function generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let starsHtml = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }
        
        return `<div class="stars">${starsHtml}</div>`;
    }
});

// Add CSS for testimonial cards dynamically if not present
if (!document.querySelector('#testimonial-card-styles')) {
    const testimonialStyles = document.createElement('style');
    testimonialStyles.id = 'testimonial-card-styles';
    testimonialStyles.textContent = `
        .testimonial-card {
            background: white;
            border-radius: 28px;
            padding: 2rem;
            box-shadow: var(--shadow-md);
            text-align: center;
            transition: var(--transition);
            height: 100%;
            display: flex;
            flex-direction: column;
            border: 1px solid var(--gray-200);
        }
        .testimonial-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
            border-color: var(--light-green);
        }
        .testimonial-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto 1rem;
            background: linear-gradient(135deg, var(--light-green), var(--primary-green));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: 700;
            color: white;
        }
        .testimonial-rating {
            margin-bottom: 1rem;
        }
        .testimonial-rating .stars {
            color: #fbbf24;
            font-size: 1rem;
        }
        .testimonial-text {
            font-size: 1rem;
            line-height: 1.6;
            font-style: italic;
            margin-bottom: 1.25rem;
            color: var(--text-dark);
            flex-grow: 1;
        }
        .testimonial-name {
            font-weight: 700;
            color: var(--primary-green);
            margin-bottom: 0.25rem;
        }
        .testimonial-location {
            font-size: 0.875rem;
            color: var(--text-light);
            margin-bottom: 0.5rem;
        }
        .testimonial-condition {
            font-size: 0.75rem;
            color: var(--deep-blue);
            background: rgba(11, 87, 183, 0.1);
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 50px;
        }
        .testimonials-swiper {
            padding: 20px 0 50px;
        }
        .swiper-button-next, .swiper-button-prev {
            color: var(--primary-green);
            background: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: var(--shadow-sm);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
            font-size: 1rem;
        }
        .swiper-pagination-bullet-active {
            background: var(--primary-green);
        }
        @media (max-width: 768px) {
            .swiper-button-next, .swiper-button-prev {
                display: none;
            }
        }
    `;
    document.head.appendChild(testimonialStyles);
}