import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, Binary, BookOpen, Brain, 
  Cpu, Network, Database, Globe, 
  Layers, Settings, Server, Shield, 
  Box, TestTube, GitBranch, Target,
  FileCode, Terminal, Compass, LayoutDashboard
} from 'lucide-react';

const COURSES = [
  { id: 'python', title: 'Python Programming', icon: <FileCode size={24} />, description: 'Master Python from basics to advanced concepts like decorators and generators.', level: 'Beginner', duration: '40 hours', color: '#3B82F6' },
  { id: 'java', title: 'Java Programming', icon: <Code size={24} />, description: 'Learn object-oriented programming with Java and build robust applications.', level: 'Beginner', duration: '45 hours', color: '#F59E0B' },
  { id: 'dsa', title: 'Data Structures & Algorithms', icon: <Binary size={24} />, description: 'Ace your coding interviews by mastering core DSA concepts.', level: 'Intermediate', duration: '60 hours', color: '#8B5CF6' },
  { id: 'ai', title: 'Artificial Intelligence', icon: <Brain size={24} />, description: 'Dive into the world of AI, search algorithms, and intelligent systems.', level: 'Advanced', duration: '50 hours', color: '#EC4899' },
  { id: 'ml', title: 'Machine Learning', icon: <Network size={24} />, description: 'Understand supervised, unsupervised, and reinforcement learning.', level: 'Advanced', duration: '55 hours', color: '#10B981' },
  { id: 'dl', title: 'Deep Learning', icon: <Cpu size={24} />, description: 'Build neural networks using TensorFlow and PyTorch.', level: 'Advanced', duration: '60 hours', color: '#6366F1' },
  { id: 'genai', title: 'Generative AI', icon: <Brain size={24} />, description: 'Learn about LLMs, transformers, and prompt engineering.', level: 'Advanced', duration: '45 hours', color: '#D946EF' },
  { id: 'datascience', title: 'Data Science', icon: <Database size={24} />, description: 'Extract insights from data using Pandas, NumPy, and visualization tools.', level: 'Intermediate', duration: '50 hours', color: '#0EA5E9' },
  { id: 'webdev', title: 'Web Development', icon: <Globe size={24} />, description: 'Master HTML, CSS, and vanilla JavaScript for modern web building.', level: 'Beginner', duration: '40 hours', color: '#F43F5E' },
  { id: 'react', title: 'React.js', icon: <LayoutDashboard size={24} />, description: 'Build interactive user interfaces with React and hooks.', level: 'Intermediate', duration: '35 hours', color: '#06B6D4' },
  { id: 'nodejs', title: 'Node.js', icon: <Server size={24} />, description: 'Develop scalable backend applications using JavaScript.', level: 'Intermediate', duration: '35 hours', color: '#84CC16' },
  { id: 'fastapi', title: 'FastAPI', icon: <Terminal size={24} />, description: 'Create high-performance APIs with Python and FastAPI.', level: 'Intermediate', duration: '25 hours', color: '#059669' },
  { id: 'sql', title: 'SQL & Database Management', icon: <Database size={24} />, description: 'Learn database design, querying, and optimization.', level: 'Beginner', duration: '30 hours', color: '#3B82F6' },
  { id: 'cloud', title: 'Cloud Computing (AWS)', icon: <Server size={24} />, description: 'Deploy and manage applications on Amazon Web Services.', level: 'Intermediate', duration: '45 hours', color: '#F97316' },
  { id: 'devops', title: 'DevOps', icon: <Settings size={24} />, description: 'Automate workflows with CI/CD, Docker, and Kubernetes.', level: 'Advanced', duration: '50 hours', color: '#6366F1' },
  { id: 'security', title: 'Cyber Security', icon: <Shield size={24} />, description: 'Learn ethical hacking, network security, and cryptography.', level: 'Intermediate', duration: '40 hours', color: '#EF4444' },
  { id: 'systemdesign', title: 'System Design', icon: <Layers size={24} />, description: 'Design scalable, highly available software architectures.', level: 'Advanced', duration: '40 hours', color: '#8B5CF6' },
  { id: 'testing', title: 'Software Testing', icon: <TestTube size={24} />, description: 'Master unit, integration, and end-to-end testing methodologies.', level: 'Beginner', duration: '25 hours', color: '#14B8A6' },
  { id: 'git', title: 'Git & GitHub', icon: <GitBranch size={24} />, description: 'Version control your code and collaborate with teams effectively.', level: 'Beginner', duration: '15 hours', color: '#F43F5E' },
  { id: 'aptitude', title: 'Aptitude & Interview Prep', icon: <Target size={24} />, description: 'Crack quantitative, logical, and verbal aptitude tests.', level: 'Beginner', duration: '30 hours', color: '#EAB308' },
];

export default function Courses() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Learning Path</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          Explore our trending technology courses. Master new skills with comprehensive theory, 
          code examples, and interview prep guides.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '2rem'
      }}>
        {COURSES.map((course) => (
          <div 
            key={course.id} 
            className="glass-panel course-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: course.color
            }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                borderRadius: '10px', 
                background: `rgba(${parseInt(course.color.slice(1,3), 16)}, ${parseInt(course.color.slice(3,5), 16)}, ${parseInt(course.color.slice(5,7), 16)}, 0.1)`,
                color: course.color
              }}>
                {course.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>{course.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '4px',
                    background: course.level === 'Beginner' ? 'rgba(16, 185, 129, 0.1)' : 
                                course.level === 'Intermediate' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: course.level === 'Beginner' ? '#10B981' : 
                           course.level === 'Intermediate' ? '#3B82F6' : '#EF4444',
                    fontWeight: 600
                  }}>
                    {course.level}
                  </span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>• {course.duration}</span>
                </div>
              </div>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
              {course.description}
            </p>

            <button 
              className="btn-secondary" 
              style={{ 
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              <BookOpen size={18} />
              View Course
            </button>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border-color: rgba(255,255,255,0.2);
        }
        .course-card .btn-secondary:hover {
          background: rgba(255,255,255,0.1);
        }
      `}} />
    </div>
  );
}
