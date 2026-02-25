import { useEffect, useRef } from 'react';
import { useLang } from './LanguageContext';

export default function BlackHoleVisualizer() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = 500;
    const H = canvas.height = 500;
    const cx = W / 2, cy = H / 2;

    let frame = 0;
    const DISK_PARTICLES = 200;
    const particles = Array.from({ length: DISK_PARTICLES }, (_, i) => {
      const angle = (i / DISK_PARTICLES) * Math.PI * 2;
      const r = 90 + Math.random() * 120;
      return {
        angle,
        r,
        speed: 0.003 + (1 / r) * 0.5,
        opacity: 0.3 + Math.random() * 0.7,
        color: Math.random() > 0.5 ? '#FF6B3D' : '#FFB347',
        size: Math.random() * 2 + 0.5,
      };
    });

    function draw() {
      ctx.fillStyle = 'rgba(5,8,24,0.15)';
      ctx.fillRect(0, 0, W, H);

      frame++;

      // Glow rings (accretion disk)
      for (let r = 160; r > 80; r -= 5) {
        const alpha = (160 - r) / 80 * 0.08;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,140,50,${alpha})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Particles orbiting
      particles.forEach(p => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.r;
        const y = cy + Math.sin(p.angle) * p.r * 0.3;

        // Doppler-like effect: brighter on approaching side
        const doppler = Math.cos(p.angle) > 0 ? 1.5 : 0.5;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * doppler * 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Photon sphere glow
      const photonGrad = ctx.createRadialGradient(cx, cy, 55, cx, cy, 85);
      photonGrad.addColorStop(0, 'transparent');
      photonGrad.addColorStop(0.5, 'rgba(255,200,100,0.12)');
      photonGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = photonGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 85, 0, Math.PI * 2);
      ctx.fill();

      // Event horizon — true black
      const ehGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 65);
      ehGrad.addColorStop(0, 'rgba(0,0,0,1)');
      ehGrad.addColorStop(0.7, 'rgba(0,0,0,1)');
      ehGrad.addColorStop(0.9, 'rgba(5,8,24,0.8)');
      ehGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = ehGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 70, 0, Math.PI * 2);
      ctx.fill();

      // Gravitational lensing arcs
      const time = frame * 0.01;
      for (let i = 0; i < 3; i++) {
        const a = time + (i * Math.PI * 2) / 3;
        const lx = cx + Math.cos(a) * 80;
        const ly = cy + Math.sin(a) * 80;
        ctx.beginPath();
        ctx.arc(lx, ly, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,200,255,${0.2 + Math.sin(time * 3 + i) * 0.1})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section id="blackhole" style={{ minHeight: '100vh', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚫</div>
          <h2 style={{
            fontFamily: 'Cinzel',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#FF6B3D',
            textShadow: '0 0 30px rgba(255,107,61,0.5)',
            letterSpacing: '0.2em',
          }}>
            {t('blackhole')} — Event Horizon
          </h2>
          <p style={{ color: 'rgba(240,230,255,0.6)', fontStyle: 'italic', marginTop: '0.5rem' }}>
            Where time itself bends and surrenders
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <canvas ref={canvasRef} style={{
              borderRadius: '50%',
              boxShadow: '0 0 60px rgba(255,107,61,0.3), 0 0 120px rgba(255,107,61,0.1)',
              maxWidth: '100%',
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { label: 'Schwarzschild Radius', value: '~3km per solar mass', icon: '📏' },
              { label: 'Time Dilation', value: 'Infinite at event horizon', icon: '⏱' },
              { label: 'Hawking Temperature', value: '6×10⁻⁸ K (stellar mass)', icon: '🌡' },
              { label: 'Escape Velocity', value: '> Speed of Light', icon: '🚀' },
              { label: 'Tidal Forces', value: 'Spaghettification beyond limit', icon: '🍝' },
            ].map(item => (
              <div key={item.label} className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div>
                  <div style={{ color: '#FF6B3D', fontSize: '0.8rem', fontFamily: 'Cinzel', marginBottom: '0.2rem' }}>{item.label}</div>
                  <div style={{ color: '#F0E6FF', fontSize: '0.95rem' }}>{item.value}</div>
                </div>
              </div>
            ))}

            <div className="glass-card" style={{ padding: '1.5rem', borderColor: 'rgba(255,107,61,0.3)' }}>
              <p style={{ color: 'rgba(240,230,255,0.8)', lineHeight: '1.8', fontStyle: 'italic', fontSize: '0.95rem' }}>
                "At the event horizon, Huang, time dilates to a stop from an outside observer's view. 
                A moment there stretches into eternity — perhaps that is where all the universe's secrets are kept, 
                suspended in amber at the edge of infinity."
              </p>
              <p style={{ color: '#B76E79', marginTop: '0.8rem', fontSize: '0.85rem' }}>— Zara, Cosmic Guide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
