import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, X, Wrench } from 'lucide-react';
import { spareCategories } from '../data/spareParts';
import type { SparePart } from '../data/spareParts';

const WA = '905433494947';
const buildWa = (title: string) => `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(`Merhaba, "${title}" hakkında bilgi almak istiyorum.`)}`;

export default function YedekParca() {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());
  const [zoom, setZoom] = useState<{ images: string[]; idx: number; title: string } | null>(null);

  const toggle = (key: string) => setOpenKeys(prev => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="tp-page-hero">
        <div className="container">
          <span className="badge rounded-pill mb-3" style={{ background: 'rgba(159,201,26,.15)', color: '#9fc91a', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>DESTEK & BAKIM</span>
          <h1 className="display-5 fw-black text-white mb-2">Yedek <span style={{ color: '#9fc91a' }}>Parçalar</span></h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 520 }}>Yaydan süngere, fileden aksesuara — tüm ürünlerimize ait orijinal yedek parçalar stokta hazır.</p>
        </div>
      </div>

      <div className="container py-4 py-md-5">

        {/* Accordion */}
        <div className="d-flex flex-column gap-3">
          {spareCategories.map((cat, ci) => {
            const isOpen = openKeys.has(cat.key);
            return (
              <motion.div key={cat.key} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ delay: (ci % 5) * 0.04 }}
                className="bg-white rounded-4 overflow-hidden" style={{ border: '2px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>

                <button onClick={() => toggle(cat.key)} className="tp-acc-btn">
                  <div style={{ width: 72, height: 72, flexShrink: 0, borderRadius: 12, background: '#f8fafc', overflow: 'hidden' }}>
                    <img src={cat.cover} alt={cat.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                      <h3 className="fw-black mb-0" style={{ fontSize: 16, color: '#1a1a1a' }}>{cat.title}</h3>
                      <span className="badge rounded-pill" style={{ background: 'rgba(159,201,26,.12)', color: '#9fc91a', fontSize: 10, fontWeight: 800 }}>{cat.items.length} parça</span>
                    </div>
                    <p className="mb-0 text-muted" style={{ fontSize: 13, lineHeight: 1.4 }}>{cat.short}</p>
                  </div>
                  <div className={`tp-acc-chevron ${isOpen ? 'open' : ''}`}><ChevronDown size={18} /></div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} style={{ overflow: 'hidden' }}>
                      <div style={{ borderTop: '1px solid #f1f5f9', padding: '1rem 1rem 1.25rem' }}>
                        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-4 g-3 mt-1">
                          {cat.items.map(item => (
                            <div key={item.key} className="col">
                              <SparePartCard item={item} onZoom={(imgs, idx) => setZoom({ images: imgs, idx, title: item.title })} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-5 rounded-4 p-4 p-md-5 d-flex flex-column flex-md-row align-items-center justify-content-between gap-4" style={{ background: '#1a1a1a' }}>
          <div>
            <h3 className="text-white fw-black mb-2" style={{ fontSize: 20 }}>İhtiyacınız olan parçayı bulamadınız mı?</h3>
            <p className="mb-0" style={{ color: '#94a3b8', fontSize: 14 }}>Bize ulaşın, stok dışı parçaları da temin ediyoruz.</p>
          </div>
          <a href={`https://api.whatsapp.com/send?phone=${WA}`} target="_blank" rel="noreferrer" className="btn btn-brand rounded-pill px-5 py-3 fw-black flex-shrink-0">
            WhatsApp ile Sor
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && <PartLightbox images={zoom.images} startIdx={zoom.idx} title={zoom.title} onClose={() => setZoom(null)} />}
      </AnimatePresence>
    </div>
  );
}

function SparePartCard({ item, onZoom }: { item: SparePart; onZoom: (images: string[], idx: number) => void }) {
  const images = item.gallery?.length ? item.gallery : item.image ? [item.image] : [];
  return (
    <div className="tp-spare-card h-100 d-flex flex-column">
      <button onClick={() => images.length && onZoom(images, 0)} className="tp-spare-card-img border-0 p-0" style={{ cursor: images.length ? 'zoom-in' : 'default', background: 'transparent', width: '100%' }}>
        {images[0]
          ? <img src={images[0]} alt={item.title} loading="lazy" />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}><Wrench size={28} /></div>}
        {images.length > 1 && (
          <span style={{ position: 'absolute', top: 6, right: 6, fontSize: 9, fontWeight: 900, background: 'rgba(15,23,42,.75)', color: '#fff', borderRadius: 100, padding: '2px 6px' }}>+{images.length - 1}</span>
        )}
      </button>
      <div className="p-3 d-flex flex-column gap-2 flex-grow-1">
        <h4 className="fw-black mb-0" style={{ fontSize: 13, color: '#1a1a1a', lineHeight: 1.3 }}>{item.title}</h4>
        <p className="mb-0 text-muted flex-grow-1" style={{ fontSize: 12, lineHeight: 1.4 }}>{item.desc}</p>
        <a href={buildWa(item.title)} target="_blank" rel="noreferrer"
          className="btn btn-sm rounded-3 fw-black d-flex align-items-center justify-content-center gap-2 mt-1"
          style={{ background: '#25D366', color: '#fff', border: 'none', fontSize: 11 }}>
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp ile Sor
        </a>
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
