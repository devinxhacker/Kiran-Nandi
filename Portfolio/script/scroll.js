// Check if device is mobile/low-end
const isMobileDevice = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
const isLowEndDevice = navigator.deviceMemory && navigator.deviceMemory < 4;

// Optimize IntersectionObserver with better performance settings
const observerOptions = {
    root: null,
    rootMargin: isMobileDevice ? '50px' : '100px',
    threshold: isMobileDevice ? 0.1 : 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            entry.target.classList.remove("hidden");
            // Unobserve after animation to reduce overhead
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Defer observer setup to reduce initial load
window.addEventListener('DOMContentLoaded', () => {
    const hiddenelements = document.querySelectorAll(".hidden");
    hiddenelements.forEach((el) => observer.observe(el));
}, { once: true });
