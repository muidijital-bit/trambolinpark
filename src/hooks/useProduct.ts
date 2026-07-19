import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../data/mockData';

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    // slug ile dene, bulamazsa id ile dene (geriye dönük uyumluluk)
    supabase.from('products').select('*').eq('slug', slug).single().then(({ data }) => {
      if (!data) {
        supabase.from('products').select('*').eq('id', slug).single().then(({ data: d2 }) => {
          if (d2) loadProduct(d2);
          else setLoading(false);
        });
        return;
      }
      loadProduct(data);
    });

    function loadProduct(data: Record<string, unknown>) {
      const p: Product = {
        id: (data.slug ?? data.id) as string, title: data.title as string, description: data.description as string,
        imageUrl: data.image_url as string, category: data.category as string, categoryName: data.category_name as string,
        features: (data.features as string[]) ?? [], gallery: (data.gallery as string[]) ?? [],
      };
      setProduct(p);
      supabase.from('products').select('*').eq('category', data.category).neq('id', data.id).limit(8).then(({ data: rel }) => {
        setRelated((rel ?? []).map((r: Record<string, unknown>) => ({ id: (r.slug ?? r.id) as string, title: r.title as string, description: r.description as string, imageUrl: r.image_url as string, category: r.category as string, categoryName: r.category_name as string, features: (r.features as string[]) ?? [] })));
      });
      setLoading(false);
    }
  }, [slug]);

  return { product, related, loading };
}
