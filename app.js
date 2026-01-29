/* ============================================
   PMs Shipping Code - Animations & Interactions
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavigation();
    initAnimations();
    initVideoModal();
    initCounters();
    initProgressBars();
});

/* =====================
   PARTICLE BACKGROUND
   ===================== */
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';

        // Vary particle sizes
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Vary colors between accent and highlight
        if (Math.random() > 0.7) {
            particle.style.background = '#f43f5e';
        }

        container.appendChild(particle);
    }
}

/* =====================
   NAVIGATION
   ===================== */
function initNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    const pages = document.querySelectorAll('.page');
    const ctaButtons = document.querySelectorAll('[data-goto]');

    // Tab click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPage = tab.dataset.page;
            navigateToPage(targetPage);
        });
    });

    // CTA button handlers
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPage = btn.dataset.goto;
            navigateToPage(targetPage);
        });
    });

    function navigateToPage(pageName) {
        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`[data-page="${pageName}"]`);
        if (activeTab) activeTab.classList.add('active');

        // Animate out current page
        const currentPage = document.querySelector('.page.active');
        if (currentPage) {
            currentPage.classList.add('exit');
            currentPage.classList.remove('active');
        }

        // Animate in new page
        setTimeout(() => {
            pages.forEach(p => {
                p.classList.remove('exit');
                p.style.display = 'none';
            });

            const newPage = document.getElementById(`page-${pageName}`);
            if (newPage) {
                newPage.style.display = 'block';
                // Trigger reflow
                void newPage.offsetWidth;
                newPage.classList.add('active');

                // Run page-specific animations
                animatePageContent(pageName);
            }
        }, 400);
    }
}

/* =====================
   PAGE ANIMATIONS
   ===================== */
function initAnimations() {
    // Animate home page on load
    setTimeout(() => {
        animatePageContent('home');
    }, 100);
}

function animatePageContent(pageName) {
    const page = document.getElementById(`page-${pageName}`);
    if (!page) return;

    switch (pageName) {
        case 'home':
            animateHomePage(page);
            break;
        case 'goals':
            animateGoalsPage(page);
            break;
        case 'demos':
            animateDemosPage(page);
            break;
        case 'learnings':
            animateLearningsPage(page);
            break;
        case 'conclusions':
            animateConclusionsPage(page);
            break;
    }
}

function animateHomePage(page) {
    const elements = page.querySelectorAll('.animate-in');

    gsap.fromTo(elements,
        {
            opacity: 0,
            y: 40
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        }
    );

    // Animate code window
    const codeWindow = page.querySelector('.code-window');
    if (codeWindow) {
        gsap.fromTo(codeWindow,
            {
                opacity: 0,
                x: 50,
                rotationY: -15
            },
            {
                opacity: 1,
                x: 0,
                rotationY: -5,
                duration: 1,
                delay: 0.5,
                ease: 'power3.out'
            }
        );
    }

    // Animate counters
    setTimeout(animateCounters, 600);
}

function animateGoalsPage(page) {
    const cards = page.querySelectorAll('.goal-card');

    gsap.fromTo(cards,
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            onComplete: () => {
                // Animate progress bars after cards are visible
                setTimeout(animateProgressBars, 200);
            }
        }
    );

    // Animate page header
    animatePageHeader(page);
}

function animateDemosPage(page) {
    const cards = page.querySelectorAll('.demo-card');

    gsap.fromTo(cards,
        {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
        }
    );

    animatePageHeader(page);
}

function animateLearningsPage(page) {
    const panels = page.querySelectorAll('.learning-panel');

    gsap.fromTo(panels,
        {
            opacity: 0,
            x: -50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: 'power3.out'
        }
    );

    animatePageHeader(page);
}

function animateConclusionsPage(page) {
    const cards = page.querySelectorAll('.conclusion-card');
    const nextSteps = page.querySelector('.next-steps');

    gsap.fromTo(cards,
        {
            opacity: 0,
            scale: 0.9
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.2,
            ease: 'power3.out'
        }
    );

    if (nextSteps) {
        gsap.fromTo(nextSteps,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.5,
                ease: 'power3.out'
            }
        );
    }

    animatePageHeader(page);
}

function animatePageHeader(page) {
    const header = page.querySelector('.page-header');
    if (header) {
        gsap.fromTo(header,
            {
                opacity: 0,
                y: -20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            }
        );
    }
}

/* =====================
   COUNTERS ANIMATION
   ===================== */
function initCounters() {
    // Counters will be animated when home page loads
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const duration = 1500;
        const startTime = Date.now();

        function updateCounter() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease out cubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            const current = Math.floor(easeProgress * target);
            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

/* =====================
   PROGRESS BARS
   ===================== */
function initProgressBars() {
    // Progress bars will be animated when goals page loads
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar[data-progress]');

    progressBars.forEach((bar, index) => {
        const progress = bar.dataset.progress;

        setTimeout(() => {
            bar.style.setProperty('--progress', progress + '%');
            // Using CSS to handle the animation
            const afterStyle = document.createElement('style');
            afterStyle.textContent = `.progress-bar[data-progress="${progress}"]::after { width: ${progress}% !important; }`;
            document.head.appendChild(afterStyle);
        }, index * 100);
    });
}

/* =====================
   VIDEO MODAL
   ===================== */
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('demoVideo');
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    // Video sources mapping (placeholder - will be replaced with actual videos)
    const videoSources = {
        'field-agent': 'videos/field-agent-demo.mp4',
        'governance': 'videos/governance-demo.mp4',
        'multiselect': 'videos/multiselect-demo.mp4',
        'cursor-rules': 'videos/cursor-rules-demo.mp4'
    };

    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            const videoKey = placeholder.dataset.video;
            const source = videoSources[videoKey];

            if (source) {
                video.src = source;
                openModal();
            }
        });
    });

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        video.pause();
        video.src = '';
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* =====================
   HOVER EFFECTS (Subtle)
   ===================== */
// Hover effects are now handled purely in CSS for better performance and subtlety

/* =====================
   SMOOTH SCROLL
   ===================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* =====================
   INTERSECTION OBSERVER
   ===================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.goal-card, .demo-card, .learning-panel, .conclusion-card').forEach(el => {
    observer.observe(el);
});

/* =====================
   KEYBOARD NAVIGATION
   ===================== */
document.addEventListener('keydown', (e) => {
    const pages = ['home', 'goals', 'demos', 'learnings', 'conclusions'];
    const activeTab = document.querySelector('.nav-tab.active');
    const currentIndex = pages.indexOf(activeTab?.dataset.page || 'home');

    if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        document.querySelector(`[data-page="${pages[currentIndex + 1]}"]`)?.click();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        document.querySelector(`[data-page="${pages[currentIndex - 1]}"]`)?.click();
    }
});

/* =====================
   EASTER EGG
   ===================== */
function initEasterEgg() {
    const modal = document.getElementById('easterEggModal');
    const logo = document.querySelector('.nav-logo');
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    // Click logo to open
    logo.addEventListener('click', () => {
        openEasterEgg();
    });

    // Close handlers
    closeBtn.addEventListener('click', closeEasterEgg);
    backdrop.addEventListener('click', closeEasterEgg);

    function openEasterEgg() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeEasterEgg() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close on escape (already handled globally, but adding specific handler)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeEasterEgg();
        }
    });
}

// Initialize Easter egg
initEasterEgg();

console.log('PMs Shipping Code - Website Loaded');
console.log('Hint: Click the logo for a surprise.');
