// ============================================
// IMPROVED WHATSAPP MESSAGE FORMATTING
// Professional, Attractive, Line by Line
// ============================================

class WhatsAppBooking {
    constructor(phoneNumber = '917305274514') {
        this.phoneNumber = phoneNumber;
    }

    generateAttractiveMessage(formData) {
        const name = formData.fullName || formData.name || 'Not provided';
        const phone = formData.phone || formData.phoneNumber || 'Not provided';
        const email = formData.email || formData.emailAddress || 'Not provided';
        const service = formData.service || formData.serviceRequired || 'General Consultation';
        const date = formData.date || formData.appointmentDate || 'Flexible';
        const location = formData.location || formData.preferredLocation || 'Chennai Centre';
        const additionalInfo = formData.additionalInfo || formData.message || 'None';

        // Format date nicely if it exists
        let formattedDate = date;
        if (date && date !== 'Flexible') {
            const dateObj = new Date(date);
            if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
        }

        const message = `🏥 *healtouch APPOINTMENT REQUEST*
━━━━━━━━━━━━━━━━━━━━━━━━━

📋 *PATIENT DETAILS*
━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
📞 *Phone:* ${phone}
✉️ *Email:* ${email}

🩺 *SERVICE DETAILS*
━━━━━━━━━━━━━━━━━━━━━━━━━
🔹 *Service:* ${service}
📅 *Preferred Date:* ${formattedDate}
📍 *Location:* ${location}

ℹ️ *ADDITIONAL INFORMATION*
━━━━━━━━━━━━━━━━━━━━━━━━━
💬 ${additionalInfo}

━━━━━━━━━━━━━━━━━━━━━━━━━
⏳ *Please confirm my appointment slot.*
🙏 *Thank you!*
━━━━━━━━━━━━━━━━━━━━━━━━━

📌 *Quick Reply Options:*
✅ Confirm | ⏰ Reschedule | ❌ Cancel
📞 Call: +91 9191919191
💬 WhatsApp: +91 9191919191`;

        return message;
    }

    sendBooking(formData) {
        const message = this.generateAttractiveMessage(formData);
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        this.showSuccessMessage();
        return true;
    }

    showSuccessMessage() {
        const notification = document.createElement('div');
        notification.className = 'whatsapp-success-notification';
        notification.innerHTML = `
            <div style="background: #25D366; color: white; padding: 15px 25px; border-radius: 50px; display: flex; align-items: center; gap: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.2);">
                <i class="fab fa-whatsapp" style="font-size: 24px;"></i>
                <div>
                    <strong>Redirecting to WhatsApp!</strong><br>
                    <span style="font-size: 12px;">Please send the pre-filled message to confirm your booking.</span>
                </div>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;

        // Add animation style if not exists
        if (!document.querySelector('#whatsapp-animation-style')) {
            const style = document.createElement('style');
            style.id = 'whatsapp-animation-style';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; visibility: hidden; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }
}

// Initialize
const whatsappBooking = new WhatsAppBooking('917305274514');