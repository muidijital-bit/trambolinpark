import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import Topbar from './Topbar';
import { allProducts } from '../data/mockData';
import { spareCategories } from '../data/spareParts';

// Flat spare-part list for search
const allSpareParts = spareCategories.flatMap(cat =>
  cat.items.map(item => ({
    key: item.key,
    title: item.title,
    desc: item.desc,
    image: item.image,
    catKey: cat.key,
    catTitle: cat.title,
  }))
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const q = query.trim().toLowerCase();
  const hasQuery = q.length > 0;

  const productResults = hasQuery
    ? allProducts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const spareResults = hasQuery
    ? allSpareParts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.catTitle.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const hasResults = productResults.length > 0 || spareResults.length > 0;

  const handleSelectProduct = (id: string) => {
    navigate(`/urun/${id}`);
    setQuery('');
  };

  const handleSelectSpare = (catKey: string) => {
    navigate(`/yedek-parcalar#${catKey}`);
    setQuery('');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[14px] font-semibold uppercase tracking-wide whitespace-nowrap transition-colors ${
      isActive ? 'text-[#9fc91a]' : 'text-[#1a1a1a] hover:text-[#9fc91a]'
    }`;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      {!isScrolled && <Topbar />}

      <nav className="py-3">
        <div className="container mx-auto px-4 flex items-center gap-6">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src="https://www.trambolinpark.com/album/trambolinparkyeni/trm.png"
              alt="Trambolinpark Logo"
              className="h-10 md:h-11 object-contain"
            />
          </Link>

          {/* Nav links — centered, grow to fill space */}
          <div className="hidden lg:flex items-center justify-center gap-5 flex-1">
            {/* KURUMSAL */}
            <div className="relative group cursor-pointer py-2">
              <div className="flex items-center gap-1 text-[14px] font-semibold text-[#1a1a1a] hover:text-[#9fc91a] transition-colors uppercase tracking-wide whitespace-nowrap">
                KURUMSAL <ChevronDown size={13} className="mt-0.5" />
              </div>
              <div className="absolute top-11 left-0 w-52 bg-white border-t-2 border-[#9fc91a] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link to="/hakkimizda" className="block px-4 py-3 text-sm text-[#555] hover:bg-[#fafafa] hover:text-[#9fc91a] border-b border-[#eee]">Hakkımızda</Link>
                <Link to="/kvkk" className="block px-4 py-3 text-sm text-[#555] hover:bg-[#fafafa] hover:text-[#9fc91a] border-b border-[#eee]">KVKK</Link>
                <Link to="/cerez-politikasi" className="block px-4 py-3 text-sm text-[#555] hover:bg-[#fafafa] hover:text-[#9fc91a]">Çerez Politikası</Link>
              </div>
            </div>

            <NavLink to="/urunler" className={navLinkClass}>ÜRÜNLER</NavLink>
            <NavLink to="/yedek-parcalar" className={navLinkClass}>YEDEK PARÇALAR</NavLink>
            <NavLink to="/galeri" className={navLinkClass}>GALERİ</NavLink>
            <NavLink to="/iletisim" className={navLinkClass}>İLETİŞİM</NavLink>
          </div>

          {/* Search — always visible, fixed width */}
          <div ref={searchRef} className="relative hidden lg:block shrink-0" style={{width: 330}}>
            <div className="flex items-center gap-2 bg-[#f1f5f9] rounded-full px-4 py-2.5 w-full">
              <Search size={15} className="text-[#94a3b8] shrink-0" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ürün ara..."
                className="bg-transparent text-[13px] text-[#1a1a1a] outline-none w-full placeholder:text-[#94a3b8]"
              />
              {query && (
                <button onClick={() => setQuery('')}>
                  <X size={13} className="text-[#94a3b8] hover:text-[#1a1a1a]" />
                </button>
              )}
            </div>

            {/* Results dropdown */}
            {hasQuery && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {hasResults ? (
                  <>
                    {productResults.length > 0 && (
                      <>
                        <div className="px-4 pt-3 pb-1">
                          <span className="text-[10px] font-black text-[#a0afbf] uppercase tracking-widest">Ürünler</span>
                        </div>
                        {productResults.map(p => (
                          <button
                            key={p.id}
                            onClick={() => handleSelectProduct(p.id)}
                            className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-[#f8fafc] transition-colors text-left"
                          >
                            <img src={p.imageUrl} alt={p.title} className="w-9 h-9 object-contain rounded-lg bg-gray-50 shrink-0" />
                            <div>
                              <p className="text-[13px] font-bold text-[#1a1a1a] leading-tight">{p.title}</p>
                              <p className="text-[11px] text-[#9fc91a] font-semibold mt-0.5">{p.categoryName}</p>
                            </div>
                          </button>
                        ))}
                      </>
                    )}
                    {spareResults.length > 0 && (
                      <>
                        <div className={`px-4 pb-1 ${productResults.length > 0 ? 'pt-2 border-t border-gray-100 mt-1' : 'pt-3'}`}>
                          <span className="text-[10px] font-black text-[#a0afbf] uppercase tracking-widest">Yedek Parçalar</span>
                        </div>
                        {spareResults.map(p => (
                          <button
                            key={p.key}
                            onClick={() => handleSelectSpare(p.catKey)}
                            className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-[#f8fafc] transition-colors text-left"
                          >
                            {p.image
                              ? <img src={p.image} alt={p.title} className="w-9 h-9 object-contain rounded-lg bg-gray-50 shrink-0" />
                              : <div className="w-9 h-9 rounded-lg bg-[#9fc91a]/10 shrink-0 flex items-center justify-center text-base">🔩</div>
                            }
                            <div>
                              <p className="text-[13px] font-bold text-[#1a1a1a] leading-tight">{p.title}</p>
                              <p className="text-[11px] text-[#9fc91a] font-semibold mt-0.5">{p.catTitle}</p>
                            </div>
                          </button>
                        ))}
                      </>
                    )}
                    <div className="px-4 py-2.5 border-t border-gray-100">
                      <Link
                        to={productResults.length > 0 ? `/urunler/${productResults[0].category}` : '/urunler'}
                        onClick={() => setQuery('')}
                        className="text-[11px] text-[#9fc91a] font-bold hover:opacity-70"
                      >
                        Tüm ürünlerde ara →
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-5 text-center">
                    <p className="text-sm text-[#94a3b8] font-medium">Sonuç bulunamadı</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button className="lg:hidden p-2 text-[#1a1a1a] ml-auto" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto z-50">
            {/* Mobile search */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2 bg-[#f1f5f9] rounded-full px-4 py-2.5">
                <Search size={15} className="text-[#94a3b8] shrink-0" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Ürün ara..."
                  className="bg-transparent text-[14px] text-[#1a1a1a] outline-none w-full placeholder:text-[#94a3b8]"
                />
                {query && (
                  <button onClick={() => setQuery('')}>
                    <X size={13} className="text-[#94a3b8]" />
                  </button>
                )}
              </div>
              {hasQuery && hasResults && (
                <div className="mt-2 rounded-xl overflow-hidden border border-gray-100">
                  {productResults.length > 0 && (
                    <>
                      <div className="px-4 py-2 bg-gray-50">
                        <span className="text-[10px] font-black text-[#a0afbf] uppercase tracking-widest">Ürünler</span>
                      </div>
                      {productResults.map(p => (
                        <button key={p.id} onClick={() => { handleSelectProduct(p.id); setMobileMenuOpen(false); }}
                          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#f8fafc] border-b border-gray-50 text-left">
                          <img src={p.imageUrl} alt={p.title} className="w-8 h-8 object-contain rounded bg-gray-50 shrink-0" />
                          <div>
                            <p className="text-[13px] font-bold text-[#1a1a1a]">{p.title}</p>
                            <p className="text-[11px] text-[#9fc91a] font-semibold">{p.categoryName}</p>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                  {spareResults.length > 0 && (
                    <>
                      <div className="px-4 py-2 bg-gray-50">
                        <span className="text-[10px] font-black text-[#a0afbf] uppercase tracking-widest">Yedek Parçalar</span>
                      </div>
                      {spareResults.map(p => (
                        <button key={p.key} onClick={() => { handleSelectSpare(p.catKey); setMobileMenuOpen(false); }}
                          className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#f8fafc] border-b border-gray-50 last:border-0 text-left">
                          {p.image
                            ? <img src={p.image} alt={p.title} className="w-8 h-8 object-contain rounded bg-gray-50 shrink-0" />
                            : <div className="w-8 h-8 rounded bg-[#9fc91a]/10 shrink-0 flex items-center justify-center text-sm">🔩</div>
                          }
                          <div>
                            <p className="text-[13px] font-bold text-[#1a1a1a]">{p.title}</p>
                            <p className="text-[11px] text-[#9fc91a] font-semibold">{p.catTitle}</p>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
              {hasQuery && !hasResults && (
                <p className="text-sm text-[#94a3b8] font-medium text-center mt-3">Sonuç bulunamadı</p>
              )}
            </div>
            <div className="flex flex-col py-2">
              <Link to="/hakkimizda" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-50 text-[#1a1a1a] font-semibold">Kurumsal</Link>
              <Link to="/urunler" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-50 text-[#1a1a1a] font-semibold">Ürünler</Link>
              <Link to="/yedek-parcalar" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-50 text-[#1a1a1a] font-semibold">Yedek Parçalar</Link>
              <Link to="/galeri" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-50 text-[#1a1a1a] font-semibold">Galeri</Link>
              <Link to="/kvkk" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-50 text-[#1a1a1a] font-semibold">KVKK</Link>
              <Link to="/cerez-politikasi" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 border-b border-gray-50 text-[#1a1a1a] font-semibold">Çerez Politikası</Link>
              <Link to="/iletisim" onClick={() => setMobileMenuOpen(false)} className="px-6 py-4 text-[#1a1a1a] font-semibold">İletişim</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
