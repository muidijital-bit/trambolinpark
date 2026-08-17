import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { supabase } from './lib/supabase';
import { useSiteSettings } from './hooks/useSiteSettings';
import { trackPageView, initClickTracking, initGtag } from './lib/analytics';
import type { Session } from '@supabase/supabase-js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieBanner from './components/CookieBanner';

function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dotRef.current)  { dotRef.current.style.left  = e.clientX + 'px'; dotRef.current.style.top  = e.clientY + 'px'; }
      if (ringRef.current) { ringRef.current.style.left = e.clientX + 'px'; ringRef.current.style.top = e.clientY + 'px'; }
    };
    document.addEventListener('mousemove', move, { passive: true });
    return () => document.removeEventListener('mousemove', move);
  }, []);
  return <><div ref={dotRef} className="cursor-dot" /><div ref={ringRef} className="cursor-ring" /></>;
}
const AdminLogin      = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout     = lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard       = lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts   = lazy(() => import('./pages/admin/AdminProducts'));
const AdminSpareParts = lazy(() => import('./pages/admin/AdminSpareParts'));
const AdminBlog       = lazy(() => import('./pages/admin/AdminBlog'));
const AdminSeo        = lazy(() => import('./pages/admin/AdminSeo'));
const AdminAbout      = lazy(() => import('./pages/admin/AdminAbout'));
const AdminGaleri     = lazy(() => import('./pages/admin/AdminGaleri'));
const AdminContact    = lazy(() => import('./pages/admin/AdminContact'));

// Public route'lar da lazy-load — tek bir başlangıç bundle'ı yerine her rota kendi
// JS parçasını (chunk) taşır. Bir ürün/kategori sayfasına doğrudan gelen (SEO
// trafiğinin çoğu) ziyaretçi artık yalnızca o sayfanın kodunu indirir.
import NotFound from './pages/NotFound';
const Home            = lazy(() => import('./pages/Home'));
const Catalog         = lazy(() => import('./pages/Catalog'));
const YedekParca      = lazy(() => import('./pages/YedekParca'));
const YedekParcaDetay = lazy(() => import('./pages/YedekParcaDetay'));
const ProductDetail   = lazy(() => import('./pages/ProductDetail'));
const Contact         = lazy(() => import('./pages/Contact'));
const About           = lazy(() => import('./pages/About'));
const Galeri          = lazy(() => import('./pages/Galeri'));
const Kvkk            = lazy(() => import('./pages/Kvkk'));
const CerezPolitikasi = lazy(() => import('./pages/CerezPolitikasi'));
const Blog            = lazy(() => import('./pages/Blog'));
const BlogPost        = lazy(() => import('./pages/BlogPost'));
const Giris           = lazy(() => import('./pages/Giris'));
const Hesabim         = lazy(() => import('./pages/Hesabim'));
const SeoPage         = lazy(() => import('./pages/SeoPage'));

function Layout() {
  const { pathname } = useLocation();
  const firstRender = useRef(true);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  // İlk sayfa yüklemesinde gtag.js kendi otomatik page_view'ini zaten atıyor —
  // burada yalnızca SONRAKİ React Router geçişlerini manuel ölçüyoruz, aksi halde
  // ilk sayfa çift sayılır.
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    trackPageView(pathname);
  }, [pathname]);

  // tel: / mailto: / WhatsApp tıklamalarını GA4 dönüşüm event'i olarak yakalar
  // (bkz. src/lib/analytics.ts) — tek seferlik, tüm site için geçerli.
  useEffect(() => initClickTracking(), []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="tp-main">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}

// Route chunk'ı indirilirken kısa süreliğine görünen, sitedeki mevcut spinner
// deseniyle (Catalog/ProductDetail vb.) tutarlı, marka rengiyle uyumlu yer tutucu.
function PageFallback() {
  return (
    <div className="text-center" style={{ paddingTop: '30vh', minHeight: '60vh' }}>
      <div className="spinner-border" style={{ color: '#5c9200', width: 32, height: 32, borderWidth: 3 }} role="status" />
    </div>
  );
}

function AdminGuard({ session }: { session: Session | null }) {
  if (session === undefined) return null;
  if (!session) return <Navigate to="/admin/login" replace />;
  return <AdminLayout />;
}

function SiteHelmet() {
  const s = useSiteSettings();
  const { pathname } = useLocation();
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
  const pageUrl = `https://trambolinpark.com${cleanPath}`;

  // gtag kurulumu artık burada JSX <script> olarak değil, imperatif olarak yapılıyor —
  // bkz. src/lib/analytics.ts > initGtag için sebep.
  useEffect(() => {
    if (s.google_analytics_id) initGtag(s.google_analytics_id);
  }, [s.google_analytics_id]);

  return (
    <Helmet>
      <meta property="og:title" content={s.site_title} />
      <meta property="og:description" content={s.site_description} />
      {s.og_image && <meta property="og:image" content={s.og_image} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={s.site_title} />
      <meta name="twitter:description" content={s.site_description} />
      {s.og_image && <meta name="twitter:image" content={s.og_image} />}
    </Helmet>
  );
}

function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <HelmetProvider>
    <BrowserRouter>
      <SiteHelmet />
      <Routes>
        {/* Admin routes — lazy loaded */}
        <Route path="/admin/login" element={
          <Suspense fallback={null}>
            {session ? <Navigate to="/admin" replace /> : <AdminLogin />}
          </Suspense>
        } />
        <Route path="/admin" element={
          <Suspense fallback={<div style={{ minHeight: '100vh', background: '#f5f7fa' }} />}>
            <AdminGuard session={session ?? null} />
          </Suspense>
        }>
          <Route index element={<Dashboard />} />
          <Route path="urunler" element={<AdminProducts />} />
          <Route path="yedek-parcalar" element={<AdminSpareParts />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="seo" element={<AdminSeo />} />
          <Route path="hakkimizda" element={<AdminAbout />} />
          <Route path="galeri" element={<AdminGaleri />} />
          <Route path="iletisim" element={<AdminContact />} />
        </Route>

        {/* Public site */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="urunler/:categoryId/:id" element={<ProductDetail />} />
          {/* backward compat */}
          <Route path="urun/:id" element={<ProductDetail />} />
          <Route path="urunler" element={<Catalog />} />
          <Route path="urunler/:categoryId" element={<Catalog />} />
          <Route path="yedek-parcalar" element={<YedekParca />} />
          <Route path="yedek-parcalar/:key" element={<YedekParcaDetay />} />
          {/* backward compat */}
          <Route path="kategori/:categoryId" element={<Catalog />} />
          <Route path="iletisim" element={<Contact />} />
          <Route path="hakkimizda" element={<About />} />
          <Route path="galeri" element={<Galeri />} />
          <Route path="kvkk" element={<Kvkk />} />
          <Route path="cerez-politikasi" element={<CerezPolitikasi />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="giris" element={<Giris />} />
          <Route path="hesabim" element={<Hesabim />} />
          <Route path=":slug" element={<SeoPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
