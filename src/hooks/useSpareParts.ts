import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { spareCategories as staticCategories, type PartCategory } from '../data/spareParts';

const ORDER = ['trambolin-yedek', 'salto-yedek', 'top-havuzu-yedek', 'sisme-yedek'];
const SUB_ITEM_ORDER: Record<string, string[]> = {
  'trambolin-yedek': ['yaylar', 'fileler', 'aksesuarlar'],
};

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
        if (!error && data && data.length > 0) {
          setCategories(mergeWithStatic(data));
        } else {
          setCategories(staticCategories);
        }
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}

function mergeWithStatic(rows: any[]): PartCategory[] {
  const sorted = [...rows].sort((a, b) => {
    const order = SUB_ITEM_ORDER[a.category_key];
    if (!order || a.category_key !== b.category_key) return 0;
    const ai = order.indexOf(a.sub_key ?? '');
    const bi = order.indexOf(b.sub_key ?? '');
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  const catMap = new Map<string, PartCategory>();
  const remoteItemKeys = new Set<string>();

  for (const r of sorted) {
    remoteItemKeys.add(r.item_key);
    if (!catMap.has(r.category_key)) {
      catMap.set(r.category_key, {
        key: r.category_key,
        title: r.category_title,
        short: r.category_short,
        cover: r.category_cover,
        icon: r.category_icon,
        items: [],
      });
    }
    catMap.get(r.category_key)!.items.push({
      key: r.item_key,
      title: r.title,
      desc: r.description,
      cardDesc: r.card_description || r.description,
      image: r.image,
      gallery: r.gallery ?? [],
    });
  }

  for (const staticCat of staticCategories) {
    const staticItems = staticCat.items.filter(item => !remoteItemKeys.has(item.key));
    if (!catMap.has(staticCat.key)) {
      if (staticItems.length > 0) catMap.set(staticCat.key, { ...staticCat, items: staticItems });
    } else if (staticItems.length > 0) {
      catMap.get(staticCat.key)!.items.push(...staticItems);
    }
  }

  const all = Array.from(catMap.values());
  return [
    ...ORDER.map(k => all.find(c => c.key === k)).filter(Boolean) as PartCategory[],
    ...all.filter(c => !ORDER.includes(c.key)),
  ];
}
