/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'rose-gold': '#B76E79',
        'rose-gold-light': '#D4919A',
        'rose-gold-dark': '#8B4B54',
        'cosmic-blue': '#0B0F2A',
        'nebula-purple': '#1A0533',
        'star-white': '#F0E6FF',
        'aurora-teal': '#00D4AA',
        'aurora-pink': '#FF6B9D',
        'gold-shimmer': '#FFD700',
      },
      fontFamily: {
        'display': ['Cinzel', 'serif'],
        'body': ['Cormorant Garamond', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
        'arabic': ['Noto Naskh Arabic', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'star-twinkle': 'twinkle 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'typing': 'typing 1.5s steps(30) infinite',
        'nebula-drift': 'nebulaDrift 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px #B76E79, 0 0 40px #B76E79' },
          '50%': { boxShadow: '0 0 40px #D4919A, 0 0 80px #D4919A, 0 0 120px #B76E79' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        nebulaDrift: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};
