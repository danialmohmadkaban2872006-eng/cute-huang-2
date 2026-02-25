import { useEffect, useRef } from 'react';

export default function ParallaxStarfield() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    // Three layers of stars for parallax
    const layers = [
      { stars: [], speed: 0.01, size: [0.5, 1.2], count: 200, color: 'rgba(255,255,255,' },
      { stars: [], speed: 0.025, size: [1, 2], count: 100, color: 'rgba(240,230,255,' },
      { stars: [], speed: 0.05, size: [1.5, 3], count: 40, color: 'rgba(183,110,121,' },
    ];

    // Rose gold shimmer stars
    const shimmerStars = [];
    for (let i = 0; i < 15; i++) {
      shimmerStars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    layers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        layer.stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          origX: 0,
          origY: 0,
          size: Math.random() * (layer.size[1] - layer.size[0]) + layer.size[0],
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        });
        layers[layers.indexOf(layer)].stars[i].origX = layers[layers.indexOf(layer)].stars[i].x;
        layers[layers.indexOf(layer)].stars[i].origY = layers[layers.indexOf(layer)].stars[i].y;
      }
    });

    const handleMouse = (e) => {
      mouse.current = {
        x: (e.clientX - W / 2) / W,
        y: (e.clientY - H / 2) / H,
      };
    };

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('resize', handleResize);

    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Deep space gradient background
      const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H));
      bg.addColorStop(0, '#0a0d1f');
      bg.addColorStop(0.5, '#050818');
      bg.addColorStop(1, '#020408');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Nebula cloud effect
      ctx.save();
      const nebulaGrad = ctx.createRadialGradient(W * 0.3, H * 0.4, 0, W * 0.3, H * 0.4, W * 0.4);
      nebulaGrad.addColorStop(0, 'rgba(183,110,121,0.04)');
      nebulaGrad.addColorStop(0.5, 'rgba(26,5,51,0.05)');
      nebulaGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, W, H);

      const nebulaGrad2 = ctx.createRadialGradient(W * 0.7, H * 0.6, 0, W * 0.7, H * 0.6, W * 0.35);
      nebulaGrad2.addColorStop(0, 'rgba(0,212,170,0.04)');
      nebulaGrad2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGrad2;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // Draw parallax star layers
      layers.forEach(layer => {
        layer.stars.forEach(star => {
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = 0.6 + Math.sin(star.twinklePhase) * 0.4;

          const offsetX = mouse.current.x * layer.speed * W;
          const offsetY = mouse.current.y * layer.speed * H;

          const px = ((star.x + offsetX) % W + W) % W;
          const py = ((star.y + offsetY) % H + H) % H;

          ctx.beginPath();
          ctx.arc(px, py, star.size, 0, Math.PI * 2);
          ctx.fillStyle = layer.color + (star.opacity * twinkle) + ')';
          ctx.fill();

          // Add cross flare to bigger stars
          if (star.size > 2) {
            ctx.strokeStyle = layer.color + (0.3 * twinkle) + ')';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(px - star.size * 3, py);
            ctx.lineTo(px + star.size * 3, py);
            ctx.moveTo(px, py - star.size * 3);
            ctx.lineTo(px, py + star.size * 3);
            ctx.stroke();
          }
        });
      });

      // Rose gold shimmer stars
      shimmerStars.forEach(s => {
        s.phase += 0.03;
        const glow = 0.4 + Math.sin(s.phase) * 0.6;
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 4);
        grad.addColorStop(0, `rgba(183,110,121,${glow})`);
        grad.addColorStop(0.5, `rgba(183,110,121,${glow * 0.3})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      frame++;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
