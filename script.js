// DOM Elements
const splashScreen = document.getElementById('splash-screen');
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initSplashScreen();
    initNavigation();
    initScrollEffects();
    initRevealAnimations();
    initSmoothScrolling();
});

// Splash Screen
function initSplashScreen() {
    // Hide splash screen after animation
    setTimeout(() => {
        if (splashScreen) {
            splashScreen.style.display = 'none';
            document.body.style.overflow = 'visible';
        }
    }, 4500);
    
    // Initially hide body overflow
    document.body.style.overflow = 'hidden';
}

// Navigation
function initNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'visible';
    }
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = 'visible';
}

function handleHeaderScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for hero video
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                heroVideo.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            scrollIndicator.style.height = `${30 + scrollPercent}px`;
        });
    }
}

// Reveal Animations
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add staggered animation for grid items
                if (entry.target.closest('.artists-grid')) {
                    const gridItems = entry.target.closest('.artists-grid').children;
                    Array.from(gridItems).forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('revealed');
                        }, index * 150);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Smooth scroll for hero CTA
    const heroCTA = document.querySelector('.hero-cta a[href^="#"]');
    if (heroCTA) {
        heroCTA.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = heroCTA.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Smooth scroll for scroll indicator
    const scrollIndicatorContainer = document.querySelector('.hero-scroll');
    if (scrollIndicatorContainer) {
        scrollIndicatorContainer.addEventListener('click', () => {
            const artistsSection = document.querySelector('#artistas');
            if (artistsSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = artistsSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Artist Cards Animation
function initArtistCards() {
    const artistCards = document.querySelectorAll('.artist-card');
    
    artistCards.forEach(card => {
        // Animate underline on hover
        const underline = card.querySelector('.artist-underline');
        
        card.addEventListener('mouseenter', () => {
            if (underline) {
                underline.style.width = '100%';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (underline) {
                underline.style.width = '0';
            }
        });
    });
}

// Initialize artist cards when DOM is loaded
document.addEventListener('DOMContentLoaded', initArtistCards);

// Video Controls
function initVideoControls() {
    const heroVideo = document.querySelector('.hero-video video');
    
    if (heroVideo) {
        // Ensure video plays on mobile devices
        heroVideo.addEventListener('loadeddata', () => {
            heroVideo.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        });
        
        // Pause video when out of view to save resources
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(e => console.log('Video play failed:', e));
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.1 });
        
        videoObserver.observe(heroVideo);
    }
}

// Initialize video controls
document.addEventListener('DOMContentLoaded', initVideoControls);

// Button Animations
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to stylesheet
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize button animations
document.addEventListener('DOMContentLoaded', initButtonAnimations);

// Performance Optimizations
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(handleScroll);
    });
}

function handleScroll() {
    handleHeaderScroll();
    // Add other scroll handlers here
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Accessibility Improvements
function initAccessibility() {
    // Add keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--gold-primary)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
    
    // Announce page changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(announcer);
    
    // Announce section changes
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionTitle = entry.target.querySelector('h2')?.textContent || 
                                   entry.target.getAttribute('aria-label') || 
                                   `Section ${entry.target.id}`;
                announcer.textContent = `Now viewing: ${sectionTitle}`;
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);