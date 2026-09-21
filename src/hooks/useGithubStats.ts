import { useState, useEffect } from 'react';
import { CommitActivity } from '../types/portfolio';

const USERNAME = 'guruvishnuk';

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
    async function fetchGithubStats() {
      try {
        setLoading(true);
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${USERNAME}`);
        if (!userRes.ok) throw new Error('Failed to fetch user data');
        const userData = await userRes.json();
        const totalRepositories = userData.public_repos;

        // Fetch repos to calculate languages and latest commits
        const reposRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=10`);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const repos = await reposRes.json();

        // Calculate language stats
        const languages: Record<string, number> = {};
        let totalLangSize = 0;
        
        // Latest commits
        const latestCommits: CommitActivity[] = [];

        // We will fetch language breakdown and commits for top 3 recently updated repos
        for (let i = 0; i < Math.min(3, repos.length); i++) {
          const repo = repos[i];
          
          // Get languages
          const langRes = await fetch(repo.languages_url);
          if (langRes.ok) {
            const langData = await langRes.json();
            Object.keys(langData).forEach((lang) => {
              languages[lang] = (languages[lang] || 0) + langData[lang];
              totalLangSize += langData[lang];
            });
          }

          // Get commits
          const commitsRes = await fetch(`https://api.github.com/repos/${USERNAME}/${repo.name}/commits?per_page=2`);
          if (commitsRes.ok) {
            const commitsData = await commitsRes.json();
            commitsData.forEach((c: any) => {
              latestCommits.push({
                repo: repo.name,
                message: c.commit.message.split('\n')[0],
                date: new Date(c.commit.committer.date).toLocaleDateString(),
                branch: repo.default_branch,
                sha: c.sha.substring(0, 7)
              });
            });
          }
        }

        const topLanguages = Object.keys(languages)
          .map((lang) => ({
            name: lang,
            percentage: Math.round((languages[lang] / totalLangSize) * 100) || 1,
            color: getLanguageColor(lang)
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 4);

        setStats({
          totalRepositories,
          totalCommitsThisYear: 380, // Note: Commits this year requires GraphQL or scraping. Kept static for now.
          topLanguages,
          latestCommits: latestCommits.slice(0, 4)
        });
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGithubStats();
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
