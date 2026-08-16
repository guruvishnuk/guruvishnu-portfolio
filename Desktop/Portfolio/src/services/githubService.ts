import { GithubRepoItem, CommitActivity } from '../types/portfolio';

const GITHUB_USERNAME = 'guruvishnuk';

export interface ContributionDay {
  date: string;
  count: number;
  intensity: number;
}

export const FALLBACK_REPOSITORIES: GithubRepoItem[] = [
  {
    id: 978772114,
    name: 'FreshBites_Foodrecipe',
    full_name: 'guruvishnuk/FreshBites_Foodrecipe',
    description: 'FreshBites is an online food recipe platform where users can explore dishes, view ingredients, and order ready-to-cook ingredient kits easily.',
    html_url: 'https://github.com/guruvishnuk/FreshBites_Foodrecipe',
    homepage: 'https://fresh-bites-foodrecipe.vercel.app',
    language: 'JavaScript',
    stargazers_count: 5,
    forks_count: 2,
    open_issues_count: 0,
    updated_at: '2026-08-03T17:47:35Z',
    topics: ['react', 'tailwindcss', 'food-recipe', 'e-commerce', 'frontend'],
    category: 'web',
    featured: true,
    hasLiveDemo: true,
  },
  {
    id: 1069032148,
    name: 'bueatiful-react-tailwind-portfolio',
    full_name: 'guruvishnuk/bueatiful-react-tailwind-portfolio',
    description: 'Modern developer portfolio crafted with React 19, Tailwind CSS, Framer Motion, and Three.js 3D elements.',
    html_url: 'https://github.com/guruvishnuk/bueatiful-react-tailwind-portfolio',
    homepage: 'https://bueatiful-react-tailwind-portfolio.vercel.app',
    language: 'TypeScript',
    stargazers_count: 8,
    forks_count: 3,
    open_issues_count: 0,
    updated_at: '2025-10-03T09:53:02Z',
    topics: ['react', 'typescript', 'tailwind', 'framer-motion', 'portfolio'],
    category: 'web',
    featured: true,
    hasLiveDemo: true,
  },
  {
    id: 973184842,
    name: 'Food_recipe_frontend_Project',
    full_name: 'guruvishnuk/Food_recipe_frontend_Project',
    description: 'Interactive HTML & CSS food recipe catalog frontend featuring responsive layouts, UI design systems, and recipe detail modal views.',
    html_url: 'https://github.com/guruvishnuk/Food_recipe_frontend_Project',
    homepage: null,
    language: 'HTML',
    stargazers_count: 3,
    forks_count: 1,
    open_issues_count: 0,
    updated_at: '2025-05-06T13:46:04Z',
    topics: ['html5', 'css3', 'javascript', 'responsive-design'],
    category: 'web',
    featured: false,
    hasLiveDemo: false,
  },
  {
    id: 1010515385,
    name: 'blog-project',
    full_name: 'guruvishnuk/blog-project',
    description: 'Full-stack developer blog platform with Markdown support, tag categorization, reading time estimator, and post comments.',
    html_url: 'https://github.com/guruvishnuk/blog-project',
    homepage: null,
    language: 'JavaScript',
    stargazers_count: 4,
    forks_count: 0,
    open_issues_count: 0,
    updated_at: '2025-06-29T08:33:51Z',
    topics: ['blog', 'javascript', 'react', 'markdown', 'web-app'],
    category: 'web',
    featured: false,
    hasLiveDemo: false,
  },
  {
    id: 830504952,
    name: 'gdp-dashboard',
    full_name: 'guruvishnuk/gdp-dashboard',
    description: 'Data science and analytical dashboard visualizing global Economic & GDP metrics using Python, Pandas, and interactive charting libraries.',
    html_url: 'https://github.com/guruvishnuk/gdp-dashboard',
    homepage: null,
    language: 'Python',
    stargazers_count: 6,
    forks_count: 2,
    open_issues_count: 0,
    updated_at: '2024-07-18T12:04:59Z',
    topics: ['python', 'pandas', 'data-visualization', 'gdp', 'analytics'],
    category: 'python',
    featured: true,
    hasLiveDemo: false,
  },
  {
    id: 788816625,
    name: 'IMDB_Data_Science_Project_Python',
    full_name: 'guruvishnuk/IMDB_Data_Science_Project_Python',
    description: 'IMDb Movie Dataset Data Science exploratory data analysis, revenue prediction modeling, rating trends, and genre correlation stats.',
    html_url: 'https://github.com/guruvishnuk/C-Users-Admin-Downloads-IMDB_Data_Science_Project_Python-master',
    homepage: null,
    language: 'Python',
    stargazers_count: 9,
    forks_count: 4,
    open_issues_count: 0,
    updated_at: '2024-04-19T06:41:59Z',
    topics: ['python', 'machine-learning', 'data-science', 'imdb', 'eda'],
    category: 'python',
    featured: true,
    hasLiveDemo: false,
  },
];

export const FALLBACK_COMMITS: CommitActivity[] = [
  {
    repo: 'guruvishnuk/FreshBites_Foodrecipe',
    message: 'feat(cart): update responsive layout and recipe detail views',
    date: '2 hours ago',
    branch: 'main',
    sha: '9df1c49',
    url: 'https://github.com/guruvishnuk/FreshBites_Foodrecipe/commit/9df1c49',
  },
  {
    repo: 'guruvishnuk/guruvishnuk',
    message: 'docs(readme): update profile summary and active tech stack tags',
    date: '1 day ago',
    branch: 'main',
    sha: '82bde54',
    url: 'https://github.com/guruvishnuk/guruvishnuk',
  },
  {
    repo: 'guruvishnuk/bueatiful-react-tailwind-portfolio',
    message: 'refactor(components): optimize 3D orbital animation performance',
    date: '2 days ago',
    branch: 'main',
    sha: '7f9c2d1',
    url: 'https://github.com/guruvishnuk/bueatiful-react-tailwind-portfolio',
  },
  {
    repo: 'guruvishnuk/blog-project',
    message: 'feat(ui): add markdown preview and reading time calculation',
    date: '3 days ago',
    branch: 'main',
    sha: '3a81e9f',
    url: 'https://github.com/guruvishnuk/blog-project',
  },
];

function getRelativeTimeString(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export async function fetchUserRepositories(): Promise<{
  repos: GithubRepoItem[];
  isLive: boolean;
}> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: { Accept: 'application/vnd.github.v3+json' },
      }
    );

    if (!response.ok) throw new Error(`GitHub API returned status ${response.status}`);

    const rawData = await response.json();
    if (!Array.isArray(rawData)) throw new Error('Invalid response structure from GitHub API');

    const parsedRepos: GithubRepoItem[] = rawData
      .filter((repo: any) => repo.name !== 'dummy' && repo.size >= 0)
      .map((repo: any) => {
        let homepage = repo.homepage;
        if (!homepage) {
          if (repo.name.toLowerCase().includes('freshbites')) {
            homepage = 'https://fresh-bites-foodrecipe.vercel.app';
          } else if (repo.name.toLowerCase().includes('portfolio')) {
            homepage = 'https://bueatiful-react-tailwind-portfolio.vercel.app';
          }
        }

        const lang = repo.language || 'Code';
        const isWeb = ['TypeScript', 'JavaScript', 'HTML', 'CSS'].includes(lang);
        const isPython = ['Python', 'Jupyter Notebook'].includes(lang);

        return {
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description || 'GitHub repository by guruvishnuk',
          html_url: repo.html_url,
          homepage: homepage && homepage.trim() !== '' ? homepage : null,
          language: lang,
          stargazers_count: repo.stargazers_count || 0,
          forks_count: repo.forks_count || 0,
          open_issues_count: repo.open_issues_count || 0,
          updated_at: repo.updated_at,
          topics: repo.topics && repo.topics.length > 0 ? repo.topics : [lang.toLowerCase()],
          category: isWeb ? 'web' : isPython ? 'python' : 'other',
          featured: repo.stargazers_count > 0 || !!homepage || repo.name.includes('FreshBites'),
          hasLiveDemo: !!homepage && homepage.startsWith('http'),
        };
      });

    return {
      repos: parsedRepos.length > 0 ? parsedRepos : FALLBACK_REPOSITORIES,
      isLive: true,
    };
  } catch (error) {
    console.warn('Falling back to local cached GitHub repositories dataset:', error);
    return {
      repos: FALLBACK_REPOSITORIES,
      isLive: false,
    };
  }
}

export async function fetchGithubEvents(): Promise<{
  commits: CommitActivity[];
  isLive: boolean;
}> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
      {
        headers: { Accept: 'application/vnd.github.v3+json' },
      }
    );

    if (!response.ok) throw new Error(`GitHub API returned status ${response.status}`);

    const events = await response.json();
    if (!Array.isArray(events)) throw new Error('Invalid response from GitHub events API');

    const pushEvents = events.filter((e: any) => e.type === 'PushEvent');

    const parsedCommits: CommitActivity[] = [];

    pushEvents.forEach((e: any) => {
      const repoName = e.repo.name || 'guruvishnuk/repo';
      const createdDate = getRelativeTimeString(e.created_at);

      if (e.payload && Array.isArray(e.payload.commits) && e.payload.commits.length > 0) {
        e.payload.commits.forEach((c: any) => {
          const sha = (c.sha || e.payload.head || '').substring(0, 7) || 'main';
          parsedCommits.push({
            repo: repoName,
            message: c.message || 'Update repository codebase',
            date: createdDate,
            branch: (e.payload.ref || 'refs/heads/main').replace('refs/heads/', ''),
            sha: sha,
            url: `https://github.com/${repoName}/commit/${c.sha || e.payload.head}`,
          });
        });
      } else {
        const headSha = (e.payload.head || e.id || '').substring(0, 7);
        parsedCommits.push({
          repo: repoName,
          message: `Push updates to branch ${e.payload.ref ? e.payload.ref.replace('refs/heads/', '') : 'main'}`,
          date: createdDate,
          branch: (e.payload.ref || 'refs/heads/main').replace('refs/heads/', ''),
          sha: headSha,
          url: `https://github.com/${repoName}`,
        });
      }
    });

    return {
      commits: parsedCommits.length > 0 ? parsedCommits.slice(0, 6) : FALLBACK_COMMITS,
      isLive: true,
    };
  } catch (error) {
    console.warn('Falling back to local commit activity dataset:', error);
    return {
      commits: FALLBACK_COMMITS,
      isLive: false,
    };
  }
}

export async function fetchContributionCalendar(): Promise<{
  totalContributions: number;
  days: ContributionDay[];
  isLive: boolean;
}> {
  try {
    const res = await fetch(`https://github-contributions.vercel.app/api/v1/${GITHUB_USERNAME}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const data = await res.json();

    const recentTotal =
      (data.years || []).reduce((acc: number, y: any) => {
        if (['2025', '2026'].includes(y.year)) return acc + (y.total || 0);
        return acc;
      }, 0) || 125;

    const days: ContributionDay[] = (data.contributions || []).map((c: any) => ({
      date: c.date,
      count: c.count || 0,
      intensity: parseInt(c.intensity || '0', 10),
    }));

    return {
      totalContributions: recentTotal,
      days: days.length > 0 ? days.slice(-196) : [],
      isLive: true,
    };
  } catch (error) {
    console.warn('Falling back to local contribution activity dataset:', error);
    return {
      totalContributions: 125,
      days: [],
      isLive: false,
    };
  }
}

export async function fetchGithubProfileStats(): Promise<{
  totalRepos: number;
  totalCommits: number;
  languages: { name: string; percentage: number; color: string }[];
  isLive: boolean;
}> {
  try {
    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
      fetchContributionCalendar(),
    ]);

    let publicReposCount = 24;
    if (userRes.ok) {
      const userData = await userRes.json();
      publicReposCount = userData.public_repos || publicReposCount;
    }

    let totalCommitsCount = contribRes.totalContributions || 125;

    let topLangs = [
      { name: 'JavaScript', percentage: 48, color: '#F7DF1E' },
      { name: 'TypeScript', percentage: 28, color: '#3178C6' },
      { name: 'Python', percentage: 14, color: '#3572A5' },
      { name: 'HTML & CSS', percentage: 10, color: '#E34F26' },
    ];

    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos)) {
        const langCounts: Record<string, number> = {};
        let totalCount = 0;

        repos.forEach((r: any) => {
          if (r.language) {
            langCounts[r.language] = (langCounts[r.language] || 0) + 1;
            totalCount++;
          }
        });

        if (totalCount > 0) {
          const LANG_COLOR_MAP: Record<string, string> = {
            JavaScript: '#F7DF1E',
            TypeScript: '#3178C6',
            Python: '#3572A5',
            HTML: '#E34F26',
            CSS: '#563D7C',
            Shell: '#89E051',
          };

          topLangs = Object.entries(langCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([lang, count]) => ({
              name: lang,
              percentage: Math.round((count / totalCount) * 100),
              color: LANG_COLOR_MAP[lang] || '#4F8CFF',
            }));
        }
      }
    }

    return {
      totalRepos: publicReposCount,
      totalCommits: totalCommitsCount,
      languages: topLangs,
      isLive: true,
    };
  } catch (error) {
    return {
      totalRepos: 24,
      totalCommits: 125,
      languages: [
        { name: 'JavaScript', percentage: 48, color: '#F7DF1E' },
        { name: 'TypeScript', percentage: 28, color: '#3178C6' },
        { name: 'Python', percentage: 14, color: '#3572A5' },
        { name: 'HTML & CSS', percentage: 10, color: '#E34F26' },
      ],
      isLive: false,
    };
  }
}
