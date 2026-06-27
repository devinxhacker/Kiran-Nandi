class Particle {
    constructor(x, y, color, velocity, life) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.life = life;
        this.maxLife = life;
        this.opacity = 1;
        this.size = Math.random() * 3 + 2;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.y += 0.05; // Gravity
        this.life--;
        this.opacity = this.life / this.maxLife;
        this.size *= 0.98;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
    }
}

class ParticleEngine {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.pool = [];
        this.container = document.getElementById('cursor-particles');
        
        if (!this.container) return;

        this.canvas.style.position = 'fixed';
        this.canvas.style.inset = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9998';
        this.container.appendChild(this.canvas);

        window.addEventListener('resize', () => this.resize());
        this.resize();
        this.animate();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width * window.devicePixelRatio;
        this.canvas.height = this.height * window.devicePixelRatio;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    createParticle(x, y, color, isExplosion = false) {
        const velocity = isExplosion 
            ? { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 }
            : { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 };
        
        const life = isExplosion ? Math.random() * 30 + 20 : Math.random() * 20 + 10;
        this.particles.push(new Particle(x, y, color, velocity, life));
    }

    explode(x, y, color) {
        for (let i = 0; i < 25; i++) {
            this.createParticle(x, y, color, true);
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            p.draw(this.ctx);
            if (p.life <= 0) this.particles.splice(i, 1);
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

window.ParticleEngine = ParticleEngine;
