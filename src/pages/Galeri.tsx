import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const BASE = 'https://matrax-web-six.vercel.app';
const allImages = [
  ...Array.from({ length: 28 }, (_, i) => `${BASE}/images/galeri-yeni/galeri-${i + 1}.jpg`),
  `${BASE}/images/galeri-yeni/galeri-29.png`,
  `${BASE}/images/galeri-yeni/galeri-30.jpg`,
];
const FILTERS = [
  { key: 'tumu', label: 'Tümü', range: [0, 30] },
  { key: 'kurulum', label: 'Saha Kurulumları', range: [0, 14] },
  { key: 'top-havuzu', label: 'Top Havuzları', range: [14, 21] },
  { key: 'soft-play', label: 'Soft Play', range: [21, 28] },
  { key: 'projeler', label: 'Tamamlanan Projeler', range: [28, 30] },
] as const;
type FilterKey = typeof FILTERS[number]['key'];

export default function Galeri() {
  const [active, setActive] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterKey>('tumu');
  const visible = useMemo(() => { const f = FILTERS.find(f => f.key === filter)!; return allImages.slice(f.range[0], f.range[1]); }, [filter]);
  const next = () => setActive(a => a === null ? 0 : (a + 1) % visible.length);
  const prev = () => setActive(a => a === null ? 0 : (a - 1 + visible.length) % visible.length);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <div className="tp-page-hero">
        <div className="container">
          <span className="badge rounded-pill mb-3" style={{ background: 'rgba(159,201,26,.15)', color: '#9fc91a', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>FOTO ALBÜMÜ</span>
          <h1 className="display-5 fw-black text-white mb-2">Saha <span style={{ color: '#9fc91a' }}>Galeri</span></h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 500 }}>Tamamlanan kurulumlar, saha uygulamaları ve ürünlerimizden kareler.</p>
        </div>
      </div>
      <div className="bg-white border-bottom" style={{ position: 'sticky', top: 64, zIndex: 30 }}>
        <div className="container py-2">
          <div className="d-flex gap-2 overflow-auto no-scrollbar">
            {FILTERS.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} className="btn btn-sm rounded-pill fw-black flex-shrink-0"
                style={{ fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', background: filter === f.key ? '#1a1a1a' : '#f1f5f9', color: filter === f.key ? '#fff' : '#64748b', border: 'none' }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container py-4 py-md-5">
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
          {visible.map((src, i) => (
            <div key={src} className="col">
              <motion.button layout initial={{ opacity: 0, scale: .93 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (i % 8) * 0.04 }}
                onClick={() => setActive(i)} className="tp-gallery-item w-100 border-0 p-0 position-relative">
                <img src={src} alt={`Galeri ${i + 1}`} loading="lazy" />
              </motion.button>
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="tp-lightbox" onClick={() => setActive(null)}>
            <button onClick={() => setActive(null)} style={{ position: 'absolute', top: 16, right: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
            <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={24} /></button>
            <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={24} /></button>
            <motion.img key={active} initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} src={visible[active]} alt="" onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 12 }} />
            <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', padding: '.35rem 1.25rem', borderRadius: 100, color: '#fff', fontWeight: 800, fontSize: 13 }}>
              {active + 1} / {visible.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
