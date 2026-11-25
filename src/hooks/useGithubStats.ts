import { useState, useEffect, useCallback } from 'react';
import { CommitActivity } from '../types/portfolio';

const USERNAME = 'guruvishnuk';
const CACHE_KEY = 'gv_github_stats_cache_v2';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache

export interface ContributionDay {
  date: string;
  count: number;
  intensity: number;
}

export interface GithubStats {
  totalRepositories: number;
  totalCommitsThisYear: number | null;
  topLanguages: { name: string; percentage: number; color: string }[];
  latestCommits: CommitActivity[];
  contributionDays: ContributionDay[];
  isLive: boolean;
}

export function useGithubStats() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchGithubStats = useCallback(async (signal?: AbortSignal, skipCache = false) => {
    if (!skipCache) {
      try {
        const cachedRaw = sessionStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (Date.now() - cached.timestamp < CACHE_TTL_MS && cached.data) {
            setStats(cached.data);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Continue to live fetch if storage is unavailable or invalid
      }
    }

    try {
      setLoading(true);
      setError(null);

      const [userRes, reposRes, contribRes] = await Promise.all([
        fetch(`https://api.github.com/users/${USERNAME}`, { signal }),
        fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`, { signal }),
        fetch(`https://github-contributions.vercel.app/api/v1/${USERNAME}`, { signal }).catch(() => null),
      ]);

      if (!userRes.ok) throw new Error(`GitHub API status ${userRes.status}`);
      if (!reposRes.ok) throw new Error(`GitHub Repos API status ${reposRes.status}`);

      const userData = await userRes.json();
      const totalRepositories: number = userData.public_repos ?? 0;

      const repos = await reposRes.json();
      const repoList = Array.isArray(repos) ? repos : [];

      let contributionDays: ContributionDay[] = [];
      let totalCommitsThisYear: number | null = null;

      if (contribRes && contribRes.ok) {
        try {
          const contribData = await contribRes.json();
          const currentYear = new Date().getFullYear();
          const prevYear = currentYear - 1;
          const years = Array.isArray(contribData.years) ? contribData.years : [];
          const matchedYears = years.filter((y: any) =>
            [String(currentYear), String(prevYear)].includes(String(y.year))
          );

          if (matchedYears.length > 0) {
            totalCommitsThisYear = matchedYears.reduce(
              (acc: number, y: any) => acc + (Number(y.total) || 0),
              0
            );
          }

          const rawDays: ContributionDay[] = (contribData.contributions || []).map((c: any) => ({
            date: c.date,
            count: Number(c.count) || 0,
            intensity: parseInt(c.intensity || '0', 10) || 0,
          }));

          contributionDays = rawDays.slice(-196);
        } catch {
          // Contribution API optional if parsing fails
        }
      }

      // Compute real language distribution across repositories and fetch recent commits
      const languages: Record<string, number> = {};
      let totalLangSize = 0;
      const latestCommits: CommitActivity[] = [];

      const topRepos = repoList.filter((r: any) => !r.fork).slice(0, 5);
      const repoDetails = await Promise.all(
        topRepos.map(async (repo: any) => {
          const [langRes, commitsRes] = await Promise.all([
            fetch(repo.languages_url, { signal }).catch(() => null),
            fetch(`https://api.github.com/repos/${USERNAME}/${repo.name}/commits?per_page=2`, { signal }).catch(() => null),
          ]);

          const langData = langRes && langRes.ok ? await langRes.json().catch(() => ({})) : {};
          const commitsData = commitsRes && commitsRes.ok ? await commitsRes.json().catch(() => []) : [];

          return { repo, langData, commitsData };
        })
      );

      for (const { repo, langData, commitsData } of repoDetails) {
        Object.keys(langData).forEach((lang) => {
          languages[lang] = (languages[lang] || 0) + langData[lang];
          totalLangSize += langData[lang];
        });

        if (Array.isArray(commitsData)) {
          commitsData.forEach((c: any) => {
            if (c?.commit) {
              latestCommits.push({
                repo: repo.full_name || `${USERNAME}/${repo.name}`,
                message: (c.commit.message || '').split('\n')[0],
                date: new Date(c.commit.committer?.date || c.commit.author?.date).toLocaleDateString(),
                branch: repo.default_branch || 'main',
                sha: (c.sha || '').substring(0, 7),
                url: c.html_url || `https://github.com/${USERNAME}/${repo.name}/commit/${c.sha}`,
              });
            }
          });
        }
      }

      // Fallback language breakdown from repo primary languages if per-repo language endpoints were rate-limited
      if (totalLangSize === 0 && repoList.length > 0) {
        repoList.forEach((r: any) => {
          if (r.language) {
            languages[r.language] = (languages[r.language] || 0) + 1;
            totalLangSize += 1;
          }
        });
      }

      const topLanguages = Object.entries(languages)
        .map(([lang, size]) => ({
          name: lang,
          percentage: totalLangSize > 0 ? Math.max(1, Math.round((size / totalLangSize) * 100)) : 0,
          color: getLanguageColor(lang),
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 4);

      const freshStats: GithubStats = {
        totalRepositories,
        totalCommitsThisYear,
        topLanguages,
        latestCommits: latestCommits.slice(0, 5),
        contributionDays,
        isLive: true,
      };

      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: freshStats, timestamp: Date.now() }));
      } catch {
        // Ignore cache write errors
      }

      if (!signal?.aborted) {
        setStats(freshStats);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchGithubStats(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchGithubStats]);

  return {
    stats,
    loading,
    error,
    refetch: () => fetchGithubStats(undefined, true),
  };
}

function getLanguageColor(lang: string) {
  const colors: Record<string, string> = {
    TypeScript: '#4F8CFF',
    JavaScript: '#F7DF1E',
    Java: '#F97316',
    CSS: '#A855F7',
    HTML: '#E34F26',
    Python: '#3572A5',
  };
  return colors[lang] || '#8A8A8E';
}
