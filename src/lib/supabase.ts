import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://skucanbrmuceruasvjui.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrdWNhbmJybXVjZXJ1YXN2anVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTA4NjEsImV4cCI6MjA5NDMyNjg2MX0.-TPEdULQeKrTZDDqa5vwU5Nq7BCyUdIJL9fFhgR93t8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ProductRow = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  category_name: string;
  features: string[];
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
