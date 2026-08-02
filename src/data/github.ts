import { CommitActivity } from '../types/portfolio';

export const githubData = {
  username: 'guruvishnuk',
  totalRepositories: 24,
  totalCommitsThisYear: 380,
  topLanguages: [
    { name: 'TypeScript', percentage: 50, color: '#4F8CFF' },
    { name: 'React / JSX', percentage: 30, color: '#38BDF8' },
    { name: 'Java', percentage: 12, color: '#F97316' },
    { name: 'CSS / Tailwind', percentage: 8, color: '#A855F7' },
  ],
  latestCommits: [
    {
      repo: 'candorworks/assessment-ui',
      message: 'perf(list): implement virtualization for long candidate submission tables',
      date: '2 hours ago',
      branch: 'main',
      sha: '7f9c2d1',
    },
    {
      repo: 'candorworks/data-import-export',
      message: 'feat(upload): add client-side CSV row validation and error reporting',
      date: '1 day ago',
      branch: 'main',
      sha: '3a81e9f',
    },
    {
      repo: 'guruvishnuk/portfolio',
      message: 'refactor(components): update UI tokens and performance optimization notes',
      date: '2 days ago',
      branch: 'main',
      sha: 'e4d0b1a',
    },
    {
      repo: 'guruvishnuk/fresh-bites',
      message: 'fix(mobile): resolve cart slide-over layout issue on mobile viewports',
      date: '3 days ago',
      branch: 'main',
      sha: '1b89c4d',
    },
  ] as CommitActivity[],
};
