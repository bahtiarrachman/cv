/* ============================================
   CV BAHTIAR ABDURRACHMAN - SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons
    lucide.createIcons();
    
    // Initialize Scroll Animations
    initScrollAnimations();
    
    // Initialize Print Functionality
    initPrintHandler();
});

/**
 * Initialize Intersection Observer for scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                
                // Optional: Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.job-duties li');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = "1";
                        child.style.transform = "translateX(0)";
                    }, index * 100);
                });
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        // Set initial state
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = `all 0.6s ease ${index * 0.15}s`;
        
        // Observe element
        observer.observe(item);
    });

    // Observe sidebar sections
    const sidebarSections = document.querySelectorAll('.sidebar-section');
    sidebarSections.forEach((section, index) => {
        section.style.opacity = "0";
        section.style.transform = "translateX(-20px)";
        section.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(section);
    });

    // Observe achievements section
    const achievementsSection = document.querySelector('.achievements-section');
    if (achievementsSection) {
        achievementsSection.style.opacity = "0";
        achievementsSection.style.transform = "translateY(30px)";
        achievementsSection.style.transition = "all 0.8s ease";
        observer.observe(achievementsSection);
    }
}

/**
 * Initialize print button handler with pre-print checks
 */
function initPrintHandler() {
    const printBtn = document.querySelector('.btn-print');
    
    if (printBtn) {
        printBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Optional: Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Mempersiapkan...';
            lucide.createIcons();
            
            // Small delay to allow UI update
            setTimeout(() => {
                window.print();
                
                // Reset button after print dialog closes
                setTimeout(() => {
                    this.innerHTML = originalText;
                    lucide.createIcons();
                }, 500);
            }, 300);
        });
    }
}

/**
 * Utility: Check if element is in viewport
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Utility: Debounce function for performance
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
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

// Optional: Add keyboard shortcut for print (Ctrl+P / Cmd+P)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        // Let default print handler work, but could add custom logic here
        console.log('Print shortcut detected');
    }
});

// Optional: Detect print event completion
if (window.matchMedia) {
    const mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function(mql) {
        if (!mql.matches) {
            // Print dialog closed
            console.log('Print dialog closed');
        }
    });
}
