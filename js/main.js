// AI Chatbot Solutions - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI Chatbot Solutions website loaded');
    
    // Initialize tracking and interactive components
    initializeTracking();
    initializeDemoBooking();
});

// Google Analytics Configuration
function initializeTracking() {
    // Google Analytics Integration - Replace with actual GA4 ID when available
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-XXXXXXXXXX', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true
        });
    }
    
    // Track initial page load
    trackPageView(getPageName());
}

// Conversion Tracking Functions
function trackDemo(industry = 'general') {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'demo_booked', {
            'event_category': 'engagement',
            'event_label': industry,
            'value': 1
        });
    }
    
    // Also track in console for testing
    console.log('Demo booking tracked:', industry);
}

function trackFormSubmit(formType) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'engagement',
            'event_label': formType,
            'value': 1
        });
    }
}

function trackPageView(pageName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'event_category': 'navigation',
            'event_label': pageName
        });
    }
}

// Demo Booking Functionality
function initializeDemoBooking() {
    // Add click tracking to all CTA buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('demo') || buttonText.includes('free trial')) {
                e.preventDefault();
                
                // Determine industry based on page or button context
                let industry = 'general';
                if (window.location.pathname.includes('healthcare')) {
                    industry = 'healthcare';
                } else if (buttonText.includes('healthcare')) {
                    industry = 'healthcare';
                }
                
                // Track the demo booking
                trackDemo(industry);
                
                // Use industry-specific Calendly link
                const calendlyUrl = getCalendlyUrl(industry);
                window.open(calendlyUrl, '_blank');
            }
        });
    });
}

// Lead Generation Tracking
function trackLead(source, industry = 'general') {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'lead_generated', {
            'event_category': 'conversion',
            'event_label': `${source}_${industry}`,
            'value': 1
        });
    }
}

// Pricing Plan Tracking
function trackPricingClick(plan) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'pricing_click', {
            'event_category': 'engagement',
            'event_label': plan,
            'value': 1
        });
    }
}

// BotPenguin Lead Capture Integration
window.BotPenguinReady = function() {
    // Track chatbot interactions
    if (typeof BotPenguin !== 'undefined') {
        BotPenguin.on('chat_started', function(data) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'chatbot_interaction', {
                    'event_category': 'engagement',
                    'event_label': 'chat_started'
                });
            }
            console.log('Chatbot interaction started:', data);
        });
        
        // Capture lead data from chatbot
        BotPenguin.on('lead_captured', function(data) {
            // Send to your CRM or database
            console.log('New lead from chatbot:', data);
            
            // Track lead in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'lead_generated', {
                    'event_category': 'conversion',
                    'event_label': 'chatbot_lead',
                    'value': 1
                });
            }
            
            // Optional: Send to backend/CRM
            sendLeadToCRM(data);
        });

        // Track when user provides contact info
        BotPenguin.on('contact_provided', function(data) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_info_provided', {
                    'event_category': 'engagement',
                    'event_label': 'chatbot',
                    'value': 1
                });
            }
        });
    }
};

// Dynamic Pricing Based on Industry
function updatePricing(industry) {
    const pricing = {
        healthcare: { starter: 497, pro: 997, enterprise: 1997 },
        legal: { starter: 397, pro: 797, enterprise: 1497 },
        retail: { starter: 297, pro: 497, enterprise: 997 },
        general: { starter: 297, pro: 497, enterprise: 997 }
    };
    
    // Update pricing display based on selected industry
    if (pricing[industry]) {
        const plans = ['starter', 'pro', 'enterprise'];
        document.querySelectorAll('.plan-price').forEach((el, index) => {
            if (plans[index] && pricing[industry][plans[index]]) {
                el.innerHTML = `$${pricing[industry][plans[index]]}<span>/month</span>`;
            }
        });
        
        // Track pricing view
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pricing_viewed', {
                'event_category': 'engagement',
                'event_label': industry,
                'value': 1
            });
        }
        
        // Update any ROI calculations
        updateROICalculations(industry);
    }
}

// ROI Calculations for Different Industries
function updateROICalculations(industry) {
    const roiData = {
        healthcare: {
            timesSaved: '10+ hours/week',
            costReduction: '73%',
            noShowReduction: '40%',
            avgROI: '675%'
        },
        legal: {
            timesSaved: '8+ hours/week',
            costReduction: '65%',
            clientResponseTime: '80% faster',
            avgROI: '545%'
        },
        retail: {
            timesSaved: '15+ hours/week',
            costReduction: '68%',
            salesIncrease: '25%',
            avgROI: '425%'
        },
        general: {
            timesSaved: '12+ hours/week',
            costReduction: '70%',
            customerSatisfaction: '+35%',
            avgROI: '500%'
        }
    };
    
    // Update ROI displays if they exist
    const roiElements = document.querySelectorAll('[data-roi-metric]');
    roiElements.forEach(element => {
        const metric = element.getAttribute('data-roi-metric');
        if (roiData[industry] && roiData[industry][metric]) {
            element.textContent = roiData[industry][metric];
        }
    });
}

// CRM Integration Function
async function sendLeadToCRM(leadData) {
    try {
        // Add metadata
        const enrichedData = {
            ...leadData,
            timestamp: new Date().toISOString(),
            source: 'chatbot',
            page_url: window.location.href,
            user_agent: navigator.userAgent,
            referrer: document.referrer
        };
        
        // Send to your CRM endpoint
        const response = await fetch('/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(enrichedData)
        });
        
        if (response.ok) {
            console.log('Lead successfully sent to CRM');
        } else {
            console.error('Failed to send lead to CRM');
        }
    } catch (error) {
        console.error('Error sending lead to CRM:', error);
    }
}

// Initialize industry-specific content on page load
document.addEventListener('DOMContentLoaded', function() {
    // Detect industry from URL or page content
    const urlPath = window.location.pathname;
    let detectedIndustry = 'general';
    
    if (urlPath.includes('healthcare')) {
        detectedIndustry = 'healthcare';
    } else if (urlPath.includes('legal')) {
        detectedIndustry = 'legal';
    } else if (urlPath.includes('retail')) {
        detectedIndustry = 'retail';
    }
    
    // Update pricing and content for detected industry
    updatePricing(detectedIndustry);
    
    // Add industry selector if it exists
    const industrySelector = document.getElementById('industry-selector');
    if (industrySelector) {
        industrySelector.addEventListener('change', function(e) {
            updatePricing(e.target.value);
        });
    }
});

// Utility Functions
function getPageName() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'home';
    return page.replace('.html', '');
}

// Error handling wrapper for tracking functions
function safeTrack(trackingFunction, ...args) {
    try {
        trackingFunction(...args);
    } catch (error) {
        console.warn('Tracking error:', error);
    }
}

// Enhanced form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Improved error handling for form submissions
function handleFormError(error, formElement) {
    console.error('Form submission error:', error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = 'Something went wrong. Please try again or contact us directly.';
    errorDiv.style.cssText = 'color: #ef4444; padding: 1rem; background: #fee; border-radius: 0.5rem; margin-top: 1rem;';
    
    formElement.appendChild(errorDiv);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Fix Calendly URL placeholder
function getCalendlyUrl(industry = 'general') {
    // Industry-specific Calendly links (replace with actual URLs)
    const calendlyUrls = {
        healthcare: 'https://calendly.com/aichatbotsolutions/healthcare-demo',
        legal: 'https://calendly.com/aichatbotsolutions/legal-demo',
        retail: 'https://calendly.com/aichatbotsolutions/retail-demo',
        general: 'https://calendly.com/aichatbotsolutions/demo-call'
    };
    
    return calendlyUrls[industry] || calendlyUrls.general;
}