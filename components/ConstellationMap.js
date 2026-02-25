import { useState } from 'react';
import { useLang } from './LanguageContext';

const CONSTELLATIONS = {
  orion: {
    name: 'Orion',
    stars: [
      { id: 'betelgeuse', x: 120, y: 80, r: 6, name: 'Betelgeuse' },
      { id: 'bellatrix', x: 240, y: 80, r: 5, name: 'Bellatrix' },
      { id: 'mintaka', x: 150, y: 160, r: 4, name: 'Mintaka' },
      { id: 'alnilam', x: 180, y: 170, r: 4, name: 'Alnilam' },
      { id: 'alnitak', x: 210, y: 180, r: 4, name: 'Alnitak' },
      { id: 'saiph', x: 130, y: 270, r: 5, name: 'Saiph' },
      { id: 'rigel', x: 240, y: 260, r: 6, name: 'Rigel' },
    ],
    lines: [
      ['betelgeuse', 'bellatrix'],
      ['betelgeuse', 'mintaka'],
      ['bellatrix', 'mintaka'],
      ['mintaka', 'alnilam'],
      ['alnilam', 'alnitak'],
      ['mintaka', 'saiph'],
      ['alnitak', 'rigel'],
      ['saiph', 'rigel'],
    ],
    myth: {
      en: "Orion the Hunter — Zeus placed him among the stars after he boasted he could hunt every creature on Earth. Scorpius was sent to humble him, and so the two forever chase each other across the sky, never meeting.",
      zh: "猎户座 — 宙斯将他置于星空，因为他吹嘘自己能猎杀地球上所有生物。天蝎座被派去惩治他，两者永远在天空中追逐，永不相遇。",
      ar: "الجبار الصياد — وضعه زيوس بين النجوم بعد أن تباهى بقدرته على صيد كل مخلوق. أُرسل برج العقرب لتواضعه، فأصبحا يطاردان بعضهما عبر السماء إلى الأبد.",
      bn: "শিকারি ওরিওন — জিউস তাকে তারার মাঝে রেখেছিলেন কারণ সে দাবি করেছিল পৃথিবীর সব প্রাণী শিকার করতে পারবে। বৃশ্চিক পাঠানো হয়েছিল তাকে শায়েস্তা করতে।",
      ku: "ئاوبیرە ڕاوچە — زیوس بعد لە ئەوەی کە باوەڕی پێ بوو دەتوانێ هەموو ئاژەڵێکی زەوی بڕوات، لە نێوان ئەستێرەکاندا دایناست.",
    },
  },
  ursa_major: {
    name: 'Ursa Major',
    stars: [
      { id: 'dubhe', x: 100, y: 100, r: 5, name: 'Dubhe' },
      { id: 'merak', x: 150, y: 130, r: 5, name: 'Merak' },
      { id: 'phecda', x: 170, y: 190, r: 4, name: 'Phecda' },
      { id: 'megrez', x: 130, y: 190, r: 4, name: 'Megrez' },
      { id: 'alioth', x: 110, y: 155, r: 5, name: 'Alioth' },
      { id: 'mizar', x: 75, y: 145, r: 5, name: 'Mizar' },
      { id: 'alkaid', x: 45, y: 120, r: 5, name: 'Alkaid' },
    ],
    lines: [
      ['dubhe', 'merak'], ['merak', 'phecda'], ['phecda', 'megrez'],
      ['megrez', 'dubhe'], ['megrez', 'alioth'], ['alioth', 'mizar'], ['mizar', 'alkaid'],
    ],
    myth: {
      en: "Ursa Major, the Great Bear — Zeus fell in love with Callisto, and Hera in jealousy transformed her into a bear. Her son Arcas nearly killed her while hunting, but Zeus saved her by placing both among the eternal stars.",
      zh: "大熊座 — 宙斯爱上了卡利斯托，赫拉嫉妒将她变成了熊。她的儿子阿尔卡斯差点在狩猎中杀死她，但宙斯将他们俩都置于永恒的星空中。",
      ar: "الدب الأكبر — أحب زيوس كاليستو، فحولتها هيرا غيرةً إلى دب. كاد ابنها أركاس يقتلها أثناء الصيد، فنجّاها زيوس بأن وضعهما بين النجوم الأبدية.",
      bn: "মহান ভালুক — জিউস ক্যালিস্টোকে ভালোবাসতেন, এবং হেরা ঈর্ষায় তাকে ভালুকে রূপান্তরিত করেছিলেন। তার পুত্র আর্কাস প্রায় তাকে হত্যা করেছিল, কিন্তু জিউস তাদের উভয়কে অনন্ত তারার মধ্যে রেখেছিলেন।",
      ku: "ئەژدەهای گەورە — زیوس ئیش بە کالیستۆکرد، هێرا لە ئیجێڵدا ئەوی گۆڕی بۆ ئەژدەها. کوڕەکەی ئارکاس نزیک بوو لە کوژتنی، بەڵام زیوسی ژەنگاند بە دانانی هەردووکیانی لە نێوان ئەستێرەکاندا.",
    },
  },
};

export default function ConstellationMap() {
  const { lang, t } = useLang();
  const [active, setActive] = useState('orion');
  const [hoveredStar, setHoveredStar] = useState(null);

  const constellation = CONSTELLATIONS[active];

  const starById = (id) => constellation.stars.find(s => s.id === id);

  return (
    <section id="constellation" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
          <h2 style={{
            fontFamily: 'Cinzel',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#B76E79',
            textShadow: '0 0 30px rgba(183,110,121,0.5)',
            letterSpacing: '0.2em',
          }}>
            {t('constellation')}
          </h2>
          <p style={{ color: 'rgba(240,230,255,0.6)', fontStyle: 'italic', marginTop: '0.5rem' }}>
            Ancient stories etched in light
          </p>
        </div>

        {/* Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          {Object.entries(CONSTELLATIONS).map(([key, c]) => (
            <button key={key} onClick={() => setActive(key)} style={{
              padding: '0.6rem 1.5rem',
              borderRadius: '20px',
              border: active === key ? '1px solid #B76E79' : '1px solid rgba(183,110,121,0.3)',
              background: active === key ? 'rgba(183,110,121,0.2)' : 'transparent',
              color: active === key ? '#B76E79' : 'rgba(240,230,255,0.6)',
              cursor: 'pointer',
              fontFamily: 'Cinzel',
              fontSize: '0.9rem',
              transition: 'all 0.3s',
            }}>
              {c.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          {/* SVG Constellation */}
          <div className="glass-card" style={{ padding: '1rem' }}>
            <svg viewBox="0 0 360 360" style={{ width: '100%', height: 'auto' }}>
              {/* Background stars */}
              {Array.from({ length: 50 }).map((_, i) => (
                <circle key={i}
                  cx={Math.random() * 360 | 0} cy={Math.random() * 360 | 0}
                  r={Math.random() * 1 + 0.3}
                  fill="white" opacity={Math.random() * 0.5 + 0.1}
                />
              ))}

              {/* Lines */}
              {constellation.lines.map(([a, b], i) => {
                const sa = starById(a), sb = starById(b);
                if (!sa || !sb) return null;
                return (
                  <line key={i}
                    x1={sa.x} y1={sa.y} x2={sb.x} y2={sb.y}
                    className="constellation-line"
                    stroke="rgba(183,110,121,0.5)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Stars */}
              {constellation.stars.map(star => (
                <g key={star.id}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx={star.x} cy={star.y} r={star.r * 3} fill="transparent" />
                  <circle
                    cx={star.x} cy={star.y} r={hoveredStar?.id === star.id ? star.r * 1.8 : star.r}
                    fill="white"
                    style={{
                      filter: hoveredStar?.id === star.id
                        ? 'drop-shadow(0 0 8px #B76E79) drop-shadow(0 0 16px #B76E79)'
                        : 'drop-shadow(0 0 3px rgba(255,255,255,0.8))',
                      transition: 'all 0.3s',
                    }}
                  />
                  {hoveredStar?.id === star.id && (
                    <text x={star.x + star.r + 6} y={star.y + 4}
                      fill="#B76E79" fontSize="10" fontFamily="Cinzel"
                    >
                      {star.name}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Mythology */}
          <div>
            <h3 style={{ fontFamily: 'Cinzel', color: '#B76E79', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              The Myth of {constellation.name}
            </h3>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <p style={{
                lineHeight: '1.9',
                color: '#F0E6FF',
                fontStyle: 'italic',
                fontSize: '1.05rem',
              }}>
                {constellation.myth[lang] || constellation.myth.en}
              </p>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {constellation.stars.map(s => (
                <span key={s.id}
                  onMouseEnter={() => setHoveredStar(s)}
                  onMouseLeave={() => setHoveredStar(null)}
                  style={{
                    padding: '0.3rem 0.8rem',
                    borderRadius: '12px',
                    border: `1px solid ${hoveredStar?.id === s.id ? '#B76E79' : 'rgba(183,110,121,0.3)'}`,
                    color: hoveredStar?.id === s.id ? '#B76E79' : 'rgba(240,230,255,0.6)',
                    fontSize: '0.8rem',
                    cursor: 'default',
                    transition: 'all 0.2s',
                  }}
                >
                  ✦ {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
