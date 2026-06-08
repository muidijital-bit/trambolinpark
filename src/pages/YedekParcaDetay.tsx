import { useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon, X, ArrowLeft, Wrench, Tag } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSparePartByKey } from '../hooks/useSparePartByKey';
import { thumb } from '../lib/imageUtils';

const WA = '905433494947';
const buildWa = (title: string) =>
  `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(`Merhaba, "${title}" hakkında bilgi almak istiyorum.`)}`;

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function YedekParcaDetay() {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { result, loading } = useSparePartByKey(key);

  if (loading) return (
    <div className="text-center" style={{ paddingTop: '12rem' }}>
      <div className="spinner-border" style={{ color: '#5c9200', width: 32, height: 32, borderWidth: 3 }} role="status" />
    </div>
  );

  if (!result) {
    return (
      <div className="text-center py-5" style={{ paddingTop: '8rem' }}>
        <h1 className="fw-black fs-2 mb-3">Parça Bulunamadı</h1>
        <p className="text-muted mb-4">Aradığınız yedek parça bulunamadı veya kaldırılmış olabilir.</p>
        <button onClick={() => navigate('/yedek-parcalar')} className="btn btn-brand rounded-pill px-5 py-3 fw-black">
          Yedek Parçalara Dön
        </button>
      </div>
    );
  }

  const { part, category, subcategory, relatedItems } = result;
  const images = part.gallery?.length ? part.gallery : part.image ? [part.image] : [];

  const scroll = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === 'right' ? 260 : -260, behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* Breadcrumb — normal flow, navbar altında */}
      <div className="tp-pt-nav" style={{ background: '#080808', borderBottom: '1px solid rgba(255,255,255,.06)', paddingBottom: 0 }}>
        <div className="container py-2">
          <nav className="d-flex align-items-center gap-1 flex-wrap" style={{ fontSize: 11, lineHeight: 1.6 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,.45)', textDecoration: 'none' }}>Anasayfa</Link>
            <ChevronRight size={11} color="rgba(255,255,255,.3)" />
            <Link to="/yedek-parcalar" style={{ color: 'rgba(255,255,255,.45)', textDecoration: 'none' }}>Yedek Parçalar</Link>
            <ChevronRight size={11} color="rgba(255,255,255,.3)" />
            <Link to="/yedek-parcalar" state={{ cat: category.key, sub: subcategory?.key ?? null }}
              style={{ color: 'rgba(255,255,255,.45)', textDecoration: 'none' }}>{category.title}</Link>
            {subcategory && <>
              <ChevronRight size={11} color="rgba(255,255,255,.3)" />
              <span style={{ color: 'rgba(255,255,255,.45)' }}>{subcategory.title}</span>
            </>}
            <ChevronRight size={11} color="rgba(255,255,255,.3)" />
            <span style={{ color: 'rgba(255,255,255,.8)', fontWeight: 700 }}>{part.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="tp-page-hero tp-page-hero--after-breadcrumb">
        <div aria-hidden="true" className="tp-hero-watermark">{(subcategory?.title ?? category.title).toUpperCase()}</div>

        <div className="container">
          <div className="row g-0 g-lg-5 align-items-center">

            {/* Image */}
            <div className="col-12 col-lg-5 d-flex justify-content-center mb-4 mb-lg-0">
              <div style={{ position: 'relative', width: '100%', maxWidth: 420, maxHeight: '55vw' }}>
                <div style={{
                  position: 'absolute', inset: '10%', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(195,233,45,.22) 0%, transparent 70%)',
                  filter: 'blur(40px)', pointerEvents: 'none',
                }} />
                <div
                  style={{
                    aspectRatio: '1/1', borderRadius: 24,
                    border: '1px solid rgba(255,255,255,.08)',
                    background: 'rgba(255,255,255,.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: images.length ? 'zoom-in' : 'default', position: 'relative', overflow: 'hidden',
                  }}
                  onClick={() => images.length && setLightboxIdx(0)}>
                  {images[0]
                    ? <img src={thumb(images[0], 700, 700)} alt={part.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'drop-shadow(0 12px 32px rgba(0,0,0,.5))' }} />
                    : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,.3)' }}>
                        <Wrench size={48} />
                        <span style={{ fontSize: 12 }}>Görsel mevcut değil</span>
                      </div>}
                  {images.length > 1 && (
                    <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,.55)', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 100, padding: '3px 8px' }}>
                      +{images.length - 1} fotoğraf
                    </div>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="d-flex gap-2 mt-3 flex-wrap">
                    {images.map((img, i) => (
                      <button key={i} onClick={() => setLightboxIdx(i)}
                        style={{ width: 56, height: 56, borderRadius: 10, border: `2px solid ${lightboxIdx === i ? '#c3e92d' : 'rgba(255,255,255,.15)'}`, background: 'rgba(255,255,255,.06)', overflow: 'hidden', padding: 4, cursor: 'zoom-in' }}>
                        <img src={thumb(img, 120)} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="col-12 col-lg-7">
              <span className="badge rounded-pill mb-3" style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>
                <Tag size={10} style={{ marginRight: 4 }} />{subcategory?.title ?? category.title}
              </span>
              <div className="tp-hero-line" />
              <h1>{part.title}</h1>
              <p>{part.desc}</p>

              <div className="d-flex flex-wrap gap-3">
                <a href={buildWa(part.title)} target="_blank" rel="noreferrer"
                  className="btn btn-brand rounded-pill px-4 py-3 fw-black d-flex align-items-center gap-2"
                  style={{ fontSize: 14 }}>
                  <WaIcon /> WhatsApp ile Sor
                </a>
                <Link to="/yedek-parcalar"
                  className="btn rounded-pill px-4 py-3 fw-black d-flex align-items-center gap-2"
                  style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)', color: '#fff', fontSize: 14 }}>
                  <ArrowLeft size={15} /> Geri Dön
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── İlgili Parçalar Carousel ── */}
      {relatedItems.length > 0 && (
        <div className="container py-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <p className="mb-1 section-label">Keşfet</p>
              <h2 className="font-poppins fw-black mb-0" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: '#1a1a1a' }}>
                İlgili Parçalar
              </h2>
            </div>
            <div className="d-flex gap-2">
              <button onClick={() => scroll('left')} aria-label="Geri" style={{
                width: 44, height: 44, borderRadius: '50%', border: '2px solid #e0e0e0',
                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0,
              }}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scroll('right')} aria-label="İleri" style={{
                width: 44, height: 44, borderRadius: '50%', border: '2px solid #1a1a1a',
                background: '#1a1a1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0,
              }}>
                <ChevronRightIcon size={18} />
              </button>
            </div>
          </div>

          <div ref={carouselRef} style={{
            display: 'flex', gap: 16, overflowX: 'auto', scrollbarWidth: 'none',
            paddingBottom: 4, scrollSnapType: 'x mandatory',
          }}>
            {relatedItems.map(item => {
              const itemImg = item.image;
              return (
                <Link key={item.key} to={`/yedek-parcalar/${item.key}`}
                  className="tp-spare-card flex-shrink-0 text-decoration-none"
                  style={{ width: 'clamp(150px, 50vw, 200px)', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column' }}>
                  <div className="tp-spare-card-img" style={{ cursor: 'pointer' }}>
                    {itemImg
                      ? <img src={itemImg} alt={item.title} loading="lazy" />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}><Wrench size={24} /></div>}
                  </div>
                  <div className="p-3 d-flex flex-column gap-1 flex-grow-1">
                    <h4 className="fw-black mb-0" style={{ fontSize: 13, color: '#1a1a1a', lineHeight: 1.3 }}>{item.title}</h4>
                    <p className="mb-0 text-muted" style={{ fontSize: 12, lineHeight: 1.4 }}>{(item as any).desc ?? ''}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && images.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="tp-lightbox" onClick={() => setLightboxIdx(null)}>
            <button onClick={() => setLightboxIdx(null)}
              style={{ position: 'absolute', top: 16, right: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={20} />
            </button>
            {images.length > 1 && <>
              <button onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i! - 1 + images.length) % images.length); }}
                style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronLeft size={24} />
              </button>
              <button onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i! + 1) % images.length); }}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRightIcon size={24} />
              </button>
            </>}
            <motion.img key={lightboxIdx} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}
              src={images[lightboxIdx]} alt={part.title}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 12 }} />
            <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', padding: '.35rem 1rem', borderRadius: 100, color: '#fff', fontWeight: 800, fontSize: 13 }}>
              {part.title}{images.length > 1 && ` · ${lightboxIdx + 1} / ${images.length}`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
