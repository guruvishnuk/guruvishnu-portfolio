import { useState, useEffect } from 'react';
import { CommitActivity } from '../types/portfolio';

const USERNAME = 'guruvishnuk';
const CACHE_KEY = 'gv_github_stats_cache';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache

export interface GithubStats {
  totalRepositories: number;
  totalCommitsThisYear: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  latestCommits: CommitActivity[];
}

export function useGithubStats() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchGithubStats() {
      // 1. Try reading valid cached stats from sessionStorage to prevent hitting API rate limits
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

      try {
        setLoading(true);

        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, { signal });
        if (userRes.status === 403) {
          // Gracefully fallback to static state on GitHub rate limiting
          setLoading(false);
          return;
        }
        if (!userRes.ok) throw new Error(`Failed to fetch user data: ${userRes.status}`);
        const userData = await userRes.json();
        const totalRepositories = userData.public_repos;

        // Fetch repos to calculate languages and latest commits
        const reposRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=10`, { signal });
        if (reposRes.status === 403) {
          setLoading(false);
          return;
        }
        if (!reposRes.ok) throw new Error(`Failed to fetch repos: ${reposRes.status}`);
        const repos = await reposRes.json();

        // Calculate language stats and latest commits concurrently
        const languages: Record<string, number> = {};
        let totalLangSize = 0;
        const latestCommits: CommitActivity[] = [];

        const topRepos = repos.slice(0, 3);
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
                  repo: repo.name,
                  message: c.commit.message.split('\n')[0],
                  date: new Date(c.commit.committer.date).toLocaleDateString(),
                  branch: repo.default_branch,
                  sha: c.sha.substring(0, 7)
                });
              }
            });
          }
        }

        const topLanguages = Object.keys(languages)
          .map((lang) => ({
            name: lang,
            percentage: totalLangSize > 0 ? Math.round((languages[lang] / totalLangSize) * 100) || 1 : 0,
            color: getLanguageColor(lang)
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 4);

        const freshStats: GithubStats = {
          totalRepositories,
          totalCommitsThisYear: 380, // Note: Commits this year requires GraphQL/scraping, kept static
          topLanguages,
          latestCommits: latestCommits.slice(0, 4)
        };

        // Cache result in sessionStorage
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: freshStats, timestamp: Date.now() }));
        } catch {
          // Ignore cache write errors
        }

        if (!signal.aborted) {
          setStats(freshStats);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchGithubStats();

    return () => {
      controller.abort();
    };
  }, []);

  return { stats, loading, error };
}

function getLanguageColor(lang: string) {
  const colors: Record<string, string> = {
    TypeScript: '#4F8CFF',
    JavaScript: '#F7DF1E',
    Java: '#F97316',
    CSS: '#A855F7',
    HTML: '#E34F26',
    Python: '#3572A5'
  };
  return colors[lang] || '#8A8A8E';
}
