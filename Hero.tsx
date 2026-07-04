import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';

const floatingIcons = [
  { label: 'React', color: '#61DAFB', bg: 'rgba(97,218,251,0.08)', icon: '⚛', position: 'top-[8%] left-[12%]', delay: '0s', animClass: 'animate-float' },
  { label: 'Python', color: '#FFD43B', bg: 'rgba(255,212,59,0.08)', icon: '🐍', position: 'top-[15%] right-[10%]', delay: '0.5s', animClass: 'animate-float-delayed' },
  { label: 'FastAPI', color: '#05998B', bg: 'rgba(5,153,139,0.08)', icon: '⚡', position: 'bottom-[22%] left-[8%]', delay: '1s', animClass: 'animate-float-2' },
  { label: 'GitHub', color: '#fff', bg: 'rgba(255,255,255,0.06)', icon: '🐙', position: 'top-[45%] right-[6%]', delay: '1.5s', animClass: 'animate-float-3' },
  { label: 'AI', color: '#A78BFA', bg: 'rgba(167,139,250,0.08)', icon: '🤖', position: 'bottom-[12%] right-[14%]', delay: '0.8s', animClass: 'animate-float-4' },
  { label: 'ML', color: '#FB923C', bg: 'rgba(251,146,60,0.08)', icon: '📊', position: 'top-[60%] left-[5%]', delay: '0.3s', animClass: 'animate-float-5' },
  { label: 'API', color: '#34D399', bg: 'rgba(52,211,153,0.08)', icon: '🔗', position: 'bottom-[35%] right-[4%]', delay: '1.2s', animClass: 'animate-float-6' },
];

const roles = ['Full Stack Developer', 'AI/ML Enthusiast', 'Problem Solver', 'CS Undergraduate'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const currentRole = roles[roleIndex];
    if (typing) {
      if (displayed.length < currentRole.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(currentRole.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeoutRef.current = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 30);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, typing, roleIndex]);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      {/* Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-sky-500/10 top-[-100px] right-[-100px]" />
      <div className="orb w-[400px] h-[400px] bg-blue-600/8 bottom-[-50px] left-[-80px]" />
      <div className="orb w-[300px] h-[300px] bg-sky-400/6 top-[40%] left-[30%]" />

      {/* Floating tech icons */}
      {floatingIcons.map((icon) => (
        <div
          key={icon.label}
          className={`absolute ${icon.position} ${icon.animClass} hidden lg:flex flex-col items-center gap-1.5 z-10`}
          style={{ animationDelay: icon.delay }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-xl border border-white/10 backdrop-blur-sm"
            style={{ background: icon.bg, boxShadow: `0 8px 32px ${icon.color}20` }}
          >
            {icon.icon}
          </div>
          <span className="text-[10px] font-medium tracking-wider" style={{ color: icon.color }}>
            {icon.label}
          </span>
        </div>
      ))}

      <div className="max-w-6xl mx-auto px-6 w-full pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left — Text */}
          <div className="flex-1 max-w-xl">
            {/* Available badge */}
            <div className="flex items-center gap-2 mb-8 animate-fade-in-up">
              <div className="relative flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                <span className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                Available for Opportunities
              </span>
            </div>

            {/* Name */}
            <div className="animate-fade-in-up delay-100">
              <p className="text-white/50 text-lg font-light mb-1 tracking-wide">Hello, I'm</p>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
                <span className="text-gradient">JIYA</span>
              </h1>
            </div>

            {/* Role pill + typing */}
            <div className="animate-fade-in-up delay-200 mb-6">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                <span className="text-sm font-medium text-white/80">
                  {displayed}
                  <span className="cursor" />
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/55 text-base leading-relaxed mb-8 animate-fade-in-up delay-300 max-w-md">
              CS Undergraduate at Central University of Punjab with CGPA 8.4 — building intelligent
              full-stack applications at the intersection of AI and modern web technologies.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-in-up delay-400">
              <button
                onClick={() => scrollToSection('#contact')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30 hover:-translate-y-0.5"
              >
                Get in Touch
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => scrollToSection('#projects')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/25 text-white/80 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:bg-white/5 hover:-translate-y-0.5"
              >
                View Work
              </button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-8 animate-fade-in-up delay-500">
              <a
                href="https://github.com/jiya170"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/jiya-arora-b02b56378/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:jiyaarorahmh@gmail.com"
                className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <div className="w-px h-6 bg-white/10 mx-1" />
              <a
                href="/assets/image.png"
                download
                className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-sky-400 font-medium transition-colors"
              >
                <Download size={14} />
                Resume
              </a>
            </div>
          </div>

          {/* Right — Profile Photo */}
          <div className="flex-shrink-0 relative">
            {/* Outer glow rings */}
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              {/* Spinning border rings */}
              <div className="absolute inset-[-16px] rounded-full border-2 border-dashed border-sky-500/20 animate-spin-slow" />
              <div className="absolute inset-[-28px] rounded-full border border-sky-400/10 animate-spin-reverse" />

              {/* Glow pulse */}
              <div className="absolute inset-0 rounded-full bg-sky-500/10 blur-3xl animate-pulse-glow" />

              {/* Profile glow ring wrapper */}
              <div className="profile-glow-ring w-full h-full rounded-full relative z-10">
                {/* Inner ring */}
                <div className="absolute inset-[-2px] rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-sky-400 p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#050508]" />
                </div>

                {/* Photo */}
                <div className="relative w-full h-full rounded-full overflow-hidden z-10 p-[3px]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-sky-400/20 to-blue-600/20">
                    <img
                      src="/images/jiya1.jpg"
                      alt="Jiya Arora"
                      className="w-full h-full object-cover rounded-full"
                      style={{ objectPosition: '50% 15%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Corner badge */}
              <div className="absolute bottom-4 -right-4 glass border border-white/10 px-3 py-2 rounded-xl flex items-center gap-2 shadow-xl z-20">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-white/80">Open to Work</span>
              </div>

              {/* CGPA badge */}
              <div className="absolute -top-2 -left-6 glass border border-sky-500/20 px-3 py-2 rounded-xl flex flex-col items-center shadow-xl z-20">
                <span className="text-lg font-black text-gradient-blue">8.4</span>
                <span className="text-[9px] text-white/50 font-medium uppercase tracking-wider">CGPA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 mt-16 animate-fade-in delay-700">
          <span className="text-[10px] tracking-widest text-white/30 uppercase font-semibold">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
