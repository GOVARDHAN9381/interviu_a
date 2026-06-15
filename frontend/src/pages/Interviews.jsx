import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Code, BrainCircuit, Clock, TrendingUp, Play, ChevronRight, Briefcase, Database, LayoutTemplate, PenTool } from 'lucide-react';

const interviewCategories = [
  {
    id: 'hr',
    title: 'HR & Behavioral',
    icon: <Users size={32} className="text-blue-400" />,
    description: 'Master behavioral questions, culture fit, and communication skills.',
    difficulty: 'Beginner to Intermediate',
    duration: '30 mins',
    color: '#3B82F6',
    questions: [
      'Tell me about yourself and your professional background.',
      'Why are you interested in this specific role?',
      'Describe a challenging situation at work and how you handled it.',
      'Where do you see yourself in 5 years?',
      'How do you handle working under pressure or tight deadlines?'
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    icon: <LayoutTemplate size={32} className="text-pink-400" />,
    description: 'React, Vue, HTML/CSS, and browser rendering optimization questions.',
    difficulty: 'Intermediate',
    duration: '45 mins',
    color: '#EC4899',
    questions: [
      'Explain the Virtual DOM and how React uses it to optimize rendering.',
      'What are React Hooks and why were they introduced in React 16.8?',
      'How do you optimize the performance of a React application?',
      'Explain the CSS box model in detail.',
      'Explain closures in JavaScript with an example.'
    ]
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    icon: <Database size={32} className="text-green-400" />,
    description: 'API design, databases, system architecture, and server logic.',
    difficulty: 'Advanced',
    duration: '60 mins',
    color: '#10B981',
    questions: [
      'What is the difference between REST and GraphQL?',
      'Explain database normalization (1NF, 2NF, 3NF) and why it matters.',
      'How would you design a URL shortener service at scale?',
      'What is database indexing and how does it improve performance?',
      'Explain the CAP theorem in distributed systems.'
    ]
  },
  {
    id: 'data-science',
    title: 'Data Scientist',
    icon: <BrainCircuit size={32} className="text-purple-400" />,
    description: 'Machine Learning models, statistics, Python, and data manipulation.',
    difficulty: 'Advanced',
    duration: '60 mins',
    color: '#8B5CF6',
    questions: [
      'What is overfitting and how do you prevent it?',
      'Explain how a Random Forest algorithm works.',
      'What is the p-value and how do you interpret it in hypothesis testing?',
      'Explain the bias-variance tradeoff.',
      'How do you handle missing data in a dataset?'
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    icon: <Briefcase size={32} className="text-orange-400" />,
    description: 'Product strategy, agile methodologies, and user prioritization.',
    difficulty: 'Intermediate to Advanced',
    duration: '45 mins',
    color: '#F97316',
    questions: [
      'How do you prioritize features in a product backlog?',
      'Describe a product you think is poorly designed and why.',
      'How do you measure the success of a product launch?',
      'Explain the concept of MVP (Minimum Viable Product).',
      'How do you define user personas and use them in product decisions?'
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Designer',
    icon: <PenTool size={32} className="text-teal-400" />,
    description: 'User research, wireframing, design systems, and usability testing.',
    difficulty: 'Intermediate',
    duration: '45 mins',
    color: '#14B8A6',
    questions: [
      'Walk me through your design process for a new feature.',
      'How do you handle negative feedback on your designs?',
      'Explain the difference between responsive and adaptive design.',
      'How do you conduct user research effectively?',
      'What is a design system and why is it important?'
    ]
  }
];

export default function Interviews() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleStartInterview = (category) => {
    // Navigate to live interview, passing the domain info in state
    navigate('/interview/live', { state: { domain: category.title } });
  };

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Interview Prep Hub</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
          Select a domain below to start your AI-powered live video interview. Practice answering questions and get immediate feedback on your communication and confidence.
        </p>
      </div>

      <div className="interviews-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {interviewCategories.map((category) => (
          <div 
            key={category.id} 
            className="glass-panel interview-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: selectedCategory?.id === category.id ? `2px solid ${category.color}` : '1px solid var(--border-color)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedCategory(category)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ 
                padding: '1rem', 
                borderRadius: '12px', 
                background: `rgba(${parseInt(category.color.slice(1,3), 16)}, ${parseInt(category.color.slice(3,5), 16)}, ${parseInt(category.color.slice(5,7), 16)}, 0.1)`
              }}>
                {React.cloneElement(category.icon, { color: category.color })}
              </div>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{category.title}</h2>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1 }}>
              {category.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <TrendingUp size={16} />
                <span>Difficulty: <strong style={{ color: 'var(--text-primary)' }}>{category.difficulty}</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <Clock size={16} />
                <span>Duration: <strong style={{ color: 'var(--text-primary)' }}>{category.duration}</strong></span>
              </div>
            </div>

            <button 
              className="btn-primary" 
              style={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '0.5rem',
                background: selectedCategory?.id === category.id ? category.color : 'var(--bg-secondary)',
                boxShadow: selectedCategory?.id === category.id ? `0 4px 15px ${category.color}40` : 'none',
                color: selectedCategory?.id === category.id ? '#fff' : 'var(--text-primary)'
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleStartInterview(category);
              }}
            >
              <Play size={18} />
              Start Live Interview
            </button>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="glass-panel" style={{ animation: 'fadeIn 0.5s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            {React.cloneElement(selectedCategory.icon, { size: 24, color: selectedCategory.color })}
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Sample {selectedCategory.title} Questions</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {selectedCategory.questions.map((q, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '1.25rem',
                borderRadius: '8px',
                borderLeft: `4px solid ${selectedCategory.color}`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <ChevronRight size={20} color={selectedCategory.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {q}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .interview-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
      `}} />
    </div>
  );
}
