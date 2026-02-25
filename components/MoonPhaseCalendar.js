import { useEffect, useState } from 'react';
import { useLang } from './LanguageContext';

function getMoonPhase(date = new Date()) {
  const LUNAR_CYCLE = 29.53058867;
  const knownNewMoon = new Date('2000-01-06T18:14:00Z');
  const diffMs = date.getTime() - knownNewMoon.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const phase = ((diffDays % LUNAR_CYCLE) + LUNAR_CYCLE) % LUNAR_CYCLE;
  return phase;
}

function getPhaseName(phase) {
  if (phase < 1.85) return { name: 'New Moon', emoji: '🌑', illumination: 0 };
  if (phase < 7.38) return { name: 'Waxing Crescent', emoji: '🌒', illumination: Math.round((phase / 7.38) * 25) };
  if (phase < 9.22) return { name: 'First Quarter', emoji: '🌓', illumination: 50 };
  if (phase < 14.77) return { name: 'Waxing Gibbous', emoji: '🌔', illumination: Math.round(50 + ((phase - 9.22) / 5.55) * 25) };
  if (phase < 16.61) return { name: 'Full Moon', emoji: '🌕', illumination: 100 };
  if (phase < 22.15) return { name: 'Waning Gibbous', emoji: '🌖', illumination: Math.round(100 - ((phase - 16.61) / 5.54) * 25) };
  if (phase < 23.99) return { name: 'Last Quarter', emoji: '🌗', illumination: 50 };
  if (phase < 29.53) return { name: 'Waning Crescent', emoji: '🌘', illumination: Math.round(25 - ((phase - 23.99) / 5.54) * 25) };
  return { name: 'New Moon', emoji: '🌑', illumination: 0 };
}

export default function MoonPhaseCalendar() {
  const { t } = useLang();
  const [phase, setPhase] = useState(null);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const now = new Date();
    const p = getMoonPhase(now);
    setPhase({ ...getPhaseName(p), days: p });

    // Generate 7 days
    const days = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() + i);
      const dp = getMoonPhase(d);
      days.push({
        date: d,
        ...getPhaseName(dp),
        isToday: i === 0,
      });
    }
    setCalendar(days);
  }, []);

  if (!phase) return null;

  return (
    <section id="moon" style={{ minHeight: '100vh', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌙</div>
        <h2 style={{
          fontFamily: 'Cinzel',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: '#E8D5B7',
          textShadow: '0 0 30px rgba(232,213,183,0.5)',
          letterSpacing: '0.2em',
          marginBottom: '3rem',
        }}>
          {t('moon')}
        </h2>

        {/* Main moon display */}
        <div className="glass-card" style={{ padding: '3rem', marginBottom: '3rem', display: 'inline-block' }}>
          <div style={{ fontSize: '8rem', lineHeight: 1, marginBottom: '1.5rem', filter: 'drop-shadow(0 0 30px rgba(232,213,183,0.8))' }}>
            {phase.emoji}
          </div>
          <h3 style={{ fontFamily: 'Cinzel', color: '#E8D5B7', fontSize: '1.8rem', marginBottom: '1rem' }}>
            {phase.name}
          </h3>
          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '1.5rem' }}>
            <div>
              <div style={{ color: 'rgba(240,230,255,0.5)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Illumination</div>
              <div style={{ color: '#FFD700', fontSize: '1.5rem', fontFamily: 'Cinzel' }}>{phase.illumination}%</div>
            </div>
            <div>
              <div style={{ color: 'rgba(240,230,255,0.5)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>Cycle Day</div>
              <div style={{ color: '#E8D5B7', fontSize: '1.5rem', fontFamily: 'Cinzel' }}>{Math.round(phase.days)}/29</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '1.5rem', width: '300px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', margin: '1.5rem auto 0' }}>
            <div style={{
              width: (phase.days / 29.53 * 100) + '%',
              height: '100%',
              background: 'linear-gradient(90deg, #0B0F2A, #E8D5B7, #FFD700)',
              borderRadius: '2px',
            }} />
          </div>
          <div style={{ color: 'rgba(240,230,255,0.4)', fontSize: '0.75rem', marginTop: '0.5rem' }}>Lunar cycle progress</div>
        </div>

        {/* 7-day calendar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.8rem' }}>
          {calendar.map((day, i) => (
            <div key={i} className="glass-card" style={{
              padding: '1rem 0.5rem',
              borderColor: day.isToday ? 'rgba(232,213,183,0.6)' : 'rgba(183,110,121,0.2)',
              boxShadow: day.isToday ? '0 0 20px rgba(232,213,183,0.2)' : 'none',
            }}>
              <div style={{ color: day.isToday ? '#E8D5B7' : 'rgba(240,230,255,0.5)', fontSize: '0.7rem', marginBottom: '0.5rem' }}>
                {day.date.toLocaleDateString('en', { weekday: 'short' })}
              </div>
              <div style={{ fontSize: '1.8rem', lineHeight: 1, marginBottom: '0.3rem' }}>{day.emoji}</div>
              <div style={{ color: 'rgba(240,230,255,0.6)', fontSize: '0.65rem' }}>
                {day.date.getDate()}
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
          <p style={{ color: 'rgba(240,230,255,0.7)', fontStyle: 'italic', lineHeight: '1.8' }}>
            "The moon, Huang, is the only celestial body humans have touched. 
            Twelve astronauts have walked its ancient dust — but none with your eyes that see the cosmos as poetry."
          </p>
        </div>
      </div>
    </section>
  );
}
