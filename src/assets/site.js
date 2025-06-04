// Portfolio JavaScript Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Loading Screen
    const loader = document.getElementById('portfolioLoader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);

    // Navbar Scroll Effect
    const navbar = document.querySelector('.portfolio_navbar_custom');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('.portfolio_nav_link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Update active nav link
            document.querySelectorAll('.portfolio_nav_link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.portfolio_reveal').forEach(el => {
        observer.observe(el);
    });

    // Active Navigation Link Based on Scroll Position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.portfolio_nav_link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Simple validation
        if (name && email && message) {
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
        } else {
            showNotification('Please fill in all fields.', 'error');
        }
    });

    // Notification System
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} position-fixed`;
        notification.style.cssText = `
                        top: 100px;
                        right: 20px;
                        z-index: 10000;
                        min-width: 300px;
                        animation: slideInRight 0.5s ease;
                    `;
        notification.innerHTML = `
                        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                        ${message}
                    `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    // Add slide animations to CSS
    const style = document.createElement('style');
    style.textContent = `
    @keyframes slideInRight {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
    @keyframes slideOutRight {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                `;
    document.head.appendChild(style);

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.portfolio_floating_element');

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Typing Effect for Hero Title
    const heroTitle = document.querySelector('.portfolio_hero_title');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    setTimeout(typeWriter, 2500);

    // Dynamic Background Color Change
    let colorIndex = 0;
    const colors = [
        'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
        'linear-gradient(135deg, #0c0c0c 0%, #2e1a1a 50%, #3e1621 100%)',
        'linear-gradient(135deg, #0c0c0c 0%, #1a2e1a 50%, #213e16 100%)'
    ];

    setInterval(() => {
        colorIndex = (colorIndex + 1) % colors.length;
        document.querySelector('.portfolio_body_wrapper').style.background = colors[colorIndex];
    }, 10000);

    // Add glitch effect to project cards on hover
    document.querySelectorAll('.portfolio_project_card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });

        card.addEventListener('mouseleave', function () {
            this.style.animation = '';
        });
    });

    // Add glitch animation to CSS
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
    @keyframes glitch {
                        0% { transform: translateY(-15px) rotateX(5deg); }
                        20% { transform: translateY(-13px) rotateX(5deg) skew(2deg); }
                        40% { transform: translateY(-17px) rotateX(5deg) skew(-2deg); }
                        60% { transform: translateY(-14px) rotateX(5deg) skew(1deg); }
                        80% { transform: translateY(-16px) rotateX(5deg) skew(-1deg); }
                        100% { transform: translateY(-15px) rotateX(5deg); }
                    }
                `;
    document.head.appendChild(glitchStyle);

    // Skill items hover effect
    document.querySelectorAll('.portfolio_skill_item').forEach(skill => {
        skill.addEventListener('mouseenter', function () {
            this.style.background = 'rgba(0, 217, 255, 0.3)';
            this.style.boxShadow = '0 5px 15px rgba(0, 217, 255, 0.4)';
        });

        skill.addEventListener('mouseleave', function () {
            this.style.background = 'rgba(0, 217, 255, 0.1)';
            this.style.boxShadow = 'none';
        });
    });

    // Add particle effect to background
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
                        position: fixed;
                        width: 2px;
                        height: 2px;
                        background: rgba(0, 217, 255, 0.5);
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: -1;
                        left: ${Math.random() * 100}vw;
                        top: 100vh;
                        animation: floatUp ${5 + Math.random() * 5}s linear infinite;
                    `;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 10000);
    }

    // Create particles periodically
    setInterval(createParticle, 300);

    // Add float up animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
    @keyframes floatUp {
                        to {
                            transform: translateY(-100vh) rotate(360deg);
                            opacity: 0;
                        }
                    }
                `;
    document.head.appendChild(particleStyle);

    // Add cursor trail effect
    let mouseX = 0, mouseY = 0;
    let trails = [];

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const trail = document.createElement('div');
        trail.style.cssText = `
                        position: fixed;
                        width: 4px;
                        height: 4px;
                        background: rgba(0, 217, 255, 0.6);
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9999;
                        left: ${mouseX}px;
                        top: ${mouseY}px;
                        animation: fadeTrail 0.5s ease-out forwards;
                    `;

        document.body.appendChild(trail);
        trails.push(trail);

        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
            trails = trails.filter(t => t !== trail);
        }, 500);
    });

    // Add fade trail animation
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
    @keyframes fadeTrail {
                        0% { opacity: 1; transform: scale(1); }
                        100% { opacity: 0; transform: scale(0); }
                    }
                `;
    document.head.appendChild(trailStyle);
});