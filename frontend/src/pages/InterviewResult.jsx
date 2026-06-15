import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, MessageSquare, Zap, Activity, ClipboardList, CheckCircle2, AlertCircle, Clock, FileText } from 'lucide-react';

export default function InterviewResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('interviewHistory') || '[]');
    const currentResult = history.find(item => item.id === id);
    if (currentResult) {
      setResult(currentResult);
    } else {
      navigate('/history');
    }
  }, [id, navigate]);

  if (!result) return (
    <div className="container" style={{ paddingTop: '5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
      Loading scorecard...
    </div>
  );

  const { scores, questions = [], textAnswers = [], metrics = {}, domain, date } = result;
  const timePerQuestion = metrics.timePerQuestion || [];

  // Helper for Grade calculation
  const getGrade = (score) => {
    if (score >= 85) return { grade: 'A', label: 'Exceptional', color: 'var(--success)' };
    if (score >= 70) return { grade: 'B', label: 'Good', color: 'var(--accent-primary)' };
    if (score >= 55) return { grade: 'C', label: 'Developing', color: 'var(--warning)' };
    return { grade: 'D', label: 'Needs Practice', color: 'var(--danger)' };
  };

  const { grade, label: gradeLabel, color: gradeColor } = getGrade(scores.overall);
  const overallDeg = scores.overall * 3.6;

  // Description and tips for each sector
  const SECTORS = [
    {
      key: 'contentKnowledge',
      label: 'Content Knowledge',
      desc: 'Measures technical accuracy and domain-specific terminology relevant to your role.',
      icon: <Brain size={20} color="#6366f1" />,
      tip: 'Add more domain-specific terminology to your answers'
    },
    {
      key: 'communication',
      label: 'Communication',
      desc: 'Measures how well-elaborated, articulate, and clear your answers are.',
      icon: <MessageSquare size={20} color="#3b82f6" />,
      tip: 'Aim for 40-80 word answers. Elaborate with specific examples'
    },
    {
      key: 'confidence',
      label: 'Confidence',
      desc: 'Measures pacing, completion rate, and active participation/typing engagement.',
      icon: <Zap size={20} color="#eab308" />,
      tip: 'Use the text box to answer every question. Skipping questions lowers this score'
    },
    {
      key: 'fluency',
      label: 'Fluency',
      desc: 'Measures flow and consistency of answer depth across the interview.',
      icon: <Activity size={20} color="#ec4899" />,
      tip: 'Keep your answers consistently detailed. Avoid very short then very long answers'
    },
    {
      key: 'answerStructure',
      label: 'Answer Structure',
      desc: 'Measures logical organization and use of professional framework keywords (STAR method).',
      icon: <ClipboardList size={20} color="#10b981" />,
      tip: 'Use the STAR method: Situation → Task → Action → Result'
    }
  ];

  // Actionable tips are generated from weak sectors (score < 70)
  const weakSectors = SECTORS.filter(s => (scores[s.key] ?? 50) < 70);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: 'var(--text-primary)' }}>
      {/* Back to Dashboard */}
      <button
        className="btn-secondary"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', border: 'none', padding: '0.6rem 1.2rem', cursor: 'pointer' }}
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Title */}
      <div style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Interview Evaluation Report</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>
          Role Profile: <strong style={{ color: '#fff' }}>{domain}</strong> &bull; Evaluated on: {new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Main Score & Sectors Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start', marginBottom: '3rem' }}>
        
        {/* Left Column: Grade & Summary Card */}
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ margin: '0 0 2rem 0', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '1.1rem' }}>Evaluation Summary</h3>

          {/* Conic Gradient Overall Ring */}
          <div style={{
            position: 'relative',
            width: '210px',
            height: '210px',
            borderRadius: '50%',
            background: `conic-gradient(var(--accent-primary) 0deg ${overallDeg}deg, rgba(255,255,255,0.06) ${overallDeg}deg 360deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            boxShadow: '0 0 30px rgba(99,102,241,0.2)'
          }}>
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '4.5rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{grade}</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 700, color: gradeColor, marginTop: '0.2rem' }}>{scores.overall} / 100</span>
            </div>
          </div>

          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            {gradeLabel} Performance
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
            {scores.overall >= 85 
              ? "Outstanding response pattern! Your industry terminologies, structured arguments, and detailed justifications show advanced readiness."
              : scores.overall >= 70
              ? "Solid showing. You have a good base. Incorporating the suggested structural frameworks will push you into the top tier."
              : "A valuable diagnostic run. To raise your profile, focus on providing more thorough explanations and using industry keywords."
            }
          </p>
        </div>

        {/* Right Column: 5 Score Sectors */}
        <div className="glass-panel" style={{ padding: '2rem 2.5rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', fontWeight: 700 }}>Performance Breakdown</h3>
          
          {SECTORS.map(sec => {
            const score = scores[sec.key] ?? 50;
            const barColor = score >= 85 ? 'var(--success)' : score >= 70 ? 'var(--accent-primary)' : score >= 55 ? 'var(--warning)' : 'var(--danger)';
            return (
              <div key={sec.key} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '8px', display: 'flex' }}>
                      {sec.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>{sec.label}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.1rem', maxWidth: '380px', lineHeight: 1.4 }}>{sec.desc}</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', color: barColor }}>{score}</span>
                </div>
                
                {/* Visual Bar */}
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${score}%`, height: '100%', background: barColor, borderRadius: '3px', transition: 'width 0.8s ease-out' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actionable Tips / Recommendations */}
      <div className="glass-panel" style={{ padding: '2rem 2.5rem', marginBottom: '3rem', borderLeft: '4px solid var(--accent-primary)' }}>
        <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
          <AlertCircle size={22} color="var(--accent-primary)" /> Recommendations for Improvement
        </h3>
        {weakSectors.length > 0 ? (
          <ul style={{ paddingLeft: '1.25rem', margin: 0, lineHeight: 1.8, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            {weakSectors.map(s => (
              <li key={s.key} style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#fff' }}>{s.label}: </strong> {s.tip}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            ✨ Excellent work! All your sectors scored above 70. Keep practicing to maintain this level of consistent performance across different interview styles.
          </p>
        )}
      </div>

      {/* Detailed Question & Answer Log */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={22} color="var(--accent-primary)" /> Response Log &amp; Timing
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {questions.map((question, index) => {
            const ans = textAnswers[index] || '';
            const words = ans.trim().split(/\s+/).filter(w => w.length > 1).length;
            const time = timePerQuestion[index] ? Math.round(timePerQuestion[index]) : 0;
            
            return (
              <div key={index} className="glass-panel" style={{ padding: '1.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{
                      background: index < 3 ? 'rgba(99,102,241,0.15)' : 'rgba(16,185,129,0.15)',
                      color: index < 3 ? 'var(--accent-primary)' : '#10b981',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}>
                      {index < 3 ? 'Behavioral' : 'Domain Specific'}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Question {index + 1}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={14} /> {time}s spent
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <FileText size={14} /> {words} words
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <h4 style={{ fontSize: '1.05rem', margin: '0 0 1rem 0', color: '#fff', lineHeight: 1.5 }}>{question}</h4>

                {/* User Answer Content */}
                <div style={{
                  background: 'rgba(0,0,0,0.15)',
                  padding: '1rem 1.25rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.03)',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: ans.trim() ? 'var(--text-primary)' : 'var(--text-secondary)'
                }}>
                  {ans.trim() ? (
                    <p style={{ margin: 0, whiteSpace: 'pre-line' }}>"{ans}"</p>
                  ) : (
                    <em style={{ color: 'var(--danger)' }}>⚠️ No written response was provided for this question.</em>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
