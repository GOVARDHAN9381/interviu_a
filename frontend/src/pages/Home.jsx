import { Link } from 'react-router-dom';
import { Bot, Mic, Code, Award, Users, BookOpen, Trophy, ArrowRight, Sparkles } from 'lucide-react';

const STATS = [
  { icon: <Users size={22} />, value: '10,000+', label: 'Active Users' },
  { icon: <BookOpen size={22} />, value: '50+', label: 'Courses' },
  { icon: <Code size={22} />, value: '170+', label: 'Challenges' },
  { icon: <Trophy size={22} />, value: '98%', label: 'Success Rate' },
];

const FEATURES = [
  {
    icon: <Bot size={32} />,
    title: 'AI Mock Interviews',
    desc: 'Practice HR, Technical, and Mixed interviews with our hyper-realistic AI avatars that adapt to your skill level.',
    color: '#6366f1',
  },
  {
    icon: <Mic size={32} />,
    title: 'Voice & Text Analysis',
    desc: 'Real-time speech-to-text with Whisper API to evaluate fluency, tone, and professionalism.',
    color: '#8b5cf6',
  },
  {
    icon: <Code size={32} />,
    title: 'Coding Challenges',
    desc: 'Solve technical challenges in an integrated IDE with syntax highlighting and instant AI feedback.',
    color: '#06b6d4',
  },
  {
    icon: <Award size={32} />,
    title: 'Resume ATS Checker',
    desc: 'Upload your resume and get an instant ATS score with actionable improvement suggestions.',
    color: '#10b981',
  },
];

function StatCard({ icon, value, label }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.4rem',
      padding: '1.5rem 2rem',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      backdropFilter: 'blur(12px)',
      minWidth: '140px',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.2)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <span style={{ color: 'var(--accent-primary)' }}>{icon}</span>
      <span style={{ fontSize: '1.75rem', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{value}</span>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color }) {
  return (
    <div
      className="glass-panel"
      style={{
        width: '280px',
        textAlign: 'left',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = `0 20px 60px ${color}30`;
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: '-30px', right: '-30px',
        width: '80px', height: '80px',
        background: color, filter: 'blur(50px)', opacity: 0.25,
      }} />
      <div style={{
        marginBottom: '1rem',
        background: `${color}20`,
        display: 'inline-flex',
        padding: '1rem',
        borderRadius: '12px',
        color,
        border: `1px solid ${color}30`,
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', fontWeight: 700 }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

      {/* Animated gradient background blobs */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 20% 20%, rgba(99,102,241,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(139,92,246,0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(6,182,212,0.07) 0%, transparent 60%)',
      }} />

      {/* Nav */}
      <nav style={{
        position: 'relative', zIndex: 10,
        padding: '1.5rem clamp(1rem, 4vw, 4rem)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        background: 'rgba(10,10,20,0.4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Sparkles size={18} color="white" />
          </div>
          <h1 className="gradient-text" style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>Interviu AI</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/login" className="btn-secondary">Log In</Link>
          <Link to="/login" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main style={{
        position: 'relative', zIndex: 1,
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '5rem 2rem 4rem', textAlign: 'center',
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '999px',
          padding: '0.4rem 1.2rem',
          marginBottom: '2rem',
          fontSize: '0.85rem',
          color: 'var(--accent-primary)',
          fontWeight: 600,
        }}>
          <Sparkles size={14} />
          Powered by Gemini AI & Whisper
        </div>

        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 800,
          marginBottom: '1.5rem',
          maxWidth: '850px',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}>
          Master Your Next Interview with{' '}
          <span className="gradient-text">AI Precision</span>
        </h2>

        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          marginBottom: '3rem',
          lineHeight: 1.7,
        }}>
          Experience realistic AI-driven mock interviews, get instant feedback on your communication skills, and analyze your resume—all in one intelligent platform.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}>
          <Link to="/login" className="btn-primary" style={{
            padding: '1rem 2.5rem',
            fontSize: '1.05rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
          }}>
            Start Free Today <ArrowRight size={18} />
          </Link>
          <Link to="/login" className="btn-secondary" style={{
            padding: '1rem 2.5rem',
            fontSize: '1.05rem',
            borderRadius: '12px',
          }}>
            Watch Demo
          </Link>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap',
          justifyContent: 'center', marginBottom: '5rem',
        }}>
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Feature Cards */}
        <div style={{
          display: 'flex', gap: '1.5rem',
          flexWrap: 'wrap', justifyContent: 'center',
          maxWidth: '1200px',
        }}>
          {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center',
        padding: '2rem',
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        © 2026 Interviu AI · Built with ❤️ &amp; Gemini
      </footer>
    </div>
  );
}

export default Home;
