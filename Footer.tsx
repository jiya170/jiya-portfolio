import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
              JA
            </div>
            <span className="text-sm font-semibold text-white/60">Jiya Arora</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {['#about', '#skills', '#projects', '#github', '#contact'].map((href) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-xs text-white/35 hover:text-white/70 capitalize transition-colors"
              >
                {href.slice(1)}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/jiya170"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/20 transition-all"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/jiya-arora-b02b56378/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/20 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="mailto:jiyaarorahmh@gmail.com"
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/20 transition-all"
              aria-label="Email"
            >
              <Mail size={14} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © 2024 Jiya Arora. All rights reserved.
          </p>
          <p className="text-xs text-white/25 flex items-center gap-1">
            Built with <Heart size={10} className="text-rose-400/60" fill="currentColor" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
