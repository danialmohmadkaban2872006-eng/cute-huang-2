import { useState } from 'react';
import { useLang } from './LanguageContext';

const sections = [
  { id: 'hero', icon: '✨' },
  { id: 'ai-guide', icon: '🌌' },
  { id: 'nebula', icon: '🌸' },
  { id: 'solar', icon: '☀️' },
  { id: 'blackhole', icon: '⚫' },
  { id: 'moon', icon: '🌙' },
  { id: 'code', icon: '💻' },
  { id: 'constellation', icon: '⭐' },
  { id: 'clock', icon: '⏰' },
  { id: 'gallery', icon: '🔭' },
  { id: 'finale', icon: '🎇' },
];

export default function Navigation() {
  const { lang, setLang, languages, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top bar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: '1rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(5,8,24,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(183,110,121,0.2)',
      }}>
        <div style={{ fontFamily: 'Cinzel', fontSize: '1.1rem', color: '#B76E79', letterSpacing: '0.3em' }}>
          HUANG ✦ COSMOS
        </div>

        {/* Language Selector */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {Object.entries(languages).map(([code, info]) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`lang-btn ${lang === code ? 'active' : ''}`}
              style={{
                padding: '0.3rem 0.6rem',
                borderRadius: '8px',
                border: '1px solid rgba(183,110,121,0.3)',
                background: lang === code
                  ? 'linear-gradient(135deg, #B76E79, #00D4AA)'
                  : 'rgba(13,5,32,0.6)',
                color: lang === code ? 'white' : 'rgba(240,230,255,0.7)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontFamily: code === 'ar' || code === 'ku' ? 'Noto Naskh Arabic' : 'inherit',
                transition: 'all 0.3s ease',
              }}
            >
              {info.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Side dot navigation */}
      <div style={{
        position: 'fixed',
        right: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
      }}>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            title={s.id}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(183,110,121,0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
            onMouseEnter={e => {
              e.target.style.background = '#B76E79';
              e.target.style.boxShadow = '0 0 10px #B76E79';
              e.target.style.transform = 'scale(1.5)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(183,110,121,0.5)';
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'scale(1)';
            }}
          />
        ))}
      </div>
    </>
  );
}
