import React, { useState, useEffect } from 'react';
import { Activity, Target, Clock, Zap, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function StatCard({ icon, title, value }) {
  return (
    <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '12px' }}>
        {icon}
      </div>
      <div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{title}</p>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 600, margin: 0 }}>{value}</h3>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ avgScore: 0, totalTaken: 0, practiceHours: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('interviewHistory') || '[]');
    const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    setHistory(sorted);

    if (sorted.length > 0) {
      const totalScore = sorted.reduce((acc, curr) => acc + curr.scores.overall, 0);
      setStats({
        avgScore: Math.round(totalScore / sorted.length),
        totalTaken: sorted.length,
        practiceHours: +(sorted.length * 0.75).toFixed(1)
      });
    }
  }, []);

  const chartData = (() => {
    const scores = history.slice(0, 7).map(h => h.scores.overall).reverse();
    while (scores.length < 7) scores.unshift(10);
    return scores;
  })();

  return (
    <div style={{ padding: '1rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome back!</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Here is your interview preparation progress.</p>
        </div>
        <Link to="/interviews" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={20} />
          Start New Interview
        </Link>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <StatCard icon={<Activity color="var(--success)" />} title="Average Score" value={stats.avgScore + '%'} />
        <StatCard icon={<Target color="var(--warning)" />} title="Interviews Taken" value={stats.totalTaken} />
        <StatCard icon={<Clock color="var(--accent-primary)" />} title="Practice Hours" value={stats.practiceHours} />
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className="glass-panel">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', marginTop: 0 }}>
            Recent Performance
            <Link to="/history" style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', fontWeight: 'normal' }}>
              View History <ChevronRight size={16} />
            </Link>
          </h2>

          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            {chartData.map((score, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: score > 10 ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  height: score + '%',
                  borderRadius: '4px 4px 0 0',
                  opacity: i === chartData.length - 1 ? 1 : 0.6,
                  transition: 'height 1s ease-out'
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <span>Oldest</span><span></span><span></span><span></span><span></span><span></span><span>Latest</span>
          </div>
        </div>

        <div className="glass-panel">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', marginTop: 0 }}>Recent Interviews</h2>
          {history.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No interviews completed yet. Start one to see results here!</p>
          ) : (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, margin: 0 }}>
              {history.slice(0, 3).map(record => (
                <li
                  key={record.id}
                  style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                  onClick={() => navigate('/interview/result/' + record.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <h4 style={{ fontSize: '1rem', margin: 0 }}>{record.domain}</h4>
                    <span style={{
                      fontWeight: 'bold',
                      color: record.scores.overall >= 80 ? 'var(--success)' : record.scores.overall >= 60 ? 'var(--warning)' : 'var(--danger)'
                    }}>
                      {record.scores.overall}%
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>
                    {new Date(record.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
