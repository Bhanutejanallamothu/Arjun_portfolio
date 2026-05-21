import '../react/intro.tsx';
import '../react/hero-beams.tsx';
import '../react/about-photo.tsx';
import '../react/navbar.tsx';
import '../react/hero-shuffle.tsx';

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

    // Intersection Observer for Fade-in Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a skills section, trigger progress bars
                if (entry.target.classList.contains('skills-container')) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
});
