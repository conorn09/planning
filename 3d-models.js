// 3D Models for Financial Planning Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D scenes
    init3DElements();
});

function init3DElements() {
    // Add 3D chart to hero section
    create3DChart();
    
    // Add floating 3D shapes
    createFloating3DShapes();
    
    // Add 3D service icons
    enhance3DServiceCards();
}

// 3D Financial Chart
function create3DChart() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;
    
    // Create 3D container
    const threeDContainer = document.createElement('div');
    threeDContainer.className = 'three-d-chart';
    threeDContainer.style.cssText = `
        position: absolute;
        top: 0;
        right: -50px;
        width: 200px;
        height: 200px;
        pointer-events: none;
        z-index: 10;
    `;
    
    chartContainer.appendChild(threeDContainer);
    
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    threeDContainer.appendChild(renderer.domElement);
    
    // Create 3D bar chart
    const bars = [];
    const barData = [0.3, 0.7, 0.5, 0.9, 0.6, 0.8];
    
    barData.forEach((height, index) => {
        const geometry = new THREE.BoxGeometry(0.3, height * 2, 0.3);
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(0.6 + index * 0.1, 0.8, 0.6),
            transparent: true,
            opacity: 0.8
        });
        
        const bar = new THREE.Mesh(geometry, material);
        bar.position.x = (index - 2.5) * 0.5;
        bar.position.y = height - 1;
        
        scene.add(bar);
        bars.push(bar);
    });
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    camera.position.z = 3;
    camera.position.y = 0.5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate bars
        bars.forEach((bar, index) => {
            bar.rotation.y += 0.01 + index * 0.002;
        });
        
        // Gentle camera movement
        camera.position.x = Math.sin(Date.now() * 0.001) * 0.2;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Floating 3D Shapes
function createFloating3DShapes() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create multiple 3D shape containers
    for (let i = 0; i < 3; i++) {
        const shapeContainer = document.createElement('div');
        shapeContainer.className = `floating-3d-shape shape-${i}`;
        shapeContainer.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Position shapes
        const positions = [
            { top: '20%', right: '10%' },
            { bottom: '30%', left: '5%' },
            { top: '60%', right: '20%' }
        ];
        
        Object.assign(shapeContainer.style, positions[i]);
        heroSection.appendChild(shapeContainer);
        
        // Create Three.js scene for each shape
        createFloatingShape(shapeContainer, i);
    }
}

function createFloatingShape(container, index) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(100, 100);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Different shapes for variety
    const geometries = [
        new THREE.OctahedronGeometry(0.8),
        new THREE.TetrahedronGeometry(0.8),
        new THREE.IcosahedronGeometry(0.8)
    ];
    
    const geometry = geometries[index];
    const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(0.6 + index * 0.2, 0.7, 0.6),
        transparent: true,
        opacity: 0.7,
        wireframe: false
    });
    
    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);
    
    // Add wireframe overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(wireframe);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x3b82f6, 1, 100);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);
    
    camera.position.z = 2;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        
        shape.rotation.x = time * 0.5 + index;
        shape.rotation.y = time * 0.3 + index;
        wireframe.rotation.x = time * 0.5 + index;
        wireframe.rotation.y = time * 0.3 + index;
        
        // Floating motion
        shape.position.y = Math.sin(time + index) * 0.1;
        wireframe.position.y = Math.sin(time + index) * 0.1;
        
        renderer.render(scene, camera);
    }
    
    animate();
} 
/* Enhanced 3D Service Cards */
function enhance3DServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Add 3D icon container
        const iconContainer = card.querySelector('.service-icon');
        if (!iconContainer) return;
        
        const threeDIcon = document.createElement('div');
        threeDIcon.className = 'service-3d-icon';
        threeDIcon.style.cssText = `
            position: absolute;
            top: -20px;
            right: -20px;
            width: 60px;
            height: 60px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        card.style.position = 'relative';
        card.appendChild(threeDIcon);
        
        // Create 3D icon
        create3DServiceIcon(threeDIcon, index);
        
        // Show/hide on hover
        card.addEventListener('mouseenter', () => {
            threeDIcon.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            threeDIcon.style.opacity = '0';
        });
    });
}

function create3DServiceIcon(container, index) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(60, 60);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Different 3D icons for each service
    const iconShapes = [
        // Retirement - Sphere with rings
        () => {
            const group = new THREE.Group();
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(0.3, 16, 16),
                new THREE.MeshPhongMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.8 })
            );
            group.add(sphere);
            
            // Add rings
            for (let i = 0; i < 3; i++) {
                const ring = new THREE.Mesh(
                    new THREE.RingGeometry(0.4 + i * 0.1, 0.45 + i * 0.1, 16),
                    new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.5 })
                );
                ring.rotation.x = Math.PI / 2;
                ring.rotation.z = i * Math.PI / 3;
                group.add(ring);
            }
            return group;
        },
        
        // Investment - Pyramid
        () => {
            return new THREE.Mesh(
                new THREE.ConeGeometry(0.4, 0.8, 4),
                new THREE.MeshPhongMaterial({ color: 0x10b981, transparent: true, opacity: 0.8 })
            );
        },
        
        // Estate - House shape
        () => {
            const group = new THREE.Group();
            const base = new THREE.Mesh(
                new THREE.BoxGeometry(0.6, 0.4, 0.6),
                new THREE.MeshPhongMaterial({ color: 0x8b5cf6 })
            );
            base.position.y = -0.2;
            
            const roof = new THREE.Mesh(
                new THREE.ConeGeometry(0.5, 0.4, 4),
                new THREE.MeshPhongMaterial({ color: 0x6366f1 })
            );
            roof.position.y = 0.2;
            roof.rotation.y = Math.PI / 4;
            
            group.add(base);
            group.add(roof);
            return group;
        },
        
        // Insurance - Shield
        () => {
            const shape = new THREE.Shape();
            shape.moveTo(0, 0.5);
            shape.lineTo(-0.3, 0.3);
            shape.lineTo(-0.3, -0.2);
            shape.lineTo(0, -0.5);
            shape.lineTo(0.3, -0.2);
            shape.lineTo(0.3, 0.3);
            shape.closePath();
            
            return new THREE.Mesh(
                new THREE.ExtrudeGeometry(shape, { depth: 0.1, bevelEnabled: false }),
                new THREE.MeshPhongMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.8 })
            );
        },
        
        // Education - Book
        () => {
            const group = new THREE.Group();
            const book = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.7, 0.1),
                new THREE.MeshPhongMaterial({ color: 0xef4444 })
            );
            
            const pages = new THREE.Mesh(
                new THREE.BoxGeometry(0.45, 0.65, 0.08),
                new THREE.MeshPhongMaterial({ color: 0xffffff })
            );
            pages.position.z = 0.01;
            
            group.add(book);
            group.add(pages);
            return group;
        },
        
        // Business - Briefcase
        () => {
            const group = new THREE.Group();
            const case1 = new THREE.Mesh(
                new THREE.BoxGeometry(0.6, 0.4, 0.2),
                new THREE.MeshPhongMaterial({ color: 0x06b6d4 })
            );
            
            const handle = new THREE.Mesh(
                new THREE.TorusGeometry(0.15, 0.03, 8, 16),
                new THREE.MeshPhongMaterial({ color: 0x0891b2 })
            );
            handle.position.y = 0.3;
            handle.rotation.x = Math.PI / 2;
            
            group.add(case1);
            group.add(handle);
            return group;
        }
    ];
    
    const icon = iconShapes[index % iconShapes.length]();
    scene.add(icon);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(1, 1, 2);
    scene.add(pointLight);
    
    camera.position.z = 1.5;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.002;
        
        icon.rotation.y = time;
        icon.rotation.x = Math.sin(time) * 0.2;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Add 3D background elements
function add3DBackground() {
    const body = document.body;
    
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'three-d-background';
    backgroundContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    body.appendChild(backgroundContainer);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    backgroundContainer.appendChild(renderer.domElement);
    
    // Create floating particles
    const particleCount = 50;
    const particles = new THREE.Group();
    
    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(0.02, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.7, 0.6),
            transparent: true,
            opacity: 0.6
        });
        
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        
        particles.add(particle);
    }
    
    scene.add(particles);
    camera.position.z = 5;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize background on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(add3DBackground, 1000); // Delay to ensure page is loaded
});
