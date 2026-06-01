import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, X, Menu } from 'lucide-react';
import { supabase } from '../lib/supabase';

type SearchProduct = { id: string; title: string; imageUrl: string; categoryName: string; category: string; slug: string };
type SearchPart = { key: string; title: string; catTitle: string; image: string };

export default function Navbar({ forceScrolled = false }: { forceScrolled?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<SearchProduct[]>([]);
  const [allSpareParts, setAllSpareParts] = useState<SearchPart[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileSearchOpen(false);
    setMenuOpen(false);
    setQuery('');
    setSearchOpen(false);
  }, [location.pathname]);

  const fetchSearchData = () => {
    supabase.from('products').select('id, title, image_url, category_name, category, slug').then(({ data }) => {
      setAllProducts((data ?? []).map(r => ({ id: r.slug ?? r.id, title: r.title, imageUrl: r.image_url, categoryName: r.category_name, category: r.category, slug: r.slug ?? r.id })));
    });
    supabase.from('spare_parts').select('item_key, title, category_title, image').then(({ data }) => {
      setAllSpareParts((data ?? []).map(r => ({ key: r.item_key, title: r.title, catTitle: r.category_title, image: r.image })));
    });
  };

  useEffect(() => { fetchSearchData(); }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) { setQuery(''); setSearchOpen(false); }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const q = query.trim().toLowerCase();
  const prodResults  = q ? allProducts.filter(p => p.title.toLowerCase().includes(q)).slice(0, 4) : [];
  const spareResults = q ? allSpareParts.filter(p => p.title.toLowerCase().includes(q) || p.catTitle.toLowerCase().includes(q)).slice(0, 3) : [];
  const hasResults   = prodResults.length > 0 || spareResults.length > 0;

  const go = (path: string) => { navigate(path); setQuery(''); setSearchOpen(false); setMenuOpen(false); setMobileSearchOpen(false); };

  return (
    <>
      <nav className={`tp-nav${(scrolled || forceScrolled) ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="d-flex align-items-center gap-3 gap-lg-4">

            {/* Logo */}
            <Link to="/" className="tp-nav-logo me-auto me-lg-0 flex-shrink-0">
              <img src="/logo.png" alt="Trambolinpark" />
            </Link>

            {/* Desktop links */}
            <div className="d-none d-lg-flex align-items-center gap-4 flex-grow-1 justify-content-center">
              {[['/', 'Anasayfa'], ['/hakkimizda', 'Hakkımızda'], ['/urunler', 'Ürünler'], ['/yedek-parcalar', 'Yedek Parçalar'], ['/galeri', 'Galeri'], ['/blog', 'Blog'], ['/iletisim', 'İletişim']].map(([to, label]) => (
                <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-link-item${isActive ? ' active' : ''}`}>{label}</NavLink>
              ))}
            </div>

            {/* Search */}
            <div ref={searchRef} className="d-none d-lg-block position-relative">
              {searchOpen ? (
                <div className="d-flex align-items-center gap-2">
                  <input autoFocus className="tp-search2" value={query} onChange={e => setQuery(e.target.value)} placeholder="Ürün ara..." />
                  <button onClick={() => { setQuery(''); setSearchOpen(false); }} className="btn-glass" style={{ padding: '.4rem .75rem', fontSize: 12 }}><X size={14} /></button>
                </div>
              ) : (
                <button onClick={() => { setSearchOpen(true); fetchSearchData(); }} className="btn-glass" style={{ padding: '.5rem .85rem' }}>
                  <Search size={15} />
                </button>
              )}
              {q && (
                <div className="tp-search-dropdown2">
                  {hasResults ? (
                    <>
                      {prodResults.length > 0 && <>
                        <div className="px-3 pt-3 pb-1" style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.35)' }}>Ürünler</div>
                        {prodResults.map(p => (
                          <button key={p.id} onClick={() => go(`/urunler/${p.category}/${p.id}`)} className="d-flex align-items-center gap-3 w-100 border-0 text-start px-3 py-2" style={{ background: 'transparent', color: '#fff', transition: 'background .15s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.06)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                            <img src={p.imageUrl} alt="" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 8, background: 'rgba(255,255,255,.05)', flexShrink: 0 }} />
                            <div>
                              <p className="mb-0 fw-bold" style={{ fontSize: 13 }}>{p.title}</p>
                              <p className="mb-0" style={{ fontSize: 11, color: '#c3e92d' }}>{p.categoryName}</p>
                            </div>
                          </button>
                        ))}
                      </>}
                      {spareResults.length > 0 && <>
                        <div className="px-3 pt-2 pb-1" style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.35)', borderTop: prodResults.length ? '1px solid rgba(255,255,255,.06)' : undefined, marginTop: prodResults.length ? '.5rem' : 0, paddingTop: '.75rem' }}>Yedek Parçalar</div>
                        {spareResults.map(p => (
                          <button key={p.key} onClick={() => go(`/yedek-parcalar/${p.key}`)} className="d-flex align-items-center gap-3 w-100 border-0 text-start px-3 py-2" style={{ background: 'transparent', color: '#fff', transition: 'background .15s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.06)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                            {p.image && <img src={p.image} alt="" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 8, background: 'rgba(255,255,255,.05)', flexShrink: 0 }} />}
                            <div><p className="mb-0 fw-bold" style={{ fontSize: 13 }}>{p.title}</p><p className="mb-0" style={{ fontSize: 11, color: '#c3e92d' }}>{p.catTitle}</p></div>
                          </button>
                        ))}
                      </>}
                      <div className="px-3 py-2" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
                        <button onClick={() => go('/urunler')} className="fw-bold" style={{ background: 'transparent', border: 'none', color: '#c3e92d', fontSize: 12, cursor: 'pointer' }}>Tüm ürünlerde ara →</button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4" style={{ fontSize: 13, color: 'rgba(255,255,255,.4)' }}>Sonuç bulunamadı</div>
                  )}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link to="/iletisim" className="btn-accent d-none d-lg-inline-flex flex-shrink-0" style={{ fontSize: 13, padding: '.6rem 1.4rem' }}>Teklif Al</Link>

            {/* Mobile search icon */}
            <button onClick={() => { setMobileSearchOpen(true); setMenuOpen(false); fetchSearchData(); }} className="d-lg-none btn-glass" style={{ padding: '.5rem .75rem' }}>
              <Search size={18} />
            </button>

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="d-lg-none btn-glass" style={{ padding: '.5rem .75rem' }}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,.97)', backdropFilter: 'blur(20px)', zIndex: 1100, display: 'flex', flexDirection: 'column' }}>
          {/* Search input row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
            <Search size={18} style={{ color: 'rgba(255,255,255,.4)', flexShrink: 0 }} />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ürün veya yedek parça ara..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 17, fontFamily: 'Inter, sans-serif' }}
            />
            <button onClick={() => { setMobileSearchOpen(false); setQuery(''); }}
              style={{ background: 'rgba(255,255,255,.08)', border: 'none', borderRadius: '50%', width: 38, height: 38, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <X size={16} />
            </button>
          </div>

          {/* Results */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {q ? (
              hasResults ? (
                <>
                  {prodResults.length > 0 && (
                    <>
                      <div style={{ padding: '1rem 1.25rem .5rem', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.35)' }}>Ürünler</div>
                      {prodResults.map(p => (
                        <button key={p.id} onClick={() => go(`/urunler/${p.category}/${p.id}`)}
                          style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', border: 'none', background: 'transparent', color: '#fff', textAlign: 'left', padding: '.85rem 1.25rem', transition: 'background .15s' }}
                          onTouchStart={e => (e.currentTarget.style.background = 'rgba(255,255,255,.06)')} onTouchEnd={e => (e.currentTarget.style.background = 'transparent')}>
                          <img src={p.imageUrl} alt="" style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 10, background: 'rgba(255,255,255,.05)', flexShrink: 0 }} />
                          <div>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>{p.title}</p>
                            <p style={{ margin: 0, fontSize: 12, color: '#c3e92d', marginTop: 2 }}>{p.categoryName}</p>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                  {spareResults.length > 0 && (
                    <>
                      <div style={{ padding: '1rem 1.25rem .5rem', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.35)', borderTop: prodResults.length ? '1px solid rgba(255,255,255,.06)' : undefined }}>Yedek Parçalar</div>
                      {spareResults.map(p => (
                        <button key={p.key} onClick={() => go(`/yedek-parcalar/${p.key}`)}
                          style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', border: 'none', background: 'transparent', color: '#fff', textAlign: 'left', padding: '.85rem 1.25rem', transition: 'background .15s' }}
                          onTouchStart={e => (e.currentTarget.style.background = 'rgba(255,255,255,.06)')} onTouchEnd={e => (e.currentTarget.style.background = 'transparent')}>
                          {p.image && <img src={p.image} alt="" style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 10, background: 'rgba(255,255,255,.05)', flexShrink: 0 }} />}
                          <div>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>{p.title}</p>
                            <p style={{ margin: 0, fontSize: 12, color: '#c3e92d', marginTop: 2 }}>{p.catTitle}</p>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                  <div style={{ padding: '.85rem 1.25rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
                    <button onClick={() => go('/urunler')} style={{ background: 'transparent', border: 'none', color: '#c3e92d', fontSize: 13, fontWeight: 700 }}>Tüm ürünlerde ara →</button>
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', fontSize: 14, color: 'rgba(255,255,255,.4)' }}>Sonuç bulunamadı</div>
              )
            ) : (
              <div style={{ padding: '2rem 1.25rem', fontSize: 14, color: 'rgba(255,255,255,.4)' }}>Aramak istediğiniz ürünü yazın...</div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,.96)', backdropFilter: 'blur(20px)', zIndex: 999, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ position: 'absolute', top: 20, left: 24 }}>
            <img src="/logo.png" alt="Trambolinpark" style={{ height: 36, objectFit: 'contain' }} />
          </div>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,.08)', border: 'none', borderRadius: '50%', width: 44, height: 44, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
          <div className="d-flex flex-column gap-1">
            {[['/', 'Anasayfa'], ['/hakkimizda', 'Hakkımızda'], ['/urunler', 'Ürünler'], ['/yedek-parcalar', 'Yedek Parçalar'], ['/galeri', 'Galeri'], ['/blog', 'Blog'], ['/iletisim', 'İletişim']].map(([to, label]) => (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: 'clamp(1.75rem, 6vw, 2.5rem)', color: 'rgba(255,255,255,.85)', lineHeight: 1.2, padding: '.35rem 0', borderBottom: '1px solid rgba(255,255,255,.05)', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c3e92d')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.85)')}>
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-5">
            <Link to="/iletisim" onClick={() => setMenuOpen(false)} className="btn-accent" style={{ fontSize: 15, padding: '.85rem 2rem' }}>Teklif Al</Link>
          </div>
        </div>
      )}
    </>
  );
}
