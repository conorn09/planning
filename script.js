// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Add gradient transition and vibrant colors classes to body
    document.body.classList.add('gradient-transition', 'vibrant-colors');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Create particles
    createParticles();
    
    // Animate counters
    animateCounters();
    
    // Initialize tilt effects
    initTiltEffect();
    
    // Parallax scrolling
    initParallaxScrolling();
    
    // Interactive shapes
    initInteractiveShapes();
    
    // Interactive portfolio chart
    initPortfolioChart();
    
    // Physics circles
    initPhysicsCircles();

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your interest! We will contact you within 24 hours to schedule your free consultation.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Dynamic gradient scroll effect with dramatic color changes
    const header = document.querySelector('.header');
    const body = document.body;
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / maxScroll;
        
        // Dramatic gradient combinations with vibrant colors
        const gradients = [
            '#ff0844, #ffb199, #ff006e',           // Hot Pink to Coral to Magenta
            '#8338ec, #3a86ff, #06ffa5',          // Purple to Blue to Mint
            '#ff006e, #fb5607, #ffbe0b',          // Magenta to Orange to Yellow
            '#06ffa5, #00d4ff, #8338ec',          // Mint to Cyan to Purple
            '#ffbe0b, #ff006e, #8338ec',          // Yellow to Magenta to Purple
            '#3a86ff, #06ffa5, #ff0844',          // Blue to Mint to Hot Pink
            '#fb5607, #ffbe0b, #8338ec'           // Orange to Yellow to Purple
        ];
        
        const gradientIndex = Math.floor(scrollPercent * (gradients.length - 1));
        const nextGradientIndex = Math.min(gradientIndex + 1, gradients.length - 1);
        const localPercent = (scrollPercent * (gradients.length - 1)) - gradientIndex;
        
        // Create dramatic gradient with multiple colors - syrup-like slow transitions
        const currentGradient = gradients[gradientIndex];
        const angle = 135 + (scrollPercent * 90); // Slower rotating gradient angle
        
        // Apply transition with syrup-like timing
        body.style.transition = 'background 2.5s cubic-bezier(0.25, 0.1, 0.25, 1), filter 2s ease-out';
        body.style.background = `linear-gradient(${angle}deg, ${currentGradient})`;
        body.style.backgroundSize = '400% 400%';
        body.style.backgroundAttachment = 'fixed';
        
        // Gentler pulsing effect based on scroll
        const pulseIntensity = Math.sin(scrollPercent * Math.PI * 2) * 0.05 + 1;
        body.style.filter = `brightness(${pulseIntensity}) saturate(1.1)`;
        
        // Header transparency effect
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.08)';
            header.style.backdropFilter = 'blur(25px)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.05)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and other elements
    const animatedElements = document.querySelectorAll('.service-card, .stat, .about-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add active class to current navigation item
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});

// Add CSS for active nav items and mobile menu
const additionalCSS = `
.nav-link.active {
    color: #2563eb;
}

@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        transition: left 0.3s ease;
        z-index: 999;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-menu li {
        margin: 1rem 0;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
// 
Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Tilt effect for service cards
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// Parallax scrolling effects
function initParallaxScrolling() {
    const shapes = document.querySelectorAll('.shape');
    const cards = document.querySelectorAll('.floating-cards .card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
        
        cards.forEach((card, index) => {
            const speed = (index + 1) * 0.05;
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Smooth reveal animations on scroll
const revealElements = () => {
    const reveals = document.querySelectorAll('.service-card, .about-text, .contact-form');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('reveal');
        }
    });
};

window.addEventListener('scroll', revealElements);

// Add reveal animation styles
const revealCSS = `
.service-card,
.about-text,
.contact-form {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card.reveal,
.about-text.reveal,
.contact-form.reveal {
    opacity: 1;
    transform: translateY(0);
}

.service-card:nth-child(1) { transition-delay: 0.1s; }
.service-card:nth-child(2) { transition-delay: 0.2s; }
.service-card:nth-child(3) { transition-delay: 0.3s; }
.service-card:nth-child(4) { transition-delay: 0.4s; }
.service-card:nth-child(5) { transition-delay: 0.5s; }
.service-card:nth-child(6) { transition-delay: 0.6s; }

/* Magnetic button effect */
.btn {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover {
    animation: magneticPulse 0.6s ease-in-out;
}

@keyframes magneticPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1.02); }
}

/* Glowing text effect */
.gradient-text {
    position: relative;
}

.gradient-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: blur(2px);
    opacity: 0.7;
    z-index: -1;
    animation: gradient-shift 3s ease infinite;
}

/* Scroll progress indicator */
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    z-index: 9999;
    transition: width 0.1s ease;
}

/* Cursor trail effect */
.cursor-trail {
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
}
`;

// Add enhanced styles
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = revealCSS;
document.head.appendChild(enhancedStyle);

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Cursor trail effect
const createCursorTrail = () => {
    const trails = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (trailLength - i) / trailLength;
        trail.style.transform = `scale(${(trailLength - i) / trailLength})`;
        document.body.appendChild(trail);
        trails.push(trail);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animateTrails = () => {
        let x = mouseX, y = mouseY;
        
        trails.forEach((trail, index) => {
            trail.style.left = x - 10 + 'px';
            trail.style.top = y - 10 + 'px';
            
            const nextTrail = trails[index + 1] || trails[0];
            x += (parseFloat(nextTrail.style.left) || x - x) * 0.3;
            y += (parseFloat(nextTrail.style.top) || y - y) * 0.3;
        });
        
        requestAnimationFrame(animateTrails);
    };
    
    animateTrails();
};

// Only add cursor trail on desktop
if (window.innerWidth > 768) {
    createCursorTrail();
}

// Interactive shapes function
function initInteractiveShapes() {
    const shapes = document.querySelectorAll('.shape');
    let mouseX = 0, mouseY = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Make shapes reactive to mouse and scroll
    shapes.forEach((shape, index) => {
        // Mouse interaction
        shape.addEventListener('mouseenter', () => {
            shape.style.transform = 'scale(1.3) rotate(180deg)';
            shape.style.background = 'linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.3))';
            shape.style.filter = 'blur(0px)';
        });
        
        shape.addEventListener('mouseleave', () => {
            shape.style.transform = '';
            shape.style.background = '';
            shape.style.filter = '';
        });
        
        // Continuous movement based on mouse position
        const animateShape = () => {
            const rect = shape.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (mouseX - centerX) * 0.02;
            const deltaY = (mouseY - centerY) * 0.02;
            
            const scrollY = window.scrollY * 0.1;
            const time = Date.now() * 0.001;
            
            const floatX = Math.sin(time + index) * 20;
            const floatY = Math.cos(time + index * 0.5) * 15;
            
            shape.style.transform = `translate(${deltaX + floatX}px, ${deltaY + floatY - scrollY}px) rotate(${time * 10 + index * 45}deg)`;
            
            requestAnimationFrame(animateShape);
        };
        
        animateShape();
    });
    
    // Add scroll-based color changes to shapes
    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        
        shapes.forEach((shape, index) => {
            const hue = (scrollPercent * 360 + index * 60) % 360;
            shape.style.background = `linear-gradient(45deg, 
                hsla(${hue}, 70%, 80%, 0.1), 
                hsla(${hue + 60}, 70%, 80%, 0.2))`;
        });
    });
}

// Interactive portfolio chart function with dramatic visual changes
function initPortfolioChart() {
    const periods = document.querySelectorAll('.period');
    const chartLine = document.querySelector('.chart-line');
    const chartArea = document.querySelector('.chart-area');
    const chartDots = document.querySelectorAll('.chart-dot');
    const chartLabels = document.querySelector('.chart-labels');
    
    if (!periods.length || !chartLine || !chartArea || !chartLabels) {
        console.error('Chart elements not found!');
        return;
    }
    
    // Dramatically different chart data for each period
    const chartData = {
        '1Y': {
            line: 'M20,180 L80,170 L140,150 L200,140 L260,120 L320,100 L380,80',
            area: 'M20,180 L80,170 L140,150 L200,140 L260,120 L320,100 L380,80 L380,180 Z',
            dots: [
                { cx: 80, cy: 170 },
                { cx: 140, cy: 150 },
                { cx: 200, cy: 140 },
                { cx: 260, cy: 120 },
                { cx: 320, cy: 100 },
                { cx: 380, cy: 80 }
            ],
            labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov']
        },
        '5Y': {
            line: 'M20,160 Q60,140 100,130 Q140,110 180,100 Q220,85 260,75 Q300,60 340,50 L380,40',
            area: 'M20,160 Q60,140 100,130 Q140,110 180,100 Q220,85 260,75 Q300,60 340,50 L380,40 L380,180 Z',
            dots: [
                { cx: 60, cy: 140 },
                { cx: 100, cy: 130 },
                { cx: 140, cy: 110 },
                { cx: 180, cy: 100 },
                { cx: 220, cy: 85 },
                { cx: 260, cy: 75 },
                { cx: 300, cy: 60 },
                { cx: 340, cy: 50 },
                { cx: 380, cy: 40 }
            ],
            labels: ['2020', '2021', '2022', '2023', '2024']
        },
        '10Y': {
            line: 'M20,170 Q50,165 80,155 Q110,145 140,130 Q170,115 200,95 Q230,75 260,60 Q290,45 320,35 Q350,30 380,25',
            area: 'M20,170 Q50,165 80,155 Q110,145 140,130 Q170,115 200,95 Q230,75 260,60 Q290,45 320,35 Q350,30 380,25 L380,180 Z',
            dots: [
                { cx: 50, cy: 165 },
                { cx: 80, cy: 155 },
                { cx: 110, cy: 145 },
                { cx: 140, cy: 130 },
                { cx: 170, cy: 115 },
                { cx: 200, cy: 95 },
                { cx: 230, cy: 75 },
                { cx: 260, cy: 60 },
                { cx: 290, cy: 45 },
                { cx: 320, cy: 35 },
                { cx: 350, cy: 30 },
                { cx: 380, cy: 25 }
            ],
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024']
        }
    };
    
    periods.forEach((period) => {
        period.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all periods
            periods.forEach(p => p.classList.remove('active'));
            // Add active class to clicked period
            period.classList.add('active');
            
            const selectedPeriod = period.textContent;
            const data = chartData[selectedPeriod];
            
            if (data) {
                // Fade out current chart
                chartLine.style.opacity = '0';
                chartArea.style.opacity = '0';
                chartDots.forEach(dot => dot.style.opacity = '0');
                
                setTimeout(() => {
                    // Update chart paths
                    chartLine.setAttribute('d', data.line);
                    chartArea.setAttribute('d', data.area);
                    
                    // Update dots positions
                    chartDots.forEach((dot, dotIndex) => {
                        if (data.dots[dotIndex]) {
                            dot.setAttribute('cx', data.dots[dotIndex].cx);
                            dot.setAttribute('cy', data.dots[dotIndex].cy);
                            dot.style.display = 'block';
                        } else {
                            dot.style.display = 'none';
                        }
                    });
                    
                    // Update labels
                    chartLabels.innerHTML = data.labels.map(label => `<span>${label}</span>`).join('');
                    
                    // Fade in new chart
                    chartLine.style.opacity = '1';
                    chartArea.style.opacity = '1';
                    chartDots.forEach(dot => {
                        if (dot.style.display !== 'none') {
                            dot.style.opacity = '1';
                        }
                    });
                    
                    // Animate line drawing
                    chartLine.style.strokeDasharray = '1000';
                    chartLine.style.strokeDashoffset = '1000';
                    setTimeout(() => {
                        chartLine.style.strokeDashoffset = '0';
                    }, 200);
                    
                }, 300);
            }
        });
    });
}
// Physi
cs-based floating circles
function initPhysicsCircles() {
    const circles = document.querySelectorAll('.physics-circle');
    const mouse = { x: 0, y: 0 };
    const circleData = [];
    
    // Initialize circle physics data
    circles.forEach((circle, index) => {
        const rect = circle.getBoundingClientRect();
        circleData.push({
            element: circle,
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            vx: (Math.random() - 0.5) * 2, // velocity x
            vy: (Math.random() - 0.5) * 2, // velocity y
            mass: parseInt(circle.style.width) || 60,
            originalX: rect.left + rect.width / 2,
            originalY: rect.top + rect.height / 2,
            radius: (parseInt(circle.style.width) || 60) / 2
        });
    });
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    // Physics simulation
    function updatePhysics() {
        circleData.forEach((circle, i) => {
            // Mouse repulsion force
            const dx = circle.x - mouse.x;
            const dy = circle.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 200;
            
            if (distance < maxDistance && distance > 0) {
                const force = (maxDistance - distance) / maxDistance;
                const forceX = (dx / distance) * force * 0.5;
                const forceY = (dy / distance) * force * 0.5;
                
                circle.vx += forceX;
                circle.vy += forceY;
            }
            
            // Gravity towards original position (spring effect)
            const springForce = 0.02;
            const dampening = 0.95;
            
            circle.vx += (circle.originalX - circle.x) * springForce;
            circle.vy += (circle.originalY - circle.y) * springForce;
            
            // Apply dampening
            circle.vx *= dampening;
            circle.vy *= dampening;
            
            // Update position
            circle.x += circle.vx;
            circle.y += circle.vy;
            
            // Circle-to-circle collision
            circleData.forEach((other, j) => {
                if (i !== j) {
                    const dx = other.x - circle.x;
                    const dy = other.y - circle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDistance = circle.radius + other.radius;
                    
                    if (distance < minDistance && distance > 0) {
                        const overlap = minDistance - distance;
                        const separationX = (dx / distance) * overlap * 0.5;
                        const separationY = (dy / distance) * overlap * 0.5;
                        
                        circle.x -= separationX;
                        circle.y -= separationY;
                        other.x += separationX;
                        other.y += separationY;
                        
                        // Bounce effect
                        const bounceForce = 0.1;
                        circle.vx -= separationX * bounceForce;
                        circle.vy -= separationY * bounceForce;
                        other.vx += separationX * bounceForce;
                        other.vy += separationY * bounceForce;
                    }
                }
            });
            
            // Boundary constraints (keep within viewport)
            const margin = 50;
            if (circle.x < margin) {
                circle.x = margin;
                circle.vx *= -0.5;
            }
            if (circle.x > window.innerWidth - margin) {
                circle.x = window.innerWidth - margin;
                circle.vx *= -0.5;
            }
            if (circle.y < margin) {
                circle.y = margin;
                circle.vy *= -0.5;
            }
            if (circle.y > window.innerHeight - margin) {
                circle.y = window.innerHeight - margin;
                circle.vy *= -0.5;
            }
            
            // Apply transform
            circle.element.style.transform = `translate(${circle.x - circle.originalX}px, ${circle.y - circle.originalY}px)`;
            
            // Add glow effect based on velocity
            const speed = Math.sqrt(circle.vx * circle.vx + circle.vy * circle.vy);
            const glowIntensity = Math.min(speed * 10, 1);
            circle.element.style.boxShadow = `0 0 ${20 + glowIntensity * 30}px rgba(255, 255, 255, ${0.3 + glowIntensity * 0.4})`;
        });
        
        requestAnimationFrame(updatePhysics);
    }
    
    // Start physics simulation
    updatePhysics();
    
    // Add click interaction to circles
    circles.forEach((circle, index) => {
        circle.addEventListener('click', () => {
            const data = circleData[index];
            // Add random impulse
            data.vx += (Math.random() - 0.5) * 10;
            data.vy += (Math.random() - 0.5) * 10;
            
            // Visual feedback
            circle.style.transform += ' scale(1.2)';
            setTimeout(() => {
                circle.style.transform = circle.style.transform.replace(' scale(1.2)', '');
            }, 200);
        });
    });
}