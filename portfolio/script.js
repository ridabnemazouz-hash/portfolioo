/* ========================================
   RIDA.AI - ULTRA ADVANCED PORTFOLIO
   Next-Gen Interactive JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // GLOBALS & CONFIG
    // ========================================
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    let devModeActive = false;
    let robotInstance = null;
    
    // ========================================
    // TRANSLATIONS
    // ========================================
    const translations = {
        'EN': {
            'home': 'HOME',
            'about': 'ABOUT',
            'skills': 'SKILLS',
            'timeline': 'TIMELINE',
            'projects': 'PROJECTS',
            'terminal': 'TERMINAL',
            'contact': 'CONTACT',
            'hire': 'HIRE ME',
            'identity': 'IDENTITY',
            'profile': 'PROFILE',
            'capabilities': 'CAPABILITIES',
            'matrix': 'SKILL MATRIX',
            'chronology': 'CHRONOLOGY',
            'journey': 'DEV JOURNEY',
            'deployed': 'DEPLOYED SYSTEMS',
            'interface': 'COMMAND INTERFACE',
            'connection': 'ESTABLISH CONNECTION',
            'transmit': 'INITIATE TRANSMISSION',
            'view_projects': 'View Projects',
            'contact_me': 'Contact Me',
            'sys_online': 'SYS.ONLINE',
            'system_bio': 'SYSTEM BIO',
            'loc': 'Lines of Code',
            'projects_built': 'Projects Built',
            'coffee': 'Cups of Coffee',
            'github_repos': 'GitHub Repos'
        },
        'FR': {
            'home': 'ACCUEIL',
            'about': 'À PROPOS',
            'skills': 'COMPÉTENCES',
            'timeline': 'CHRONOLOGIE',
            'projects': 'PROJETS',
            'terminal': 'TERMINAL',
            'contact': 'CONTACT',
            'hire': 'RECRUTEZ-MOI',
            'identity': 'IDENTITÉ',
            'profile': 'PROFIL',
            'capabilities': 'CAPACITÉS',
            'matrix': 'MATRICE DES COMPÉTENCES',
            'chronology': 'CHRONOLOGIE',
            'journey': 'PARCOURS DÉV',
            'deployed': 'SYSTÈMES DÉPLOYÉS',
            'interface': 'INTERFACE DE COMMANDE',
            'connection': 'ÉTABLIR LA CONNEXION',
            'transmit': 'LANCER LA TRANSMISSION',
            'view_projects': 'Voir les Projets',
            'contact_me': 'Contactez-moi',
            'sys_online': 'SYS.EN_LIGNE',
            'system_bio': 'BIO DU SYSTÈME',
            'loc': 'Lignes de Code',
            'projects_built': 'Projets Réalisés',
            'coffee': 'Tasses de Café',
            'github_repos': 'Répots GitHub'
        }
    };
    
    // ========================================
    // PROJECT DATA
    // ========================================
    const projectData = {
        'Smart Archive': {
            tags: ['PHP', 'SQL', 'JS', 'CSS3'],
            icon: 'fas fa-archive',
            desc: 'A robust digital document management system designed for secure storage and efficient retrieval of sensitive files. Implements custom encryption protocols and role-based access control.',
            challenges: [
                'Managing large file uploads over unstable connections.',
                'Implementing a secure yet user-friendly permission system.',
                'Optimizing SQL queries for multi-thousand document searches.'
            ],
            solutions: 'Developed a chunked upload system with resumable capabilities. Built a modular middleware for permission checks. Optimized database indexes and implemented a caching layer for frequent searches.',
            repo: 'https://github.com/rida/smart-archive',
            live: '#'
        },
        'Fitness Platform': {
            tags: ['React', 'Node.js', 'Express', 'MongoDB'],
            icon: 'fas fa-dumbbell',
            desc: 'A comprehensive fitness ecosystem connecting personal trainers with clients. Features real-time workout tracking, progress visualization, and integrated scheduling.',
            challenges: [
                'Synchronizing real-time workout data across multiple devices.',
                'Creating dynamic data visualizations for complex fitness metrics.',
                'Handling time-zone synchronization for international trainers.'
            ],
            solutions: 'Utilized Socket.io for low-latency data sync. Integrated Chart.js for responsive and interactive progress graphs. Implemented robust UTC-based scheduling with local time translation.',
            repo: 'https://github.com/rida/fitness-pro',
            live: '#'
        },
        'Clinic Management': {
            tags: ['HTML5', 'PHP', 'MySQL', 'Bootstrap'],
            icon: 'fas fa-hospital',
            desc: 'A streamlined medical management system for small to medium-sized clinics. Automates patient registration, appointment scheduling, and basic medical history tracking.',
            challenges: [
                'Ensuring data integrity in a multi-user environment.',
                'Designing an intuitive interface for staff with varying tech proficiency.',
                'Generating secure PDF reports for patient prescriptions.'
            ],
            solutions: 'Implemented database transactions to prevent race conditions. Conducted user testing to simplify key workflows. Integrated Dompdf for server-side generation of secure medical documents.',
            repo: 'https://github.com/rida/clinic-sys',
            live: '#'
        }
    };
    
    // ========================================
    // CLICK PARTICLE EFFECTS
    // ========================================
    document.addEventListener('click', (e) => {
        createClickParticles(e.clientX, e.clientY);
    });
    
    function createClickParticles(x, y) {
        const particleCount = 8;
        const colors = ['#00f0ff', '#b829dd', '#ff0080', '#0080ff'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 60 + Math.random() * 40;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            document.body.appendChild(particle);
            
            const animation = particle.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 600 + Math.random() * 200,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }
    
    // ========================================
    // TEXT SCRAMBLE EFFECT FOR HEADINGS
    // ========================================
    const headings = document.querySelectorAll('.section-title, .project-name');
    
    headings.forEach(heading => {
        const originalText = heading.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        heading.addEventListener('mouseenter', () => {
            let iterations = 0;
            const maxIterations = 10;
            
            const interval = setInterval(() => {
                heading.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                iterations += 1 / 3;
                
                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    heading.textContent = originalText;
                }
            }, 30);
        });
    });
    
    // ========================================
    // RIPPLE EFFECT ON BUTTONS
    // ========================================
    document.querySelectorAll('.action-btn, .transmit-btn, .hire-btn').forEach(btn => {
        btn.classList.add('ripple');
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: translate(-50%, -50%);
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            const animation = ripple.animate([
                { width: '0px', height: '0px', opacity: 1 },
                { width: '300px', height: '300px', opacity: 0 }
            ], {
                duration: 600,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => ripple.remove();
        });
    });
    
    // ========================================
    // MAGNETIC CURSOR EFFECT FOR INTERACTIVE ELEMENTS
    // ========================================
    const interactiveElements = document.querySelectorAll('.action-btn, .project-card, .skill-item, .nav-link');
    
    if (!isTouchDevice) {
        interactiveElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                
                // Apply subtle magnetic pull
                el.style.transform = `translate(${deltaX * 0.05}px, ${deltaY * 0.05}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // ========================================
    // DEVELOPER MODE EASTER EGG
    // ========================================
    const secretCode = ['Control', 'Shift', 'D'];
    let keySequence = [];
    
    document.addEventListener('keydown', (e) => {
        keySequence.push(e.key);
        keySequence = keySequence.slice(-3);
        
        if (keySequence.join(',') === secretCode.join(',')) {
            toggleDevMode();
        }
    });
    
    function toggleDevMode() {
        devModeActive = !devModeActive;
        
        if (devModeActive) {
            showDevModeOverlay();
        } else {
            hideDevModeOverlay();
        }
    }
    
    function showDevModeOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'dev-mode-overlay';
        overlay.innerHTML = `
            <div class="dev-mode-content">
                <div class="dev-mode-glitch" data-text="DEVELOPER MODE">DEVELOPER MODE</div>
                <div class="dev-mode-status">
                    <span class="status-indicator"></span>
                    <span>ACCESS GRANTED</span>
                </div>
                <p class="dev-mode-welcome">Welcome to the Matrix, Developer!</p>
                <div class="dev-mode-stats">
                    <div class="dev-stat"><span class="stat-num">∞</span><span>Possibilities</span></div>
                    <div class="dev-stat"><span class="stat-num">42</span><span>Answer</span></div>
                    <div class="dev-stat"><span class="stat-num">01</span><span>Binary</span></div>
                </div>
                <p class="dev-mode-hint">Press Ctrl+Shift+D to exit</p>
            </div>
        `;
        document.body.appendChild(overlay);
        
        setTimeout(() => overlay.classList.add('active'), 50);
        
        // Add Matrix rain effect
        createMatrixRain();
    }
    
    function hideDevModeOverlay() {
        const overlay = document.getElementById('dev-mode-overlay');
        const matrix = document.getElementById('matrix-rain');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 500);
        }
        if (matrix) matrix.remove();
    }
    
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-rain';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = 'RIDA01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
        
        function drawMatrix() {
            if (!devModeActive) return;
            
            ctx.fillStyle = 'rgba(2, 2, 4, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00f0ff';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            
            requestAnimationFrame(drawMatrix);
        }
        
        drawMatrix();
    }
    
    // ========================================
    // BOOT SEQUENCE
    // ========================================
    setTimeout(() => {
        const bootOverlay = document.querySelector('.boot-overlay');
        if (bootOverlay) {
            bootOverlay.classList.add('hidden');
            setTimeout(() => {
                initTypingAnimation();
                initGuidedTour();
            }, 500);
        }
    }, 3000);
    
    // ========================================
    // CUSTOM CURSOR (Desktop Only)
    // ========================================
    if (!isTouchDevice) {
        const cursorCore = document.querySelector('.cursor-core');
        const cursorRing = document.querySelector('.cursor-ring');
        const cursorTrail = document.querySelector('.cursor-trail');
        
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let trailX = 0, trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (cursorCore) {
                cursorCore.style.left = mouseX + 'px';
                cursorCore.style.top = mouseY + 'px';
            }
        });
        
        function animateCursor() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            trailX += (mouseX - trailX) * 0.06;
            trailY += (mouseY - trailY) * 0.06;
            
            if (cursorRing) {
                cursorRing.style.left = ringX + 'px';
                cursorRing.style.top = ringY + 'px';
            }
            if (cursorTrail) {
                cursorTrail.style.left = trailX + 'px';
                cursorTrail.style.top = trailY + 'px';
            }
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .nav-toggle, .action-btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
                if (typeof robotReactToHover === 'function') robotReactToHover(true);
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
                if (typeof robotReactToHover === 'function') robotReactToHover(false);
            });
        });
    }
    
    // ========================================
    // CLOCK
    // ========================================
    function updateClock() {
        const clock = document.getElementById('clock');
        if (clock) {
            const now = new Date();
            clock.textContent = now.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
        }
    }
    setInterval(updateClock, 1000);
    updateClock();
    
    // ========================================
    // PARTICLE NETWORK WITH PARALLAX
    // ========================================
    const canvas = document.getElementById('network-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        let isVisible = true;
        let scrollOffset = 0;
        
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 40 : 80;
        const connectionDistance = isMobile ? 100 : 150;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
        
        // Parallax scroll
        window.addEventListener('scroll', () => {
            scrollOffset = window.pageYOffset * 0.3;
        });
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.baseY = this.y;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2.5 + 1;
                this.color = Math.random() > 0.6 ? 'rgba(0, 240, 255, 0.6)' : 'rgba(184, 41, 221, 0.5)';
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulseOffset = Math.random() * Math.PI * 2;
            }
            
            update(time) {
                this.x += this.vx;
                this.y = this.baseY + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 10 - scrollOffset * 0.1;
                this.baseY += this.vy;
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1;
                
                // Pulse size
                this.currentSize = this.size + Math.sin(time * 0.05 + this.pulseOffset) * 0.5;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.currentSize || this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                
                // Add glow
                ctx.beginPath();
                ctx.arc(this.x, this.y, (this.currentSize || this.size) * 2, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
                gradient.addColorStop(0, this.color.replace('0.6', '0.3').replace('0.5', '0.2'));
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }
        
        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                let connections = 0;
                for (let j = i + 1; j < particles.length && connections < 4; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        
                        const gradient = ctx.createLinearGradient(
                            particles[i].x, particles[i].y,
                            particles[j].x, particles[j].y
                        );
                        gradient.addColorStop(0, `rgba(0, 240, 255, ${opacity})`);
                        gradient.addColorStop(1, `rgba(184, 41, 221, ${opacity})`);
                        
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        connections++;
                    }
                }
            }
        }
        
        let frameCount = 0;
        let time = 0;
        function animateParticles() {
            if (!isVisible) return;
            
            frameCount++;
            time++;
            
            if (isMobile && frameCount % 2 !== 0) {
                animationId = requestAnimationFrame(animateParticles);
                return;
            }
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update(time);
                particle.draw();
            });
            
            drawConnections();
            animationId = requestAnimationFrame(animateParticles);
        }
        
        initParticles();
        animateParticles();
        
        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
            if (isVisible) {
                animateParticles();
            } else {
                cancelAnimationFrame(animationId);
            }
        });
    }
    
    // ========================================
    // ENHANCED 3D ROBOT WITH INTERACTIONS
    // ========================================
    let robotReactToHover = null;
    
    function initRobot() {
        const container = document.getElementById('robot-canvas-container');
        if (!container) return;
        
        const isMobileDevice = window.innerWidth < 480;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobileDevice });
        
        // Smaller size on mobile
        const size = isMobileDevice ? 200 : (window.innerWidth < 768 ? 260 : 320);
        renderer.setSize(size, size);
        renderer.setPixelRatio(isMobileDevice ? 1 : Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        
        // Robot Group
        const robot = new THREE.Group();
        robotInstance = robot; // Store reference
        
        // Enhanced Materials - Futuristic Cyberpunk Design
        // White/silver metallic body material
        const bodyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xe8e8e8,  // Light silver/white
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            emissive: 0x001133,
            emissiveIntensity: 0.3,
            reflectivity: 0.9
        });
        
        // Dark purple joint material
        const jointMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2a1a4a,  // Dark purple
            metalness: 0.85,
            roughness: 0.15,
            emissive: 0x330033,
            emissiveIntensity: 0.6
        });
        
        // Neon blue glow material
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.95
        });
        
        // Neon purple glow material
        const purpleGlowMaterial = new THREE.MeshBasicMaterial({
            color: 0xb829dd,
            transparent: true,
            opacity: 0.9
        });
        
        // Transparent holographic panel material
        const holographicMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x00f0ff,
            metalness: 0.3,
            roughness: 0.1,
            transmission: 0.7,  // Glass-like transparency
            thickness: 0.5,
            envMapIntensity: 1.5,
            transparent: true,
            opacity: 0.4
        });
        
        // Dark matte material for contrast
        const darkMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a15,
            roughness: 0.7,
            metalness: 0.3
        });
        
        // LED strip material (cyan)
        const ledCyanMaterial = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            transparent: true,
            opacity: 1.0
        });
        
        // LED strip material (purple)
        const ledPurpleMaterial = new THREE.MeshBasicMaterial({
            color: 0xb829dd,
            transparent: true,
            opacity: 1.0
        });
        
        // Head - Futuristic Design with Holographic Elements
        const headGroup = new THREE.Group();
        
        // Main head sphere (smooth white/silver)
        const headGeo = new THREE.SphereGeometry(0.65, 32, 32);
        const head = new THREE.Mesh(headGeo, bodyMaterial);
        headGroup.add(head);
        
        // Face plate (dark visor)
        const faceGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32);
        const face = new THREE.Mesh(faceGeo, darkMaterial);
        face.rotation.x = Math.PI / 2;
        face.position.z = 0.45;
        headGroup.add(face);
        
        // Eyes - Glowing neon blue with purple accents
        const eyeGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const leftEye = new THREE.Mesh(eyeGeo, glowMaterial);
        leftEye.position.set(-0.22, 0.1, 0.55);
        headGroup.add(leftEye);
        
        const rightEye = new THREE.Mesh(eyeGeo, glowMaterial);
        rightEye.position.set(0.22, 0.1, 0.55);
        headGroup.add(rightEye);
        
        // Eye rings (purple accent)
        const eyeRingGeo = new THREE.TorusGeometry(0.15, 0.02, 16, 32);
        const eyeRingMat = new THREE.MeshBasicMaterial({ color: 0xb829dd });
        
        const leftEyeRing = new THREE.Mesh(eyeRingGeo, eyeRingMat);
        leftEyeRing.position.set(-0.22, 0.1, 0.56);
        headGroup.add(leftEyeRing);
        
        const rightEyeRing = new THREE.Mesh(eyeRingGeo, eyeRingMat);
        rightEyeRing.position.set(0.22, 0.1, 0.56);
        headGroup.add(rightEyeRing);
        
        // Eye glow halos (larger, more visible)
        const eyeHaloGeo = new THREE.RingGeometry(0.1, 0.18, 32);
        const eyeHaloMat = new THREE.MeshBasicMaterial({ 
            color: 0x00f0ff, 
            transparent: true, 
            opacity: 0.5,
            side: THREE.DoubleSide
        });
        const leftEyeHalo = new THREE.Mesh(eyeHaloGeo, eyeHaloMat);
        leftEyeHalo.position.set(-0.22, 0.1, 0.57);
        headGroup.add(leftEyeHalo);
        
        const rightEyeHalo = new THREE.Mesh(eyeHaloGeo, eyeHaloMat);
        rightEyeHalo.position.set(0.22, 0.1, 0.57);
        headGroup.add(rightEyeHalo);
        
        // Forehead holographic panel
        const foreheadGeo = new THREE.CircleGeometry(0.15, 32);
        const foreheadPanel = new THREE.Mesh(foreheadGeo, holographicMaterial);
        foreheadPanel.position.set(0, 0.35, 0.58);
        foreheadPanel.rotation.y = -0.2;
        headGroup.add(foreheadPanel);
        
        // LED strip across forehead
        const ledStripGeo = new THREE.BoxGeometry(0.3, 0.02, 0.02);
        const ledStrip = new THREE.Mesh(ledStripGeo, ledCyanMaterial);
        ledStrip.position.set(0, 0.4, 0.55);
        headGroup.add(ledStrip);
        
        // Mouth - Animated LED matrix display
        const mouthGeo = new THREE.BoxGeometry(0.25, 0.04, 0.02);
        const mouthMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
        const mouth = new THREE.Mesh(mouthGeo, mouthMat);
        mouth.position.set(0, -0.12, 0.56);
        headGroup.add(mouth);
        
        // Side panels (holographic details on temples)
        const sidePanelGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.15, 16);
        const leftSidePanel = new THREE.Mesh(sidePanelGeo, holographicMaterial);
        leftSidePanel.rotation.z = Math.PI / 2;
        leftSidePanel.position.set(-0.55, 0.15, 0);
        headGroup.add(leftSidePanel);
        
        const rightSidePanel = new THREE.Mesh(sidePanelGeo, holographicMaterial);
        rightSidePanel.rotation.z = Math.PI / 2;
        rightSidePanel.position.set(0.55, 0.15, 0);
        headGroup.add(rightSidePanel);
        
        headGroup.position.y = 2.1;
        robot.add(headGroup);
        
        // Body - Futuristic Cyberpunk Design
        const bodyGroup = new THREE.Group();
        
        // Main torso (white/silver metallic)
        const torsoGeo = new THREE.CylinderGeometry(0.55, 0.7, 1.6, 32);
        const torso = new THREE.Mesh(torsoGeo, bodyMaterial);
        torso.position.y = 0.8;
        bodyGroup.add(torso);
        
        // Chest plate (dark visor with holographic elements)
        const chestGeo = new THREE.CylinderGeometry(0.4, 0.5, 0.6, 32);
        const chest = new THREE.Mesh(chestGeo, darkMaterial);
        chest.position.set(0, 1, 0.35);
        chest.rotation.x = -0.2;
        bodyGroup.add(chest);
        
        // AI Core Reactor (glowing in center of chest)
        const coreGeo = new THREE.CircleGeometry(0.2, 32);
        const core = new THREE.Mesh(coreGeo, glowMaterial);
        core.position.set(0, 1, 0.62);
        core.rotation.x = -0.2;
        bodyGroup.add(core);
        
        // Core inner glow (purple accent)
        const coreInnerGeo = new THREE.CircleGeometry(0.12, 32);
        const coreInner = new THREE.Mesh(coreInnerGeo, purpleGlowMaterial);
        coreInner.position.set(0, 1, 0.63);
        coreInner.rotation.x = -0.2;
        bodyGroup.add(coreInner);
        
        // Holographic chest rings (rotating around core)
        const coreRingGeo = new THREE.RingGeometry(0.18, 0.26, 32);
        const coreRingMat = new THREE.MeshBasicMaterial({ 
            color: 0x00f0ff, 
            transparent: true, 
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        const coreRing = new THREE.Mesh(coreRingGeo, coreRingMat);
        coreRing.position.set(0, 1, 0.63);
        coreRing.rotation.x = -0.2;
        bodyGroup.add(coreRing);
        
        // Second rotating ring (purple)
        const coreRing2 = new THREE.Mesh(
            new THREE.RingGeometry(0.24, 0.32, 32),
            new THREE.MeshBasicMaterial({ 
                color: 0xb829dd, 
                transparent: true, 
                opacity: 0.3, 
                side: THREE.DoubleSide 
            })
        );
        coreRing2.position.set(0, 1, 0.64);
        coreRing2.rotation.x = -0.2;
        bodyGroup.add(coreRing2);
        
        // Third outer ring (cyan, larger)
        const coreRing3 = new THREE.Mesh(
            new THREE.RingGeometry(0.32, 0.38, 32),
            new THREE.MeshBasicMaterial({ 
                color: 0x00f0ff, 
                transparent: true, 
                opacity: 0.25, 
                side: THREE.DoubleSide 
            })
        );
        coreRing3.position.set(0, 1, 0.65);
        coreRing3.rotation.x = -0.2;
        bodyGroup.add(coreRing3);
        
        // LED strips across chest (horizontal lines)
        const chestLedGeo = new THREE.BoxGeometry(0.3, 0.02, 0.02);
        const chestLed1 = new THREE.Mesh(chestLedGeo, ledCyanMaterial);
        chestLed1.position.set(0, 1.15, 0.58);
        chestLed1.rotation.x = -0.2;
        bodyGroup.add(chestLed1);
        
        const chestLed2 = new THREE.Mesh(chestLedGeo, ledPurpleMaterial);
        chestLed2.position.set(0, 1.1, 0.59);
        chestLed2.rotation.x = -0.2;
        bodyGroup.add(chestLed2);
        
        // Holographic side panels on torso
        const sidePanelBodyGeo = new THREE.BoxGeometry(0.15, 0.4, 0.02);
        const leftHoloPanel = new THREE.Mesh(sidePanelBodyGeo, holographicMaterial);
        leftHoloPanel.position.set(-0.45, 1, 0);
        leftHoloPanel.rotation.y = 0.3;
        bodyGroup.add(leftHoloPanel);
        
        const rightHoloPanel = new THREE.Mesh(sidePanelBodyGeo, holographicMaterial);
        rightHoloPanel.position.set(0.45, 1, 0);
        rightHoloPanel.rotation.y = -0.3;
        bodyGroup.add(rightHoloPanel);
        
        // Vertical LED strips on sides
        const verticalLedGeo = new THREE.BoxGeometry(0.02, 0.6, 0.02);
        const leftVerticalLed = new THREE.Mesh(verticalLedGeo, ledCyanMaterial);
        leftVerticalLed.position.set(-0.52, 1, 0.15);
        bodyGroup.add(leftVerticalLed);
        
        const rightVerticalLed = new THREE.Mesh(verticalLedGeo, ledPurpleMaterial);
        rightVerticalLed.position.set(0.52, 1, 0.15);
        bodyGroup.add(rightVerticalLed);
        
        robot.add(bodyGroup);
        
        // ========================================
        // HOLOGRAPHIC RINGS & ENVIRONMENTAL EFFECTS
        // ========================================
        
        // Rotating holographic ring around robot (base)
        const holoRingGeo = new THREE.TorusGeometry(1.8, 0.03, 16, 64);
        const holoRingMat = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.3
        });
        const holoRing1 = new THREE.Mesh(holoRingGeo, holoRingMat);
        holoRing1.position.y = 0.1;
        holoRing1.rotation.x = Math.PI / 2;
        scene.add(holoRing1);
        
        // Second rotating ring (angled)
        const holoRing2 = new THREE.Mesh(
            new THREE.TorusGeometry(2.0, 0.02, 16, 64),
            new THREE.MeshBasicMaterial({ color: 0xb829dd, transparent: true, opacity: 0.25 })
        );
        holoRing2.position.y = 0.2;
        holoRing2.rotation.x = Math.PI / 2.5;
        holoRing2.rotation.y = Math.PI / 6;
        scene.add(holoRing2);
        
        // Third ring (larger, cyan)
        const holoRing3 = new THREE.Mesh(
            new THREE.TorusGeometry(2.2, 0.015, 16, 64),
            new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.2 })
        );
        holoRing3.position.y = 0.15;
        holoRing3.rotation.x = Math.PI / 2.2;
        holoRing3.rotation.y = -Math.PI / 8;
        scene.add(holoRing3);
        
        // Floating digital particles around robot
        const particleCount = 30;
        const particles = [];
        const particleGeo = new THREE.SphereGeometry(0.03, 8, 8);
        
        for (let i = 0; i < particleCount; i++) {
            const particleMat = new THREE.MeshBasicMaterial({
                color: Math.random() > 0.5 ? 0x00f0ff : 0xb829dd,
                transparent: true,
                opacity: 0.6
            });
            const particle = new THREE.Mesh(particleGeo, particleMat);
            
            // Random position in sphere around robot
            const angle = Math.random() * Math.PI * 2;
            const radius = 1.5 + Math.random() * 1.5;
            const height = Math.random() * 3;
            
            particle.position.x = Math.cos(angle) * radius;
            particle.position.z = Math.sin(angle) * radius;
            particle.position.y = 0.2 + height;
            
            // Store animation data
            particle.userData = {
                baseY: particle.position.y,
                speed: 0.5 + Math.random() * 0.5,
                offset: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            };
            
            particles.push(particle);
            scene.add(particle);
        }
        
        // Scanning light effect (horizontal beam that moves up and down)
        const scanLightGeo = new THREE.CylinderGeometry(2.5, 2.5, 0.02, 64);
        const scanLightMat = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide
        });
        const scanLight = new THREE.Mesh(scanLightGeo, scanLightMat);
        scanLight.position.y = 1.5;
        scene.add(scanLight);
        
        // Add point lights for ambient glow
        const robotGlowLight = new THREE.PointLight(0x00f0ff, 1.5, 8);
        robotGlowLight.position.set(0, 1.5, 0);
        scene.add(robotGlowLight);
        
        // Shoulders with glow (purple joints)
        const shoulderGeo = new THREE.SphereGeometry(0.32, 24, 24);
        
        const leftShoulder = new THREE.Mesh(shoulderGeo, jointMaterial);
        leftShoulder.position.set(-0.85, 1.5, 0);
        robot.add(leftShoulder);
        
        const rightShoulder = new THREE.Mesh(shoulderGeo, jointMaterial);
        rightShoulder.position.set(0.85, 1.5, 0);
        robot.add(rightShoulder);
        
        // Arms with joints
        const armGroup = new THREE.Group();
        
        const upperArmGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.8, 16);
        
        const leftUpperArm = new THREE.Mesh(upperArmGeo, bodyMaterial);
        leftUpperArm.position.set(-0.85, 1.1, 0);
        leftUpperArm.rotation.z = 0.15;
        armGroup.add(leftUpperArm);
        
        const rightUpperArm = new THREE.Mesh(upperArmGeo, bodyMaterial);
        rightUpperArm.position.set(0.85, 1.1, 0);
        rightUpperArm.rotation.z = -0.15;
        armGroup.add(rightUpperArm);
        
        const elbowGeo = new THREE.SphereGeometry(0.13, 16, 16);
        
        const leftElbow = new THREE.Mesh(elbowGeo, jointMaterial);
        leftElbow.position.set(-0.9, 0.7, 0);
        armGroup.add(leftElbow);
        
        const rightElbow = new THREE.Mesh(elbowGeo, jointMaterial);
        rightElbow.position.set(0.9, 0.7, 0);
        armGroup.add(rightElbow);
        
        const lowerArmGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.7, 16);
        
        const leftLowerArm = new THREE.Mesh(lowerArmGeo, bodyMaterial);
        leftLowerArm.position.set(-0.95, 0.35, 0.1);
        leftLowerArm.rotation.z = 0.1;
        leftLowerArm.rotation.x = -0.2;
        armGroup.add(leftLowerArm);
        
        const rightLowerArm = new THREE.Mesh(lowerArmGeo, bodyMaterial);
        rightLowerArm.position.set(0.95, 0.35, 0.1);
        rightLowerArm.rotation.z = -0.1;
        rightLowerArm.rotation.x = -0.2;
        armGroup.add(rightLowerArm);
        
        const handGeo = new THREE.SphereGeometry(0.18, 16, 16);
        
        const leftHand = new THREE.Mesh(handGeo, jointMaterial);
        leftHand.position.set(-0.98, 0, 0.15);
        armGroup.add(leftHand);
        
        const rightHand = new THREE.Mesh(handGeo, jointMaterial);
        rightHand.position.set(0.98, 0, 0.15);
        armGroup.add(rightHand);
        
        robot.add(armGroup);
        
        // Antenna with glowing tip
        const antennaGroup = new THREE.Group();
        
        const antennaGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.5, 8);
        const antenna = new THREE.Mesh(antennaGeo, jointMaterial);
        antenna.position.y = 2.8;
        antennaGroup.add(antenna);
        
        const antennaBaseGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.15, 16);
        const antennaBase = new THREE.Mesh(antennaBaseGeo, bodyMaterial);
        antennaBase.position.y = 2.55;
        antennaGroup.add(antennaBase);
        
        const antennaTipGeo = new THREE.SphereGeometry(0.1, 16, 16);
        const antennaTip = new THREE.Mesh(antennaTipGeo, glowMaterial);
        antennaTip.position.y = 3.1;
        antennaGroup.add(antennaTip);
        
        const antennaLight = new THREE.PointLight(0x00f0ff, 1.5, 4);
        antennaLight.position.y = 3.1;
        antennaGroup.add(antennaLight);
        
        robot.add(antennaGroup);
        
        scene.add(robot);
        
        // Enhanced Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
        scene.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(5, 5, 5);
        scene.add(mainLight);
        
        const cyanLight = new THREE.PointLight(0x00f0ff, 2.5, 12);
        cyanLight.position.set(3, 3, 3);
        scene.add(cyanLight);
        
        const purpleLight = new THREE.PointLight(0xb829dd, 2, 12);
        purpleLight.position.set(-3, 3, 3);
        scene.add(purpleLight);
        
        const rimLight = new THREE.SpotLight(0x00f0ff, 2.5);
        rimLight.position.set(0, 5, -5);
        rimLight.lookAt(0, 0, 0);
        scene.add(rimLight);
        
        camera.position.z = 6.5;
        
        // Animation variables
        let time = 0;
        let mouseX = 0, mouseY = 0;
        let targetRotationX = 0, targetRotationY = 0;
        let isHovering = false;
        let hoverIntensity = 0;
        
        // Mouse tracking
        document.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseX = (e.clientX - centerX) / (rect.width / 2);
            mouseY = (e.clientY - centerY) / (rect.height / 2);
        });
        
        // Hover reaction
        robotReactToHover = (hovering) => {
            isHovering = hovering;
        };
        
        function animate() {
            requestAnimationFrame(animate);
            time += 0.012;
            
            // Hover intensity transition
            hoverIntensity += (isHovering ? 1 - hoverIntensity : -hoverIntensity) * 0.1;
            
            // Enhanced floating with hover
            const floatAmplitude = 0.12 + hoverIntensity * 0.08;
            robot.position.y = Math.sin(time) * floatAmplitude;
            
            // Smooth mouse following with limits
            targetRotationY = Math.max(-0.6, Math.min(0.6, mouseX * 0.5));
            targetRotationX = Math.max(-0.4, Math.min(0.4, mouseY * 0.3));
            
            robot.rotation.y += (targetRotationY - robot.rotation.y) * 0.05;
            robot.rotation.x += (targetRotationX - robot.rotation.x) * 0.05;
            
            // Head independent look
            headGroup.rotation.y = mouseX * 0.2;
            headGroup.rotation.x = mouseY * 0.15;
            
            // Breathing animation
            const breathScale = 1 + Math.sin(time * 2) * 0.008;
            torso.scale.x = breathScale;
            torso.scale.z = breathScale;
            
            // Arm animations
            const armSwing = Math.sin(time * 1.5) * 0.04;
            leftUpperArm.rotation.z = 0.15 + armSwing;
            rightUpperArm.rotation.z = -0.15 - armSwing;
            
            leftLowerArm.rotation.x = -0.2 + Math.sin(time * 2) * 0.06;
            rightLowerArm.rotation.x = -0.2 + Math.sin(time * 2 + Math.PI) * 0.06;
            
            // Antenna pulse
            const antennaPulse = 1 + Math.sin(time * 4) * 0.3;
            antennaTip.scale.setScalar(antennaPulse);
            antennaLight.intensity = 1.5 + Math.sin(time * 4) * 0.8 + hoverIntensity * 0.5;
            
            // Core glow with hover boost
            const coreGlow = 0.8 + Math.sin(time * 3) * 0.2 + hoverIntensity * 0.2;
            core.material.opacity = coreGlow;
            coreRingMat.opacity = 0.25 + Math.sin(time * 3) * 0.15 + hoverIntensity * 0.1;
            
            // Eye animations
            eyeHaloMat.opacity = 0.3 + Math.sin(time * 2.5) * 0.15 + hoverIntensity * 0.2;
            
            // Eye blink occasionally
            if (Math.random() < 0.002) {
                leftEye.scale.y = 0.1;
                rightEye.scale.y = 0.1;
                setTimeout(() => {
                    leftEye.scale.y = 1;
                    rightEye.scale.y = 1;
                }, 100);
            }
            
            // Mouth LED animation
            mouthMat.color.setHSL(0.35 + Math.sin(time * 2) * 0.05, 1, 0.5);
            
            // ========================================
            // HOLOGRAPHIC & ENVIRONMENTAL ANIMATIONS
            // ========================================
            
            // Rotate holographic rings
            holoRing1.rotation.z += 0.005;
            holoRing2.rotation.z -= 0.003;
            holoRing2.rotation.y += 0.002;
            holoRing3.rotation.z += 0.004;
            holoRing3.rotation.y -= 0.001;
            
            // Animate floating particles
            particles.forEach((particle, index) => {
                const data = particle.userData;
                particle.position.y = data.baseY + Math.sin(time * data.speed + data.offset) * 0.3;
                particle.rotation.y += data.rotationSpeed;
                
                // Pulse opacity
                particle.material.opacity = 0.4 + Math.sin(time * 2 + data.offset) * 0.2;
            });
            
            // Scanning light moving up and down
            scanLight.position.y = 1.0 + Math.abs(Math.sin(time * 0.5)) * 1.5;
            scanLight.material.opacity = 0.1 + Math.sin(time * 2) * 0.05;
            
            // Robot glow light pulse
            robotGlowLight.intensity = 1.2 + Math.sin(time * 3) * 0.3;
            
            // Chest core rings rotation
            coreRing.rotation.z += 0.02;
            coreRing2.rotation.z -= 0.015;
            coreRing3.rotation.z += 0.01;
            
            // Forehead panel pulse
            foreheadPanel.material.opacity = 0.3 + Math.sin(time * 2.5) * 0.15;
            
            // LED strip animations (color cycling)
            ledCyanMaterial.color.setHSL(0.5 + Math.sin(time * 1.5) * 0.1, 1, 0.5);
            ledPurpleMaterial.color.setHSL(0.8 + Math.sin(time * 1.3) * 0.1, 1, 0.5);
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            const newSize = window.innerWidth < 480 ? 200 : (window.innerWidth < 768 ? 260 : 320);
            renderer.setSize(newSize, newSize);
        });
    }
    
    setTimeout(initRobot, 3500);
    
    // ========================================
    // ROBOT AI ASSISTANT INTERACTION
    // ========================================
    const greetingMessages = [
        "Howdy partner... welcome to RIDA.AI.",
        "System online. Access granted.",
        "Take a look around. These are my projects.",
        "Glad you stopped by. Explore the system.",
        "Name's Rida's AI assistant. What brings you here?",
        "The future's lookin' bright. Have a look around."
    ];
        
    let isRobotInteracting = false;
    let cameraZoomActive = false;
    
    // Right-click interaction on robot canvas
    const robotContainer = document.getElementById('robot-canvas-container');
    if (robotContainer) {
        robotContainer.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (!isRobotInteracting) {
                triggerRobotGreeting(e.clientX, e.clientY);
            }
        });
    }
    
    function triggerRobotGreeting(x, y) {
        if (isRobotInteracting) return;
        isRobotInteracting = true;
        
        // Get random greeting
        const greeting = greetingMessages[Math.floor(Math.random() * greetingMessages.length)];
        
        // Trigger robot glow animation
        triggerRobotGlowEffect();
        
        // Create particle glow around robot
        createRobotParticleGlow();
        
        // Display chat bubble
        showChatBubble(greeting);
        
        // Play cowboy voice (ElevenLabs)
        playCowboyVoice(greeting);
        
        // Interaction flag reset is handled by voice completion or timeout
    }

    // ElevenLabs Configuration - Arthur Morgan Style Deep Voice
    const ELEVEN_LABS_CONFIG = {
        apiKey: 'YOUR_ELEVEN_LABS_API_KEY_HERE', // Placeholder for user
        voiceId: 'pNInz6obpgDQGcFmaJgB', // "Adam" - Deep, rugged western voice
        modelId: 'eleven_monolingual_v1',
        // Enhanced voice settings for deeper, slower cowboy-style speech
        voiceSettings: {
            stability: 0.45,      // Slightly less stable for more natural variation
            similarity_boost: 0.8, // Higher similarity to target voice
            style: 0.3,           // Add some expressiveness
            use_speaker_boost: true
        }
    };

    async function playCowboyVoice(text) {
        const soundWaves = document.querySelector('.robot-sound-waves');
        
        // Trigger camera zoom effect
        triggerCameraZoom();
        
        // Fallback to local TTS if no API key
        if (ELEVEN_LABS_CONFIG.apiKey === 'YOUR_ELEVEN_LABS_API_KEY_HERE') {
            console.warn("ElevenLabs API Key missing. Falling back to default voice.");
            if (soundWaves) soundWaves.classList.add('active');
            playArthurMorganStyleVoice(text);
            setTimeout(() => {
                if (soundWaves) soundWaves.classList.remove('active');
                isRobotInteracting = false;
                resetCameraZoom();
            }, 3000);
            return;
        }

        try {
            if (soundWaves) soundWaves.classList.add('active');
            
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_LABS_CONFIG.voiceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': ELEVEN_LABS_CONFIG.apiKey
                },
                body: JSON.stringify({
                    text: text,
                    model_id: ELEVEN_LABS_CONFIG.modelId,
                    voice_settings: ELEVEN_LABS_CONFIG.voiceSettings
                })
            });

            if (!response.ok) throw new Error('ElevenLabs API Error');

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            
            // Slow down audio slightly for more dramatic cowboy effect
            audio.playbackRate = 0.95;
            
            audio.onended = () => {
                if (soundWaves) soundWaves.classList.remove('active');
                isRobotInteracting = false;
                resetCameraZoom();
                URL.revokeObjectURL(audioUrl);
            };

            await audio.play();

        } catch (error) {
            console.error('Error generating voice:', error);
            if (soundWaves) soundWaves.classList.remove('active');
            isRobotInteracting = false;
            resetCameraZoom();
        }
    }
    
    // Enhanced Arthur Morgan-style robotic voice fallback
    function playArthurMorganStyleVoice(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Configure for deep, slow cowboy-style speech
            utterance.pitch = 0.65;  // Much lower pitch for deeper voice
            utterance.rate = 0.82;   // Slower, more deliberate speech
            utterance.volume = 0.75;
            
            // Try to find a deeper male voice
            const voices = speechSynthesis.getVoices();
            const deepVoice = voices.find(voice => 
                voice.name.includes('Male') || 
                voice.name.includes('Daniel') ||
                voice.name.includes('David') ||
                voice.lang === 'en-US' && voice.localService
            );
            
            if (deepVoice) {
                utterance.voice = deepVoice;
            }
            
            // Dramatic pause before speaking
            setTimeout(() => {
                speechSynthesis.speak(utterance);
            }, 400);
        }
    }
    
    // Camera zoom effect on interaction
    function triggerCameraZoom() {
        if (cameraZoomActive) return;
        cameraZoomActive = true;
        
        const container = document.getElementById('robot-canvas-container');
        if (!container) return;
        
        // Apply smooth zoom-in effect
        container.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        container.style.transform = 'scale(1.15)';
        
        // Add subtle glow ring pulse
        const glowRings = container.querySelectorAll('.glow-ring-1, .glow-ring-2');
        glowRings.forEach(ring => {
            ring.style.transition = 'opacity 0.4s ease, transform 0.6s ease';
            ring.style.opacity = '0.8';
            ring.style.transform = 'scale(1.2)';
        });
    }
    
    function resetCameraZoom() {
        const container = document.getElementById('robot-canvas-container');
        if (!container) return;
        
        setTimeout(() => {
            container.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            container.style.transform = 'scale(1)';
            cameraZoomActive = false;
            
            // Reset glow rings
            const glowRings = container.querySelectorAll('.glow-ring-1, .glow-ring-2');
            glowRings.forEach(ring => {
                ring.style.transition = 'opacity 0.6s ease, transform 0.8s ease';
                ring.style.opacity = '0.3';
                ring.style.transform = 'scale(1)';
            });
        }, 500);
    }
    
    function triggerRobotGlowEffect() {
        if (!robotInstance) return;
        
        // Store original emissive intensity
        const originalIntensity = 0.4;
        const peakIntensity = 2.0;
        let time = 0;
        const glowDuration = 2000; // 2 seconds
        
        const glowInterval = setInterval(() => {
            time += 50;
            const progress = time / glowDuration;
            
            // Pulse effect using sine wave
            const intensity = originalIntensity + (peakIntensity - originalIntensity) * Math.sin(progress * Math.PI);
            
            // Apply glow to robot materials
            robotInstance.children.forEach(child => {
                if (child.material && child.material.emissiveIntensity !== undefined) {
                    child.material.emissiveIntensity = intensity;
                }
            });
            
            if (time >= glowDuration) {
                clearInterval(glowInterval);
                // Reset to normal
                robotInstance.children.forEach(child => {
                    if (child.material && child.material.emissiveIntensity !== undefined) {
                        child.material.emissiveIntensity = originalIntensity;
                    }
                });
            }
        }, 50);
    }
    
    function createRobotParticleGlow() {
        const container = document.getElementById('robot-canvas-container');
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create multiple particle rings
        for (let ring = 0; ring < 3; ring++) {
            setTimeout(() => {
                const particleCount = 16;
                const radius = 80 + ring * 30;
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.style.cssText = `
                        position: fixed;
                        width: ${4 - ring}px;
                        height: ${4 - ring}px;
                        background: ${ring === 0 ? '#00f0ff' : ring === 1 ? '#b829dd' : '#0080ff'};
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 99998;
                        box-shadow: 0 0 ${10 - ring * 3}px currentColor;
                    `;
                    
                    const angle = (Math.PI * 2 * i) / particleCount;
                    const startX = centerX + Math.cos(angle) * radius;
                    const startY = centerY + Math.sin(angle) * radius;
                    
                    particle.style.left = startX + 'px';
                    particle.style.top = startY + 'px';
                    
                    document.body.appendChild(particle);
                    
                    // Animate particle outward
                    const tx = Math.cos(angle) * (radius + 60);
                    const ty = Math.sin(angle) * (radius + 60);
                    
                    const animation = particle.animate([
                        { 
                            transform: 'translate(-50%, -50%) scale(1)', 
                            opacity: 1 
                        },
                        { 
                            transform: `translate(calc(-50% + ${tx - startX}px), calc(-50% + ${ty - startY}px)) scale(0)`, 
                            opacity: 0 
                        }
                    ], {
                        duration: 1500 + ring * 500,
                        easing: 'cubic-bezier(0, .9, .57, 1)'
                    });
                    
                    animation.onfinish = () => particle.remove();
                }
            }, ring * 200);
        }
    }
    
    function showChatBubble(message) {
        // Remove existing chat bubble if any
        const existingBubble = document.querySelector('.robot-chat-bubble');
        if (existingBubble) existingBubble.remove();
        
        const container = document.getElementById('robot-canvas-container');
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        
        // Create chat bubble
        const chatBubble = document.createElement('div');
        chatBubble.className = 'robot-chat-bubble';
        chatBubble.innerHTML = `
            <div class="chat-bubble-content">
                <div class="chat-bubble-text">${message}</div>
                <div class="chat-bubble-tail"></div>
            </div>
        `;
        
        // Position bubble to the right of the robot
        chatBubble.style.cssText = `
            position: fixed;
            top: ${rect.top + rect.height / 2 - 40}px;
            left: ${rect.right + 20}px;
            z-index: 99999;
            opacity: 0;
            transform: translateX(-20px);
        `;
        
        document.body.appendChild(chatBubble);
        
        // Animate in
        requestAnimationFrame(() => {
            chatBubble.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            chatBubble.style.opacity = '1';
            chatBubble.style.transform = 'translateX(0)';
        });
        
        // Remove after 4 seconds
        setTimeout(() => {
            chatBubble.style.transition = 'all 0.3s ease';
            chatBubble.style.opacity = '0';
            chatBubble.style.transform = 'translateX(20px)';
            setTimeout(() => chatBubble.remove(), 300);
        }, 4000);
    }
    
    // ========================================
    // TYPING ANIMATION
    // ========================================
    function initTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        
        const lines = [
            "INIT // SYS.01",
            "Loading Rida Portfolio...",
            "AI Systems Online",
            "Welcome, Developer"
        ];
        
        let lineIndex = 0;
        let charIndex = 0;
        
        function typeLine() {
            if (lineIndex < lines.length) {
                if (charIndex < lines[lineIndex].length) {
                    typingElement.textContent += lines[lineIndex][charIndex];
                    charIndex++;
                    setTimeout(typeLine, 40);
                } else {
                    typingElement.innerHTML += '<br>';
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeLine, 200);
                }
            }
        }
        
        typeLine();
    }
    
    // ========================================
    // GUIDED TOUR (AI ASSISTANT)
    // ========================================
    function initGuidedTour() {
        const assistant = document.querySelector('.ai-assistant');
        if (!assistant) return;
        
        // Auto-show assistant after delay on first visit
        if (!sessionStorage.getItem('tourShown')) {
            setTimeout(() => {
                const panel = document.querySelector('.assistant-panel');
                if (panel) {
                    panel.classList.add('active');
                    addGuideMessage("Welcome! I can help you explore this portfolio. Try asking about:");
                    setTimeout(() => {
                        addGuideMessage("- Rida's skills\n- Projects\n- How to contact\n- Or type 'tour' for a guided tour!");
                    }, 800);
                    sessionStorage.setItem('tourShown', 'true');
                }
            }, 5000);
        }
    }
    
    function addGuideMessage(text) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message system';
        msgDiv.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // ========================================
    // GSAP ANIMATIONS (Enhanced)
    // ========================================
    gsap.registerPlugin(ScrollTrigger);
    
    // Section reveals with stagger
    const sections = document.querySelectorAll('.about-section, .skills-section, .timeline-section, .projects-section, .terminal-section, .contact-section');
    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        if (header) {
            gsap.fromTo(header,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        }
    });
    
    // Skill bars animation
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        const skillValue = item.getAttribute('data-skill');
        const fill = item.querySelector('.skill-fill');
        
        ScrollTrigger.create({
            trigger: item,
            start: 'top 90%',
            onEnter: () => {
                gsap.fromTo(item,
                    { opacity: 0, x: -30, rotateY: -10 },
                    { opacity: 1, x: 0, rotateY: 0, duration: 0.6, delay: index * 0.08, ease: 'power3.out' }
                );
                if (fill) {
                    setTimeout(() => {
                        fill.style.width = skillValue + '%';
                    }, 100);
                }
            }
        });
    });
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');
    
    if (timelineProgress) {
        ScrollTrigger.create({
            trigger: '.timeline-container',
            start: 'top 70%',
            end: 'bottom 70%',
            onUpdate: (self) => {
                timelineProgress.style.height = (self.progress * 100) + '%';
            }
        });
    }
    
    timelineItems.forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Project cards with 3D effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        // Initial animation
        gsap.fromTo(card,
            { opacity: 0, y: 60, rotateX: 15 },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            }
        );
        
        // 3D tilt effect on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Stats counter animation
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(stat, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // ========================================
    // FLOATING TECH ICONS ENHANCED
    // ========================================
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        // Random movement
        const randomX = () => (Math.random() - 0.5) * 30;
        const randomY = () => (Math.random() - 0.5) * 30;
        const randomRotate = () => (Math.random() - 0.5) * 20;
        
        gsap.to(item, {
            x: randomX(),
            y: randomY(),
            rotation: randomRotate(),
            duration: 4 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3
        });
    });
    
    // ========================================
    // NAVIGATION
    // ========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scroll
    navLinkItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            if (navLinks) navLinks.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
            
            navLinkItems.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Update active nav on scroll
    const sectionElements = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 150;
        
        sectionElements.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // ========================================
    // ENHANCED TERMINAL
    // ========================================
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    
    let commandHistory = [];
    let historyIndex = -1;

    const commands = {
        help: {
            response: `<span class="neon-cyan">Available Commands:</span>
  <span class="cmd">help</span>     - Show this help
  <span class="cmd">about</span>    - About Rida
  <span class="cmd">skills</span>   - Technical skills
  <span class="cmd">projects</span> - View projects
  <span class="cmd">contact</span>  - Contact info
  <span class="cmd">ls</span>       - List system files
  <span class="cmd">cat</span>      - Read a file
  <span class="cmd">social</span>   - Social links
  <span class="cmd">matrix</span>   - Enter the matrix
  <span class="cmd">hack</span>     - Try to hack
  <span class="cmd">clear</span>    - Clear terminal`
        },
        ls: {
            response: `<span class="neon-purple">Directory: /home/visitor/portfolio</span>
  about.txt
  skills.log
  projects.db
  contact.key
  secret_module.o`
        },
        cat: {
            action: (arg) => {
                if (!arg) return `<span class="error">Usage: cat [filename]</span>`;
                const files = {
                    'about.txt': 'Rida: A Web Developer building the future.',
                    'skills.log': 'HTML5, CSS3, JS, PHP, React, SQL, Linux, C.',
                    'projects.db': 'Smart Archive, Fitness Platform, Clinic Management.',
                    'contact.key': 'Email: contact@rida.ai',
                    'secret_module.o': 'Binary data... [ENCRYPTED]'
                };
                return files[arg] || `<span class="error">File not found: ${arg}</span>`;
            }
        },
        about: {
            response: `<span class="neon-purple">[ IDENTITY PROFILE ]</span>

Name: Rida Benmazouzu
Role: Web Developer
Status: <span class="neon-green">ACTIVE</span>

A passionate web developer building modern applications.
Started with C programming and Linux, now creating
full-stack solutions while exploring cybersecurity.

<span class="neon-cyan">// The code is strong with this one.</span>`
        },
        skills: {
            response: `<span class="neon-purple">[ SKILL MATRIX ]</span>

<span class="skill-bar">HTML5       [██████████] 95%</span>
<span class="skill-bar">CSS3        [█████████░] 90%</span>
<span class="skill-bar">JavaScript  [████████░░] 85%</span>
<span class="skill-bar">PHP         [████████░░] 80%</span>
<span class="skill-bar">React       [███████░░░] 75%</span>
<span class="skill-bar">SQL         [████████░░] 85%</span>
<span class="skill-bar">Linux       [██████░░░░] 70%</span>
<span class="skill-bar">C           [███████░░░] 75%</span>

<span class="neon-cyan">// Continuously evolving...</span>`
        },
        projects: {
            response: `<span class="neon-purple">[ DEPLOYED SYSTEMS ]</span>

<span class="neon-cyan">[01]</span> Smart Archive
     Digital document management platform
     Stack: PHP, SQL, JavaScript

<span class="neon-cyan">[02]</span> Fitness Platform  
     Modern workout and trainer platform
     Stack: React, Node.js, CSS3

<span class="neon-cyan">[03]</span> Clinic Management
     Online appointment booking system
     Stack: HTML5, PHP, MySQL

<span class="neon-green">// All systems operational</span>`
        },
        contact: {
            response: `<span class="neon-purple">[ COMMUNICATION CHANNELS ]</span>

<span class="neon-cyan">Email:</span>    contact@rida.ai
<span class="neon-cyan">GitHub:</span>   github.com/rida
<span class="neon-cyan">LinkedIn:</span> linkedin.com/in/rida

Use the contact form to send a direct message.

<span class="neon-green">// Connection established</span>`
        },
        social: {
            response: `<span class="neon-purple">[ SOCIAL NETWORK ]</span>

<span class="neon-cyan">GitHub:</span>    Explore my repositories
<span class="neon-cyan">LinkedIn:</span>  Professional network
<span class="neon-cyan">Twitter:</span>   Tech thoughts & updates

<span class="neon-green">// Follow the digital trail</span>`
        },
        matrix: {
            response: `<span class="neon-green">
 ████████╗██╗  ██╗███████╗    ███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗
 ╚══██╔══╝██║  ██║██╔════╝    ████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝
    ██║   ███████║█████╗      ██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝ 
    ██║   ██╔══██║██╔══╝      ██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗ 
    ██║   ██║  ██║███████╗    ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗
    ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
</span>
<span class="neon-cyan">// There is no spoon...</span>
<span class="neon-purple">// Press Ctrl+Shift+D for developer mode</span>`
        },
        hack: {
            action: () => {
                let count = 0;
                const lines = [
                    'Bypassing firewall...',
                    'Injecting SQL script...',
                    'Cracking RSA-4096...',
                    'Dumping database...',
                    'ACCESS GRANTED (127.0.0.1)'
                ];
                
                const interval = setInterval(() => {
                    if (count < lines.length) {
                        const line = document.createElement('div');
                        line.className = 'term-line';
                        line.innerHTML = `<span class="neon-green">${lines[count]}</span>`;
                        terminalOutput.appendChild(line);
                        terminalOutput.scrollTop = terminalOutput.scrollHeight;
                        count++;
                    } else {
                        clearInterval(interval);
                    }
                }, 400);
                return `<span class="neon-cyan">Initiating sequence...</span>`;
            }
        },
        secret: {
            response: `<span class="neon-purple">[ SECRET FOUND ]</span>

<span class="neon-cyan">Congratulations, curious one!</span>

You found the secret command.
Here's a hidden tip:

<span class="neon-green">Press Ctrl+Shift+D for Developer Mode</span>

<span class="neon-purple">// Curiosity is the key to greatness</span>`
        },
        clear: {
            action: () => {
                if (terminalOutput) terminalOutput.innerHTML = '';
            }
        }
    };
    
    if (terminalInput && terminalOutput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const fullCommand = terminalInput.value.trim();
                if (fullCommand === '') return;
                
                commandHistory.push(fullCommand);
                historyIndex = commandHistory.length;
                
                const parts = fullCommand.split(' ');
                const command = parts[0].toLowerCase();
                const arg = parts.slice(1).join(' ');
                
                const commandLine = document.createElement('div');
                commandLine.className = 'term-line';
                commandLine.innerHTML = `<span class="input-prompt">visitor@rida:~$</span> <span class="command">${escapeHtml(fullCommand)}</span>`;
                terminalOutput.appendChild(commandLine);
                
                if (commands[command]) {
                    if (commands[command].action) {
                        const actionResult = commands[command].action(arg);
                        if (actionResult) {
                            const responseLine = document.createElement('div');
                            responseLine.className = 'term-line';
                            responseLine.innerHTML = `<span class="term-text">${actionResult}</span>`;
                            terminalOutput.appendChild(responseLine);
                        }
                    } else {
                        const responseLine = document.createElement('div');
                        responseLine.className = 'term-line';
                        responseLine.innerHTML = `<span class="term-text" style="white-space: pre-line">${commands[command].response}</span>`;
                        terminalOutput.appendChild(responseLine);
                    }
                } else {
                    const errorLine = document.createElement('div');
                    errorLine.className = 'term-line';
                    errorLine.innerHTML = `<span class="error">Command not found: ${escapeHtml(command)}</span><br><span class="neon-cyan">Type 'help' for available commands.</span>`;
                    terminalOutput.appendChild(errorLine);
                }
                
                terminalInput.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            } else if (e.key === 'ArrowUp') {
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                }
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
                e.preventDefault();
            }
        });
        
        document.querySelector('.terminal-window')?.addEventListener('click', () => {
            terminalInput.focus();
        });
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // ========================================
    // AI ASSISTANT CHATBOT (Enhanced)
    // ========================================
    const assistantToggle = document.querySelector('.assistant-toggle');
    const assistantPanel = document.querySelector('.assistant-panel');
    const assistantClose = document.querySelector('.assistant-close');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.querySelector('.send-message');
    const chatMessages = document.getElementById('chat-messages');
    
    if (assistantToggle && assistantPanel) {
        assistantToggle.addEventListener('click', () => {
            assistantPanel.classList.toggle('active');
            if (assistantPanel.classList.contains('active') && chatInput) {
                chatInput.focus();
            }
        });
    }
    
    if (assistantClose && assistantPanel) {
        assistantClose.addEventListener('click', () => {
            assistantPanel.classList.remove('active');
        });
    }
    
    const chatResponses = {
        'tour': 'Starting guided tour! First, check out the About section to learn about Rida. Then explore Skills to see technical capabilities. The Projects section showcases deployed systems. Try the Terminal for a hacker experience!',
        'hello': 'Hello! Welcome to Rida\'s portfolio. How can I assist you today?',
        'hi': 'Hi there! I\'m here to help you navigate this portfolio.',
        'hey': 'Hey! What would you like to know about Rida?',
        'help': 'I can tell you about Rida\'s skills, projects, experience, or how to contact. Try: "show skills", "list projects", or "take a tour"!',
        'skills': 'Rida is skilled in HTML5 (95%), CSS3 (90%), JavaScript (85%), PHP (80%), React (75%), SQL (85%), Linux (70%), and C (75%). Strongest in frontend development!',
        'projects': 'Three main projects: 1) Smart Archive - document management, 2) Fitness Platform - workout app, 3) Clinic Management - appointments. Want details on any?',
        'experience': 'Rida trained at 1337 Coding School (42 Network), mastering C and Linux. Now focused on web development and cybersecurity.',
        'education': '1337 Coding School - part of 42 Network. Intensive peer-to-peer learning in C, Linux, and software engineering.',
        'contact': 'Reach Rida via the contact form, GitHub, or LinkedIn. Scroll to the Contact section or type "navigate contact".',
        'about': 'Rida is a passionate Web Developer who started with C and Linux, now building modern web apps while exploring cybersecurity.',
        'navigate': 'I can help you navigate! Try: "navigate about", "navigate skills", "navigate projects", "navigate contact".',
        'cybersecurity': 'Rida is exploring cybersecurity alongside web development - building secure, resilient systems is the goal!',
        'secret': 'Psst... try pressing Ctrl+Shift+D for a surprise! Also check the terminal commands.',
        'default': 'Interesting! Try asking about skills, projects, experience, or say "tour" for a guided experience.'
    };
    
    function addChatMessage(text, isUser = false) {
        if (!chatMessages) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'system'}`;
        messageDiv.innerHTML = `<p>${escapeHtml(text)}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getChatResponse(input) {
        const lowerInput = input.toLowerCase();
        
        // Navigation commands
        if (lowerInput.includes('navigate')) {
            const sections = ['about', 'skills', 'projects', 'contact', 'terminal', 'timeline'];
            for (const section of sections) {
                if (lowerInput.includes(section)) {
                    document.querySelector(`#${section}`)?.scrollIntoView({ behavior: 'smooth' });
                    return `Navigating to ${section.charAt(0).toUpperCase() + section.slice(1)} section...`;
                }
            }
        }
        
        for (const [key, response] of Object.entries(chatResponses)) {
            if (lowerInput.includes(key)) {
                return response;
            }
        }
        return chatResponses['default'];
    }
    
    function handleChatSubmit() {
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;
        
        addChatMessage(text, true);
        chatInput.value = '';
        
        setTimeout(() => {
            const response = getChatResponse(text);
            addChatMessage(response);
        }, 400 + Math.random() * 400);
    }
    
    if (sendMessage) {
        sendMessage.addEventListener('click', handleChatSubmit);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleChatSubmit();
            }
        });
    }
    
    // ========================================
    // CONTACT FORM
    // ========================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('.transmit-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span class="btn-text">TRANSMISSION SENT</span> <i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 2500);
        });
    }
    
    // ========================================
    // SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('zoom-fade');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all project cards and skill items
    document.querySelectorAll('.project-card, .skill-item, .timeline-card, .stat-card').forEach(el => {
        sectionObserver.observe(el);
    });
    
    // Section entrance animation observer
    const sectionEntryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    // Observe all main sections
    document.querySelectorAll('.about-section, .skills-section, .timeline-section, .projects-section, .terminal-section, .contact-section').forEach(section => {
        sectionEntryObserver.observe(section);
    });
    
    // ========================================
    // PARALLAX EFFECTS (Desktop Only)
    // ========================================
    if (!isTouchDevice) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const parallaxElements = document.querySelectorAll('.glow-orb');
                    
                    parallaxElements.forEach((el, index) => {
                        const speed = 0.3 + (index * 0.1);
                        el.style.transform = `translateY(${scrolled * speed}px)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // ========================================
    // GITHUB API INTEGRATION
    // ========================================
    async function fetchGithubStats() {
        const username = 'RidaBenm'; // Using 'RidaBenm' as likely username based on 'Rida'
        const repoEl = document.getElementById('github-repos');
        
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (response.ok) {
                const data = await response.json();
                if (repoEl) {
                    repoEl.setAttribute('data-count', data.public_repos);
                    // Re-trigger counter animation if already scrolled past
                    repoEl.textContent = data.public_repos;
                }
            }
        } catch (error) {
            console.error('GitHub API unreachable:', error);
        }
    }
    fetchGithubStats();

    // ========================================
    // PROJECT MODAL LOGIC
    // ========================================
    const modal = document.getElementById('project-modal');
    const modalClose = modal?.querySelector('.modal-close');
    const modalBackdrop = modal?.querySelector('.modal-backdrop');
    
    function openProjectModal(projectName) {
        const data = projectData[projectName];
        if (!data || !modal) return;
        
        // Inject data
        const titleEl = modal.querySelector('#modal-title');
        if (titleEl) {
            titleEl.textContent = projectName;
            titleEl.setAttribute('data-text', projectName);
        }
        
        const tagsEl = modal.querySelector('#modal-tags');
        if (tagsEl) {
            tagsEl.innerHTML = data.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
        }
        
        const visualEl = modal.querySelector('#modal-visual');
        if (visualEl) {
            visualEl.innerHTML = `<i class="${data.icon}"></i>`;
        }
        
        const descEl = modal.querySelector('#modal-desc');
        if (descEl) descEl.textContent = data.desc;
        
        const challengesEl = modal.querySelector('#modal-challenges');
        if (challengesEl) {
            challengesEl.innerHTML = data.challenges.map(c => `<li>${c}</li>`).join('');
        }
        
        const solutionsEl = modal.querySelector('#modal-solutions');
        if (solutionsEl) solutionsEl.textContent = data.solutions;
        
        const repoLink = modal.querySelector('#modal-repo-link');
        if (repoLink) repoLink.href = data.repo;
        
        const liveLink = modal.querySelector('#modal-live-link');
        if (liveLink) liveLink.href = data.live;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeProjectModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Attach to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent if clicking the link directly
            if (e.target.closest('.project-link')) return;
            
            const projectName = card.querySelector('.project-name')?.textContent;
            if (projectName) openProjectModal(projectName);
        });
    });
    
    modalClose?.addEventListener('click', closeProjectModal);
    modalBackdrop?.addEventListener('click', closeProjectModal);
    
    // ========================================
    // SYSTEM CONTROLS LOGIC
    // ========================================
    const safeModeBtn = document.getElementById('toggle-safe-mode');
    const langBtn = document.getElementById('toggle-language');
    
    safeModeBtn?.addEventListener('click', () => {
        document.body.classList.toggle('safe-mode');
        const icon = safeModeBtn.querySelector('i');
        if (document.body.classList.contains('safe-mode')) {
            icon.className = 'fas fa-eye';
            addGuideMessage("Safe Mode Active: High-intensity visuals disabled.");
        } else {
            icon.className = 'fas fa-eye-slash';
            addGuideMessage("Legacy Visuals Restored.");
        }
    });
    
    let currentLang = 'EN';
    langBtn?.addEventListener('click', () => {
        currentLang = currentLang === 'EN' ? 'FR' : 'EN';
        const langText = langBtn.querySelector('.lang-text');
        if (langText) langText.textContent = currentLang === 'EN' ? 'FR' : 'EN';
        
        // Update all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                const translation = translations[currentLang][key];
                
                // If it has a span.btn-text, update only that
                const btnText = el.querySelector('.btn-text');
                if (btnText) {
                    btnText.textContent = translation;
                } else {
                    el.textContent = translation;
                }
                
                // Update data-text for glitch effects
                if (el.hasAttribute('data-text')) {
                    el.setAttribute('data-text', translation);
                }
            }
        });
        
        addGuideMessage(`Language switched to ${currentLang === 'EN' ? 'English' : 'French'}.`);
        
        // Update brand for fun
        const brand = document.querySelector('.brand-text');
        if (brand) {
            brand.innerHTML = currentLang === 'FR' ? 'RIDA<span class="brand-dot">.</span>IA' : 'RIDA<span class="brand-dot">.</span>AI';
        }
    });

});
