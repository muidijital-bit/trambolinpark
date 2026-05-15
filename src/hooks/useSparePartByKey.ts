import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type SparePartResult = {
  part: { key: string; title: string; desc: string; image?: string; gallery?: string[] };
  category: { key: string; title: string; short: string; cover: string; icon: string };
  subcategory: { key: string; title: string } | null;
  relatedItems: { key: string; title: string; image?: string }[];
} | null;

export function useSparePartByKey(key: string | undefined) {
  const [result, setResult] = useState<SparePartResult>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!key) { setLoading(false); return; }
    supabase.from('spare_parts').select('*').eq('item_key', key).single().then(async ({ data }) => {
      if (!data) { setLoading(false); return; }

      const { data: rel } = await supabase
        .from('spare_parts').select('item_key, title, image')
        .eq('category_key', data.category_key).neq('item_key', key).limit(8);

      setResult({
        part: { key: data.item_key, title: data.title, desc: data.description, image: data.image, gallery: data.gallery ?? [] },
        category: { key: data.category_key, title: data.category_title, short: data.category_short, cover: data.category_cover, icon: data.category_icon },
        subcategory: data.sub_key ? { key: data.sub_key, title: data.sub_title ?? data.sub_key } : null,
        relatedItems: (rel ?? []).map(r => ({ key: r.item_key, title: r.title, image: r.image })),
      });
      setLoading(false);
    });
  }, [key]);

  return { result, loading };
}
