import '../react/intro.tsx';
import '../react/hero-beams.tsx';
import '../react/about-photo.tsx';
import '../react/navbar.tsx';
import '../react/hero-shuffle.tsx';
import '../react/hero-button.tsx';
import '../react/orbiting-skills.tsx';
import '../react/education-stepper.tsx';
import '../react/showreel-bounce.tsx';
import '../react/footer-share.tsx';

document.addEventListener('DOMContentLoaded', () => {

    // Parallax Effect for Hero
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
        }
    });

    // Intersection Observer for section reveal animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
});
