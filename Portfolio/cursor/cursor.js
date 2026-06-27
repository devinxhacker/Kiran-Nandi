const CONFIG = {
    cursorSize: 32,
    followSpeed: 0.15,
    coreFollowSpeed: 0.25,
    glowSize: 150,
    particleCount: 2,
    trailLife: 20,
    magneticStrength: 0.3,
    morphSpeed: 0.2,
    stretchMultiplier: 0.1,
    clickParticles: 25,
    maxScale: 1.5,
    minScale: 0.8
};

class PhysicsEngine {
    static lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }
}

class CursorEngine {
    constructor() {
        this.mouse = { x: 0, y: 0, vx: 0, vy: 0, lastX: 0, lastY: 0 };
        this.core = { x: 0, y: 0 };
        this.outline = { x: 0, y: 0, w: CONFIG.cursorSize, h: CONFIG.cursorSize, r: 50 };
        this.glow = { x: 0, y: 0 };

        this.dom = {
            cursor: document.getElementById('cursor'),
            core: document.querySelector('.cursor-core'),
            outline: document.querySelector('.cursor-outline'),
            glow: document.querySelector('.cursor-glow'),
        };

        if (!this.dom.cursor) return;

        this.init();
    }

    init() {
        if (this.isTouchDevice()) {
            this.dom.cursor.style.display = 'none';
            return;
        }

        this.dom.cursor.style.display = 'block';
        this.setupListeners();
        this.startAnimation();
        this.setupMorphing();
        this.setupMagnetics();
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    setupListeners() {
        window.addEventListener('pointermove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        }, { passive: true });

        window.addEventListener('mousedown', () => {
            this.dom.outline.classList.add('cursor-pressed');
            if (window.ParticleEngine) {
                const engine = window.particleEngineInstance;
                if (engine) engine.explode(this.mouse.x, this.mouse.y, '#fff');
            }
        });

        window.addEventListener('mouseup', () => {
            this.dom.outline.classList.remove('cursor-pressed');
        });
    }

    setupMorphing() {
        const interactives = 'a, button, .btn, .info-card, .project-card, .achievement-card, input, textarea, img, svg, canvas, .nav-content a, .overlay-content a';
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(interactives)) {
                const rect = e.target.getBoundingClientRect();
                // Instead of matching exact size, we slightly increase the radius based on element size
                const sizeFactor = Math.max(rect.width, rect.height) * 0.1;
                this.outline.targetR = 50 + sizeFactor;
                this.outline.targetW = CONFIG.cursorSize + (sizeFactor * 2);
                this.outline.targetH = CONFIG.cursorSize + (sizeFactor * 2);
                this.dom.outline.classList.add('cursor-hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches(interactives)) {
                this.outline.targetW = CONFIG.cursorSize;
                this.outline.targetH = CONFIG.cursorSize;
                this.outline.targetR = 50;
                this.dom.outline.classList.remove('cursor-hover');
            }
        });
    }

    setupMagnetics() {
        const magneticElements = document.querySelectorAll('.btn, .social a, .nav-content a');
        magneticElements.forEach(el => {
            el.classList.add('magnetic-element');
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distC_X = e.clientX - centerX;
                const distC_Y = e.clientY - centerY;

                const moveX = distC_X * CONFIG.magneticStrength;
                const moveY = distC_Y * CONFIG.magneticStrength;

                el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = `translate3d(0, 0, 0)`;
            });
        });
    }

    startAnimation() {
        let lastTime = 0;
        const animate = (time) => {
            const dt = time - lastTime;
            lastTime = time;

            // Velocity calculation
            this.mouse.vx = this.mouse.x - this.mouse.lastX;
            this.mouse.vy = this.mouse.y - this.mouse.lastY;
            this.mouse.lastX = this.mouse.x;
            this.mouse.lastY = this.mouse.y;

            // Physics: LERP
            this.core.x = PhysicsEngine.lerp(this.core.x, this.mouse.x, CONFIG.coreFollowSpeed);
            this.outline.x = PhysicsEngine.lerp(this.outline.x, this.mouse.x, CONFIG.followSpeed);
            this.outline.y = PhysicsEngine.lerp(this.outline.y, this.mouse.y, CONFIG.followSpeed);
            this.core.y = PhysicsEngine.lerp(this.core.y, this.mouse.y, CONFIG.coreFollowSpeed);
            this.glow.x = PhysicsEngine.lerp(this.glow.x || 0, this.mouse.x, 0.1);
            this.glow.y = PhysicsEngine.lerp(this.glow.y || 0, this.mouse.y, 0.1);

            // Velocity Stretch
            const speed = Math.sqrt(this.mouse.vx ** 2 + this.mouse.vy ** 2);
            const stretch = 1 + speed * CONFIG.stretchMultiplier * 0.1;
            const angle = Math.atan2(this.mouse.vy, this.mouse.vx) * 180 / Math.PI;

            // Morphing Interpolation
            this.outline.w = PhysicsEngine.lerp(this.outline.w || CONFIG.cursorSize, this.outline.targetW || CONFIG.cursorSize, CONFIG.morphSpeed);
            this.outline.h = PhysicsEngine.lerp(this.outline.h || CONFIG.cursorSize, this.outline.targetH || CONFIG.cursorSize, CONFIG.morphSpeed);
            this.outline.r = PhysicsEngine.lerp(this.outline.r || 50, this.outline.targetR || 50, CONFIG.morphSpeed);

            // Apply Transforms
            this.dom.core.style.transform = `translate3d(${this.core.x}px, ${this.core.y}px, 0) translate(-50%, -50%)`;
            this.dom.outline.style.transform = `translate3d(${this.outline.x}px, ${this.outline.y}px, 0) translate(-50%, -50%) scale(${stretch}) rotate(${angle}deg)`;
            this.dom.glow.style.transform = `translate3d(${this.glow.x}px, ${this.glow.y}px, 0) translate(-50%, -50%)`;

            this.dom.outline.style.width = `${this.outline.w}px`;
            this.dom.outline.style.height = `${this.outline.h}px`;
            this.dom.outline.style.borderRadius = `${this.outline.r}px`;

            // Glow Color Cycle
            const hue = (Date.now() / 50) % 360;
            this.dom.glow.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 70%, 0.3) 0%, transparent 70%)`;

            // Particles
            if (window.particleEngineInstance && this.mouse.vx !== 0) {
                const colors = ['#6ae4ff', '#ff7ad9', '#97ff9b', '#ffe763'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                window.particleEngineInstance.createParticle(this.mouse.x, this.mouse.y, color);
            }

            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    window.particleEngineInstance = new ParticleEngine();
    new CursorEngine();
});


const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let outlineX = mouseX;
let outlineY = mouseY;

const speed = 0.18;

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});

function animate() {

    outlineX += (mouseX - outlineX) * speed;
    outlineY += (mouseY - outlineY) * speed;

    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";

    outline.style.left = outlineX + "px";
    outline.style.top = outlineY + "px";

    requestAnimationFrame(animate);

}

const hoverTargets = document.querySelectorAll(
    'a,button,.btn,.card,.project,.service,.social-link,input,textarea'
);

hoverTargets.forEach(item => {

    item.addEventListener("mouseenter", () => {

        cursor.classList.add("hover");

    });

    item.addEventListener("mouseleave", () => {

        cursor.classList.remove("hover");

    });

});

document.querySelectorAll("p,h1,h2,h3,h4,h5,h6,span").forEach(el => {

    el.addEventListener("mouseenter", () => {

        cursor.classList.add("text");

    });

    el.addEventListener("mouseleave", () => {

        cursor.classList.remove("text");

    });

});

document.addEventListener("mousedown", () => {

    cursor.classList.add("click");

});

document.addEventListener("mouseup", () => {

    cursor.classList.remove("click");

});

document.addEventListener("mouseleave", () => {

    cursor.style.opacity = "0";

});

document.addEventListener("mouseenter", () => {

    cursor.style.opacity = "1";

});

document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("mousemove", (e) => {

        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.25}px,${y * 0.25}px)`;

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "translate(0,0)";

    });

});

document.addEventListener("click", (e) => {

    const ripple = document.createElement("span");

    ripple.className = "cursor-ripple";

    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";

    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

});

animate();