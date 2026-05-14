import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { supabase } from './lib/supabase';
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
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminSpareParts from './pages/admin/AdminSpareParts';
import AdminSeo from './pages/admin/AdminSeo';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import YedekParca from './pages/YedekParca';
import YedekParcaDetay from './pages/YedekParcaDetay';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Galeri from './pages/Galeri';
import Kvkk from './pages/Kvkk';
import CerezPolitikasi from './pages/CerezPolitikasi';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="tp-main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}

function AdminGuard({ session }: { session: Session | null }) {
  if (session === undefined) return null;
  if (!session) return <Navigate to="/admin/login" replace />;
  return <AdminLayout />;
}

function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={session ? <Navigate to="/admin" replace /> : <AdminLogin />} />
        <Route path="/admin" element={<AdminGuard session={session ?? null} />}>
          <Route index element={<Dashboard />} />
          <Route path="urunler" element={<AdminProducts />} />
          <Route path="yedek-parcalar" element={<AdminSpareParts />} />
          <Route path="seo" element={<AdminSeo />} />
        </Route>

        {/* Public site */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
