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
    
    // Professional Stock Chart
    initPortfolioChart();
    
    // Physics circles removed

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
        
        // Smooth gradient interpolation
        const totalGradients = gradients.length - 1;
        const exactPosition = scrollPercent * totalGradients;
        const gradientIndex = Math.floor(exactPosition);
        const nextGradientIndex = Math.min(gradientIndex + 1, totalGradients);
        const localPercent = exactPosition - gradientIndex;
        
        // Interpolate between current and next gradient
        const currentColors = gradients[gradientIndex].split(', ');
        const nextColors = gradients[nextGradientIndex].split(', ');
        
        // Create smooth color interpolation
        const interpolatedColors = currentColors.map((color, index) => {
            if (nextColors[index]) {
                return interpolateColor(color, nextColors[index], localPercent);
            }
            return color;
        });
        
        const smoothGradient = interpolatedColors.join(', ');
        const angle = 135 + (scrollPercent * 45); // Gentler angle rotation
        
        // Apply smooth transition
        body.style.transition = 'background 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), filter 1s ease-out';
        body.style.background = `linear-gradient(${angle}deg, ${smoothGradient})`;
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

// Color interpolation helper function
function interpolateColor(color1, color2, factor) {
    // Remove # if present and convert to RGB
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Simplified Investment Growth Chart
function initPortfolioChart() {
    const stockChart = document.getElementById('stockChart');
    const tooltip = document.getElementById('chartTooltip');
    const periods = document.querySelectorAll('.period');
    const currentPrice = document.querySelector('.current-price');
    const priceChange = document.querySelector('.price-change');
    
    if (!stockChart) {
        console.error('Chart canvas not found!');
        return;
    }
    
    const stockCtx = stockChart.getContext('2d');
    let currentPeriod = '3Y';
    
    // Investment growth data showing portfolio value over time
    const portfolioData = {
        '1Y': {
            data: [10000, 10400, 9600, 11000, 11600, 12400, 11800, 13000, 13600, 14400, 15000, 15600],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        '3Y': {
            data: [10000, 11600, 13000, 14400, 15600, 17000, 18400, 19600, 21000, 22400, 23600, 25000],
            labels: ['2022 Q1', '2022 Q2', '2022 Q3', '2022 Q4', '2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4']
        },
        '5Y': {
            data: [10000, 12400, 15000, 17600, 20400, 23600, 27000, 30400, 34000, 37600],
            labels: ['2020', '2020.5', '2021', '2021.5', '2022', '2022.5', '2023', '2023.5', '2024', '2024.5']
        },
        '10Y': {
            data: [10000, 13600, 18400, 25000, 33600, 45000, 59600, 77000, 97000, 119000, 143000],
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
        }
    };
    
    // Draw investment growth chart with axes and dots
    function drawInvestmentChart(data, labels, canvas, ctx) {
        const width = canvas.width;
        const height = canvas.height;
        const padding = 60;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;
        
        ctx.clearRect(0, 0, width, height);
        
        // Get value range
        const minValue = Math.min(...data);
        const maxValue = Math.max(...data);
        const valueRange = maxValue - minValue;
        
        // Draw background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(padding, padding, chartWidth, chartHeight);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines (5 lines)
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight * i / 5);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
            
            // Y-axis labels (Performance)
            const value = maxValue - (valueRange * i / 5);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = 'bold 13px Inter';
            ctx.textAlign = 'right';
            
            // Format values nicely
            let formattedValue;
            if (value >= 1000) {
                formattedValue = `$${(value / 1000).toFixed(0)}K`;
            } else {
                formattedValue = `$${value.toFixed(0)}`;
            }
            
            ctx.fillText(formattedValue, padding - 15, y + 5);
        }
        
        // Vertical grid lines
        const stepX = chartWidth / (data.length - 1);
        for (let i = 0; i < data.length; i++) {
            const x = padding + (i * stepX);
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
        }
        
        // Draw axes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Axis labels
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        
        // Y-axis label
        ctx.save();
        ctx.translate(20, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Portfolio Value', 0, 0);
        ctx.restore();
        
        // X-axis label
        ctx.fillText('Time Period', width / 2, height - 10);
        
        // Draw line chart with area fill
        ctx.beginPath();
        data.forEach((value, index) => {
            const x = padding + (index * stepX);
            const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        // Create gradient for area fill
        const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
        
        // Fill area under curve
        ctx.lineTo(width - padding, height - padding);
        ctx.lineTo(padding, height - padding);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw line
        ctx.beginPath();
        data.forEach((value, index) => {
            const x = padding + (index * stepX);
            const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw dots at each data point
        data.forEach((value, index) => {
            const x = padding + (index * stepX);
            const y = height - padding - ((value - minValue) / valueRange) * chartHeight;
            
            // Outer circle (glow)
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
            ctx.fill();
            
            // Inner circle (dot)
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = '#10b981';
            ctx.fill();
            
            // White center
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
        });
        
        // Draw X-axis labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '11px Inter';
        ctx.textAlign = 'center';
        
        labels.forEach((label, index) => {
            if (index % Math.ceil(labels.length / 6) === 0 || index === labels.length - 1) {
                const x = padding + (index * stepX);
                ctx.fillText(label, x, height - padding + 20);
            }
        });
    }
    

    
    // Update chart display
    function updateChart() {
        const periodData = portfolioData[currentPeriod];
        
        drawInvestmentChart(periodData.data, periodData.labels, stockChart, stockCtx);
        
        // Update price display
        const latestValue = periodData.data[periodData.data.length - 1];
        const firstValue = periodData.data[0];
        const change = latestValue - firstValue;
        const changePercent = (change / firstValue) * 100;
        
        currentPrice.textContent = `$${latestValue.toLocaleString()}`;
        priceChange.textContent = `${change >= 0 ? '+' : ''}$${Math.abs(change).toLocaleString()} (${changePercent.toFixed(1)}%)`;
        priceChange.className = `price-change ${change >= 0 ? 'positive' : 'negative'}`;
    }
    
    // Event listeners
    periods.forEach(period => {
        period.addEventListener('click', () => {
            periods.forEach(p => p.classList.remove('active'));
            period.classList.add('active');
            currentPeriod = period.dataset.period;
            updateChart();
        });
    });
    
    // Initialize chart
    updateChart();
}

// Create floating particles
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

// Physics-based floating circles
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