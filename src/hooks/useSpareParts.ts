import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { spareCategories as staticCategories, type PartCategory, type PartSubCategory } from '../data/spareParts';

const CAT_ORDER = ['trambolin-yedek', 'salto-yedek', 'top-havuzu-yedek', 'sisme-yedek'];

// Subcategory display order for trambolin-yedek
const SUB_ORDER: Record<string, string[]> = {
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
  const catMap = new Map<string, PartCategory>();
  const subMap = new Map<string, Map<string, PartSubCategory>>();
  const remoteItemKeys = new Set<string>();

  for (const r of rows) {
    remoteItemKeys.add(r.item_key);

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
      subMap.set(r.category_key, new Map());
    }

    const item = { key: r.item_key, title: r.title, desc: r.description, image: r.image, gallery: r.gallery ?? [] };

    if (r.sub_key) {
      const subs = subMap.get(r.category_key)!;
      if (!subs.has(r.sub_key)) {
        subs.set(r.sub_key, { key: r.sub_key, title: r.sub_title ?? r.sub_key, items: [] });
      }
      subs.get(r.sub_key)!.items.push(item);
    } else {
      catMap.get(r.category_key)!.items.push(item);
    }
  }

  // Attach subcategories in defined order
  for (const [catKey, cat] of catMap) {
    const subs = subMap.get(catKey);
    if (subs && subs.size > 0) {
      const order = SUB_ORDER[catKey] ?? [];
      const ordered = order.map(k => subs.get(k)).filter(Boolean) as PartSubCategory[];
      const rest = Array.from(subs.values()).filter(s => !order.includes(s.key));
      cat.subcategories = [...ordered, ...rest];
    }
  }

  // Merge static: add categories/items not in Supabase
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
    ...CAT_ORDER.map(k => all.find(c => c.key === k)).filter(Boolean) as PartCategory[],
    ...all.filter(c => !CAT_ORDER.includes(c.key)),
  ];
}
