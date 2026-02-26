import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { LanguageProvider, useLang } from '../components/LanguageContext';
import Navigation from '../components/Navigation';
import ParallaxStarfield from '../components/ParallaxStarfield';
import AIChatGuide from '../components/AIChatGuide';
import HuangNebula from '../components/HuangNebula';
import SolarSystemExplorer from '../components/SolarSystemExplorer';
import BlackHoleVisualizer from '../components/BlackHoleVisualizer';
import MoonPhaseCalendar from '../components/MoonPhaseCalendar';
import CosmicEngineCode from '../components/CosmicEngineCode';
import ConstellationMap from '../components/ConstellationMap';
import SpaceTimeClock from '../components/SpaceTimeClock';
import StardustGallery from '../components/StardustGallery';
import GrandFinale from '../components/GrandFinale';

function HeroSection() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      position: 'relative',
    }}>
      {/* Decorative orbit rings */}
      <div style={{
        position: 'absolute',
        width: '600px', height: '600px',
        borderRadius: '50%',
        border: '1px solid rgba(183,110,121,0.12)',
        animation: 'spin 60s linear infinite',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: '400px', height: '400px',
        borderRadius: '50%',
        border: '1px solid rgba(0,212,170,0.08)',
        animation: 'spin 40s linear infinite reverse',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative', zIndex: 1,
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-block',
          padding: '0.4rem 1.5rem',
          borderRadius: '20px',
          border: '1px solid rgba(183,110,121,0.4)',
          background: 'rgba(183,110,121,0.1)',
          color: '#B76E79',
          fontSize: '0.85rem',
          fontFamily: 'Cinzel',
          letterSpacing: '0.3em',
          marginBottom: '2rem',
        }}>
          ✦ COSMIC EDITION ✦
        </div>

        {/* Main title */}
        <h1 style={{
          fontFamily: 'Cinzel',
          fontSize: 'clamp(3rem, 10vw, 8rem)',
          fontWeight: 900,
          letterSpacing: '0.05em',
          lineHeight: 0.9,
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #F0E6FF 0%, #B76E79 40%, #FFD700 70%, #00D4AA 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          filter: 'drop-shadow(0 0 40px rgba(183,110,121,0.4))',
        }}>
          {t('hero_title')}
        </h1>

        {/* Divider */}
        <div style={{
          width: '300px', height: '1px',
          background: 'linear-gradient(90deg, transparent, #B76E79, #00D4AA, transparent)',
          margin: '1.5rem auto',
        }} />

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: 'rgba(240,230,255,0.7)',
          fontStyle: 'italic',
          letterSpacing: '0.1em',
          marginBottom: '3rem',
          maxWidth: '600px',
        }}>
          {t('hero_sub')}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.getElementById('ai-guide')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              border: 'none',
              background: 'linear-gradient(135deg, #B76E79, #8B4B54)',
              color: 'white',
              fontFamily: 'Cinzel',
              fontSize: '0.95rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(183,110,121,0.4), 0 0 60px rgba(183,110,121,0.2)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => e.target.style.boxShadow = '0 0 50px rgba(183,110,121,0.6), 0 0 100px rgba(183,110,121,0.3)'}
            onMouseLeave={e => e.target.style.boxShadow = '0 0 30px rgba(183,110,121,0.4), 0 0 60px rgba(183,110,121,0.2)'}
          >
            Meet Zara ✦
          </button>
          <button
            onClick={() => document.getElementById('solar')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              border: '1px solid rgba(0,212,170,0.5)',
              background: 'rgba(0,212,170,0.1)',
              color: '#00D4AA',
              fontFamily: 'Cinzel',
              fontSize: '0.95rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(0,212,170,0.2)'; e.target.style.borderColor = '#00D4AA'; }}
            onMouseLeave={e => { e.target.style.background = 'rgba(0,212,170,0.1)'; e.target.style.borderColor = 'rgba(0,212,170,0.5)'; }}
          >
            Explore ↓
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '4rem', flexWrap: 'wrap' }}>
          {[
            { value: '13.8B', label: 'Years Old Universe' },
            { value: '2T+', label: 'Galaxies' },
            { value: '∞', label: 'Wonders for Huang' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cinzel', fontSize: '2rem', color: '#B76E79', textShadow: '0 0 20px rgba(183,110,121,0.5)' }}>
                {stat.value}
              </div>
              <div style={{ color: 'rgba(240,230,255,0.5)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        color: 'rgba(240,230,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.2em',
        animation: 'float 3s ease-in-out infinite',
      }}>
        <span style={{ fontFamily: 'Cinzel' }}>SCROLL</span>
        <span>↓</span>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-8px); }
        }
      `}</style>
    </section>
  );
}

function CosmosApp() {
  return (
    <>
      <Head>
        <title>Huang's Cosmos — A Universe Crafted for You</title>
      </Head>

      <ParallaxStarfield />
      <Navigation />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <AIChatGuide />
        <HuangNebula />
        <SolarSystemExplorer />
        <BlackHoleVisualizer />
        <MoonPhaseCalendar />
        <CosmicEngineCode />
        <ConstellationMap />
        <SpaceTimeClock />
        <StardustGallery />
        <GrandFinale />
      </main>
    </>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <CosmosApp />
    </LanguageProvider>
  );
}
