import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { SiteSettings } from '../lib/supabase';

const DEFAULTS: SiteSettings = {
  site_title: 'Trambolinpark | Trambolin Üreticisi & Softplay Üreticisi',
  site_description: 'Türkiye\'nin lider trambolin ve softplay üreticisi. Ticari olimpik trambolinler, çocuk oyun grubu, top havuzu ve çocuk oyun alanları. 81 ilde anahtar teslim kurulum.',
  keywords: 'trambolin üreticisi, çocuk oyun grubu üreticisi, softplay üreticisi, ticari trambolin, olimpik trambolin, trambolin yedek parça, top havuzu, çocuk oyun alanı, trambolin yayları, trambolin zıplama filesi, trambolin parkı kurulumu, CE belgeli trambolin',
  og_image: 'https://skucanbrmuceruasvjui.supabase.co/storage/v1/object/public/urunler/products/migrated--VkT.jpg',
  favicon_url: '',
  google_analytics_id: '',
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);

  useEffect(() => {
    supabase.from('site_settings').select('*').eq('id', 1).single().then(({ data }) => {
      if (!data) return;
      // Boş string değerleri default'un üzerine yazmasın
      const merged = { ...DEFAULTS };
      (Object.keys(data) as (keyof SiteSettings)[]).forEach(k => {
        if (data[k] !== '' && data[k] !== null && data[k] !== undefined) {
          (merged as Record<string, string>)[k] = data[k] as string;
        }
      });
      setSettings(merged);
    });
  }, []);

  return settings;
}
