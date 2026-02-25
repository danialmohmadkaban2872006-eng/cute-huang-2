import { useState, useEffect } from 'react';
import { useLang } from './LanguageContext';

const CODE_SAMPLES = {
  cpp: {
    label: 'C++ — Orbital Mechanics',
    code: `// Huang's Orbital Simulation Engine
// Based on Kepler's Laws of Planetary Motion

#include <iostream>
#include <cmath>
#include <vector>

struct Vector3D {
    double x, y, z;
    Vector3D operator+(const Vector3D& v) const {
        return {x + v.x, y + v.y, z + v.z};
    }
    Vector3D operator*(double s) const {
        return {x * s, y * s, z * s};
    }
};

const double G = 6.674e-11;  // Gravitational constant
const double M_SUN = 1.989e30; // Solar mass (kg)

// Calculate gravitational acceleration
Vector3D gravAccel(Vector3D pos, double mass) {
    double r = sqrt(pos.x*pos.x + pos.y*pos.y + pos.z*pos.z);
    double accelMag = G * mass / (r * r);
    return pos * (-accelMag / r);
}

// Runge-Kutta 4th order integration
void integrate(Vector3D& pos, Vector3D& vel, double dt) {
    Vector3D k1v = gravAccel(pos, M_SUN);
    Vector3D k1p = vel;
    
    Vector3D k2v = gravAccel(pos + k1p * (dt/2), M_SUN);
    Vector3D k2p = vel + k1v * (dt/2);
    
    Vector3D k3v = gravAccel(pos + k2p * (dt/2), M_SUN);
    Vector3D k3p = vel + k2v * (dt/2);
    
    Vector3D k4v = gravAccel(pos + k3p * dt, M_SUN);
    Vector3D k4p = vel + k3v * dt;
    
    pos = pos + (k1p + k2p * 2 + k3p * 2 + k4p) * (dt/6);
    vel = vel + (k1v + k2v * 2 + k3v * 2 + k4v) * (dt/6);
}

int main() {
    // Earth's initial conditions
    Vector3D earthPos = {1.496e11, 0, 0}; // 1 AU
    Vector3D earthVel = {0, 29780, 0};    // 29.78 km/s
    
    double dt = 3600; // 1 hour timestep
    double t = 0;
    
    std::cout << "🌍 Simulating Earth's orbit for Huang...\\n";
    
    for (int i = 0; i < 8760; i++) { // 1 year
        integrate(earthPos, earthVel, dt);
        t += dt;
    }
    
    std::cout << "✦ Orbit complete. 365.25 days elapsed.\\n";
    std::cout << "✦ Final position: (" 
              << earthPos.x/1.496e11 << ", " 
              << earthPos.y/1.496e11 << ") AU\\n";
    return 0;
}`,
  },
  python: {
    label: 'Python — Stellar Nucleosynthesis',
    code: `# Huang's Stellar Evolution Model
# Tracing how stars forge the elements

import numpy as np
import matplotlib.pyplot as plt

# Physical constants
G = 6.674e-11        # Gravitational constant
c = 3e8              # Speed of light
sigma_SB = 5.67e-8   # Stefan-Boltzmann constant
k_B = 1.38e-23       # Boltzmann constant

class Star:
    """Models a main sequence star's core fusion."""
    
    def __init__(self, mass_solar):
        self.mass = mass_solar * 1.989e30  # Convert to kg
        self.mass_solar = mass_solar
        
        # Mass-luminosity relation: L ∝ M^4
        self.luminosity = 3.828e26 * (mass_solar ** 3.5)
        
        # Core temperature (approximate)
        self.core_temp = 1.5e7 * (mass_solar ** 0.7)
        
        # Main sequence lifetime
        self.lifetime_yr = 1e10 * (mass_solar ** -2.5)
    
    def fusion_rate(self):
        """H → He fusion rate in kg/s"""
        # Einstein: E = mc², luminosity drives mass loss
        return self.luminosity / c**2
    
    def elements_forged(self):
        """Returns elements this star can synthesize"""
        elements = ["Hydrogen → Helium (H-burning)"]
        
        if self.mass_solar > 0.5:
            elements.append("Carbon, Nitrogen, Oxygen (CNO cycle)")
        if self.mass_solar > 4:
            elements.append("Neon, Sodium, Magnesium (Ne-burning)")  
        if self.mass_solar > 8:
            elements.append("Silicon, Sulfur, Iron (Si-burning)")
            elements.append("✨ Supernova: Gold, Platinum, Uranium!")
        
        return elements

# Simulate our Sun
sun = Star(mass_solar=1.0)
print(f"☀️  Our Sun — Mass: 1 M☉")
print(f"   Luminosity: {sun.luminosity:.2e} W")
print(f"   Core Temp:  {sun.core_temp:.2e} K")
print(f"   Lifetime:   {sun.lifetime_yr:.2e} years")
print(f"   Fusion rate: {sun.fusion_rate():.2e} kg/s")

print("\\n🌟 Elements forged in this star:")
for elem in sun.elements_forged():
    print(f"   → {elem}")

print("\\n✦ Huang, every atom in your body was forged")
print("  in the heart of a dying star. You are stardust.")`,
  },
};

export default function CosmicEngineCode() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState('cpp');
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayedCode('');
    setIsTyping(true);
    const code = CODE_SAMPLES[activeTab].code;
    let i = 0;
    const timer = setInterval(() => {
      if (i < code.length) {
        setDisplayedCode(code.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 8);
    return () => clearInterval(timer);
  }, [activeTab]);

  return (
    <section id="code" style={{ minHeight: '100vh', padding: '6rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💻</div>
          <h2 style={{
            fontFamily: 'Cinzel',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#00ff41',
            textShadow: '0 0 20px rgba(0,255,65,0.5)',
            letterSpacing: '0.2em',
          }}>
            {t('code')}
          </h2>
          <p style={{ color: 'rgba(240,230,255,0.6)', fontStyle: 'italic', marginTop: '0.5rem' }}>
            The mathematics that governs the stars
          </p>
        </div>

        {/* Terminal */}
        <div className="terminal" style={{ overflow: 'hidden' }}>
          {/* Terminal title bar */}
          <div style={{
            padding: '0.7rem 1rem',
            background: '#001a0a',
            borderBottom: '1px solid #003a0a',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <span style={{ color: '#00ff41', fontSize: '0.85rem', fontFamily: 'JetBrains Mono' }}>
              huang@cosmos ~ cosmic-engine
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              {Object.entries(CODE_SAMPLES).map(([key, val]) => (
                <button key={key} onClick={() => setActiveTab(key)} style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: '6px',
                  border: activeTab === key ? '1px solid #00ff41' : '1px solid #003a0a',
                  background: activeTab === key ? 'rgba(0,255,65,0.1)' : 'transparent',
                  color: activeTab === key ? '#00ff41' : '#00803a',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontFamily: 'JetBrains Mono',
                }}>
                  {key === 'cpp' ? 'C++' : 'Python'}
                </button>
              ))}
            </div>
          </div>

          {/* Code area */}
          <div style={{ padding: '1.5rem', maxHeight: '500px', overflowY: 'auto' }}>
            <div style={{ color: '#00ff41', fontSize: '0.75rem', marginBottom: '0.5rem', opacity: 0.6 }}>
              $ ./{activeTab === 'cpp' ? 'orbital_sim' : 'stellar_evolution'}.{activeTab === 'cpp' ? 'out' : 'py'}
            </div>
            <pre style={{
              color: '#c8ffc8',
              fontSize: '0.82rem',
              lineHeight: '1.7',
              fontFamily: 'JetBrains Mono',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              <code
                dangerouslySetInnerHTML={{
                  __html: displayedCode
                    .replace(/\/\/.*/g, m => `<span style="color:#5a8a5a">${m}</span>`)
                    .replace(/#.*/g, m => `<span style="color:#5a8a5a">${m}</span>`)
                    .replace(/\b(const|double|int|void|struct|class|return|for|if|import|def|self|print)\b/g, m => `<span style="color:#00D4AA">${m}</span>`)
                    .replace(/"[^"]*"/g, m => `<span style="color:#FFD700">${m}</span>`)
                    .replace(/\b(\d+\.?\d*e?[+-]?\d*)\b/g, m => `<span style="color:#FF6B9D">${m}</span>`)
                }}
              />
              {isTyping && <span style={{ borderRight: '2px solid #00ff41', animation: 'none' }}>_</span>}
            </pre>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(240,230,255,0.5)', fontStyle: 'italic', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          "The universe runs on mathematics, Huang — and every equation is a love letter from physics to curiosity."
        </p>
      </div>
    </section>
  );
}
