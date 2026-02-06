/* ============================================
   PMs Shipping Code - Animations & Interactions
   ============================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavigation();
    initAnimations();
    initVideoModal();
    initLearningModal();
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
        case 'playbook':
            animatePlaybookPage(page);
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

function animatePlaybookPage(page) {
    // Animate principle box
    const principle = page.querySelector('.playbook-principle');
    if (principle) {
        gsap.fromTo(principle,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out'
            }
        );
    }

    // Animate decision cards
    const decisionCards = page.querySelectorAll('.decision-card');
    gsap.fromTo(decisionCards,
        {
            opacity: 0,
            y: 40
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.2,
            ease: 'power3.out'
        }
    );

    // Animate track cards
    const trackCards = page.querySelectorAll('.track-card');
    gsap.fromTo(trackCards,
        {
            opacity: 0,
            x: -30
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.4,
            ease: 'power3.out'
        }
    );

    // Animate Claude features
    const claudeFeatures = page.querySelectorAll('.claude-feature');
    gsap.fromTo(claudeFeatures,
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.4,
            ease: 'power3.out'
        }
    );

    // Animate prompting section
    const promptExamples = page.querySelectorAll('.prompt-example');
    gsap.fromTo(promptExamples,
        {
            opacity: 0,
            x: -20
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.5,
            ease: 'power3.out'
        }
    );

    // Animate pitfalls
    const pitfalls = page.querySelectorAll('.pitfall-item');
    gsap.fromTo(pitfalls,
        {
            opacity: 0,
            scale: 0.95
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.6,
            ease: 'power3.out'
        }
    );

    // Animate design checkpoint cards
    const designCheckpointCards = page.querySelectorAll('.design-checkpoint-card');
    gsap.fromTo(designCheckpointCards,
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            delay: 0.5,
            ease: 'power3.out'
        }
    );

    // Animate design checkpoint note
    const checkpointNote = page.querySelector('.design-checkpoint-note');
    if (checkpointNote) {
        gsap.fromTo(checkpointNote,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.7,
                ease: 'power3.out'
            }
        );
    }

    // Animate handoff table
    const handoffTable = page.querySelector('.handoff-table');
    if (handoffTable) {
        gsap.fromTo(handoffTable,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.6,
                ease: 'power3.out'
            }
        );
    }

    // Animate checklist cards
    const checklistCards = page.querySelectorAll('.checklist-card');
    gsap.fromTo(checklistCards,
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.7,
            ease: 'power3.out'
        }
    );

    // Animate meta section
    const metaSection = page.querySelector('.playbook-meta');
    if (metaSection) {
        gsap.fromTo(metaSection,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 0.8,
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
   DEMO DETAIL MODAL
   ===================== */
function initVideoModal() {
    const modal = document.getElementById('demoDetailModal');
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    const detailVideo = document.getElementById('detailVideo');
    const detailCarousel = document.getElementById('detailCarousel');
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    let currentSlide = 0;
    let totalSlides = 0;

    // Demo data with videos and screenshots
    const demoData = {
        'omni-error': {
            type: 'video',
            video: 'videos/omni-error-analysis.mp4',
            title: 'Automations Omni Error Analysis',
            status: 'working',
            statusText: 'Working Prototype',
            description: 'Gives Omni context into failed automation runs—trigger, actions, inputs/outputs, and error messages. Provides insights into why automations fail and recommendations for how to fix them.',
            meta: [{ icon: 'clipboard', text: 'PR ready' }],
            author: 'David Lange'
        },
        'consumer-app': {
            type: 'video',
            video: 'videos/consumer-app-demo.mov',
            title: 'Airtable Consumer App (B2B2C)',
            status: 'working',
            statusText: 'Concept Prototype',
            description: 'Exploring what Airtable could look like for building single-tenant end user apps. Familiar collaborative base + Omni interface building, with end user analytics and revenue tracking.',
            meta: [{ icon: 'layers', text: 'Full prototype' }],
            author: 'Chase Thompson'
        },
        'automation-sections': {
            type: 'video',
            video: 'videos/automation-sections.mp4',
            title: 'Create Automation to Section',
            status: 'working',
            statusText: 'PR Ready',
            description: 'New automations now show a sub-menu to choose which section to add to. Also adds "Create automation" option directly in section menus. No more dragging to organize.',
            meta: [{ icon: 'clipboard', text: 'PR ready' }],
            author: 'David Lange'
        },
        'field-agent': {
            type: 'screenshots',
            screenshots: [
                'images/field-agent.png',
                'images/field-agent-2.png',
                'images/field-agent-3.png',
                'images/field-agent-4.png',
                'images/field-agent-5.png'
            ],
            title: 'Field Agent Admin Panel Control',
            status: 'working',
            statusText: 'Working Prototype',
            description: 'Enterprise governance toggle for Field Agents. Sony needs this to enable AI—originally estimated at 2-3 weeks of engineering. Full stack: feature flag, schema, DB migration, CRUD handler, permission checks, admin UI.',
            meta: [
                { icon: 'clock', text: '~2 hours' },
                { icon: 'dollar', text: '$17 API cost' },
                { icon: 'code', text: '1,416 lines' }
            ],
            author: 'Chase Thompson'
        },
        'bulk-invites': {
            type: 'screenshots',
            screenshots: ['images/bulk-invites.png'],
            title: 'Admin Bulk Manage Pending Invites',
            status: 'in-progress',
            statusText: 'In Progress',
            description: 'Customer request from Roche. Bulk selection, resend, cancel, and filters for pending invites in Enterprise Admin Panel. Backend handlers, filter components, confirmation modals.',
            meta: [
                { icon: 'clock', text: '~3 hours' },
                { icon: 'dollar', text: '$22 API cost' },
                { icon: 'code', text: '1,436 lines' }
            ],
            author: 'Chase Thompson'
        },
        'multiselect': {
            type: 'video',
            video: 'videos/multiselect-demo.mp4',
            title: 'Multi-Select Dropdown Fix',
            status: 'shipped',
            statusText: 'Shipped to Production',
            description: 'A case study in complexity. What looked like 2 hours became 6 hours across 13 commits resolving 9 cascading bugs.',
            meta: [
                { icon: 'clock', text: '6 hours' },
                { icon: 'commits', text: '13 commits' }
            ],
            author: 'AP'
        },
        'search-autocomplete': {
            type: 'screenshots',
            screenshots: [
                'images/search-autocomplete.png',
                'images/search-autocomplete-2.png'
            ],
            title: 'Search Autocomplete App Names',
            status: 'working',
            statusText: 'Working Prototype',
            description: 'Added app name to search autocomplete on homescreen when returning just the interface. Solves confusion about why results match on base name.',
            meta: [{ icon: 'search', text: 'UX improvement' }],
            author: 'Jocelyn Lin'
        }
    };

    // Handle demo card clicks
    const demoCards = document.querySelectorAll('.demo-card');
    demoCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Find the video key from video-preview or demo-screenshot
            const preview = card.querySelector('.video-preview, .demo-screenshot');
            if (!preview) return;

            const videoKey = preview.dataset.video || findDemoKey(card);
            if (videoKey && demoData[videoKey]) {
                openDemoDetail(videoKey);
            }
        });
    });

    function findDemoKey(card) {
        const img = card.querySelector('.demo-screenshot img');
        if (img) {
            const src = img.src;
            if (src.includes('field-agent')) return 'field-agent';
            if (src.includes('bulk-invites')) return 'bulk-invites';
            if (src.includes('search-autocomplete')) return 'search-autocomplete';
        }
        return null;
    }

    // Handle video previews (hover to play)
    const videoPreviews = document.querySelectorAll('.video-preview');
    videoPreviews.forEach(preview => {
        const video = preview.querySelector('video');
        if (!video) return;

        preview.addEventListener('mouseenter', () => {
            video.currentTime = 0;
            video.play().catch(() => {});
        });

        preview.addEventListener('mouseleave', () => {
            video.pause();
        });
    });

    function openDemoDetail(key) {
        const data = demoData[key];
        if (!data) return;

        // Set title
        document.getElementById('detailTitle').textContent = data.title;

        // Set status
        const statusEl = document.getElementById('detailStatus');
        statusEl.textContent = data.statusText;
        statusEl.className = 'demo-detail-status ' + data.status;

        // Set description
        document.getElementById('detailDescription').textContent = data.description;

        // Set author
        const metaEl = document.getElementById('detailMeta');
        metaEl.innerHTML = `<span class="demo-detail-author">${data.author}</span>`;

        // Show video or carousel
        if (data.type === 'video') {
            detailVideo.style.display = 'block';
            detailCarousel.style.display = 'none';
            detailVideo.src = data.video;
        } else {
            detailVideo.style.display = 'none';
            detailCarousel.style.display = 'block';
            setupCarousel(data.screenshots);
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (data.type === 'video') {
            detailVideo.play().catch(() => {});
        }
    }

    function setupCarousel(screenshots) {
        currentSlide = 0;
        totalSlides = screenshots.length;

        // Create slides
        carouselTrack.innerHTML = screenshots.map(src => `
            <div class="carousel-slide">
                <img src="${src}" alt="Screenshot">
            </div>
        `).join('');

        // Create dots
        carouselDots.innerHTML = screenshots.map((_, i) => `
            <span class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
        `).join('');

        // Add dot click handlers
        carouselDots.querySelectorAll('.carousel-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
            });
        });

        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        if (currentSlide >= totalSlides) currentSlide = 0;
        updateCarousel();
    }

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        carouselDots.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentSlide + 1);
    });

    function getIconPath(icon) {
        const icons = {
            'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
            'dollar': '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
            'code': '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
            'clipboard': '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>',
            'layers': '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
            'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
            'commits': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>'
        };
        return icons[icon] || icons['clock'];
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        detailVideo.pause();
        detailVideo.src = '';
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Track current demo index for navigation
    let currentDemoIndex = 0;
    const demoKeys = Object.keys(demoData);

    function navigateDemo(direction) {
        let newIndex = currentDemoIndex + direction;
        if (newIndex < 0) newIndex = demoKeys.length - 1;
        if (newIndex >= demoKeys.length) newIndex = 0;
        currentDemoIndex = newIndex;
        openDemoDetail(demoKeys[currentDemoIndex]);
    }

    // Update openDemoDetail to track index
    const originalOpenDemoDetail = openDemoDetail;
    openDemoDetail = function(key) {
        currentDemoIndex = demoKeys.indexOf(key);
        originalOpenDemoDetail(key);
    };

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            // Always navigate between demos
            navigateDemo(-1);
        } else if (e.key === 'ArrowRight') {
            // Always navigate between demos
            navigateDemo(1);
        } else if (e.key === 'ArrowUp' && detailCarousel.style.display !== 'none' && totalSlides > 1) {
            // Use up/down for carousel slides
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowDown' && detailCarousel.style.display !== 'none' && totalSlides > 1) {
            goToSlide(currentSlide + 1);
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
   LEARNING DETAIL MODAL
   ===================== */
function initLearningModal() {
    const modal = document.getElementById('learningDetailModal');
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    let currentLearningIndex = 0;

    // Learning data — must match the 6 learning panels in index.html
    const learningData = [
        {
            number: '01',
            title: 'Hyperbase Isn\'t AI-Ready Yet',
            featured: true,
            content: `
                <p>The biggest friction isn't PM skill—it's our codebase. <strong>"It feels like there is no ceiling—but we can't bring this into Hyperbase because of these gaps."</strong></p>
                <div class="learning-gaps">
                    <div class="gap-item">
                        <span class="gap-number">1</span>
                        <div class="gap-content">
                            <strong>CLAUDE.md hasn't been updated in months.</strong> Team members don't feel empowered to add learnings or "do not do X" statements.
                        </div>
                    </div>
                    <div class="gap-item">
                        <span class="gap-number">2</span>
                        <div class="gap-content">
                            <strong>Skills usage is very limited.</strong> No clear path for incorporating learnings into the shared codebase environment.
                        </div>
                    </div>
                    <div class="gap-item">
                        <span class="gap-number">3</span>
                        <div class="gap-content">
                            <strong>No documentation ownership.</strong> Code is diffuse across 50+ locations with no coherent team ownership.
                        </div>
                    </div>
                    <div class="gap-item">
                        <span class="gap-number">4</span>
                        <div class="gap-content">
                            <strong>Overloaded terms.</strong> Words like "future" and "permission" mean different things, causing AI to go down wrong paths.
                        </div>
                    </div>
                    <div class="gap-item">
                        <span class="gap-number">5</span>
                        <div class="gap-content">
                            <strong>Code is scattered across 50+ locations.</strong> Absent or unclear code ownership creates diffusion problems, making domain-specific Claude MD files impractical.
                        </div>
                    </div>
                </div>
                <div class="learning-strategy">
                    <span class="strategy-label">Proposed Strategy: Team-Owned Claude MD</span>
                    <ul>
                        <li><strong>Focus on "do not do X" statements</strong> — negative instructions are more effective than proactive ones</li>
                        <li><strong>Break into team-owned indexes</strong> — roughly one per complex area/pod, append-only for scalability</li>
                        <li><strong>Claude can traverse an index</strong> without overloading context until it's in the right "space"</li>
                        <li><strong>Use on-call structure</strong> for recurring input to skill/agent/claude files</li>
                    </ul>
                </div>
                <p>These gaps affect everyone—not just PMs. Fixing them would unlock AI productivity across the entire engineering org.</p>
                <p class="learning-insight"><strong>Bright spot:</strong> The UX content team created a helpful content and copy skill. This is the model to follow.</p>
            `
        },
        {
            number: '02',
            title: 'Airgapped Prototyping is the Untapped Opportunity',
            featured: true,
            content: `
                <p>The highest-value application of PM coding might not be production code at all. <strong>It's rapid prototyping for user validation.</strong></p>
                <div class="learning-approach">
                    <span class="approach-label">The Approach (from Joseph Soltzberg)</span>
                    <ul>
                        <li>Create a <strong>separate repo</strong> completely airgapped from production</li>
                        <li>Include styling libraries that <strong>mimic the real product</strong></li>
                        <li>Build functional prototypes and distribute for <strong>unmoderated testing at scale</strong> (50-200 users)</li>
                        <li>Use AI to analyze results and generate learnings</li>
                    </ul>
                </div>
                <p>This approach lets teams <strong>"climb the truth curve"</strong> much more efficiently—validating ideas before committing significant engineering resources.</p>
                <p class="learning-insight"><strong>This was underexplored in the spike.</strong> Most effort went into production code. The prototyping path may have higher ROI.</p>
            `
        },
        {
            number: '03',
            title: 'Code Quality Requires Active Supervision',
            featured: false,
            content: `
                <p>Claude makes suboptimal choices for production-quality code. <strong>You can't just accept the output—you need to actively supervise.</strong></p>
                <div class="learning-issues">
                    <div class="issue-item">
                        <span class="issue-icon">⚠️</span>
                        <span>Struggles with string handling and makes arbitrary code structure decisions</span>
                    </div>
                    <div class="issue-item">
                        <span class="issue-icon">⚠️</span>
                        <span>Complex areas (multiple feature flags + admin features) cause confusion</span>
                    </div>
                    <div class="issue-item">
                        <span class="issue-icon">⚠️</span>
                        <span>DB migrations and edge cases are "scary territory" requiring design help</span>
                    </div>
                    <div class="issue-item">
                        <span class="issue-icon">⚠️</span>
                        <span>Sometimes digs into features that aren't relevant to the task</span>
                    </div>
                    <div class="issue-item">
                        <span class="issue-icon">⚠️</span>
                        <span>Tests and CI are a slog — Playwright testing proved difficult, PRs failing in CI with unclear Buildkite debugging</span>
                    </div>
                </div>
                <p class="learning-insight"><strong>The implication:</strong> PM coding isn't "hands off." It requires reading and understanding every line before shipping.</p>
            `
        },
        {
            number: '04',
            title: 'Design Review is Non-Negotiable',
            featured: false,
            content: `
                <p>Any user-facing UI needs design review before shipping. <strong>This was a blind spot in early thinking about PM coding.</strong></p>
                <div class="learning-quote">
                    <span class="quote-mark">"</span>
                    <p>PMs shipping code must maintain Airtable's design quality and consistency. This requires structured design collaboration throughout the development process.</p>
                    <span class="quote-attribution">— Kristen Freitas, Design POV</span>
                </div>
                <div class="design-findings">
                    <span class="findings-label">Key Design Findings</span>
                    <div class="design-finding-item">
                        <strong>Late design review is expensive.</strong> At the PR stage, designers must do mini-explorations to understand context, sometimes reverse-engineering the PR to understand the problem through the solution.
                    </div>
                    <div class="design-finding-item">
                        <strong>Simple changes aren't always simple.</strong> Small changes can have ripple effects impacting multiple surfaces and creating inconsistencies with existing patterns.
                    </div>
                    <div class="design-finding-item">
                        <strong>Two categories of feedback:</strong> Design polish (padding, margins, Aero component usage, color, alignment) and UX pattern issues (inconsistencies requiring auditing, exploration, and potentially different approaches).
                    </div>
                </div>
                <div class="design-checkpoints">
                    <span class="checkpoints-label">Proposed Design Checkpoints</span>
                    <div class="checkpoint-flow">
                        <div class="checkpoint-item">
                            <span class="checkpoint-number">1</span>
                            <div class="checkpoint-content">
                                <strong>Planning</strong>
                                <p>Design adds to lightweight PRD before coding. UX pattern guidance, Aero components, a11y/l10n, error states. Quick mocks to feed vibe-code.</p>
                            </div>
                        </div>
                        <div class="checkpoint-arrow">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M5 12h14M14 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                        </div>
                        <div class="checkpoint-item">
                            <span class="checkpoint-number">2</span>
                            <div class="checkpoint-content">
                                <strong>Prototype</strong>
                                <p>Feedback on working 1st draft. Aero usage, UI consistency, UX flow, adjacent surface impact. Weekly crit for awareness.</p>
                            </div>
                        </div>
                        <div class="checkpoint-arrow">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M5 12h14M14 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                        </div>
                        <div class="checkpoint-item">
                            <span class="checkpoint-number">3</span>
                            <div class="checkpoint-content">
                                <strong>Crit</strong>
                                <p>Design signoff before dogfood. Async for minor changes, weekly crit for larger features, domain expert when possible.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="learning-contacts">
                    <span class="contacts-label">Design Resources</span>
                    <div class="contact-item">
                        <strong>Kristen Freitas</strong> — Main point of contact for design review
                    </div>
                    <div class="contact-item">
                        <strong>Trijeet Mukhopadhyay</strong> — Prototyping expertise, extensive UI prototyping experience
                    </div>
                    <div class="contact-item">
                        <strong>Chloe's workshop</strong> — Working with design, Storybook, and QA-ing UI
                    </div>
                </div>
                <p class="learning-insight"><strong>Recommendation:</strong> Create skill docs for design (content team's tone/voice skill is the model), invest in getting more Aero components into code.</p>
            `
        },
        {
            number: '05',
            title: 'Our Review Process Needs to Adapt',
            featured: false,
            content: `
                <p>PMs can write code faster than engineers can review it. <strong>Our current PR process assumes authors can iterate independently on feedback.</strong></p>
                <div class="bottleneck-visual">
                    <div class="flow-item">
                        <span class="flow-icon fast">PM</span>
                        <span class="flow-label">Writes Code</span>
                        <span class="flow-speed">Fast</span>
                    </div>
                    <div class="flow-arrow">
                        <svg width="40" height="24" viewBox="0 0 40 24">
                            <path d="M0 12h35M30 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"/>
                        </svg>
                    </div>
                    <div class="flow-item bottleneck">
                        <span class="flow-icon slow">ENG</span>
                        <span class="flow-label">Reviews</span>
                        <span class="flow-speed">Blocked</span>
                    </div>
                </div>
                <p>Options to explore: Bugbot for automated pre-review, dedicated review slots for PM code, or pairing during the review itself to accelerate iteration.</p>
                <p class="learning-insight">The 80% solution shipped in hours beats the 100% solution waiting months in backlog. Process should enable this.</p>
            `
        },
        {
            number: '06',
            title: 'Cross-Functional Applications Exist',
            featured: false,
            content: `
                <p>PM coding isn't the only use case. <strong>Other teams are finding value in AI-assisted codebase work.</strong></p>
                <div class="learning-applications">
                    <div class="application-item">
                        <span class="app-icon">🎧</span>
                        <div class="app-content">
                            <strong>Support Team</strong>
                            <p>Using AI to answer "is this expected behavior?" escalations. Getting codebase access via Cursor to investigate issues directly.</p>
                        </div>
                    </div>
                    <div class="application-item">
                        <span class="app-icon">🔌</span>
                        <div class="app-content">
                            <strong>Integration Requests</strong>
                            <p>Emily Houlihan highlighted integration requests that "should be easy" as good candidates for this type of work.</p>
                        </div>
                    </div>
                    <div class="application-item">
                        <span class="app-icon">📝</span>
                        <div class="app-content">
                            <strong>Documentation Workflows</strong>
                            <p>Chase started a local workflow for documenting support issues—helpful for both engineering escalations and building against feature requests.</p>
                        </div>
                    </div>
                </div>
                <p class="learning-insight"><strong>The broader opportunity:</strong> AI-assisted codebase interaction may have applications beyond just "shipping PRs."</p>
            `
        }
    ];

    // Handle learning panel clicks
    const learningPanels = document.querySelectorAll('.learning-panel');
    learningPanels.forEach((panel, index) => {
        panel.addEventListener('click', () => {
            openLearningDetail(index);
        });
    });

    function openLearningDetail(index) {
        currentLearningIndex = index;
        const data = learningData[index];

        document.getElementById('learningDetailNumber').textContent = data.number;
        document.getElementById('learningDetailTitle').textContent = data.title;
        document.getElementById('learningDetailBody').innerHTML = data.content;

        const badge = document.getElementById('learningDetailBadge');
        if (data.featured) {
            badge.textContent = '★ Key Learning';
            badge.classList.add('visible');
        } else {
            badge.classList.remove('visible');
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLearning(direction) {
        let newIndex = currentLearningIndex + direction;
        if (newIndex < 0) newIndex = learningData.length - 1;
        if (newIndex >= learningData.length) newIndex = 0;
        openLearningDetail(newIndex);
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            navigateLearning(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLearning(1);
        }
    });
}

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
