import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronRight } from 'lucide-react';
import { allProducts } from '../data/mockData';
import type { Product } from '../data/mockData';

const GROUPS = [
  { key: 'trambolinler', name: 'Trambolinler', subs: [
    { id: 'tekli-trambolinler', name: 'Tekli Trambolinler' },
    { id: 'yer-zemin-trambolin', name: 'Yer (Zemin) Trambolinleri' },
    { id: 'salto-trambolin', name: 'Salto Trambolin' },
    { id: 'olimpik-trambolinler', name: 'Olimpik Trambolinler' },
    { id: 'ticari-junior', name: 'Ticari Junior Trambolin' },
    { id: 'profesyonel-trambolin', name: 'Profesyonel Trambolin' },
    { id: 'trambolin-parklari', name: 'Trambolin Parkları' },
  ]},
  { key: 'soft-play-havuzlar', name: 'Soft Play & Havuzlar', subs: [
    { id: 'kucuk-top-havuzlari', name: 'Küçük Top Havuzları' },
    { id: 'isletmelere-top-havuzlari', name: 'İşletmelere Top Havuzları' },
    { id: 'soft-play-oyun-alanlari', name: 'Soft Play Oyun Alanları' },
    { id: 'soft-play-oyuncaklar', name: 'Soft Play Oyuncaklar' },
  ]},
  { key: 'sisme-park', name: 'Şişme Park', subs: [
    { id: 'sisme-park-junior', name: 'Şişme Park Junior' },
    { id: 'sisme-buyuk', name: 'Şişme Büyük' },
  ]},
];

const GROUP_KEYS  = GROUPS.map(g => g.key);
const ALL_SUB_IDS = GROUPS.flatMap(g => g.subs.map(s => s.id));
const ALL_IDS     = [...GROUP_KEYS, ...ALL_SUB_IDS];
const products    = allProducts.filter(p => ALL_SUB_IDS.includes(p.category));
const groupOf     = (id: string) => GROUPS.find(g => g.key === id || g.subs.some(s => s.id === id))!;
const subOf       = (id: string) => GROUPS.flatMap(g => g.subs).find(s => s.id === id);
const countGroup  = (gKey: string) => products.filter(p => groupOf(p.category)?.key === gKey).length;
const countSub    = (sId: string) => products.filter(p => p.category === sId).length;

export default function Catalog() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeId    = categoryId && ALL_IDS.includes(categoryId) ? categoryId : 'trambolinler';
  const isGroupView = GROUP_KEYS.includes(activeId);
  const activeGroup = groupOf(activeId);
  const activeSub   = subOf(activeId);

  const displayed = isGroupView
    ? products.filter(p => groupOf(p.category)?.key === activeId)
    : products.filter(p => p.category === activeId);

  const groupedSections = isGroupView
    ? activeGroup.subs.map(sub => ({ sub, items: products.filter(p => p.category === sub.id) })).filter(s => s.items.length > 0)
    : [];

  const goTo = (id: string) => { navigate(`/urunler/${id}`); setDrawerOpen(false); };

  const SidebarContent = () => (
    <div>
      {GROUPS.map(group => {
        const isGroupActive = activeId === group.key || group.subs.some(s => s.id === activeId);
        return (
          <div key={group.key} className="mb-1">
            <button onClick={() => goTo(group.key)}
              className={`tp-sidebar-btn w-100 d-flex justify-content-between align-items-center px-3 py-2 rounded-3 border-0 text-start fw-bold mb-1 ${activeId === group.key ? 'active-group' : isGroupActive ? 'bg-light text-dark' : 'bg-transparent text-secondary'}`}
              style={{ fontSize: 13, transition: 'all .15s', cursor: 'pointer' }}>
              <span>{group.name}</span>
              <span className="badge rounded-pill" style={{ background: activeId === group.key ? 'rgba(255,255,255,.2)' : '#e2e8f0', color: activeId === group.key ? '#fff' : '#64748b', fontSize: 10 }}>
                {countGroup(group.key)}
              </span>
            </button>
            {isGroupActive && (
              <div className="ms-3 ps-3 border-start border-2 border-light mb-2">
                {group.subs.map(sub => {
                  const count = countSub(sub.id);
                  if (!count) return null;
                  const isActiveSub = activeId === sub.id;
                  return (
                    <button key={sub.id} onClick={() => goTo(sub.id)}
                      className={`w-100 d-flex justify-content-between align-items-center px-3 py-1 rounded-3 border-0 text-start mb-0.5 ${isActiveSub ? 'active-sub' : 'bg-transparent text-secondary'}`}
                      style={{ fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all .15s' }}>
                      <span className="text-truncate">{sub.name}</span>
                      <span className="badge rounded-pill ms-1" style={{ background: isActiveSub ? 'rgba(255,255,255,.25)' : '#f1f5f9', color: isActiveSub ? '#fff' : '#94a3b8', fontSize: 9, flexShrink: 0 }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="tp-page-hero">
        <div className="container">
          <nav style={{ fontSize: 11 }} className="mb-3">
            <span style={{ color: '#64748b' }}>
              <Link to="/urunler" style={{ color: '#64748b', textDecoration: 'none' }}>Ürünler</Link>
              {activeSub && (<><ChevronRight size={11} className="mx-1" /><Link to={`/urunler/${activeGroup.key}`} style={{ color: '#64748b', textDecoration: 'none' }}>{activeGroup.name}</Link></>)}
              <ChevronRight size={11} className="mx-1" />
              <span className="text-white fw-bold">{activeSub ? activeSub.name : activeGroup.name}</span>
            </span>
          </nav>
          <h1 className="display-5 fw-black text-white mb-2">
            {activeSub ? <span style={{ color: '#9fc91a' }}>{activeSub.name}</span> : <>Ürün <span style={{ color: '#9fc91a' }}>Kataloğu</span></>}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 500 }}>
            Trambolin parkından soft play alanlarına — ürünlerimizi inceleyin.
          </p>
        </div>
      </div>

      <div className="container py-4 py-md-5">

        {/* Mobil filtre */}
        <div className="d-flex align-items-center justify-content-between mb-3 d-lg-none">
          <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>{displayed.length} ürün</span>
          <button onClick={() => setDrawerOpen(true)} className="btn btn-sm btn-outline-secondary rounded-pill d-flex align-items-center gap-2">
            <SlidersHorizontal size={14} /> Filtrele
          </button>
        </div>

        <div className="row g-4 align-items-start">

          {/* Sidebar — masaüstü */}
          <div className="d-none d-lg-block col-lg-3">
            <div className="tp-sidebar" style={{ position: 'sticky', top: 88 }}>
              <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.15em', color: '#94a3b8', marginBottom: '.75rem' }}>Kategoriler</p>
              <SidebarContent />
            </div>
          </div>

          {/* Drawer — mobil */}
          <AnimatePresence>
            {drawerOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 1040 }}
                  onClick={() => setDrawerOpen(false)} />
                <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                  style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 280, background: '#f8fafc', zIndex: 1050, padding: '1.25rem', overflowY: 'auto' }}
                  className="tp-sidebar shadow-lg">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.15em', color: '#94a3b8', margin: 0 }}>Kategoriler</p>
                    <button onClick={() => setDrawerOpen(false)} className="btn btn-link p-0"><X size={20} color="#94a3b8" /></button>
                  </div>
                  <SidebarContent />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Ürünler */}
          <div className="col-lg-9">
            <p className="d-none d-lg-block mb-3" style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8' }}>{displayed.length} ürün listeleniyor</p>

            {displayed.length === 0 ? (
              <div className="text-center py-5 border-2 border-dashed rounded-4" style={{ border: '2px dashed #e2e8f0' }}>
                <p className="fw-bold text-secondary mb-1">Ürün bulunamadı</p>
                <p className="text-muted" style={{ fontSize: 13 }}>Bu kategori için ürünler yakında eklenecektir.</p>
              </div>
            ) : isGroupView ? (
              <div className="d-flex flex-column gap-5">
                {groupedSections.map(({ sub, items }) => (
                  <section key={sub.id} id={sub.id}>
                    <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-2">
                      <h2 className="fw-black mb-0" style={{ fontSize: 18, color: '#1a1a1a' }}>{sub.name}</h2>
                      <span className="badge rounded-pill" style={{ background: 'rgba(159,201,26,.12)', color: '#9fc91a', fontSize: 11, fontWeight: 800 }}>{items.length} ürün</span>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
                      {items.map((p, i) => <div key={p.id} className="col"><CatalogCard product={p} index={i} /></div>)}
                    </div>
                  </section>
                ))}
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

function CatalogCard({ product, index }: { product: Product; index: number }) {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }}
      transition={{ delay: (index % 6) * 0.04 }}>
      <button onClick={() => navigate(`/urun/${product.id}`)} className="tp-card w-100 border-0 text-start" style={{ display: 'block' }}>
        <div className="tp-card-img">
          <img loading="lazy" src={product.imageUrl} alt={product.title} />
        </div>
        <div className="tp-card-body">
          <span className="tp-card-cat">{product.categoryName}</span>
          <p className="tp-card-title">{product.title}</p>
        </div>
      </button>
    </motion.div>
  );
}
