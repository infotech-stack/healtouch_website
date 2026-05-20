// ============================================
// GLOBAL JAVASCRIPT FOR HEALTOUCH
// Handles components, navigation, modals, and forms
// ============================================

function getBasePath() {
    const path = window.location.pathname;
    return path.includes('/services/') ? '../' : './';
}

async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        let content = await response.text();
        const basePath = getBasePath();

        // Fix asset and link paths
        content = content.replace(/src="assets\//g, `src="${basePath}assets/`);
        content = content.replace(/href="assets\//g, `href="${basePath}assets/`);
        content = content.replace(/url\(['"]?assets\//g, `url(${basePath}assets/`);
        const links = ['index', 'about', 'contact', 'appointment', 'privacy-policy', 'terms-conditions', 'services/physiotherapy', 'services/rehabilitation', 'services/wellness'];
        links.forEach(link => {
            content = content.replace(new RegExp(`href="${link}.html"`, 'g'), `href="${basePath}${link}.html"`);
        });

        const el = document.getElementById(elementId);
        if (el) el.innerHTML = content;
        return true;
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
        return false;
    }
}

// Global WhatsApp Form Handler
function initWhatsAppForm(formId, serviceName = '') {
    const form = document.getElementById(formId);
    if (!form) return;

    // If serviceName is passed, pre-fill it
    if (serviceName) {
        const serviceSelect = form.querySelector('#serviceSelect');
        if (serviceSelect) serviceSelect.value = serviceName;
    }

    const dateInput = form.querySelector('#date');
    const timeInput = form.querySelector('#time');
    
    if (dateInput && timeInput) {
        dateInput.addEventListener('change', () => {
            if (dateInput.value) {
                timeInput.disabled = false;
            } else {
                timeInput.disabled = true;
                timeInput.value = '';
            }
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = form.querySelector('#fullName')?.value || form.querySelector('#contactName')?.value || '';
        const phone = form.querySelector('#phone')?.value || '';
        const email = form.querySelector('#email')?.value || form.querySelector('#contactEmail')?.value || '';
        const service = form.querySelector('#serviceSelect')?.value || serviceName || 'General Inquiry';
        const date = form.querySelector('#date')?.value || 'Flexible';
        const time = form.querySelector('#time')?.value || '';
        const place = form.querySelector('#place')?.value || 'Not provided';
        const info = form.querySelector('#info')?.value || form.querySelector('#contactMessage')?.value || 'None';

        let msg = '';
        if (formId === 'homeAppointmentForm') {
            msg = `Hello healtouch, I want to schedule a visit.\n\n*Name:* ${fullName}\n*Phone:* ${phone}\n*Location:* ${place}\n*Service:* ${service}\n\nPlease contact me to confirm.`;
        } else {
            const dateTimeStr = (date !== 'Flexible' && time) ? `${date} at ${time}` : date;
            msg = `Hello healtouch, I want to book an appointment.\n\n*Name:* ${fullName}\n*Phone:* ${phone}\n*Email:* ${email}\n*Location:* ${place}\n*Service:* ${service}\n*Date:* ${dateTimeStr}\n*Additional Info:* ${info}\n\nPlease confirm my appointment slot.`;
        }

        window.open(`https://wa.me/919751633111?text=${encodeURIComponent(msg)}`, '_blank');
    });
}

// Universal Service Modal Logic
function openServiceModal(title, description, benefits, imageUrl, detailedContent = '') {
    let modalOverlay = document.getElementById('global-modal');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'global-modal';
        modalOverlay.className = 'modal-overlay';
        document.body.appendChild(modalOverlay);
    }

    const basePath = getBasePath();
    const modalHtml = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeServiceModal()"><i class="fas fa-times"></i></button>
            <div class="modal-image-wrapper" style="background:var(--soft-gray);">
                <img src="${basePath}${imageUrl}" alt="${title}" class="modal-image" onerror="this.src='${basePath}assets/images/logo/logo.png'; this.style.objectFit='contain'; this.style.padding='2rem';">
            </div>
            <div class="modal-body">
                <span class="section-tag">Service Details</span>
                <h3 style="font-size:2rem; margin-bottom:1rem; color:var(--deep-blue);">${title}</h3>
                <p style="color:var(--text-light); margin-bottom:1rem;">${description}</p>
                ${detailedContent ? `<p style="color:var(--text-light); margin-bottom:1.5rem; font-size:0.95rem; line-height:1.7;">${detailedContent}</p>` : ''}
                
                <h4 style="margin-bottom:0.5rem;">Benefits:</h4>
                <ul style="margin-bottom:2rem; color:var(--text-light); padding-left:1.2rem;">
                    ${benefits.map(b => `<li>${b}</li>`).join('')}
                </ul>
                
                <div class="glass-form" style="padding:1.5rem; background:var(--soft-gray); border:none;">
                    <h4 style="margin-bottom:1rem;">Book this service</h4>
                    <form id="modalAppointmentForm">
                        <div class="form-group"><input type="text" id="fullName" placeholder="Full Name" required></div>
                        <div class="form-group"><input type="tel" id="phone" placeholder="Phone Number" required></div>
                        <div class="form-group"><input type="email" id="email" placeholder="Email Address (Optional)"></div>
                        <div class="form-group">
                            <select id="place" required style="width:100%; padding:14px 18px; border:1px solid var(--gray-200); border-radius:16px; font-family:'Inter', sans-serif;">
                                <option value="" disabled selected>Select Your Location</option>
                                <option value="Pondicherry">Pondicherry</option>
                                <option value="Cuddalore">Cuddalore</option>
                                <option value="Tindivanam">Tindivanam</option>
                                <option value="Villupuram">Villupuram</option>
                            </select>
                        </div>
                        <div class="form-group" style="display:flex; gap:1rem;">
                            <input type="date" id="date" style="flex:1;">
                            <input type="text" id="time" disabled placeholder="Time (e.g. 10:30 AM)" onfocus="this.type='time'" onblur="if(!this.value) this.type='text'" style="flex:1;">
                        </div>
                        <div class="form-group">
                            <select id="serviceSelect" required style="width:100%; padding:14px 18px; border:1px solid var(--gray-200); border-radius:16px; font-family:'Inter', sans-serif;">
                                <option value="" disabled>Select a Service</option>
                                <optgroup label="Physiotherapy">
                                    <option value="Back Pain Treatment">Back Pain Treatment</option>
                                    <option value="Neck Pain Physiotherapy">Neck Pain Physiotherapy</option>
                                    <option value="Shoulder Pain Treatment">Shoulder Pain Treatment</option>
                                    <option value="Knee Pain Therapy">Knee Pain Therapy</option>
                                    <option value="Sciatica & Nerve Therapies">Sciatica & Nerve Therapies</option>
                                    <option value="Chronic Pain Management">Chronic Pain Management</option>
                                    <option value="Joint Stiffness & Arthritis Care">Joint Stiffness & Arthritis Care</option>
                                </optgroup>
                                <optgroup label="Rehabilitation">
                                    <option value="Post-Operative Rehabilitation">Post-Operative Rehabilitation</option>
                                    <option value="Sports Injury Recovery">Sports Injury Recovery</option>
                                    <option value="Neurological Rehabilitation">Neurological Rehabilitation</option>
                                    <option value="Cardiorespiratory Rehab">Cardiorespiratory Rehab</option>
                                    <option value="Geriatric & Mobility Training">Geriatric & Mobility Training</option>
                                    <option value="Pediatric Rehabilitation">Pediatric Rehabilitation</option>
                                    <option value="Women's Health & Diastasis Recti">Women's Health & Diastasis Recti</option>
                                </optgroup>
                                <optgroup label="Wellness">
                                    <option value="Ergonomic Posture Assessment">Ergonomic Posture Assessment</option>
                                    <option value="Medical & Sports Massage">Medical & Sports Massage</option>
                                    <option value="Clinical Pilates & Core Training">Clinical Pilates & Core Training</option>
                                    <option value="Preventive Strength & Flexibility">Preventive Strength & Flexibility</option>
                                    <option value="Balance & Fall Prevention">Balance & Fall Prevention</option>
                                    <option value="Lifestyle & Weight Management Advice">Lifestyle & Weight Management Advice</option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-group"><textarea id="info" rows="2" placeholder="Additional Information / Symptoms" style="width:100%; padding:14px 18px; border:1px solid var(--gray-200); border-radius:16px; font-family:'Inter', sans-serif; resize:vertical;"></textarea></div>
                        <button type="submit" class="btn-primary" style="width:100%; margin-top:0.5rem;"><i class="fab fa-whatsapp"></i> Request Appointment</button>
                        <p style="text-align:center; font-size:0.9rem; color:var(--text-light); margin-top:1rem;">Not on WhatsApp? Call <a href="tel:+91 9751633111" style="color:var(--deep-blue); font-weight:600; text-decoration:none;">+91 9751633111</a> or email <a href="mailto:healtouch5@gmail.com" style="color:var(--deep-blue); font-weight:600; text-decoration:none;">healtouch5@gmail.com</a>.</p>
                    </form>
                </div>
            </div>
        </div>
    `;

    modalOverlay.innerHTML = modalHtml;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Initialize form inside modal
    initWhatsAppForm('modalAppointmentForm', title);
}

function closeServiceModal() {
    const modalOverlay = document.getElementById('global-modal');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Bind clicks outside modal to close it
document.addEventListener('click', (e) => {
    if (e.target.id === 'global-modal') closeServiceModal();
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', async () => {
    const basePath = getBasePath();

    await loadComponent('header-container', `${basePath}includes/header.html`);
    await loadComponent('footer-container', `${basePath}includes/footer.html`);

    // ── Active link detection ──────────────────────────────────────
    setTimeout(() => {
        const path = window.location.pathname;

        // Determine current page key
        let currentPage = 'index';
        if (path.includes('about')) currentPage = 'about';
        else if (path.includes('contact')) currentPage = 'contact';
        else if (path.includes('appointment')) currentPage = 'appointment';
        else if (path.includes('physiotherapy')) currentPage = 'physiotherapy';
        else if (path.includes('rehabilitation')) currentPage = 'rehabilitation';
        else if (path.includes('wellness')) currentPage = 'wellness';
        else if (path.includes('blog')) currentPage = 'blog';
        else if (path.includes('faq')) currentPage = 'faq';
        else if (path.includes('testimonial')) currentPage = 'testimonials';

        // Apply active class to matching nav-links
        document.querySelectorAll('.nav-link[data-page]').forEach(link => {
            if (link.dataset.page === currentPage) {
                link.classList.add('active');
            }
        });

        // ── Mobile Menu (Hamburger) ──────────────────────────────────
        const mobileMenuBtn = document.getElementById('mobileMenu');
        const navMenu = document.getElementById('navMenu');
        const navBackdrop = document.getElementById('navBackdrop');

        function openNav() {
            navMenu.classList.add('active');
            mobileMenuBtn.classList.add('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            navBackdrop.classList.add('visible');
            requestAnimationFrame(() => navBackdrop.classList.add('active'));
        }

        function closeNav() {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            navBackdrop.classList.remove('active');
            setTimeout(() => navBackdrop.classList.remove('visible'), 300);
        }

        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.contains('active') ? closeNav() : openNav();
            });
        }

        // Close on backdrop click
        if (navBackdrop) {
            navBackdrop.addEventListener('click', closeNav);
        }

        // Close nav when any nav-link is clicked on mobile
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) closeNav();
            });
        });

    }, 150);

    // ── Sticky Header Scroll ──────────────────────────────────────
    const header = document.querySelector('.sticky-header');
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Initialize any page-level forms
    const forms = ['appointmentForm', 'homeAppointmentForm', 'mainAppointmentForm'];
    forms.forEach(formId => {
        initWhatsAppForm(formId);
    });
});