import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../data/mockData';

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    supabase.from('products').select('*').eq('id', id).single().then(({ data }) => {
      if (data) {
        const p: Product = { id: data.id, title: data.title, description: data.description, imageUrl: data.image_url, category: data.category, categoryName: data.category_name, features: data.features ?? [] };
        setProduct(p);
        supabase.from('products').select('*').eq('category', data.category).neq('id', id).limit(8).then(({ data: rel }) => {
          setRelated((rel ?? []).map(r => ({ id: r.id, title: r.title, description: r.description, imageUrl: r.image_url, category: r.category, categoryName: r.category_name, features: r.features ?? [] })));
        });
      }
      setLoading(false);
    });
  }, [id]);

  return { product, related, loading };
}
