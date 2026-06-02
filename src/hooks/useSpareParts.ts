import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { PartCategory } from '../data/spareParts';

export function useSpareParts() {
  const [categories, setCategories] = useState<PartCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('spare_parts')
      .select('*')
      .order('category_key')
      .order('sub_key')
      .order('title')
      .then(({ data, error }) => {
        if (!error && data) setCategories(buildCategories(data));
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}

function buildCategories(rows: any[]): PartCategory[] {
  const catMap = new Map<string, PartCategory>();

  for (const r of rows) {
    if (!catMap.has(r.category_key)) {
      catMap.set(r.category_key, {
        key: r.category_key,
        title: r.category_title,
        short: r.category_short,
        cover: r.category_cover,
        icon: r.category_icon,
        items: [],
        subcategories: [],
      });
    }
    const cat = catMap.get(r.category_key)!;
    const item = { key: r.item_key, title: r.title, desc: r.description, image: r.image, gallery: r.gallery ?? [] };

    if (r.sub_key) {
      let sub = cat.subcategories!.find(s => s.key === r.sub_key);
      if (!sub) {
        sub = { key: r.sub_key, title: r.sub_title ?? r.sub_key, items: [] };
        cat.subcategories!.push(sub);
      }
      sub.items.push(item);
    } else {
      cat.items.push(item);
    }
  }

  const ORDER = ['trambolin-yedek', 'salto-trambolin'];
  const all = Array.from(catMap.values());
  return [
    ...ORDER.map(k => all.find(c => c.key === k)).filter(Boolean) as PartCategory[],
    ...all.filter(c => !ORDER.includes(c.key)),
  ];
}
