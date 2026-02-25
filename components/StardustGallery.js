import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLang } from './LanguageContext';

const FALLBACK_IMAGES = [
  { title: 'Pillars of Creation', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg/800px-Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg', credit: 'NASA/ESA/Hubble' },
  { title: 'Crab Nebula', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/800px-Crab_Nebula.jpg', credit: 'NASA/ESA' },
  { title: 'Andromeda Galaxy', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg/800px-Andromeda_Galaxy_%28with_h-alpha%29.jpg', credit: 'Adam Evans' },
];

export default function StardustGallery() {
  const { t } = useLang();
  const [apod, setApod] = useState(null);
  const [apodLoading, setApodLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const NASA_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`)
      .then(r => r.json())
      .then(data => {
        setApod(data);
        setApodLoading(false);
      })
      .catch(() => setApodLoading(false));
  }, []);

  return (
    <>
      {/* NASA APOD */}
      <section id="gallery" style={{ minHeight: '100vh', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔭</div>
            <h2 style={{
              fontFamily: 'Cinzel',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#00D4AA',
              textShadow: '0 0 30px rgba(0,212,170,0.5)',
              letterSpacing: '0.2em',
              marginBottom: '0.5rem',
            }}>
              {t('apod')}
            </h2>
          </div>

          {apodLoading ? (
            <div style={{ textAlign: 'center', color: 'rgba(240,230,255,0.5)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'pulse 2s infinite' }}>🌌</div>
              <p>Fetching today's cosmic image...</p>
            </div>
          ) : apod ? (
            <div className="glass-card" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                {apod.media_type === 'image' ? (
                  <img
                    src={apod.url}
                    alt={apod.title}
                    style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }}
                  />
                ) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(240,230,255,0.6)' }}>
                    <div style={{ fontSize: '4rem' }}>🎬</div>
                    <p>Today's APOD is a video</p>
                    <a href={apod.url} target="_blank" rel="noreferrer"
                      style={{ color: '#00D4AA', marginTop: '1rem', display: 'block' }}>
                      Watch on NASA ↗
                    </a>
                  </div>
                )}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(transparent, rgba(5,8,24,0.9))',
                  padding: '1rem',
                }}>
                  <span style={{ color: 'rgba(240,230,255,0.6)', fontSize: '0.75rem' }}>© {apod.copyright || 'NASA'}</span>
                </div>
              </div>
              <div>
                <div style={{ color: '#00D4AA', fontSize: '0.85rem', fontFamily: 'Cinzel', marginBottom: '0.5rem' }}>
                  {new Date(apod.date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h3 style={{ fontFamily: 'Cinzel', color: '#F0E6FF', fontSize: '1.4rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                  {apod.title}
                </h3>
                <p style={{ color: 'rgba(240,230,255,0.75)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                  {apod.explanation?.slice(0, 600)}
                  {apod.explanation?.length > 600 ? '...' : ''}
                </p>
              </div>
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'rgba(240,230,255,0.6)' }}>
              <p>Add <code style={{ color: '#B76E79' }}>NEXT_PUBLIC_NASA_API_KEY</code> to your environment to load live APOD data.</p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Get a free key at <a href="https://api.nasa.gov" target="_blank" rel="noreferrer" style={{ color: '#00D4AA' }}>api.nasa.gov</a></p>
            </div>
          )}

          {/* Gallery grid */}
          <div style={{ marginTop: '4rem' }}>
            <h3 style={{ fontFamily: 'Cinzel', color: '#B76E79', textAlign: 'center', marginBottom: '2rem', letterSpacing: '0.2em' }}>
              {t('gallery')}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {FALLBACK_IMAGES.map((img, i) => (
                <div key={i}
                  onClick={() => setSelected(img)}
                  style={{ cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}
                  className="glass-card"
                >
                  <img src={img.url} alt={img.title}
                    style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(transparent, rgba(5,8,24,0.9))',
                    padding: '0.8rem',
                    fontFamily: 'Cinzel',
                    fontSize: '0.75rem',
                    color: '#F0E6FF',
                  }}>
                    {img.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lightbox */}
        {selected && (
          <div
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9000,
              background: 'rgba(5,8,24,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ maxWidth: '90vw', maxHeight: '90vh', textAlign: 'center' }}>
              <img src={selected.url} alt={selected.title}
                style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px', boxShadow: '0 0 60px rgba(183,110,121,0.3)' }}
              />
              <div style={{ marginTop: '1rem', fontFamily: 'Cinzel', color: '#B76E79' }}>{selected.title}</div>
              <div style={{ color: 'rgba(240,230,255,0.5)', fontSize: '0.8rem' }}>{selected.credit}</div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
