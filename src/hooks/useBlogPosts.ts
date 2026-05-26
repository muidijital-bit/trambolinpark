import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { blogPosts as staticPosts } from '../data/blogPosts';

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

function staticToData(p: (typeof staticPosts)[number]): BlogPostData {
  return {
    id: p.slug,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    cover_image: p.coverImage,
    read_time: p.readTime,
    date: p.date,
    published: true,
    content: p.content,
  };
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('blog_posts').select('*').eq('published', true).order('date', { ascending: false }).then(({ data }) => {
      const remote = data ?? [];
      const remoteSlugs = new Set(remote.map((p) => p.slug));
      const merged = [...remote, ...staticPosts.map(staticToData).filter((p) => !remoteSlugs.has(p.slug))];
      merged.sort((a, b) => b.date.localeCompare(a.date));
      setPosts(merged);
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
      if (data) {
        setPost(data);
      } else {
        const found = staticPosts.find((p) => p.slug === slug);
        setPost(found ? staticToData(found) : null);
      }
      setLoading(false);
    });
  }, [slug]);

  return { post, loading };
}
