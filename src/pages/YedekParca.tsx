import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, X, Wrench, ArrowRight } from 'lucide-react';
import type { SparePart } from '../data/spareParts';
import { useSpareParts } from '../hooks/useSpareParts';
import SidebarSearch from '../components/SidebarSearch';
import type { SearchItem } from '../components/SidebarSearch';

const WA = '905433494947';

function allItems(cat: { items: SparePart[]; subcategories?: { items: SparePart[] }[] }) {
  if (cat.subcategories?.length) return cat.subcategories.flatMap(s => s.items);
  return cat.items;
}

export default function YedekParca() {
  const { categories: spareCategories, loading } = useSpareParts();
  const [activeCat, setActiveCat] = useState('');
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [zoom, setZoom] = useState<{ images: string[]; idx: number; title: string } | null>(null);

  const category = spareCategories.find(c => c.key === activeCat);
  const subcat = activeSub && category ? category.subcategories?.find(s => s.key === activeSub) : null;
  const items = category ? (subcat ? subcat.items : allItems(category)) : [];
  const heading = subcat ? subcat.title : category?.title ?? '';

  useEffect(() => {
    if (spareCategories.length && !activeCat) {
      setActiveCat(spareCategories[0].key);
      setActiveSub(spareCategories[0].subcategories?.[0]?.key ?? null);
    }
  }, [spareCategories]);

  const selectCat = (key: string) => {
    const cat = spareCategories.find(c => c.key === key)!;
    setActiveCat(key);
    setActiveSub(cat?.subcategories?.[0]?.key ?? null);
  };

  const totalItems = (cat: { items: SparePart[]; subcategories?: { items: SparePart[] }[] }) => allItems(cat).length;

  const searchItems: SearchItem[] = useMemo(() => spareCategories.flatMap(cat => {
    const items = allItems(cat);
    return items.map(p => ({
      key: p.key,
      title: p.title,
      image: p.image,
      badge: cat.title,
      href: `/yedek-parcalar/${p.key}`,
    }));
  }), [spareCategories]);

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="tp-page-hero">
        <div aria-hidden="true" className="tp-hero-watermark">YEDEK PARÇA</div>
        <div className="container">
          <span className="badge rounded-pill mb-3" style={{ background: 'rgba(195,233,45,.15)', color: '#c3e92d', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>DESTEK & BAKIM</span>
          <div className="tp-hero-line" />
          <h1 className="display-5 fw-black text-white mb-2">Yedek <span style={{ color: '#c3e92d' }}>Parçalar</span></h1>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 15, maxWidth: 520 }}>Yaydan süngere, fileden aksesuara — tüm ürünlerimize ait orijinal yedek parçalar stokta hazır.</p>
        </div>
      </div>

      <div className="container py-4 py-md-5">
        <div className="row g-4 align-items-start">

          {/* ── Mobile: horizontal category tabs ── */}
          <div className="col-12 d-lg-none">
            <SidebarSearch items={searchItems} placeholder="Yedek parça ara..." />
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'none' }}>
              {spareCategories.map(cat => (
                <button key={cat.key} onClick={() => selectCat(cat.key)}
                  style={{
                    flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 14px', borderRadius: 100, border: '1.5px solid',
                    borderColor: activeCat === cat.key ? '#5c9200' : '#e0e0e0',
                    background: activeCat === cat.key ? 'rgba(92,146,0,.08)' : '#fff',
                    cursor: 'pointer', transition: 'all .15s',
                  }}>
                  <img src={cat.cover} alt={cat.title} style={{ width: 22, height: 22, objectFit: 'contain', borderRadius: 4 }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: activeCat === cat.key ? '#5c9200' : '#555', whiteSpace: 'nowrap' }}>{cat.title}</span>
                </button>
              ))}
            </div>
            {/* Mobile subcategory tabs */}
            {category?.subcategories && (
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none', marginTop: 10 }}>
                {category.subcategories.map(sub => (
                  <button key={sub.key} onClick={() => setActiveSub(sub.key)}
                    style={{
                      flexShrink: 0, padding: '5px 12px', borderRadius: 100, border: '1.5px solid',
                      borderColor: activeSub === sub.key ? '#5c9200' : '#e0e0e0',
                      background: activeSub === sub.key ? 'rgba(92,146,0,.08)' : '#fff',
                      cursor: 'pointer', fontSize: 11, fontWeight: 700,
                      color: activeSub === sub.key ? '#5c9200' : '#666',
                      transition: 'all .15s', whiteSpace: 'nowrap',
                    }}>
                    {sub.title} <span style={{ color: '#aaa', fontWeight: 400 }}>({sub.items.length})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Desktop: vertical sidebar ── */}
          <div className="col-lg-3 d-none d-lg-block">
            <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #ebebeb', overflow: 'hidden', position: 'sticky', top: 90 }}>
              <div style={{ padding: '1rem 1rem .5rem' }}>
                <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.15em', color: '#aaa', marginBottom: 10 }}>Kategoriler</p>
                <SidebarSearch items={searchItems} placeholder="Yedek parça ara..." />
              </div>
              {spareCategories.map((cat, ci) => {
                const isActive = activeCat === cat.key;
                const hasSubs = !!cat.subcategories?.length;
                return (
                  <div key={cat.key} style={{ borderBottom: ci < spareCategories.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                    {/* Category row */}
                    <button onClick={() => selectCat(cat.key)}
                      className="d-flex align-items-center gap-3 w-100 text-start border-0"
                      style={{
                        padding: '0.85rem 1rem',
                        background: isActive ? 'rgba(92,146,0,.06)' : 'transparent',
                        borderLeft: `3px solid ${isActive ? '#5c9200' : 'transparent'}`,
                        cursor: 'pointer', transition: 'background .15s, border-color .15s',
                      }}>
                      <div style={{ width: 42, height: 42, flexShrink: 0, borderRadius: 10, background: '#f5f5f5', overflow: 'hidden' }}>
                        <img src={cat.cover} alt={cat.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p className="fw-bold mb-0" style={{ fontSize: 13, color: isActive ? '#5c9200' : '#1a1a1a', lineHeight: 1.3 }}>{cat.title}</p>
                        <p className="mb-0" style={{ fontSize: 11, color: '#aaa' }}>{totalItems(cat)} parça</p>
                      </div>
                      {hasSubs && (
                        <ChevronDown size={14} style={{ color: '#aaa', flexShrink: 0, transition: 'transform .2s', transform: isActive ? 'rotate(180deg)' : 'rotate(0)' }} />
                      )}
                    </button>

                    {/* Subcategories */}
                    <AnimatePresence initial={false}>
                      {isActive && hasSubs && (
                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }} style={{ overflow: 'hidden' }}>
                          <div style={{ background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
                            {cat.subcategories!.map((sub, si) => (
                              <button key={sub.key} onClick={() => setActiveSub(sub.key)}
                                className="d-flex align-items-center justify-content-between w-100 text-start border-0"
                                style={{
                                  padding: '0.6rem 1rem 0.6rem 1.5rem',
                                  background: activeSub === sub.key ? 'rgba(92,146,0,.08)' : 'transparent',
                                  borderLeft: `2px solid ${activeSub === sub.key ? '#5c9200' : 'transparent'}`,
                                  borderBottom: si < cat.subcategories!.length - 1 ? '1px solid #f0f0f0' : 'none',
                                  cursor: 'pointer', transition: 'all .15s',
                                }}>
                                <span style={{ fontSize: 12, fontWeight: activeSub === sub.key ? 700 : 500, color: activeSub === sub.key ? '#5c9200' : '#555' }}>
                                  {sub.title}
                                </span>
                                <span style={{ fontSize: 10, color: '#bbb', fontWeight: 600 }}>{sub.items.length}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: parts grid ── */}
          <div className="col-12 col-lg-9">
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border" style={{ color: '#5c9200', width: 32, height: 32, borderWidth: 3 }} role="status" />
                <p className="mt-3" style={{ fontSize: 13, color: '#aaa' }}>Yedek parçalar yükleniyor...</p>
              </div>
            )}
            {!loading && <>
              <div className="mb-4 pb-3" style={{ borderBottom: '1.5px solid #e8e8e8' }}>
                <p className="mb-1" style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.15em', color: '#5c9200' }}>
                  {category?.title}
                </p>
                <h2 className="font-poppins fw-black mb-1" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', color: '#1a1a1a' }}>{heading}</h2>
                <p style={{ color: '#888', fontSize: 14, margin: 0 }}>
                  {subcat ? `${items.length} parça` : category?.short}
                </p>
              </div>
              <motion.div key={`${activeCat}-${activeSub}`}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                className="row row-cols-2 row-cols-sm-3 row-cols-xl-4 g-3">
                {items.map(item => (
                  <div key={item.key} className="col">
                    <SparePartCard item={item} fallbackImage={category?.cover} onZoom={(imgs, idx) => setZoom({ images: imgs, idx, title: item.title })} />
                  </div>
                ))}
              </motion.div>
            </>}
          </div>

        </div>

        {/* CTA */}
        <div className="mt-5 rounded-4 p-4 p-md-5 d-flex flex-column flex-md-row align-items-center justify-content-between gap-4" style={{ background: '#1a1a1a' }}>
          <div>
            <h3 className="text-white fw-black mb-2" style={{ fontSize: 20 }}>İhtiyacınız olan parçayı bulamadınız mı?</h3>
            <p className="mb-0" style={{ color: '#94a3b8', fontSize: 14 }}>Bize ulaşın, stok dışı parçaları da temin ediyoruz.</p>
          </div>
          <a href={`https://api.whatsapp.com/send?phone=${WA}`} target="_blank" rel="noreferrer"
            className="btn btn-brand rounded-pill px-5 py-3 fw-black flex-shrink-0">
            WhatsApp ile Sor
          </a>
        </div>
      </div>

      <AnimatePresence>
        {zoom && <PartLightbox images={zoom.images} startIdx={zoom.idx} title={zoom.title} onClose={() => setZoom(null)} />}
      </AnimatePresence>
    </div>
  );
}

function SparePartCard({ item, fallbackImage, onZoom }: { item: SparePart; fallbackImage?: string; onZoom: (images: string[], idx: number) => void }) {
  const images = item.gallery?.length ? item.gallery : item.image ? [item.image] : [];
  const displayImg = images[0] ?? fallbackImage;
  return (
    <div className="tp-spare-card h-100 d-flex flex-column">
      <button onClick={() => images.length && onZoom(images, 0)} className="tp-spare-card-img border-0 p-0"
        style={{ cursor: images.length ? 'zoom-in' : 'default', background: 'transparent', width: '100%' }}>
        {displayImg
          ? <img src={displayImg} alt={item.title} loading="lazy" style={{ opacity: images[0] ? 1 : 0.45 }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}><Wrench size={28} /></div>}
        {images.length > 1 && (
          <span style={{ position: 'absolute', top: 6, right: 6, fontSize: 9, fontWeight: 900, background: 'rgba(15,23,42,.75)', color: '#fff', borderRadius: 100, padding: '2px 6px' }}>+{images.length - 1}</span>
        )}
      </button>
      <div className="p-3 d-flex flex-column gap-2 flex-grow-1">
        <h4 className="fw-black mb-0" style={{ fontSize: 13, color: '#1a1a1a', lineHeight: 1.3 }}>{item.title}</h4>
        <p className="mb-0 text-muted flex-grow-1" style={{ fontSize: 12, lineHeight: 1.4 }}>{item.desc}</p>
        <Link to={`/yedek-parcalar/${item.key}`}
          className="btn btn-sm rounded-3 fw-black d-flex align-items-center justify-content-center gap-1 mt-1"
          style={{ background: '#5c9200', color: '#fff', border: 'none', fontSize: 11 }}>
          İncele <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

function PartLightbox({ images, startIdx, title, onClose }: { images: string[]; startIdx: number; title: string; onClose: () => void }) {
  const [idx, setIdx] = useState(startIdx);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="tp-lightbox" onClick={onClose}>
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
      {images.length > 1 && <>
        <button onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={24} /></button>
        <button onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={24} /></button>
      </>}
      <motion.img key={idx} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} src={images[idx]} alt={title} onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 12 }} />
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', padding: '.35rem 1rem', borderRadius: 100, color: '#fff', fontWeight: 800, fontSize: 13 }}>
        {title}{images.length > 1 && ` · ${idx + 1} / ${images.length}`}
      </div>
    </motion.div>
  );
}
