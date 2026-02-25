import { useState } from 'react';
import { useLang } from './LanguageContext';

const PLANETS = [
  {
    name: 'Mercury', emoji: '⚫', color: '#b5b5b5', size: 30,
    orbitRadius: 90, speed: '4s',
    facts: { distance: '77M km from Sun', temp: '430°C day / -180°C night', day: '59 Earth days', moons: 0, interesting: 'Smallest planet, fastest orbit at 47 km/s' },
  },
  {
    name: 'Venus', emoji: '🟡', color: '#e8cda0', size: 38,
    orbitRadius: 130, speed: '6s',
    facts: { distance: '108M km from Sun', temp: '465°C (hottest planet)', day: '243 Earth days', moons: 0, interesting: 'Spins backwards relative to most planets' },
  },
  {
    name: 'Earth', emoji: '🌍', color: '#4B9CD3', size: 40,
    orbitRadius: 175, speed: '10s',
    facts: { distance: '150M km from Sun', temp: '15°C average', day: '24 hours', moons: 1, interesting: 'Only known planet harboring Huang — and life!' },
  },
  {
    name: 'Mars', emoji: '🔴', color: '#c1440e', size: 32,
    orbitRadius: 220, speed: '16s',
    facts: { distance: '228M km from Sun', temp: '-63°C average', day: '24.6 hours', moons: 2, interesting: 'Olympus Mons is the tallest volcano in the solar system' },
  },
  {
    name: 'Jupiter', emoji: '🟠', color: '#c88b3a', size: 70,
    orbitRadius: 280, speed: '40s',
    facts: { distance: '778M km from Sun', temp: '-108°C cloud tops', day: '10 hours', moons: 95, interesting: 'Great Red Spot storm has raged for 300+ years' },
  },
  {
    name: 'Saturn', emoji: '🪐', color: '#e4d191', size: 65,
    orbitRadius: 345, speed: '100s',
    facts: { distance: '1.4B km from Sun', temp: '-138°C', day: '10.7 hours', moons: 146, interesting: 'So light it could float in water' },
  },
];

export default function SolarSystemExplorer() {
  const { t } = useLang();
  const [selected, setSelected] = useState(null);

  return (
    <section id="solar" style={{ minHeight: '100vh', padding: '6rem 2rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>☀️</div>
          <h2 style={{
            fontFamily: 'Cinzel',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#FFD700',
            textShadow: '0 0 30px rgba(255,215,0,0.5)',
            letterSpacing: '0.2em',
            marginBottom: '0.5rem',
          }}>
            {t('solar')}
          </h2>
          <p style={{ color: 'rgba(240,230,255,0.6)', fontStyle: 'italic' }}>Click a world to discover its secrets</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          {/* Orbital visualization */}
          <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Sun */}
              <div style={{
                position: 'absolute',
                width: '50px', height: '50px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #FFF8DC, #FFD700, #FF8C00)',
                boxShadow: '0 0 30px #FFD700, 0 0 60px rgba(255,215,0,0.5), 0 0 100px rgba(255,140,0,0.3)',
                zIndex: 10,
              }} />

              {/* Orbits */}
              {PLANETS.map((p, i) => (
                <div key={p.name}>
                  {/* Orbit ring */}
                  <div style={{
                    position: 'absolute',
                    width: p.orbitRadius * 2 + 'px',
                    height: p.orbitRadius * 2 + 'px',
                    borderRadius: '50%',
                    border: '1px solid rgba(183,110,121,0.15)',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }} />
                  {/* Planet */}
                  <div
                    onClick={() => setSelected(selected?.name === p.name ? null : p)}
                    style={{
                      position: 'absolute',
                      width: p.size + 'px',
                      height: p.size + 'px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle at 35% 35%, white, ${p.color})`,
                      left: '50%',
                      top: '50%',
                      marginLeft: -p.size / 2 + 'px',
                      marginTop: -p.size / 2 + 'px',
                      animation: `orbit ${p.speed} linear infinite`,
                      '--orbit-r': p.orbitRadius + 'px',
                      cursor: 'pointer',
                      boxShadow: selected?.name === p.name
                        ? `0 0 20px ${p.color}, 0 0 40px ${p.color}`
                        : `0 0 10px ${p.color}40`,
                      transition: 'box-shadow 0.3s',
                      zIndex: 5,
                    }}
                    title={p.name}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div>
            {selected ? (
              <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{selected.emoji}</div>
                <h3 style={{
                  fontFamily: 'Cinzel',
                  fontSize: '2rem',
                  color: selected.color,
                  marginBottom: '1.5rem',
                  textShadow: `0 0 20px ${selected.color}`,
                }}>
                  {selected.name}
                </h3>
                {Object.entries(selected.facts).map(([key, val]) => (
                  <div key={key} style={{ marginBottom: '0.8rem', display: 'flex', gap: '1rem' }}>
                    <span style={{ color: '#B76E79', minWidth: '90px', textTransform: 'capitalize', fontSize: '0.85rem' }}>{key}:</span>
                    <span style={{ color: '#F0E6FF', fontSize: '0.95rem' }}>{val}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'rgba(240,230,255,0.4)', fontStyle: 'italic' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌌</div>
                <p>Select a planet to explore its cosmic mysteries</p>
                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.8rem' }}>
                  {PLANETS.map(p => (
                    <button key={p.name} onClick={() => setSelected(p)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '10px',
                        border: `1px solid ${p.color}40`,
                        background: `${p.color}10`,
                        color: p.color,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontFamily: 'Cinzel',
                      }}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
          to { transform: rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}
