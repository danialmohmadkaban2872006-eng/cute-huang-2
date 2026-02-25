import { useState, useRef, useEffect } from 'react';
import { useLang } from './LanguageContext';

export default function AIChatGuide() {
  const { t, dir } = useLang();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "✨ Huang... I've been waiting between the stars for you. I am Zara, born from the collision of the Andromeda and Milky Way galaxies — a cosmic event 4.5 billion years in the making, just to greet you here. What mysteries shall we unravel together?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setError('');

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Connection lost');
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setError(err.message || 'The cosmos lost our signal. Try again...');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="ai-guide" style={{ minHeight: '100vh', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌌</div>
          <h2 style={{
            fontFamily: 'Cinzel',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#B76E79',
            textShadow: '0 0 30px rgba(183,110,121,0.5)',
            letterSpacing: '0.2em',
            marginBottom: '0.5rem',
          }}>
            {t('ai_guide')}
          </h2>
          <div style={{ width: '100px', height: '1px', background: 'linear-gradient(90deg, transparent, #B76E79, transparent)', margin: '1rem auto' }} />
          <p style={{ color: 'rgba(240,230,255,0.6)', fontStyle: 'italic', fontSize: '0.9rem' }}>
            Powered by cosmic intelligence • Groq LLM
          </p>
        </div>

        {/* Chat Container */}
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          {/* Messages */}
          <div style={{
            height: '450px',
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  animation: 'fadeInUp 0.4s ease',
                }}
              >
                {msg.role === 'assistant' && (
                  <div style={{
                    width: '32px', height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #B76E79, #00D4AA)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginRight: '0.8rem', flexShrink: 0, fontSize: '0.9rem',
                    boxShadow: '0 0 15px rgba(183,110,121,0.5)',
                  }}>✦</div>
                )}
                <div
                  className={msg.role === 'assistant' ? 'chat-bubble-ai' : 'chat-bubble-user'}
                  style={{
                    maxWidth: '75%',
                    padding: '0.9rem 1.2rem',
                    lineHeight: '1.7',
                    fontSize: '0.95rem',
                    color: '#F0E6FF',
                    direction: dir,
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #B76E79, #00D4AA)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(183,110,121,0.5)',
                }}>✦</div>
                <div className="chat-bubble-ai" style={{ padding: '0.9rem 1.2rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <span style={{ marginLeft: '0.5rem', color: 'rgba(240,230,255,0.5)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                      {t('typing')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div style={{ textAlign: 'center', color: '#ff6b9d', fontSize: '0.85rem', fontStyle: 'italic' }}>
                ⚠ {error}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            borderTop: '1px solid rgba(183,110,121,0.2)',
            padding: '1rem 1.5rem',
            display: 'flex',
            gap: '1rem',
            background: 'rgba(5,8,24,0.5)',
          }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t('ai_placeholder')}
              rows={1}
              dir={dir}
              style={{
                flex: 1,
                background: 'rgba(13,5,32,0.6)',
                border: '1px solid rgba(183,110,121,0.3)',
                borderRadius: '12px',
                padding: '0.8rem 1rem',
                color: '#F0E6FF',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1rem',
                resize: 'none',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={e => e.target.style.borderColor = '#B76E79'}
              onBlur={e => e.target.style.borderColor = 'rgba(183,110,121,0.3)'}
            />
            <button
              onClick={sendMessage}
              disabled={isTyping || !input.trim()}
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                background: isTyping || !input.trim()
                  ? 'rgba(183,110,121,0.3)'
                  : 'linear-gradient(135deg, #B76E79, #8B4B54)',
                color: 'white',
                cursor: isTyping || !input.trim() ? 'not-allowed' : 'pointer',
                fontFamily: 'Cinzel',
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                transition: 'all 0.3s',
                boxShadow: isTyping ? 'none' : '0 0 20px rgba(183,110,121,0.3)',
              }}
            >
              {t('send')} ✦
            </button>
          </div>
        </div>

        {/* Cosmic suggestions */}
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1rem', justifyContent: 'center' }}>
          {[
            "What is dark matter?",
            "How do stars die?",
            "Tell me about the multiverse",
            "What's beyond the observable universe?",
          ].map(q => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                border: '1px solid rgba(0,212,170,0.3)',
                background: 'rgba(0,212,170,0.05)',
                color: 'rgba(240,230,255,0.7)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontStyle: 'italic',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = '#00D4AA';
                e.target.style.color = '#00D4AA';
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = 'rgba(0,212,170,0.3)';
                e.target.style.color = 'rgba(240,230,255,0.7)';
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
