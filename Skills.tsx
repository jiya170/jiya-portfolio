import { useEffect, useRef, useState } from 'react';
import { Code2, Layout, Server, Brain, Wrench, Sparkles } from 'lucide-react';

const skillCategories = [
  {
    id: '01',
    title: 'Programming Languages',
    icon: Code2,
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.1)',
    badges: ['Python', 'C', 'C++', 'JavaScript', 'SQL'],
  },
  {
    id: '02',
    title: 'Frontend Development',
    icon: Layout,
    color: '#34d399',
    glow: 'rgba(52,211,153,0.1)',
    badges: ['React.js', 'HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    id: '03',
    title: 'Backend Development',
    icon: Server,
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.1)',
    badges: ['FastAPI', 'REST APIs', 'GitHub API'],
  },
  {
    id: '04',
    title: 'Artificial Intelligence',
    icon: Brain,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.1)',
    badges: ['Artificial Intelligence', 'Machine Learning', 'NLP', 'LLMs'],
  },
  {
    id: '05',
    title: 'Tools & Platforms',
    icon: Wrench,
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.1)',
    badges: ['Git', 'GitHub', 'VS Code', 'Figma'],
  },
  {
    id: '06',
    title: 'Core Skills',
    icon: Sparkles,
    color: '#facc15',
    glow: 'rgba(250,204,21,0.1)',
    badges: ['Problem Solving', 'API Integration', 'Database Management', 'Software Development', 'Team Collaboration'],
  },
];

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const Icon = category.icon;

  return (
    <div
      ref={ref}
      className="glass glass-hover rounded-2xl p-6 flex flex-col gap-5"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: category.glow, border: `1px solid ${category.color}25` }}
          >
            <Icon size={18} style={{ color: category.color }} />
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-0.5">
              {category.id}
            </div>
            <div className="text-sm font-semibold text-white/90 leading-tight">
              {category.title}
            </div>
          </div>
        </div>
        <div
          className="w-6 h-6 rounded-full flex-shrink-0 opacity-60"
          style={{ background: `radial-gradient(circle, ${category.color}40 0%, transparent 70%)` }}
        />
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: `linear-gradient(90deg, ${category.color}30, transparent)` }} />

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {category.badges.map((badge) => (
          <span
            key={badge}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 cursor-default"
            style={{
              background: `${category.color}10`,
              border: `1px solid ${category.color}20`,
              color: category.color,
            }}
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-purple-600/5 top-[10%] right-[-100px]" />
      <div className="orb w-[350px] h-[350px] bg-sky-500/5 bottom-[10%] left-[-80px]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="section-tag mb-6 mx-auto w-fit">
            <span>Skills</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Technical{' '}
            <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-white/45 text-base max-w-md mx-auto leading-relaxed">
            A curated stack of technologies I use to build production-grade software.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
