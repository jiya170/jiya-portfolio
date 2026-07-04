import { useRef, useState, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, Download, Copy, CheckCheck } from 'lucide-react';

interface ContactItem {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  color: string;
  copyable?: boolean;
}

const contactItems: ContactItem[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'jiyaarorahmh@gmail.com',
    href: 'mailto:jiyaarorahmh@gmail.com',
    color: '#38bdf8',
    copyable: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '8000905747',
    href: 'tel:8000905747',
    color: '#34d399',
    copyable: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/jiya170',
    href: 'https://github.com/jiya170',
    color: '#f0f0f0',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Jiya Arora',
    href: 'https://www.linkedin.com/in/jiya-arora-b02b56378/',
    color: '#0077b5',
  },
];

function ContactCard({ item }: { item: ContactItem }) {
  const [copied, setCopied] = useState(false);
  const Icon = item.icon;

  const copy = async () => {
    await navigator.clipboard.writeText(item.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass glass-hover rounded-2xl p-5 flex items-center gap-4 group">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
      >
        <Icon size={20} style={{ color: item.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-white/35 font-medium mb-1 uppercase tracking-wider">{item.label}</div>
        <a
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-sm font-semibold text-white/90 hover:text-white truncate block transition-colors"
          style={{ color: item.color }}
        >
          {item.value}
        </a>
      </div>
      {item.copyable && (
        <button
          onClick={copy}
          className="w-8 h-8 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 transition-all duration-200 flex-shrink-0"
          aria-label={`Copy ${item.label}`}
        >
          {copied ? <CheckCheck size={13} className="text-emerald-400" /> : <Copy size={13} />}
        </button>
      )}
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="relative py-28 overflow-hidden" ref={sectionRef}>
      <div className="orb w-[450px] h-[450px] bg-sky-500/8 top-[10%] right-[-100px]" />
      <div className="orb w-[350px] h-[350px] bg-blue-600/6 bottom-[10%] left-[-80px]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <div className="section-tag mb-6 mx-auto w-fit">
            <span>Contact</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Let's{' '}
            <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-white/45 text-base max-w-md mx-auto leading-relaxed">
            Open to internships, research roles, and collaborations. Reach out through any channel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact cards */}
          <div
            className="space-y-3 transition-all duration-700 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-30px)' }}
          >
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-5">
              Get in touch
            </h3>
            {contactItems.map((item) => (
              <ContactCard key={item.label} item={item} />
            ))}

            {/* Resume download */}
            <div className="glass rounded-2xl p-5 mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white mb-1">Download Resume</div>
                  <div className="text-xs text-white/40">Full Stack Developer & AI/ML Enthusiast</div>
                </div>
                <a
                  href="/assets/image.png"
                  download="Jiya_Arora_Resume"
                  className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30 hover:-translate-y-0.5"
                >
                  <Download size={14} />
                  Download
                </a>
              </div>
            </div>
          </div>

          {/* Right: CTA card */}
          <div
            className="transition-all duration-700 delay-300"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(30px)' }}
          >
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-2xl mb-6 shadow-xl shadow-sky-500/20">
                  ✉️
                </div>

                <h3 className="text-2xl font-black text-white mb-3 leading-tight">
                  Ready to build something <span className="text-gradient">amazing</span>?
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  I'm currently seeking summer internships and research opportunities in full-stack development and AI/ML. Let's discuss how I can contribute to your team.
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:jiyaarorahmh@gmail.com"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30 hover:-translate-y-0.5 text-sm"
                  >
                    <Mail size={16} />
                    Send me an Email
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jiya-arora-b02b56378/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 border border-white/10 hover:border-white/25 text-white/80 hover:text-white font-semibold rounded-xl transition-all duration-200 hover:bg-white/5 hover:-translate-y-0.5 text-sm"
                  >
                    <Linkedin size={16} />
                    Connect on LinkedIn
                  </a>
                </div>

                {/* University info */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm">🎓</div>
                  <div>
                    <div className="text-xs font-semibold text-white/70">Central University of Punjab</div>
                    <div className="text-xs text-white/35">B.Sc. Computer Science · CGPA 8.4</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
