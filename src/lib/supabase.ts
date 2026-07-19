import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ProductRow = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  category_name: string;
  features: string[];
  gallery?: string[];
  created_at?: string;
  updated_at?: string;
};

export type SparePartRow = {
  id?: string;
  category_key: string;
  category_title: string;
  category_short: string;
  category_cover: string;
  category_icon: string;
  sub_key: string | null;
  sub_title: string | null;
  item_key: string;
  title: string;
  description: string;
  card_description?: string;
  image: string;
  gallery: string[];
  created_at?: string;
  updated_at?: string;
};

export type SeoRow = {
  id?: string;
  page_path: string;
  page_name: string;
  title: string;
  description: string;
  keywords: string;
  og_image: string;
  updated_at?: string;
};

export type SiteSettings = {
  site_title: string;
  site_description: string;
  keywords: string;
  og_image: string;
  favicon_url: string;
  google_analytics_id: string;
};
