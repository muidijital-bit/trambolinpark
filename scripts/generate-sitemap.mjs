// Sitemap'i statik sayfalar + Supabase'deki ürün / yedek parça / blog verileriyle
// otomatik üretir. `npm run build` öncesinde çalışır (bkz. package.json "prebuild").
//
// Neden gerekli: public/sitemap.xml elle güncellenen statik bir dosyaydı ve yalnızca
// kategori sayfalarını içeriyordu — tek tek ürün, yedek parça ve blog yazısı URL'leri
// (SEO Checklist madde 5: "Yalnızca indekslenmesi gereken URL'lerin Sitemap'e alınması")
// sitemap'te hiç yer almıyordu. Bu script her build'de günceli üretir.
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TODAY = new Date().toISOString().slice(0, 10);
const SITE = 'https://trambolinpark.com';

// .env.local'i (varsa) manuel oku — bu script Vite dışında, düz Node ile çalışır.
function loadEnvLocal() {
  const envPath = resolve(ROOT, '.env.local');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const [, key, rawVal] = m;
    const val = rawVal.replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnvLocal();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const xmlEscape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function urlEntry(loc, { lastmod = TODAY, changefreq = 'weekly', priority = '0.6' } = {}) {
  return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

// ── 1. Sabit / kurumsal sayfalar ─────────────────────────────
const STATIC_PAGES = [
  { loc: `${SITE}/`, changefreq: 'daily', priority: '1.0', comment: 'Ana Sayfa' },
  { loc: `${SITE}/urunler`, changefreq: 'weekly', priority: '0.9', comment: 'Ürünler' },
  { loc: `${SITE}/urunler/ticari-olimpik-trambolinler`, changefreq: 'weekly', priority: '0.9' },
  { loc: `${SITE}/urunler/ticari-junior`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${SITE}/urunler/trambolin-parklari`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${SITE}/urunler/yer-zemin-trambolin`, changefreq: 'weekly', priority: '0.7' },
  { loc: `${SITE}/urunler/salto-trambolin`, changefreq: 'weekly', priority: '0.7' },
  { loc: `${SITE}/urunler/tekli-trambolinler`, changefreq: 'weekly', priority: '0.7' },
  { loc: `${SITE}/urunler/profesyonel-trambolin`, changefreq: 'weekly', priority: '0.7' },
  { loc: `${SITE}/urunler/softplay-oyun-alanlari`, changefreq: 'weekly', priority: '0.9', comment: 'Softplay & Top Havuzları' },
  { loc: `${SITE}/urunler/softplay-oyuncaklar`, changefreq: 'weekly', priority: '0.7' },
  { loc: `${SITE}/urunler/kucuk-top-havuzlari`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${SITE}/urunler/isletmelere-top-havuzlari`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${SITE}/urunler/sisme-park-junior`, changefreq: 'weekly', priority: '0.7', comment: 'Şişme Parklar' },
  { loc: `${SITE}/urunler/sisme-buyuk`, changefreq: 'weekly', priority: '0.7' },
  { loc: `${SITE}/yedek-parcalar`, changefreq: 'weekly', priority: '0.8', comment: 'Yedek Parçalar' },
  { loc: `${SITE}/blog`, changefreq: 'weekly', priority: '0.7', comment: 'Blog' },
  { loc: `${SITE}/hakkimizda`, changefreq: 'monthly', priority: '0.6', comment: 'Kurumsal' },
  { loc: `${SITE}/galeri`, changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE}/iletisim`, changefreq: 'monthly', priority: '0.7' },
];

async function main() {
  const groups = [];

  groups.push({ comment: null, entries: STATIC_PAGES.map((p) => urlEntry(p.loc, p)) });

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('[sitemap] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY bulunamadı — yalnızca statik sayfalar yazılıyor.');
  } else {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // ── 2. Ürünler ──────────────────────────────────────────
    try {
      const { data, error } = await supabase.from('products').select('id, slug, category, updated_at');
      if (error) throw error;
      const entries = (data ?? [])
        .filter((p) => p.category)
        .map((p) => urlEntry(`${SITE}/urunler/${p.category}/${p.slug ?? p.id}`, {
          lastmod: (p.updated_at ?? '').slice(0, 10) || TODAY,
          changefreq: 'monthly',
          priority: '0.65',
        }));
      groups.push({ comment: 'Ürün Detay Sayfaları (Supabase)', entries });
      console.log(`[sitemap] ${entries.length} ürün eklendi.`);
    } catch (err) {
      console.warn('[sitemap] products tablosu okunamadı:', err.message);
    }

    // ── 3. Yedek parçalar ───────────────────────────────────
    try {
      const { data, error } = await supabase.from('spare_parts').select('item_key, updated_at');
      if (error) throw error;
      const entries = (data ?? [])
        .filter((p) => p.item_key)
        .map((p) => urlEntry(`${SITE}/yedek-parcalar/${p.item_key}`, {
          lastmod: (p.updated_at ?? '').slice(0, 10) || TODAY,
          changefreq: 'monthly',
          priority: '0.55',
        }));
      groups.push({ comment: 'Yedek Parça Detay Sayfaları (Supabase)', entries });
      console.log(`[sitemap] ${entries.length} yedek parça eklendi.`);
    } catch (err) {
      console.warn('[sitemap] spare_parts tablosu okunamadı:', err.message);
    }

    // ── 4. Blog yazıları (Supabase + statik fallback) ───────
    try {
      const { data, error } = await supabase.from('blog_posts').select('slug, date, updated_at').eq('published', true);
      if (error) throw error;
      const remoteSlugs = new Set((data ?? []).map((p) => p.slug));

      // src/data/blogPosts.ts içindeki statik yazılar (Supabase'de yoksa fallback olarak sitede yayınlanıyor).
      const staticSrc = readFileSync(resolve(ROOT, 'src/data/blogPosts.ts'), 'utf8');
      const staticSlugs = [...staticSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]).filter((s) => !remoteSlugs.has(s));

      const entries = [
        ...(data ?? []).map((p) => urlEntry(`${SITE}/blog/${p.slug}`, {
          lastmod: (p.updated_at ?? p.date ?? '').slice(0, 10) || TODAY,
          changefreq: 'monthly',
          priority: '0.6',
        })),
        ...staticSlugs.map((slug) => urlEntry(`${SITE}/blog/${slug}`, { changefreq: 'monthly', priority: '0.6' })),
      ];
      groups.push({ comment: 'Blog Yazıları', entries });
      console.log(`[sitemap] ${entries.length} blog yazısı eklendi (${data?.length ?? 0} Supabase + ${staticSlugs.length} statik).`);
    } catch (err) {
      console.warn('[sitemap] blog_posts tablosu okunamadı:', err.message);
    }
  }

  const body = groups
    .map((g) => (g.comment ? `\n  <!-- ${g.comment} -->\n${g.entries.join('\n')}` : g.entries.join('\n')))
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n\n</urlset>\n`;

  writeFileSync(resolve(ROOT, 'public/sitemap.xml'), xml, 'utf8');
  console.log('[sitemap] public/sitemap.xml yazıldı.');
}

main().catch((err) => {
  console.error('[sitemap] Beklenmeyen hata:', err);
  // Sitemap üretimi build'i kırmasın — mevcut sitemap.xml dosyası olduğu gibi kalır.
  process.exit(0);
});
