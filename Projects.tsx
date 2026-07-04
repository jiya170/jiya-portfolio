import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'AI Career Recommender',
    description: 'AI-powered platform providing career recommendations, skill analysis, and personalized learning roadmaps.',
    github: 'https://github.com/jiya170/ai-career-recommender',
    tech: ['React.js', 'HTML', 'CSS', 'JavaScript', 'REST APIs'],
    accent: '#38bdf8',
    size: 'large',
    icon: '🎯',
  },
  {
    id: 2,
    title: 'Resume Analyzer',
    description: 'Intelligent resume parsing and analysis using ML and NLP techniques.',
    github: 'https://github.com/jiya170/Resume-Analyzer',
    tech: ['Python', 'Streamlit', 'Machine Learning', 'NLP'],
    accent: '#34d399',
    size: 'medium',
    icon: '📄',
  },
  {
    id: 3,
    title: 'GitHub Analyzer',
    description: 'Deep repository and profile analysis powered by GitHub API and LLMs.',
    github: 'https://github.com/jiya170/Github-Analyzer',
    tech: ['Python', 'Streamlit', 'GitHub API', 'LLM APIs'],
    accent: '#fb923c',
    size: 'medium',
    icon: '🐙',
  },
  {
    id: 4,
    title: 'Insurance Predictor',
    description: 'ML model for accurate insurance cost prediction and risk analysis.',
    github: 'https://github.com/jiya170/Insurance-Predictor-',
    tech: ['Python', 'Machine Learning'],
    accent: '#a78bfa',
    size: 'small',
    icon: '🛡️',
  },
  {
    id: 5,
    title: 'Tic Tac Toe',
    description: 'Interactive browser-based game with clean UI.',
    github: 'https://github.com/jiya170/Tic-Tac-Toe-Game-',
    tech: ['HTML', 'CSS', 'JavaScript'],
    accent: '#f472b6',
    size: 'small',
    icon: '❌',
  },
  {
    id: 6,
    title: 'ARTEM Research',
    description: 'Research on Memory-Augmented Large Language Models and Episodic Memory Retrieval.',
    github: 'https://github.com/cassthm/ARTEM',
    tech: ['Research', 'LLMs', 'Memory', 'AI'],
    accent: '#facc15',
    size: 'wide',
    icon: '🧠',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bento-card group p-6 flex flex-col justify-between min-h-[200px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
    >
      {/* Top */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: `${project.accent}15`, border: `1px solid ${project.accent}20` }}
          >
            {project.icon}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label={`View ${project.title} on GitHub`}
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowUpRight size={15} />
          </a>
        </div>

        <h3 className="text-base font-bold text-white mb-2 leading-tight">{project.title}</h3>
        {project.description && (
          <p className="text-white/45 text-xs leading-relaxed mb-4">{project.description}</p>
        )}
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium px-2.5 py-1 rounded-full"
              style={{
                background: `${project.accent}10`,
                border: `1px solid ${project.accent}20`,
                color: project.accent,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-white/80 transition-colors"
        >
          <Github size={13} />
          View on GitHub
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-sky-500/5 top-[0%] left-[-100px]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag mb-6 mx-auto w-fit">
            <span>Projects</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Featured{' '}
            <span className="text-gradient">Work</span>
          </h2>
          <p className="text-white/45 text-base max-w-md mx-auto leading-relaxed">
            A selection of projects spanning AI, full-stack development, and research.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {/* Row 1: Project 1 (spans 2 cols), Project 2 */}
          <div className="lg:col-span-2">
            <ProjectCard project={projects[0]} index={0} />
          </div>
          <div>
            <ProjectCard project={projects[1]} index={1} />
          </div>

          {/* Row 2: Project 3, Project 4, Project 5 */}
          <div>
            <ProjectCard project={projects[2]} index={2} />
          </div>
          <div>
            <ProjectCard project={projects[3]} index={3} />
          </div>
          <div>
            <ProjectCard project={projects[4]} index={4} />
          </div>

          {/* Row 3: Project 6 (spans 3 cols) */}
          <div className="lg:col-span-3">
            <ProjectCard project={projects[5]} index={5} />
          </div>
        </div>
      </div>
    </section>
  );
}
