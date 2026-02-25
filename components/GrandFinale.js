import { useEffect, useRef } from 'react';

export default function GrandFinale() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = window.innerWidth;
    const H = canvas.height = 400;

    const particles = [];
    function spawnParticle() {
      const x = Math.random() * W;
      const colors = ['#B76E79', '#D4919A', '#00D4AA', '#FFD700', '#FF6B9D', '#ffffff'];
      particles.push({
        x,
        y: H + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: -(1.5 + Math.random() * 3),
        size: Math.random() * 3 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.008 + Math.random() * 0.012,
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    function draw() {
      ctx.fillStyle = 'rgba(5,8,24,0.08)';
      ctx.fillRect(0, 0, W, H);

      if (Math.random() > 0.3) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // gentle gravity
        p.alpha -= p.decay;
        p.twinkle += 0.1;

        if (p.alpha <= 0) { particles.splice(i, 1); continue; }

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glow.addColorStop(0, p.color.replace(')', `,${p.alpha})`).replace('rgb', 'rgba'));
        glow.addColorStop(1, 'transparent');

        ctx.globalAlpha = p.alpha * (0.7 + Math.sin(p.twinkle) * 0.3);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Cross sparkle for some
        if (p.size > 2) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = p.alpha * 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 3, p.y);
          ctx.lineTo(p.x + p.size * 3, p.y);
          ctx.moveTo(p.x, p.y - p.size * 3);
          ctx.lineTo(p.x, p.y + p.size * 3);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section id="finale" style={{
      minHeight: '100vh',
      padding: '6rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute',
        bottom: 0, left: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎇</div>

        <h2 style={{
          fontFamily: 'Cinzel',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          letterSpacing: '0.15em',
          marginBottom: '1.5rem',
          lineHeight: 1.3,
          color: '#B76E79',
          animation: 'neonPulse 3s ease-in-out infinite',
        }} className="neon-pulse">
          Huang,<br />You Are the Universe
        </h2>

        <div style={{ width: '200px', height: '1px', background: 'linear-gradient(90deg, transparent, #B76E79, #00D4AA, transparent)', margin: '2rem auto' }} />

        <p style={{
          fontSize: '1.2rem',
          lineHeight: '2',
          color: 'rgba(240,230,255,0.85)',
          fontStyle: 'italic',
          marginBottom: '2rem',
        }}>
          "Every atom in your body was forged in a stellar furnace billions of years ago.
          The iron in your blood came from supernovae. The calcium in your bones —
          from dying red giants. You are not in the universe, Huang.
          You <em>are</em> the universe, experiencing itself."
        </p>

        <div style={{
          padding: '1.5rem 2rem',
          borderRadius: '20px',
          background: 'rgba(183,110,121,0.1)',
          border: '1px solid rgba(183,110,121,0.4)',
          marginBottom: '3rem',
        }}>
          <p style={{ color: '#F0E6FF', fontSize: '1.1rem', lineHeight: '1.8' }}>
            "May your curiosity always burn brighter than the stars,<br />
            and may the cosmos always feel like home."
          </p>
          <p style={{ color: '#B76E79', marginTop: '1rem', fontFamily: 'Cinzel', fontSize: '0.9rem' }}>— Zara ✦</p>
        </div>

        <div style={{
          fontSize: '0.85rem',
          color: 'rgba(240,230,255,0.4)',
          letterSpacing: '0.3em',
          fontFamily: 'Cinzel',
          marginBottom: '0.5rem',
        }}>
          ✦ ✦ ✦
        </div>

        <p style={{
          color: 'rgba(240,230,255,0.5)',
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          fontFamily: 'Cinzel',
        }}>
          Developed with ❤️ by{' '}
          <span style={{
            color: '#B76E79',
            textShadow: '0 0 10px rgba(183,110,121,0.5)',
          }}>
            Danial Kurdistani
          </span>
        </p>
        <p style={{
          color: 'rgba(240,230,255,0.3)',
          fontSize: '0.75rem',
          marginTop: '0.5rem',
          letterSpacing: '0.1em',
        }}>
          For Huang — may the stars always guide you
        </p>

        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {['Next.js', 'Three.js', 'Groq AI', 'NASA API', 'Netlify'].map(tech => (
            <span key={tech} style={{
              padding: '0.3rem 0.8rem',
              borderRadius: '12px',
              border: '1px solid rgba(183,110,121,0.2)',
              color: 'rgba(240,230,255,0.4)',
              fontSize: '0.75rem',
              fontFamily: 'JetBrains Mono',
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
