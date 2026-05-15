import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export type BlogPostData = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_image: string;
  read_time: number;
  date: string;
  published: boolean;
  content: any[];
};

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('blog_posts').select('*').eq('published', true).order('date', { ascending: false }).then(({ data }) => {
      setPosts(data ?? []);
      setLoading(false);
    });
  }, []);

  return { posts, loading };
}

export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    supabase.from('blog_posts').select('*').eq('slug', slug).eq('published', true).single().then(({ data }) => {
      setPost(data ?? null);
      setLoading(false);
    });
  }, [slug]);

  return { post, loading };
}
