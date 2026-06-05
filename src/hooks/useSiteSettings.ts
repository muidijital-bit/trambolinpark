import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { SiteSettings } from '../lib/supabase';

const DEFAULTS: SiteSettings = {
  site_title: 'Ticari Trambolin Park Ekipmanı Üreticisi | TrambolinPark',
  site_description: 'TrambolinPark: CE belgeli ticari trambolin, softplay ve oyun parkı ekipmanları. 81 ilde kurulum ve satış. AVM, işletme ve eğlence merkezlerine anahtar teslim çözüm.',
  keywords: 'ticari trambolin üretici, trambolin park ekipmanı, soft play üretici türkiye, top havuzu imalatçı, trambolin park kurulum, kapalı oyun alanı üretimi, CE belgeli trambolin, oyun parkı ekipmanı, AVM oyun parkı, profesyonel trambolin imalatı',
  og_image: 'https://trambolinpark.com/album/trambolinparkyeni/coklualbumler/-VkT.jpg',
  favicon_url: '',
  google_analytics_id: '',
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);

  useEffect(() => {
    supabase.from('site_settings').select('*').eq('id', 1).single().then(({ data }) => {
      if (data) setSettings({ ...DEFAULTS, ...data });
    });
  }, []);

  return settings;
}
