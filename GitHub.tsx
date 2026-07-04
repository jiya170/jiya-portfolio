import { useEffect, useState } from 'react';
import { Github, Star, GitFork, Users, UserCheck, BookOpen, Calendar, ExternalLink, Search, ArrowUpRight } from 'lucide-react';

interface GitHubUser {
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#DA5B0B',
  C: '#555555',
  'C++': '#f34b7d',
};

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number | string; color: string }) {
  return (
    <div className="github-stat-card flex items-center gap-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}25` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <div>
        <div className="text-xl font-black text-white">{value}</div>
        <div className="text-xs text-white/40 font-medium">{label}</div>
      </div>
    </div>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || '#8b949e' : '#8b949e';

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass rounded-xl p-4 flex flex-col gap-3 group hover:border-sky-500/25 hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen size={14} className="text-sky-400 flex-shrink-0" />
          <span className="text-sm font-semibold text-sky-400 truncate group-hover:text-sky-300 transition-colors">
            {repo.name}
          </span>
        </div>
        <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/60 flex-shrink-0 transition-colors" />
      </div>

      {repo.description && (
        <p className="text-xs text-white/45 leading-relaxed line-clamp-2">{repo.description}</p>
      )}

      <div className="flex items-center gap-4 mt-auto">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: langColor }} />
            <span className="text-[11px] text-white/50">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-white/40">
          <Star size={11} />
          <span className="text-[11px]">{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1 text-white/40">
          <GitFork size={11} />
          <span className="text-[11px]">{repo.forks_count}</span>
        </div>
      </div>
    </a>
  );
}

export default function GitHub() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const username = 'jiya170';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        setUser(userData);
        setRepos(reposData);
      } catch {
        setError('Could not load GitHub data. Please check back later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRepos = repos.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(search.toLowerCase()))
  );

  const sortedRepos = [...filteredRepos].sort((a, b) => b.stargazers_count - a.stargazers_count);
  const topLanguages = repos.reduce<Record<string, number>>((acc, repo) => {
    if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1;
    return acc;
  }, {});
  const sortedLanguages = Object.entries(topLanguages).sort(([, a], [, b]) => b - a).slice(0, 6);

  return (
    <section id="github" className="relative py-28 overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-green-500/5 bottom-[5%] right-[-100px]" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag mb-6 mx-auto w-fit">
            <span>GitHub</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Open Source{' '}
            <span className="text-gradient">Activity</span>
          </h2>
          <p className="text-white/45 text-base max-w-md mx-auto leading-relaxed">
            Live data from GitHub — repositories, contributions, and stats.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <Github size={40} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && user && (
          <div className="space-y-8">
            {/* Profile + Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Profile card */}
              <div className="glass rounded-2xl p-6 flex items-center gap-5">
                <img
                  src={user.avatar_url}
                  alt="GitHub avatar"
                  className="w-16 h-16 rounded-2xl border border-white/10"
                />
                <div className="min-w-0">
                  <div className="font-bold text-white text-base truncate">{user.name || username}</div>
                  <div className="text-xs text-sky-400 mb-1">@{username}</div>
                  {user.bio && (
                    <p className="text-xs text-white/40 leading-relaxed line-clamp-2">{user.bio}</p>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatCard icon={BookOpen} label="Repositories" value={user.public_repos} color="#38bdf8" />
                <StatCard icon={Users} label="Followers" value={user.followers} color="#34d399" />
                <StatCard icon={UserCheck} label="Following" value={user.following} color="#fb923c" />
                <StatCard
                  icon={Star}
                  label="Total Stars"
                  value={repos.reduce((s, r) => s + r.stargazers_count, 0)}
                  color="#facc15"
                />
                <StatCard
                  icon={GitFork}
                  label="Total Forks"
                  value={repos.reduce((s, r) => s + r.forks_count, 0)}
                  color="#a78bfa"
                />
                <StatCard
                  icon={Calendar}
                  label="Languages"
                  value={Object.keys(topLanguages).length}
                  color="#f472b6"
                />
              </div>
            </div>

            {/* Contribution graph */}
            <div className="glass rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
                  <Calendar size={16} className="text-sky-400" />
                  Contribution Graph
                </h3>
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                >
                  View on GitHub <ExternalLink size={11} />
                </a>
              </div>
              <div className="rounded-xl overflow-hidden bg-[#0d1117]">
                <img
                  src={`https://ghchart.rshah.org/38bdf8/${username}`}
                  alt="GitHub Contribution Chart"
                  className="w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>

            {/* Top languages */}
            {sortedLanguages.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-white/80 mb-5 flex items-center gap-2">
                  <Code2 size={16} className="text-sky-400" />
                  Top Languages
                </h3>
                <div className="flex flex-wrap gap-3">
                  {sortedLanguages.map(([lang, count]) => {
                    const color = LANGUAGE_COLORS[lang] || '#8b949e';
                    return (
                      <div key={lang} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                        <span className="text-xs font-medium" style={{ color }}>{lang}</span>
                        <span className="text-[10px] text-white/30">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Repository search */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <h3 className="text-sm font-semibold text-white/80 flex items-center gap-2">
                  <BookOpen size={16} className="text-sky-400" />
                  Repositories ({repos.length})
                </h3>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 min-w-[200px]">
                  <Search size={14} className="text-white/30" />
                  <input
                    type="text"
                    placeholder="Search repos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent text-sm text-white/80 placeholder-white/25 outline-none flex-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-1">
                {sortedRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
                {sortedRepos.length === 0 && (
                  <div className="col-span-full text-center py-8 text-white/30 text-sm">
                    No repositories found.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Code2({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
