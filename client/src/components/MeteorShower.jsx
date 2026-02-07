import { useEffect, useRef } from 'react';

const MeteorShower = () => {
    const canvasRef = useRef(null);
    const meteorsRef = useRef([]);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Store canvas dimensions
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Meteor class
        class MeteorClass {
            constructor() {
                this.x = 0;
                this.y = 0;
                this.vx = 0;
                this.vy = 0;
                this.speed = 0;
                this.length = 0;
                this.thickness = 0;
                this.opacity = 0;
                this.fadeSpeed = 0;
                this.reset();
            }

            reset() {
                // Start from top-right area
                this.x = Math.random() * canvasWidth * 0.8 + canvasWidth * 0.2;
                this.y = Math.random() * canvasHeight * 0.3 - 100;

                // Angle: falling from top-right to bottom-left (around 45-60 degrees)
                const angle = Math.PI / 4 + Math.random() * 0.3;

                // SLOW speed for gentle falling
                this.speed = Math.random() * 1.5 + 0.5;

                this.vx = -Math.cos(angle) * this.speed;
                this.vy = Math.sin(angle) * this.speed;

                this.length = Math.random() * 100 + 60;
                this.thickness = Math.random() * 2 + 1.5;
                this.opacity = Math.random() * 0.4 + 0.6;
                this.fadeSpeed = Math.random() * 0.003 + 0.00002;
            }

            update(canvasH) {
                this.x += this.vx;
                this.y += this.vy;
                this.opacity -= this.fadeSpeed;

                // Reset if out of bounds or faded
                if (this.x < -this.length || this.y > canvasH + this.length || this.opacity <= 0) {
                    this.reset();
                }
            }

            draw(ctx) {
                const tailX = this.x - this.vx * (this.length / this.speed);
                const tailY = this.y - this.vy * (this.length / this.speed);

                // WHITE gradient for meteor trail
                const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
                gradient.addColorStop(0.2, `rgba(255, 255, 255, ${this.opacity * 0.8})`);
                gradient.addColorStop(0.6, `rgba(255, 255, 255, ${this.opacity * 0.3})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(tailX, tailY);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = this.thickness;
                ctx.lineCap = 'round';
                ctx.stroke();

                // WHITE glow effect at the head
                const glowGradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.thickness * 4
                );
                glowGradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.9})`);
                glowGradient.addColorStop(0.4, `rgba(255, 255, 255, ${this.opacity * 0.4})`);
                glowGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.thickness * 4, 0, Math.PI * 2);
                ctx.fillStyle = glowGradient;
                ctx.fill();

                // Bright white core
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.thickness, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Initialize meteors - fewer for more elegant look
        const meteorCount = 15;
        meteorsRef.current = Array.from({ length: meteorCount }, () => new MeteorClass());

        // Animation loop
        const animate = () => {
            // Clear with black background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw meteors
            meteorsRef.current.forEach((meteor) => {
                // Random spawn chance - slower spawn rate
                if (Math.random() < 0.008 && meteor.opacity <= 0) {
                    meteor.reset();
                }

                if (meteor.opacity > 0) {
                    meteor.update(canvas.height);
                    meteor.draw(ctx);
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#000000',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
};

export default MeteorShower;
