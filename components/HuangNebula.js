import { useEffect, useRef } from 'react';
import { useLang } from './LanguageContext';

export default function HuangNebula() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = 800;
    const H = canvas.height = 500;

    // Particle system for nebula
    const PARTICLES = 600;
    const particles = Array.from({ length: PARTICLES }, () => {
      const angle = Math.random() * Math.PI * 2;
      const r = 50 + Math.random() * 180;
      const cx = W / 2, cy = H / 2;
      return {
        x: cx + Math.cos(angle) * r * (0.8 + Math.random() * 0.4),
        y: cy + Math.sin(angle) * r * (0.5 + Math.random() * 0.3),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.15,
        life: Math.random(),
        maxLife: 0.005 + Math.random() * 0.01,
        size: Math.random() * 4 + 0.5,
        hue: Math.random() > 0.6 ? 340 : Math.random() > 0.5 ? 200 : 150, // rose, teal, green
        sat: 60 + Math.random() * 40,
        brightness: 50 + Math.random() * 30,
        angle,
        orbitSpeed: (Math.random() - 0.5) * 0.003,
        orbitRadius: r,
        wobble: Math.random() * Math.PI * 2,
      };
    });

    let frame = 0;

    function draw() {
      // Fade effect
      ctx.fillStyle = 'rgba(5,8,24,0.04)';
      ctx.fillRect(0, 0, W, H);

      frame++;

      particles.forEach(p => {
        p.wobble += 0.02;
        p.angle += p.orbitSpeed;
        p.life += p.maxLife;

        if (p.life > 1) p.life = 0;

        const cx = W / 2, cy = H / 2;
        const wobbleX = Math.sin(p.wobble) * 8;
        const wobbleY = Math.cos(p.wobble * 0.7) * 4;

        const px = cx + Math.cos(p.angle) * p.orbitRadius + wobbleX;
        const py = cy + Math.sin(p.angle) * p.orbitRadius * 0.5 + wobbleY;

        const alpha = Math.sin(p.life * Math.PI) * 0.7;

        ctx.beginPath();
        const grad = ctx.createRadialGradient(px, py, 0, px, py, p.size);
        grad.addColorStop(0, `hsla(${p.hue},${p.sat}%,${p.brightness}%,${alpha})`);
        grad.addColorStop(1, `hsla(${p.hue},${p.sat}%,${p.brightness}%,0)`);
        ctx.fillStyle = grad;
        ctx.arc(px, py, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Central glow — the core of the Huang nebula
      const coreGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 80);
      coreGrad.addColorStop(0, `rgba(255,220,200,${0.06 + Math.sin(frame * 0.02) * 0.03})`);
      coreGrad.addColorStop(0.5, `rgba(183,110,121,${0.04})`);
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, 80, 0, Math.PI * 2);
      ctx.fill();

      // Star at center
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, 4 + Math.sin(frame * 0.05) * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,240,220,${0.6 + Math.sin(frame * 0.07) * 0.3})`;
      ctx.fill();

      // Cross flare
      const flareAlpha = 0.15 + Math.sin(frame * 0.04) * 0.1;
      ctx.strokeStyle = `rgba(255,240,220,${flareAlpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(W / 2 - 40, H / 2);
      ctx.lineTo(W / 2 + 40, H / 2);
      ctx.moveTo(W / 2, H / 2 - 40);
      ctx.lineTo(W / 2, H / 2 + 40);
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section id="nebula" style={{ minHeight: '100vh', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌸</div>
        <h2 style={{
          fontFamily: 'Cinzel',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#B76E79',
          textShadow: '0 0 30px rgba(183,110,121,0.7)',
          letterSpacing: '0.2em',
          marginBottom: '0.5rem',
        }}>
          The Huang Nebula
        </h2>
        <p style={{ color: 'rgba(240,230,255,0.6)', fontStyle: 'italic', marginBottom: '2rem' }}>
          A celestial formation born in your honor — generative art, unique and eternal
        </p>

        <div className="glass-card" style={{ padding: '1rem', overflow: 'hidden' }}>
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '12px',
            }}
          />
        </div>

        <div className="glass-card" style={{ padding: '2rem', marginTop: '2rem', borderColor: 'rgba(183,110,121,0.4)' }}>
          <p style={{ fontStyle: 'italic', lineHeight: '1.9', color: 'rgba(240,230,255,0.85)', fontSize: '1.05rem' }}>
            "Nebulae are the nurseries of stars — vast clouds of gas and dust where gravity slowly gathers matter 
            until fusion ignites. The Huang Nebula, named for you, births stars of rose gold and teal aurora. 
            Each particle you see is a future solar system, waiting for planets, life, and perhaps another soul 
            as curious as yours."
          </p>
          <p style={{ color: '#B76E79', marginTop: '1rem', fontSize: '0.9rem' }}>— Zara</p>
        </div>
      </div>
    </section>
  );
}
