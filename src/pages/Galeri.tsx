import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const BASE = 'https://matrax-web-six.vercel.app';
const allImages = [
  ...Array.from({ length: 28 }, (_, i) => `${BASE}/images/galeri-yeni/galeri-${i + 1}.jpg`),
  `${BASE}/images/galeri-yeni/galeri-29.png`,
  `${BASE}/images/galeri-yeni/galeri-30.jpg`,
];

const CATEGORIES = [
  { key: 'tumu',       label: 'Tümü',                  range: [0, 30]  as [number,number] },
  { key: 'kurulum',    label: 'Saha Kurulumları',       range: [0, 14]  as [number,number] },
  { key: 'top-havuzu', label: 'Top Havuzları',          range: [14, 21] as [number,number] },
  { key: 'soft-play',  label: 'Soft Play',              range: [21, 28] as [number,number] },
  { key: 'projeler',   label: 'Tamamlanan Projeler',    range: [28, 30] as [number,number] },
];

export default function Galeri() {
  const [activeKey, setActiveKey] = useState('tumu');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const activeCat = CATEGORIES.find(c => c.key === activeKey)!;
  const images = useMemo(() => allImages.slice(activeCat.range[0], activeCat.range[1]), [activeCat]);

  const next = () => setLightbox(i => i === null ? 0 : (i + 1) % images.length);
  const prev = () => setLightbox(i => i === null ? 0 : (i - 1 + images.length) % images.length);

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="tp-page-hero">
        <div aria-hidden="true" className="tp-hero-watermark">GALERİ</div>
        <div className="container">
          <span className="badge rounded-pill mb-3" style={{ background: 'rgba(195,233,45,.15)', color: '#c3e92d', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>FOTO ALBÜMÜ</span>
          <div className="tp-hero-line" />
          <h1 className="display-5 fw-black text-white mb-2">Saha <span style={{ color: '#c3e92d' }}>Galerisi</span></h1>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 15, maxWidth: 500 }}>Tamamlanan kurulumlar, saha uygulamaları ve ürünlerimizden kareler.</p>
        </div>
      </div>

      <div className="container py-4 py-md-5">
        <div className="row g-4 align-items-start">

          {/* ── Mobile: horizontal tabs ── */}
          <div className="col-12 d-lg-none">
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
              {CATEGORIES.map(cat => {
                const count = allImages.slice(cat.range[0], cat.range[1]).length;
                return (
                  <button key={cat.key} onClick={() => setActiveKey(cat.key)}
                    style={{
                      flexShrink: 0, padding: '7px 14px', borderRadius: 100,
                      border: `1.5px solid ${activeKey === cat.key ? '#5c9200' : '#e0e0e0'}`,
                      background: activeKey === cat.key ? 'rgba(92,146,0,.08)' : '#fff',
                      cursor: 'pointer', transition: 'all .15s', fontSize: 12, fontWeight: 700,
                      color: activeKey === cat.key ? '#5c9200' : '#555', whiteSpace: 'nowrap',
                    }}>
                    {cat.label}
                    <span style={{ marginLeft: 5, fontSize: 10, color: activeKey === cat.key ? '#5c9200' : '#bbb', fontWeight: 600 }}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Desktop sidebar ── */}
          <div className="col-lg-3 d-none d-lg-block">
            <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #ebebeb', overflow: 'hidden', position: 'sticky', top: 90 }}>
              <div style={{ padding: '1rem 1rem .5rem' }}>
                <p style={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.15em', color: '#aaa', margin: 0 }}>Kategoriler</p>
              </div>
              {CATEGORIES.map((cat, i) => {
                const count = allImages.slice(cat.range[0], cat.range[1]).length;
                const cover = allImages[cat.range[0]];
                const isActive = activeKey === cat.key;
                return (
                  <button key={cat.key} onClick={() => setActiveKey(cat.key)}
                    className="d-flex align-items-center gap-3 w-100 text-start border-0"
                    style={{
                      padding: '0.85rem 1rem',
                      background: isActive ? 'rgba(92,146,0,.06)' : 'transparent',
                      borderLeft: `3px solid ${isActive ? '#5c9200' : 'transparent'}`,
                      borderBottom: i < CATEGORIES.length - 1 ? '1px solid #f0f0f0' : 'none',
                      cursor: 'pointer', transition: 'background .15s, border-color .15s',
                    }}>
                    <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 10, overflow: 'hidden', background: '#f0f0f0' }}>
                      <img src={cover} alt={cat.label} loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p className="fw-bold mb-0" style={{ fontSize: 13, color: isActive ? '#5c9200' : '#1a1a1a', lineHeight: 1.3 }}>{cat.label}</p>
                      <p className="mb-0" style={{ fontSize: 11, color: '#aaa' }}>{count} fotoğraf</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Masonry grid ── */}
          <div className="col-12 col-lg-9">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.15em', color: '#5c9200', margin: 0 }}>Galeri</p>
                <h2 className="font-poppins fw-black mb-0" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: '#1a1a1a' }}>{activeCat.label}</h2>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#aaa' }}>{images.length} fotoğraf</span>
            </div>

            <motion.div key={activeKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
              className="tp-masonry">
              {images.map((src, i) => (
                <div key={src} className="tp-masonry-item" onClick={() => setLightbox(i)}>
                  <img src={src} alt={`${activeCat.label} ${i + 1}`} loading="lazy" />
                  <div className="tp-masonry-overlay">
                    <div className="tp-masonry-zoom"><ZoomIn size={18} /></div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="tp-lightbox" onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)}
              style={{ position: 'absolute', top: 16, right: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={20} />
            </button>
            <button onClick={e => { e.stopPropagation(); prev(); }}
              style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={24} />
            </button>
            <button onClick={e => { e.stopPropagation(); next(); }}
              style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronRight size={24} />
            </button>
            <motion.img key={lightbox} initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }}
              src={images[lightbox]} alt="" onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 12 }} />
            <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', padding: '.35rem 1.25rem', borderRadius: 100, color: '#fff', fontWeight: 800, fontSize: 13 }}>
              {activeCat.label} · {lightbox + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
