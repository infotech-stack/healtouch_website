// ============================================
// SERVICE POPUP MODAL SYSTEM
// ============================================

class ServiceModal {
    constructor() {
        this.createModalStructure();
        this.bindEvents();
        this.allServices = [];
        this.loadAllServices();
    }

    loadAllServices() {
        // Combine all services from global data
        if (typeof physiotherapyServices !== 'undefined') {
            this.allServices.push(...physiotherapyServices);
        }
        if (typeof rehabilitationServices !== 'undefined') {
            this.allServices.push(...rehabilitationServices);
        }
        if (typeof wellnessServices !== 'undefined') {
            this.allServices.push(...wellnessServices);
        }
    }

    createModalStructure() {
        // Create modal if it doesn't exist
        if (document.getElementById('serviceModal')) return;
        
        const modalHTML = `
            <div class="service-modal-overlay" id="serviceModal">
                <div class="service-modal-container">
                    <button class="modal-close" id="closeModalBtn">&times;</button>
                    <div class="modal-content" id="modalContent"></div>
                    <div class="modal-booking-section">
                        <h4><i class="fas fa-calendar-check"></i> Book This Service</h4>
                        <form id="modal-appointment-form" class="whatsapp-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <input type="text" id="modalFullName" placeholder="Full Name" required>
                                </div>
                                <div class="form-group">
                                    <input type="tel" id="modalPhone" placeholder="Phone Number" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <input type="email" id="modalEmail" placeholder="Email Address" required>
                                </div>
                                <div class="form-group">
                                    <input type="date" id="modalDate">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <select id="modalLocation">
                                        <option value="Chennai Centre">Chennai Centre</option>
                                        <option value="Home Visit">Home Visit</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <textarea id="modalInfo" placeholder="Additional information about your condition (symptoms, duration, etc.)" rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn-primary" style="width: 100%;">
                                <i class="fab fa-whatsapp"></i> Book via WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add modal styles if not present
        this.addModalStyles();
    }

    addModalStyles() {
        if (document.getElementById('modal-styles')) return;
        
        const modalStyle = document.createElement('style');
        modalStyle.id = 'modal-styles';
        modalStyle.textContent = `
            .service-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(8px);
                z-index: 2000;
                display: none;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .service-modal-overlay.active {
                display: flex;
                opacity: 1;
            }
            .service-modal-container {
                background: white;
                max-width: 900px;
                width: 90%;
                max-height: 85vh;
                overflow-y: auto;
                border-radius: 32px;
                position: relative;
                transform: scale(0.95);
                transition: transform 0.3s ease;
            }
            .service-modal-overlay.active .service-modal-container {
                transform: scale(1);
            }
            .modal-close {
                position: sticky;
                top: 16px;
                right: 16px;
                float: right;
                background: var(--gray-100);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                transition: var(--transition);
                z-index: 10;
            }
            .modal-close:hover {
                background: var(--primary-green);
                color: white;
                transform: rotate(90deg);
            }
            .modal-content {
                padding: 32px 32px 0 32px;
                clear: both;
            }
            .modal-content h3 {
                color: var(--primary-green);
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
            }
            .modal-content h4 {
                color: var(--deep-blue);
                margin-top: 1rem;
                margin-bottom: 0.5rem;
            }
            .modal-content ul, .modal-content ol {
                margin: 0.75rem 0 0.75rem 1.5rem;
            }
            .modal-content li {
                margin-bottom: 0.25rem;
            }
            .modal-booking-section {
                padding: 24px 32px 32px;
                background: var(--soft-gray);
                border-top: 1px solid var(--gray-200);
                border-radius: 0 0 32px 32px;
                margin-top: 24px;
            }
            .modal-booking-section h4 {
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .modal-booking-section .form-group {
                margin-bottom: 1rem;
            }
            .modal-booking-section input,
            .modal-booking-section select,
            .modal-booking-section textarea {
                width: 100%;
                padding: 12px 16px;
                border: 1px solid var(--gray-200);
                border-radius: 16px;
                font-family: inherit;
                transition: var(--transition);
            }
            .modal-booking-section input:focus,
            .modal-booking-section select:focus,
            .modal-booking-section textarea:focus {
                outline: none;
                border-color: var(--primary-green);
                box-shadow: 0 0 0 3px rgba(11, 138, 47, 0.1);
            }
            @media (max-width: 768px) {
                .modal-content {
                    padding: 20px;
                }
                .modal-booking-section {
                    padding: 20px;
                }
            }
        `;
        document.head.appendChild(modalStyle);
    }

    showModal(service) {
        const modal = document.getElementById('serviceModal');
        const content = document.getElementById('modalContent');
        
        if (!service) return;
        
        // Use detailed content or generate from available data
        let detailedHtml = service.detailedContent || `
            <h2>${service.name}</h2>
            <img src="https://placehold.co/600x300/${'0B8A2F'}/white?text=${encodeURIComponent(service.name)}" 
                 style="width:100%; border-radius:24px; margin: 1rem 0;" 
                 onerror="this.style.display='none'">
            <p><strong>${service.shortDesc || 'Comprehensive treatment for your condition.'}</strong></p>
            <h3>About This Treatment</h3>
            <p>At healtouch, we provide specialized ${service.name} using evidence-based techniques. Our expert therapists work closely with you to develop a personalized treatment plan tailored to your specific needs and goals.</p>
            <h4>Key Benefits</h4>
            <p>${service.benefits || 'Pain relief, improved mobility, faster recovery, long-term prevention'}</p>
            <h4>Symptoms We Address</h4>
            <p>${service.symptoms || 'Pain, stiffness, reduced range of motion, inflammation'}</p>
            <h4>Recovery Timeline</h4>
            <p>${service.recovery || 'Varies by individual condition. Most patients see improvement within 4-6 weeks of consistent treatment.'}</p>
            <h4>Session Duration</h4>
            <p>${service.duration || '45-60 minutes per session'}</p>
        `;
        
        content.innerHTML = `
            <div class="modal-header">
                <h2 style="color: var(--primary-green);">${service.name}</h2>
            </div>
            <div class="modal-body">
                ${detailedHtml}
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update form with service name
        const form = document.getElementById('modal-appointment-form');
        if (form) {
            // Remove any existing service field
            const existingServiceField = document.getElementById('modalServiceName');
            if (existingServiceField) existingServiceField.remove();
            
            // Add hidden field with service name
            const serviceInput = document.createElement('input');
            serviceInput.type = 'hidden';
            serviceInput.id = 'modalServiceName';
            serviceInput.value = service.name;
            form.appendChild(serviceInput);
        }
    }

    hideModal() {
        const modal = document.getElementById('serviceModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    bindEvents() {
        // Close modal button
        const closeBtn = document.getElementById('closeModalBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideModal());
        }
        
        // Click outside to close
        const modal = document.getElementById('serviceModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal();
                }
            });
        }
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                this.hideModal();
            }
        });
    }

    attachToServiceCards() {
        // Find all service cards and attach click handlers
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on a link inside card
                if (e.target.closest('a')) return;
                
                const serviceName = card.querySelector('h3')?.textContent;
                if (serviceName) {
                    const service = this.allServices.find(s => s.name === serviceName);
                    if (service) {
                        this.showModal(service);
                    } else {
                        // Fallback modal with just the name
                        this.showModal({
                            name: serviceName,
                            shortDesc: card.querySelector('p')?.textContent || 'Professional care for your condition.',
                            benefits: 'Pain relief, improved mobility, personalized care',
                            symptoms: 'Pain, stiffness, discomfort',
                            recovery: '4-8 weeks with consistent treatment',
                            duration: '45-60 minutes'
                        });
                    }
                }
            });
        });
    }
}

// Initialize modal system
let serviceModal;
document.addEventListener('DOMContentLoaded', () => {
    serviceModal = new ServiceModal();
    
    // Wait for services to load then attach
    setTimeout(() => {
        serviceModal.attachToServiceCards();
    }, 500);
});