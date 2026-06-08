import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, SlidersHorizontal } from 'lucide-react';
import type { Product } from '../data/mockData';
import { useProducts } from '../hooks/useProducts';
import { thumb } from '../lib/imageUtils';
import SidebarSearch from '../components/SidebarSearch';
import type { SearchItem } from '../components/SidebarSearch';

const GROUPS = [
  { key: 'trambolinler', name: 'Trambolinler', subs: [
    { id: 'ticari-olimpik-trambolinler', name: 'Ticari Olimpik Trambolinler' },
    { id: 'ticari-junior',              name: 'Ticari Junior Trambolin' },
    { id: 'trambolin-parklari',         name: 'Trambolin Parkları' },
    { id: 'yer-zemin-trambolin',        name: 'Yer (Zemin) Trambolinleri' },
    { id: 'salto-trambolin',            name: 'Salto Trambolin' },
    { id: 'tekli-trambolinler',         name: 'Tekli Trambolinler' },
    { id: 'profesyonel-trambolin',      name: 'Profesyonel Trambolin' },
  ]},
  { key: 'softplay-havuzlar', name: 'Softplay & Havuzlar', subs: [
    { id: 'kucuk-top-havuzlari',        name: 'Küçük Top Havuzları' },
    { id: 'isletmelere-top-havuzlari',  name: 'İşletmelere Top Havuzları' },
    { id: 'softplay-oyun-alanlari',     name: 'Softplay Oyun Alanları' },
    { id: 'softplay-oyuncaklar',        name: 'Softplay Oyuncaklar' },
  ]},
  { key: 'sisme-park', name: 'Şişme Park', subs: [
    { id: 'sisme-park-junior', name: 'Şişme Park Junior' },
    { id: 'sisme-buyuk',       name: 'Şişme Büyük' },
  ]},
];

const GROUP_KEYS  = GROUPS.map(g => g.key);
const ALL_SUB_IDS = GROUPS.flatMap(g => g.subs.map(s => s.id));
const ALL_IDS     = [...GROUP_KEYS, ...ALL_SUB_IDS];
const groupOf     = (id: string) => GROUPS.find(g => g.key === id || g.subs.some(s => s.id === id))!;
const subOf       = (id: string) => GROUPS.flatMap(g => g.subs).find(s => s.id === id);

export default function Catalog() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { products, loading } = useProducts();

  const activeId    = categoryId && ALL_IDS.includes(categoryId) ? categoryId : null;
  const isGroupView = activeId ? GROUP_KEYS.includes(activeId) : false;
  const activeGroup = activeId ? groupOf(activeId) : GROUPS[0];
  const activeSub   = activeId ? subOf(activeId) : null;

  const filteredProducts = useMemo(() => products.filter(p => ALL_SUB_IDS.includes(p.category)), [products]);

  const countGroup = (gKey: string) => filteredProducts.filter(p => groupOf(p.category)?.key === gKey).length;
  const countSub   = (sId: string)  => filteredProducts.filter(p => p.category === sId).length;

  // Kategori seçilmemişse veya grup URL'si girilmişse ilk alt kategoriye yönlendir
  useEffect(() => {
    if (filteredProducts.length === 0) return;
    if (!activeId) {
      // /urunler açıldı, ilk grubun ilk alt kategorisine git
      const firstGroup = GROUPS[0];
      const firstSub = firstGroup.subs.find(s => countSub(s.id) > 0) ?? firstGroup.subs[0];
      navigate(`/urunler/${firstSub.id}`, { replace: true });
    } else if (isGroupView) {
      // /urunler/trambolinler gibi grup URL'si girildi
      const firstSub = activeGroup.subs.find(s => countSub(s.id) > 0) ?? activeGroup.subs[0];
      navigate(`/urunler/${firstSub.id}`, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, isGroupView, activeGroup, filteredProducts.length]);

  // Ana kategoriye tıklanınca ürünü olan ilk alt kategoriye git
  const goTo = (id: string) => {
    if (GROUP_KEYS.includes(id)) {
      const group = GROUPS.find(g => g.key === id)!;
      const firstSub = group.subs.find(s => countSub(s.id) > 0) ?? group.subs[0];
      navigate(`/urunler/${firstSub.id}`);
    } else {
      navigate(`/urunler/${id}`);
    }
    setDrawerOpen(false);
  };

  // Gösterilecek ürünler: her zaman düz liste (alt kategori bazlı)
  const displayed = useMemo(() =>
    activeId && !isGroupView ? filteredProducts.filter(p => p.category === activeId) : [],
  [filteredProducts, activeId, isGroupView]);

  const searchItems: SearchItem[] = filteredProducts.map(p => ({
    key: p.id,
    title: p.title,
    image: p.imageUrl,
    badge: p.categoryName,
    href: `/urunler/${p.category}/${p.id}`,
  }));

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="tp-page-hero">
        <div aria-hidden="true" className="tp-hero-watermark">KATALOG</div>
        <div className="container">
          <nav className="mb-3" style={{ fontSize: 11 }}>
            <span style={{ color: 'rgba(255,255,255,.5)' }}>
              <Link to="/urunler" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Ürünler</Link>
              {activeSub && (<><ChevronRight size={11} className="mx-1" /><Link to={`/urunler/${activeGroup.key}`} style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>{activeGroup.name}</Link></>)}
              <ChevronRight size={11} className="mx-1" />
              <span className="text-white fw-bold">{activeSub ? activeSub.name : activeGroup.name}</span>
            </span>
          </nav>
          <div className="tp-hero-line" />
          <h1 className="display-5 fw-black text-white mb-2">
            {activeSub
              ? <span style={{ color: '#c3e92d' }}>{activeSub.name}</span>
              : <>Ürün <span style={{ color: '#c3e92d' }}>Kataloğu</span></>}
          </h1>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 15, maxWidth: 500 }}>
            Trambolin parkından soft play alanlarına — ürünlerimizi inceleyin.
          </p>
        </div>
      </div>

      <div className="container py-4 py-md-5">

        {/* Mobile filter button */}
        <div className="d-flex align-items-center justify-content-between mb-3 d-lg-none">
          <span style={{ fontSize: 12, fontWeight: 700, color: '#888' }}>{displayed.length} ürün</span>
          <button onClick={() => setDrawerOpen(true)}
            className="d-flex align-items-center gap-2 border-0 rounded-pill"
            style={{ background: '#fff', border: '1.5px solid #e0e0e0', padding: '7px 14px', fontSize: 12, fontWeight: 700, color: '#555', cursor: 'pointer' }}>
            <SlidersHorizontal size={13} /> Kategoriler
          </button>
        </div>

        <div className="row g-4 align-items-start">

          {/* Sidebar — desktop */}
          <div className="d-none d-lg-block col-lg-3">
            <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #ebebeb', overflow: 'hidden', position: 'sticky', top: 90 }}>
              <div style={{ padding: '1rem 1rem 0' }}>
                <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.15em', color: '#aaa', marginBottom: 10 }}>Kategoriler</p>
              </div>
              <div style={{ padding: '0 1rem .75rem' }}>
                <SidebarSearch items={searchItems} placeholder="Ürün ara..." />
              </div>
              <SidebarContentInner activeId={activeId ?? ''} goTo={goTo} countGroup={countGroup} countSub={countSub} />
            </div>
          </div>

          {/* Drawer — mobile */}
          <AnimatePresence>
            {drawerOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 1040 }}
                  onClick={() => setDrawerOpen(false)} />
                <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                  style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 300, background: '#fff', zIndex: 1050, overflowY: 'auto', borderRight: '1.5px solid #ebebeb' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.15em', color: '#aaa', margin: 0 }}>Kategoriler</p>
                    <button onClick={() => setDrawerOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', padding: 4 }}><X size={18} color="#aaa" /></button>
                  </div>
                  <div style={{ padding: '1rem 1rem 0' }}>
                    <SidebarSearch items={searchItems} placeholder="Ürün ara..." />
                  </div>
                  <SidebarContentInner activeId={activeId ?? ''} goTo={goTo} countGroup={countGroup} countSub={countSub} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products */}
          <div className="col-lg-9">
            {activeSub && (
              <div className="mb-4 pb-3" style={{ borderBottom: '1.5px solid #e8e8e8' }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.15em', color: '#5c9200', marginBottom: 4 }}>
                  {activeGroup.name}
                </p>
                <h2 className="font-poppins fw-black mb-1" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', color: '#1a1a1a' }}>
                  {activeSub.name}
                </h2>
                <p style={{ color: '#aaa', fontSize: 13, margin: 0 }}>{displayed.length} ürün</p>
              </div>
            )}

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border" style={{ color: '#5c9200', width: 32, height: 32, borderWidth: 3 }} role="status" />
                <p className="mt-3" style={{ fontSize: 13, color: '#aaa' }}>Ürünler yükleniyor...</p>
              </div>
            ) : displayed.length === 0 ? (
              <div className="text-center py-5 rounded-4" style={{ border: '2px dashed #e8e8e8', background: '#fff' }}>
                <p className="fw-bold mb-1" style={{ color: '#888' }}>Ürün bulunamadı</p>
                <p style={{ fontSize: 13, color: '#bbb' }}>Bu kategori için ürünler yakında eklenecektir.</p>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
                {displayed.map((p, i) => <div key={p.id} className="col"><CatalogCard product={p} index={i} /></div>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarContentInner({ activeId, goTo, countGroup, countSub }: { activeId: string; goTo: (id: string) => void; countGroup: (k: string) => number; countSub: (k: string) => number }) {
  return (
    <>
      {GROUPS.map((group, gi) => {
        const isGroupActive = activeId === group.key || group.subs.some(s => s.id === activeId);
        return (
          <div key={group.key} style={{ borderBottom: gi < GROUPS.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
            <button onClick={() => goTo(group.key)}
              className="d-flex align-items-center gap-2 w-100 text-start border-0"
              style={{
                padding: '0.85rem 1rem',
                background: isGroupActive ? 'rgba(92,146,0,.06)' : 'transparent',
                borderLeft: `3px solid ${isGroupActive ? '#5c9200' : 'transparent'}`,
                cursor: 'pointer', transition: 'background .15s, border-color .15s',
              }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="fw-bold mb-0" style={{ fontSize: 13, color: isGroupActive ? '#5c9200' : '#1a1a1a', lineHeight: 1.3 }}>{group.name}</p>
                <p className="mb-0" style={{ fontSize: 11, color: '#aaa' }}>{countGroup(group.key)} ürün</p>
              </div>
              </button>

            {isGroupActive && (
              <div style={{ background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
                {group.subs.map((sub, si) => {
                  const count = countSub(sub.id);
                  if (!count) return null;
                  const isActiveSub = activeId === sub.id;
                  return (
                    <button key={sub.id} onClick={() => goTo(sub.id)}
                      className="d-flex align-items-center justify-content-between w-100 text-start border-0"
                      style={{
                        padding: '0.6rem 1rem 0.6rem 1.5rem',
                        background: isActiveSub ? 'rgba(92,146,0,.08)' : 'transparent',
                        borderLeft: `2px solid ${isActiveSub ? '#5c9200' : 'transparent'}`,
                        borderBottom: si < group.subs.length - 1 ? '1px solid #f0f0f0' : 'none',
                        cursor: 'pointer', transition: 'all .15s',
                      }}>
                      <span style={{ fontSize: 12, fontWeight: isActiveSub ? 700 : 500, color: isActiveSub ? '#5c9200' : '#555' }}>{sub.name}</span>
                      <span style={{ fontSize: 10, color: '#bbb', fontWeight: 600 }}>{count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function CatalogCard({ product, index }: { product: Product; index: number }) {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
      transition={{ delay: (index % 6) * 0.04 }}>
      <button onClick={() => navigate(`/urunler/${product.category}/${product.id}`)} className="tp-card w-100 border-0 text-start" style={{ display: 'block' }}>
        <div className="tp-card-img">
          <img loading="lazy" src={thumb(product.imageUrl, 480, 360)} alt={product.title} />
        </div>
        <div className="tp-card-body">
          <span className="tp-card-cat">{product.categoryName}</span>
          <p className="tp-card-title">{product.title}</p>
        </div>
      </button>
    </motion.div>
  );
}
