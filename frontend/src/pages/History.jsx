import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, ChevronRight, VideoOff } from 'lucide-react';

export default function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('interviewHistory') || '[]');
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setHistory(data);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--warning)';
    return 'var(--danger)';
  };

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Interview History</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Review your past AI mock interviews and track your progress over time.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <VideoOff size={48} style={{ color: 'var(--text-secondary)', margin: '0 auto 1rem auto', display: 'block' }} />
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>No Interviews Yet</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            You have not taken any AI mock interviews yet. Start one to see your history here!
          </p>
          <button className="btn-primary" onClick={() => navigate('/interviews')}>
            Start an Interview
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {history.map((record) => {
            const scoreColor = getScoreColor(record.scores.overall);
            return (
              <div
                key={record.id}
                onClick={() => navigate('/interview/result/' + record.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.5rem 2rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-color)',
                  borderLeft: '4px solid ' + scoreColor,
                  borderRadius: '16px'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '1rem',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '80px'
                  }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Score</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: scoreColor }}>
                      {record.scores.overall}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: '#fff' }}>{record.domain}</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Calendar size={14} /> {new Date(record.date).toLocaleDateString()}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Clock size={14} /> {new Date(record.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>

                <ChevronRight size={24} color="var(--text-secondary)" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
