// Portfolio Website JavaScript

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            const burgerMenu = document.getElementById('burgerMenu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                burgerMenu.classList.remove('active');
            }
        }
    });
});

// Burger Menu Toggle
const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');

if (burgerMenu && navMenu) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!burgerMenu.contains(e.target) && !navMenu.contains(e.target)) {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);
window.addEventListener('load', highlightNavigation);

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.highlight-card, .timeline-item, .skill-category, .education-card, .contact-item, .article-card, .project-card'
    );

    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.25s ease ${index * 0.04}s, transform 0.25s ease ${index * 0.04}s`;
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
});

// Skill tags interactive behavior
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// Add parallax effect to hero section (disabled to prevent overlap)
const hero = document.querySelector('.hero');
if (hero) {
    // Parallax disabled to prevent section overlap
    // window.addEventListener('scroll', () => {
    //     const scrolled = window.pageYOffset;
    //     const parallaxSpeed = 0.5;
    //     hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    // });
}

// Timeline items hover effect
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const marker = this.querySelector('.timeline-marker');
        if (marker) {
            marker.style.transform = 'scale(1.3)';
            marker.style.transition = 'transform 0.3s ease';
        }
    });

    item.addEventListener('mouseleave', function() {
        const marker = this.querySelector('.timeline-marker');
        if (marker) {
            marker.style.transform = 'scale(1)';
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Typing effect for hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect on load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        // Uncomment the line below to enable typing effect
        // typeWriter(subtitle, originalText, 50);
    }
});

// Contact links tracking (optional - for analytics)
const contactLinks = document.querySelectorAll('.contact-item a');
contactLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const linkType = this.textContent.trim();
        console.log(`Contact link clicked: ${linkType}`);
        // Add your analytics tracking code here if needed
    });
});

// Highlight cards stagger animation
const highlightCards = document.querySelectorAll('.highlight-card');
highlightCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
    progressBar.style.width = '0%';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress indicator
createScrollProgress();

// Smooth reveal for section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    title.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    observer.observe(title);
});

// Add hover effect to hero buttons
const heroButtons = document.querySelectorAll('.hero-links a');
heroButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.05)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

console.log('Portfolio website loaded successfully!');
