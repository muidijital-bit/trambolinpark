import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
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
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import YedekParca from './pages/YedekParca';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Galeri from './pages/Galeri';
import Kvkk from './pages/Kvkk';
import CerezPolitikasi from './pages/CerezPolitikasi';

function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <CustomCursor />
      <Navbar forceScrolled={pathname !== '/'} />
      <main className="tp-main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="urun/:id" element={<ProductDetail />} />
          <Route path="urunler" element={<Catalog />} />
          <Route path="urunler/:categoryId" element={<Catalog />} />
          <Route path="yedek-parcalar" element={<YedekParca />} />
          {/* backward compat */}
          <Route path="kategori/:categoryId" element={<Catalog />} />
          <Route path="iletisim" element={<Contact />} />
          <Route path="hakkimizda" element={<About />} />
          <Route path="galeri" element={<Galeri />} />
          <Route path="kvkk" element={<Kvkk />} />
          <Route path="cerez-politikasi" element={<CerezPolitikasi />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
