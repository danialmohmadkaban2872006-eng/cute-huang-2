import { useState, useEffect } from 'react';
import { useLang } from './LanguageContext';

// Mars Solar Day (sol) = 24h 37m 22.663s
const MARS_SOL = 88775.244;

function getMarsSolTime() {
  // Mars Sol Date (MSD) calculation
  const J2000_EPOCH = 946727941.816; // Unix timestamp for J2000.0
  const now = Date.now() / 1000;
  const jd = (now - J2000_EPOCH) / 86400 + 2451545.0;
  const msd = (jd - 2405522.0028779) / 1.0274912517 + 44796.0;
  const mtc = ((msd % 1) * 24 + 12) % 24; // Mars Coordinated Time
  const hours = Math.floor(mtc);
  const mins = Math.floor((mtc - hours) * 60);
  const secs = Math.floor(((mtc - hours) * 60 - mins) * 60);
  return { hours, mins, secs, sol: Math.floor(msd) };
}

function ClockFace({ hours, minutes, seconds, label, color, emoji }) {
  const hDeg = (hours % 12) * 30 + minutes * 0.5;
  const mDeg = minutes * 6 + seconds * 0.1;
  const sDeg = seconds * 6;

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>{emoji}</div>
      <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto' }}>
        {/* Clock face */}
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
          <circle cx="100" cy="100" r="95" fill="rgba(13,5,32,0.8)"
            stroke={color} strokeWidth="2" />
          <circle cx="100" cy="100" r="85" fill="none"
            stroke={`${color}30`} strokeWidth="0.5" />

          {/* Hour markers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
            return (
              <line key={i}
                x1={100 + Math.cos(a) * 75}
                y1={100 + Math.sin(a) * 75}
                x2={100 + Math.cos(a) * 85}
                y2={100 + Math.sin(a) * 85}
                stroke={color} strokeWidth={i % 3 === 0 ? 2.5 : 1}
              />
            );
          })}

          {/* Hour hand */}
          <line
            x1="100" y1="100"
            x2={100 + Math.sin((hDeg * Math.PI) / 180) * 50}
            y2={100 - Math.cos((hDeg * Math.PI) / 180) * 50}
            stroke={color} strokeWidth="4" strokeLinecap="round"
          />

          {/* Minute hand */}
          <line
            x1="100" y1="100"
            x2={100 + Math.sin((mDeg * Math.PI) / 180) * 70}
            y2={100 - Math.cos((mDeg * Math.PI) / 180) * 70}
            stroke={`${color}cc`} strokeWidth="2.5" strokeLinecap="round"
          />

          {/* Second hand */}
          <line
            x1="100" y1="100"
            x2={100 + Math.sin((sDeg * Math.PI) / 180) * 75}
            y2={100 - Math.cos((sDeg * Math.PI) / 180) * 75}
            stroke="#FF6B9D" strokeWidth="1.5" strokeLinecap="round"
          />

          <circle cx="100" cy="100" r="4" fill={color} />
        </svg>
      </div>

      <div style={{ fontFamily: 'Cinzel', color, fontSize: '1.8rem', letterSpacing: '0.1em', marginTop: '1rem' }}>
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div style={{ color: 'rgba(240,230,255,0.6)', fontSize: '0.85rem', fontFamily: 'Cinzel', letterSpacing: '0.2em' }}>
        {label}
      </div>
    </div>
  );
}

export default function SpaceTimeClock() {
  const { t } = useLang();
  const [earthTime, setEarthTime] = useState(new Date());
  const [marsTime, setMarsTime] = useState(getMarsSolTime());

  useEffect(() => {
    const id = setInterval(() => {
      setEarthTime(new Date());
      setMarsTime(getMarsSolTime());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="clock" style={{ minHeight: '100vh', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏰</div>
        <h2 style={{
          fontFamily: 'Cinzel',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#B76E79',
          textShadow: '0 0 30px rgba(183,110,121,0.5)',
          letterSpacing: '0.2em',
          marginBottom: '0.5rem',
        }}>
          {t('clock')}
        </h2>
        <p style={{ color: 'rgba(240,230,255,0.6)', fontStyle: 'italic', marginBottom: '4rem' }}>
          Time flows differently across the cosmos
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', justifyItems: 'center' }}>
          <div className="glass-card" style={{ padding: '2.5rem', width: '100%' }}>
            <ClockFace
              hours={earthTime.getHours()}
              minutes={earthTime.getMinutes()}
              seconds={earthTime.getSeconds()}
              label={t('earth_time')}
              color="#4B9CD3"
              emoji="🌍"
            />
            <div style={{ marginTop: '1.5rem', color: 'rgba(240,230,255,0.5)', fontSize: '0.85rem' }}>
              {earthTime.toLocaleDateString('en', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem', width: '100%' }}>
            <ClockFace
              hours={marsTime.hours}
              minutes={marsTime.mins}
              seconds={marsTime.secs}
              label={t('mars_time')}
              color="#c1440e"
              emoji="🔴"
            />
            <div style={{ marginTop: '1.5rem', color: 'rgba(240,230,255,0.5)', fontSize: '0.85rem' }}>
              Mars Sol Date: {marsTime.sol.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem', marginTop: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { label: 'Mars day (Sol)', value: '24h 37m 22s', icon: '📅' },
              { label: 'Mars year', value: '687 Earth days', icon: '🔄' },
              { label: 'Time lag (comm)', value: '3-22 minutes', icon: '📡' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ color: '#c1440e', fontSize: '0.8rem', fontFamily: 'Cinzel' }}>{item.label}</div>
                <div style={{ color: '#F0E6FF', marginTop: '0.3rem' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
