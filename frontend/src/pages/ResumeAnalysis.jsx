import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, XCircle, TrendingUp, Award, Briefcase, GraduationCap, Code, Mail, BarChart3, RefreshCw } from 'lucide-react';

// --- ATS Keyword Database per Category ---
const ATS_KEYWORDS = {
  technical: [
    'javascript', 'python', 'java', 'react', 'node', 'sql', 'html', 'css', 'typescript',
    'aws', 'docker', 'kubernetes', 'git', 'api', 'rest', 'graphql', 'mongodb', 'postgresql',
    'linux', 'agile', 'scrum', 'ci/cd', 'devops', 'machine learning', 'data analysis',
    'tensorflow', 'pandas', 'numpy', 'flask', 'django', 'express', 'angular', 'vue',
    'spring', 'microservices', 'cloud', 'azure', 'gcp', 'firebase', 'redis', 'elasticsearch',
    'c++', 'c#', '.net', 'ruby', 'php', 'swift', 'kotlin', 'go', 'rust', 'scala',
    'hadoop', 'spark', 'tableau', 'power bi', 'figma', 'sketch', 'adobe', 'photoshop',
    'jira', 'confluence', 'slack', 'trello', 'notion', 'github', 'gitlab', 'bitbucket'
  ],
  action_verbs: [
    'achieved', 'improved', 'developed', 'managed', 'created', 'designed', 'implemented',
    'led', 'coordinated', 'analyzed', 'built', 'delivered', 'established', 'generated',
    'increased', 'launched', 'optimized', 'reduced', 'resolved', 'streamlined',
    'supervised', 'trained', 'transformed', 'collaborated', 'contributed', 'executed',
    'facilitated', 'initiated', 'mentored', 'negotiated', 'organized', 'presented',
    'proposed', 'researched', 'spearheaded', 'upgraded', 'automated', 'maintained'
  ],
  metrics_patterns: [
    /\d+%/, /\$[\d,]+/, /\d+\+?\s*(users|customers|clients|projects|teams|people)/i,
    /increased.*by\s*\d+/i, /reduced.*by\s*\d+/i, /improved.*by\s*\d+/i,
    /\d+x\s/i, /revenue/i, /growth/i, /roi/i, /kpi/i
  ],
  contact_keywords: [
    'email', 'phone', 'linkedin', 'github', 'portfolio', '@', 'http', 'www',
    '.com', '.org', '.io', '.dev'
  ],
  section_headers: [
    'experience', 'education', 'skills', 'projects', 'certifications', 'summary',
    'objective', 'profile', 'work history', 'employment', 'achievements', 'awards',
    'publications', 'volunteer', 'interests', 'languages', 'references'
  ],
  education_keywords: [
    'bachelor', 'master', 'phd', 'degree', 'university', 'college', 'gpa',
    'certification', 'certified', 'diploma', 'coursework', 'b.tech', 'm.tech',
    'b.sc', 'm.sc', 'mba', 'b.e', 'm.e', 'bca', 'mca'
  ]
};

/**
 * Analyze resume text and produce detailed ATS scoring
 */
function analyzeResume(text) {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  const wordCount = words.length;
  const lines = text.split('\n').filter(l => l.trim());

  // 1. Contact Information (0-100)
  const contactFound = ATS_KEYWORDS.contact_keywords.filter(k => lower.includes(k));
  const hasEmail = /@/.test(text) || /email/i.test(text);
  const hasPhone = /(\+?\d[\d\s\-]{7,}|\bphone\b)/i.test(text);
  const hasLinkedIn = /linkedin/i.test(text);
  const contactScore = Math.min(100, (hasEmail ? 35 : 0) + (hasPhone ? 30 : 0) + (hasLinkedIn ? 20 : 0) + Math.min(15, contactFound.length * 5));

  // 2. Technical Keywords (0-100)
  const techFound = ATS_KEYWORDS.technical.filter(k => lower.includes(k));
  const techScore = Math.min(100, Math.round((techFound.length / 8) * 100)); // 8+ tech keywords = 100

  // 3. Action Verbs (0-100)
  const verbsFound = ATS_KEYWORDS.action_verbs.filter(v => lower.includes(v));
  const verbScore = Math.min(100, Math.round((verbsFound.length / 6) * 100)); // 6+ action verbs = 100

  // 4. Quantifiable Metrics (0-100)
  let metricsCount = 0;
  ATS_KEYWORDS.metrics_patterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) metricsCount += matches.length;
  });
  const metricsScore = Math.min(100, Math.round((metricsCount / 3) * 100)); // 3+ metrics = 100

  // 5. Section Structure (0-100)
  const sectionsFound = ATS_KEYWORDS.section_headers.filter(s => lower.includes(s));
  const structureScore = Math.min(100, Math.round((sectionsFound.length / 5) * 100)); // 5+ sections = 100

  // 6. Education (0-100)
  const eduFound = ATS_KEYWORDS.education_keywords.filter(k => lower.includes(k));
  const educationScore = Math.min(100, Math.round((eduFound.length / 3) * 100)); // 3+ education keywords = 100

  // 7. Length/Formatting Check (0-100)
  let lengthScore = 100;
  if (wordCount < 100) lengthScore = 30; // Too short
  else if (wordCount < 200) lengthScore = 55;
  else if (wordCount < 300) lengthScore = 75;
  else if (wordCount > 1200) lengthScore = 70; // Too long
  else if (wordCount > 800) lengthScore = 85;

  // Overall ATS Score (weighted average)
  const overall = Math.round(
    contactScore * 0.10 +
    techScore * 0.25 +
    verbScore * 0.15 +
    metricsScore * 0.15 +
    structureScore * 0.15 +
    educationScore * 0.10 +
    lengthScore * 0.10
  );

  // Generate strengths
  const strengths = [];
  if (techFound.length >= 5) strengths.push(`Strong technical skills — found ${techFound.length} relevant technologies: ${techFound.slice(0, 5).join(', ')}${techFound.length > 5 ? '...' : ''}`);
  if (verbsFound.length >= 4) strengths.push(`Good use of ${verbsFound.length} action verbs showing impact and initiative`);
  if (metricsCount >= 2) strengths.push(`Includes ${metricsCount} quantifiable metrics demonstrating measurable achievements`);
  if (sectionsFound.length >= 4) strengths.push(`Well-structured resume with clear sections: ${sectionsFound.slice(0, 4).join(', ')}`);
  if (contactScore >= 70) strengths.push('Complete contact information makes it easy for recruiters to reach you');
  if (eduFound.length >= 2) strengths.push('Education section is well-documented');
  if (wordCount >= 300 && wordCount <= 800) strengths.push('Resume length is optimal for ATS parsing');

  // Generate weaknesses
  const weaknesses = [];
  if (techFound.length < 3) weaknesses.push('Lacks sufficient technical keywords — ATS may not match your profile to job descriptions');
  if (verbsFound.length < 3) weaknesses.push('Missing strong action verbs — use words like "achieved", "implemented", "led" to describe accomplishments');
  if (metricsCount === 0) weaknesses.push('No quantifiable metrics found — add numbers like "improved performance by 20%" or "managed team of 8"');
  if (sectionsFound.length < 3) weaknesses.push('Resume structure needs more standard sections (Experience, Skills, Education, Projects)');
  if (!hasEmail) weaknesses.push('Email address not detected — ensure your email is clearly visible');
  if (!hasPhone) weaknesses.push('Phone number not detected — add a contact number');
  if (!hasLinkedIn) weaknesses.push('No LinkedIn profile found — adding one can boost credibility');
  if (wordCount < 200) weaknesses.push('Resume is too short — most ATS systems expect at least 300-600 words');
  if (wordCount > 1000) weaknesses.push('Resume may be too lengthy — aim for 1-2 pages (300-800 words)');

  // Suggestions
  const suggestions = [];
  if (techFound.length < 5) suggestions.push('Add more technical skills relevant to the job description you\'re targeting');
  if (metricsCount < 2) suggestions.push('Quantify your achievements: "Reduced page load time by 40%" is stronger than "Improved page load time"');
  if (verbsFound.length < 4) suggestions.push('Start bullet points with action verbs: Developed, Implemented, Analyzed, Coordinated');
  if (!lower.includes('summary') && !lower.includes('objective') && !lower.includes('profile')) {
    suggestions.push('Add a Professional Summary at the top — it\'s the first thing ATS and recruiters scan');
  }
  if (!lower.includes('project')) suggestions.push('Include a Projects section to showcase hands-on experience');
  if (sectionsFound.length < 4) suggestions.push('Use standard section headers (Experience, Skills, Education, Projects) for better ATS compatibility');

  return {
    overall,
    categories: {
      contact: { score: contactScore, label: 'Contact Info', icon: 'mail' },
      technical: { score: techScore, label: 'Technical Keywords', icon: 'code' },
      actionVerbs: { score: verbScore, label: 'Action Verbs', icon: 'trending' },
      metrics: { score: metricsScore, label: 'Quantifiable Impact', icon: 'chart' },
      structure: { score: structureScore, label: 'Resume Structure', icon: 'briefcase' },
      education: { score: educationScore, label: 'Education', icon: 'education' }
    },
    strengths: strengths.length > 0 ? strengths : ['Upload a more detailed resume for specific strengths analysis'],
    weaknesses: weaknesses.length > 0 ? weaknesses : ['Great job! No major weaknesses detected'],
    suggestions: suggestions.length > 0 ? suggestions : ['Your resume looks well-optimized for ATS!'],
    stats: {
      wordCount,
      techKeywords: techFound.length,
      actionVerbs: verbsFound.length,
      metrics: metricsCount,
      sections: sectionsFound.length
    }
  };
}

const CATEGORY_ICONS = {
  mail: <Mail size={18} />,
  code: <Code size={18} />,
  trending: <TrendingUp size={18} />,
  chart: <BarChart3 size={18} />,
  briefcase: <Briefcase size={18} />,
  education: <GraduationCap size={18} />
};

const CATEGORY_COLORS = {
  contact: '#3B82F6',
  technical: '#8B5CF6',
  actionVerbs: '#EC4899',
  metrics: '#10B981',
  structure: '#F59E0B',
  education: '#06B6D4'
};

export default function ResumeAnalysis() {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(() => {
    const saved = localStorage.getItem('resumeATSResult');
    return saved ? JSON.parse(saved) : null;
  });

  const handleFile = useCallback(async (selectedFile) => {
    if (!selectedFile) return;

    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(pdf|doc|docx|txt)$/i)) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }

    setFile(selectedFile);
    setAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await fetch('http://localhost:8000/api/resume/analyze', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Server analysis failed');
      }
      
      const analysis = await response.json();
      analysis.analyzedAt = new Date().toISOString();
      
      setResult(analysis);
      localStorage.setItem('resumeATSResult', JSON.stringify(analysis));
      localStorage.setItem('resumeATSScore', analysis.overall.toString());
    } catch (err) {
      console.warn('Backend connection failed, falling back to local analysis:', err);
      try {
        const text = await readFileAsText(selectedFile);
        const analysis = analyzeResume(text);
        analysis.filename = selectedFile.name;
        analysis.analyzedAt = new Date().toISOString();
        
        setResult(analysis);
        localStorage.setItem('resumeATSResult', JSON.stringify(analysis));
        localStorage.setItem('resumeATSScore', analysis.overall.toString());
      } catch (localErr) {
        console.error('Local analysis also failed:', localErr);
        alert('Could not analyze the file. Please make sure the file is not corrupted.');
      }
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        reader.readAsText(file);
      } else {
        // For PDF/DOCX, read as text — won't get formatting but gets raw content
        reader.readAsText(file);
      }
    });
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--warning)';
    return 'var(--danger)';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 50) return 'Needs Work';
    return 'Poor';
  };

  const overallDeg = result ? result.overall * 3.6 + 'deg' : '0deg';

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Resume ATS Analysis</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '700px' }}>
          Upload your resume to get an instant ATS (Applicant Tracking System) compatibility score 
          with detailed breakdown and actionable improvement tips.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        className={`resume-upload-zone ${dragOver ? 'drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('resume-file-input').click()}
        style={{
          border: `2px dashed ${dragOver ? 'var(--accent-primary)' : 'var(--border-color)'}`,
          borderRadius: '16px',
          padding: '3rem 2rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          background: dragOver ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255,255,255,0.02)',
          marginBottom: '2rem'
        }}
      >
        <input
          id="resume-file-input"
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          style={{ display: 'none' }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {analyzing ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <RefreshCw size={48} color="var(--accent-primary)" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '1.2rem' }}>Analyzing your resume...</p>
            <p style={{ color: 'var(--text-secondary)' }}>Checking ATS compatibility, keywords, and structure</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Upload size={48} color="var(--text-secondary)" />
            <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.2rem' }}>
              {file ? file.name : 'Drag & drop your resume here'}
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              or click to browse • Supports PDF, DOC, DOCX, TXT
            </p>
          </div>
        )}
      </div>

      {/* Results */}
      {result && !analyzing && (
        <div style={{ animation: 'fadeInUp 0.6s ease' }}>
          {/* Top Row: Overall Score + Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '2rem' }}>
            {/* Overall ATS Score */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2.5rem' }}>
              <h2 style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', marginTop: 0, fontSize: '1.2rem' }}>ATS Score</h2>
              <div style={{
                width: '180px', height: '180px', borderRadius: '50%',
                background: `conic-gradient(${getScoreColor(result.overall)} ${overallDeg}, rgba(255,255,255,0.05) 0deg)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '150px', height: '150px', borderRadius: '50%',
                  background: 'var(--bg-card)', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: getScoreColor(result.overall), lineHeight: 1 }}>
                    {result.overall}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>/ 100</span>
                </div>
              </div>
              <p style={{ color: getScoreColor(result.overall), fontWeight: 600, fontSize: '1.1rem', textAlign: 'center' }}>
                {getScoreLabel(result.overall)}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center', marginTop: '0.5rem' }}>
                <FileText size={14} style={{ verticalAlign: 'middle' }} /> {result.filename}
              </p>
            </div>

            {/* Category Breakdown */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2 style={{ marginBottom: '1.5rem', color: '#fff', marginTop: 0, fontSize: '1.3rem' }}>Category Breakdown</h2>
              {Object.entries(result.categories).map(([key, cat]) => {
                const barColor = getScoreColor(cat.score);
                return (
                  <div key={key} style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                        <span style={{ color: CATEGORY_COLORS[key] }}>{CATEGORY_ICONS[cat.icon]}</span>
                        <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{cat.label}</span>
                      </div>
                      <span style={{ fontWeight: 'bold', color: barColor, fontSize: '0.95rem' }}>{cat.score}/100</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{
                        width: cat.score + '%', height: '100%',
                        background: CATEGORY_COLORS[key],
                        borderRadius: '3px',
                        transition: 'width 1s ease-out'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { label: 'Word Count', value: result.stats.wordCount, color: '#3B82F6' },
              { label: 'Tech Keywords', value: result.stats.techKeywords, color: '#8B5CF6' },
              { label: 'Action Verbs', value: result.stats.actionVerbs, color: '#EC4899' },
              { label: 'Metrics Found', value: result.stats.metrics, color: '#10B981' },
              { label: 'Sections', value: result.stats.sections, color: '#F59E0B' }
            ].map((stat, i) => (
              <div key={i} className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</p>
                <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: stat.color, margin: 0 }}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Strengths & Weaknesses */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginTop: 0, marginBottom: '1.5rem' }}>
                <CheckCircle size={20} /> Strengths
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {result.strengths.map((s, i) => (
                  <li key={i} style={{
                    padding: '0.75rem 1rem',
                    background: 'rgba(16, 185, 129, 0.08)',
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--success)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5
                  }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)', marginTop: 0, marginBottom: '1.5rem' }}>
                <XCircle size={20} /> Areas to Improve
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {result.weaknesses.map((w, i) => (
                  <li key={i} style={{
                    padding: '0.75rem 1rem',
                    background: 'rgba(239, 68, 68, 0.08)',
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--danger)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5
                  }}>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Suggestions */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)', marginTop: 0, marginBottom: '1.5rem' }}>
              <AlertTriangle size={20} /> Suggestions for Improvement
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {result.suggestions.map((s, i) => (
                <div key={i} style={{
                  padding: '1rem 1.25rem',
                  background: 'rgba(245, 158, 11, 0.08)',
                  borderRadius: '8px',
                  borderLeft: '3px solid var(--warning)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start'
                }}>
                  <Award size={16} color="var(--warning)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .resume-upload-zone:hover {
          border-color: var(--accent-primary) !important;
          background: rgba(99, 102, 241, 0.05) !important;
        }
      `}} />
    </div>
  );
}
