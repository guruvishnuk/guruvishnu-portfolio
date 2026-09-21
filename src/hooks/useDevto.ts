import { useState, useEffect } from 'react';

// Using a well-known dev.to username as a placeholder/fallback until the real user writes articles
const FALLBACK_USERNAME = 'ben'; 

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  published_at: string;
  public_reactions_count: number;
  reading_time_minutes: number;
  tag_list: string[];
}

export function useDevto(username: string = 'guruvishnuk') {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        // Try fetching user's actual posts
        let res = await fetch(`https://dev.to/api/articles?username=${username}&per_page=3`);
        let data = await res.json();

        // If user has no posts, fallback to placeholder posts just to show the UI
        if (!data || data.length === 0) {
          res = await fetch(`https://dev.to/api/articles?username=${FALLBACK_USERNAME}&per_page=3`);
          data = await res.json();
        }

        setPosts(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [username]);

  return { posts, loading, error };
}
