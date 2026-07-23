import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { allProducts, type Product } from '../data/mockData';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('category')
      .order('title')
      .then(({ data, error }) => {
        if (!error && data) {
          const remote = data.map(r => ({
            id: r.slug ?? r.id,
            title: r.title,
            description: r.description,
            imageUrl: r.image_url,
            category: r.category,
            categoryName: r.category_name,
            features: r.features ?? [],
          }));
          setProducts(remote);
        } else {
          setProducts(allProducts);
        }
        setLoading(false);
      });
  }, []);

  return { products, loading };
}
