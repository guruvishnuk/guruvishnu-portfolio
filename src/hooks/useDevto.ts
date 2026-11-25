import { useState, useEffect, useCallback } from 'react';

const CACHE_KEY_PREFIX = 'gv_devto_articles_cache_';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache

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

  const fetchPosts = useCallback(async (signal?: AbortSignal) => {
    const cacheKey = `${CACHE_KEY_PREFIX}${username}`;

    try {
      const cachedRaw = sessionStorage.getItem(cacheKey);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        if (Date.now() - cached.timestamp < CACHE_TTL_MS && Array.isArray(cached.data)) {
          setPosts(cached.data);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Continue to network fetch if storage is unavailable
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`https://dev.to/api/articles?username=${username}&per_page=3`, { signal });
      if (!res.ok) {
        throw new Error(`Dev.to API returned status ${res.status}`);
      }

      const data: BlogPost[] = await res.json();
      const validPosts = Array.isArray(data) ? data : [];
      setPosts(validPosts);

      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ data: validPosts, timestamp: Date.now() }));
      } catch {
        // Ignore cache write errors
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
  }, [username]);

  useEffect(() => {
    const controller = new AbortController();
    fetchPosts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchPosts]);

  return { posts, loading, error, refetch: () => fetchPosts() };
}
