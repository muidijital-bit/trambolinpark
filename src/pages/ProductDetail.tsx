import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Tag, ShieldCheck, Factory, Palette, Wrench, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProduct } from '../hooks/useProduct';
import { thumb } from '../lib/imageUtils';

const WA = '905433494947';
const buildWa = (title: string, msg = 'hakkında bilgi almak istiyorum') =>
  `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(`Merhaba, "${title}" ${msg}.`)}`;

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Site genelinde (Hakkımızda sayfası) zaten kullanılan, doğrulanmış marka vaatleri.
const TRUST_BADGES = [
  { icon: ShieldCheck, title: 'Güvenlik Standartları' },
  { icon: Factory,      title: 'Yerli Üretim' },
  { icon: Palette,      title: 'Özel Tasarım' },
  { icon: Wrench,       title: 'Satış Sonrası Destek' },
];

// "Etiket: açıklama" satırlarını madde işaretli listeye, "?"/":" ile biten kısa
// satırları alt başlığa çevirerek düz metin açıklamayı biçimlendirir.
function renderDescription(description: string) {
  const lines = description.split('\n').map(l => l.trim());
  const blocks: React.ReactNode[] = [];
  let bulletGroup: string[] = [];

  const flushBullets = () => {
    if (bulletGroup.length === 0) return;
    const group = bulletGroup;
    blocks.push(
      <ul key={`ul-${blocks.length}`} style={{ listStyle: 'none', padding: 0, margin: '4px 0 20px' }}>
        {group.map((line, i) => {
          const idx = line.indexOf(':');
          const label = line.slice(0, idx + 1);
          const rest = line.slice(idx + 1).replace(/^(?=\S)/, ' ');
          return (
            <li key={i} className="d-flex" style={{ gap: 10, padding: '8px 0', borderBottom: i < group.length - 1 ? '1px solid #ececec' : 'none' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5c9200', flexShrink: 0, marginTop: 8 }} />
              <span style={{ color: '#444', fontSize: 14.5, lineHeight: 1.6 }}>
                <strong style={{ color: '#1a1a1a' }}>{label}</strong>{rest}
              </span>
            </li>
          );
        })}
      </ul>
    );
    bulletGroup = [];
  };

  for (const line of lines) {
    if (!line) { flushBullets(); continue; }
    const bulletMatch = /^[^:]{2,40}:\s*\S.*$/.test(line);
    const isHeading = !bulletMatch && line.length < 80;
    if (isHeading) {
      flushBullets();
      blocks.push(
        <h3 key={blocks.length} className="font-poppins fw-black" style={{ fontSize: 17, color: '#5c9200', margin: blocks.length === 0 ? '0 0 8px' : '22px 0 8px' }}>
          {line}
        </h3>
      );
    } else if (bulletMatch) {
      bulletGroup.push(line);
    } else {
      flushBullets();
      blocks.push(<p key={blocks.length} style={{ color: '#555', fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>{line}</p>);
    }
  }
  flushBullets();
  return blocks;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const { product, related, loading } = useProduct(id);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => { setActiveImg(0); setLightbox(false); }, [product?.id]);

  if (loading) return (
    <div className="text-center" style={{ paddingTop: '12rem' }}>
      <div className="spinner-border" style={{ color: '#5c9200', width: 32, height: 32, borderWidth: 3 }} role="status" />
    </div>
  );

  if (!product) return (
    <div className="text-center py-5" style={{ paddingTop: '8rem' }}>
      <h1 className="fw-black fs-2 mb-3">Ürün Bulunamadı</h1>
      <p className="text-muted mb-4">Aradığınız ürün yayından kaldırılmış veya taşınmış olabilir.</p>
      <button onClick={() => navigate('/urunler')} className="btn btn-brand rounded-pill px-5 py-3 fw-black">Kataloga Dön</button>
    </div>
  );

  const images = [product.imageUrl, ...(product.gallery ?? [])].filter(Boolean);

  const scroll = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* Breadcrumb — normal flow, navbar altında */}
      <div className="tp-pt-nav" style={{ background: '#080808', borderBottom: '1px solid rgba(255,255,255,.06)', paddingBottom: 0 }}>
        <div className="container py-2">
          <nav className="d-flex align-items-center gap-1 flex-wrap" style={{ fontSize: 11, lineHeight: 1.6 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,.45)', textDecoration: 'none' }}>Anasayfa</Link>
            <ChevronRight size={11} color="rgba(255,255,255,.3)" />
            <Link to="/urunler" style={{ color: 'rgba(255,255,255,.45)', textDecoration: 'none' }}>Ürünler</Link>
            <ChevronRight size={11} color="rgba(255,255,255,.3)" />
            <Link to={`/urunler/${product.category}`} style={{ color: 'rgba(255,255,255,.45)', textDecoration: 'none' }}>{product.categoryName}</Link>
            <ChevronRight size={11} color="rgba(255,255,255,.3)" />
            <span style={{ color: 'rgba(255,255,255,.8)', fontWeight: 700 }}>{product.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Ürün Kartı ── */}
      <div style={{ background: '#f5f5f5', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{ background: '#fff', border: '1px solid #ececec', borderRadius: 24, boxShadow: '0 8px 30px rgba(0,0,0,.04)', overflow: 'hidden' }}>
            <div className="row g-0">

              {/* Görsel + galeri */}
              <div className="col-12 col-lg-5 d-flex flex-column align-items-center p-4 p-lg-5" style={{ background: '#fafafa', borderRight: '1px solid #ececec' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: 380 }}>
                  <button onClick={() => images.length && setLightbox(true)} disabled={!images.length}
                    style={{ all: 'unset', display: 'block', width: '100%', cursor: images.length ? 'zoom-in' : 'default' }}>
                    <div style={{
                      aspectRatio: '1/1', borderRadius: 16,
                      border: '1px solid #ececec',
                      background: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden', position: 'relative',
                    }}>
                      {images[activeImg]
                        ? <img src={thumb(images[activeImg], 800, 800)} alt={product.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : null}
                    </div>
                  </button>
                </div>

                {images.length > 1 && (
                  <div className="d-flex gap-2 mt-3 flex-wrap justify-content-center" style={{ maxWidth: 380, maxHeight: 128, overflowY: 'auto', padding: 2 }}>
                    {images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImg(i)}
                        style={{ width: 56, height: 56, borderRadius: 10, border: `2px solid ${activeImg === i ? '#5c9200' : '#ececec'}`, background: '#fff', overflow: 'hidden', padding: 4, cursor: 'pointer' }}>
                        <img src={thumb(img, 120)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Bilgi */}
              <div className="col-12 col-lg-7 p-4 p-lg-5">
                <span className="d-inline-flex align-items-center rounded-pill mb-3" style={{ background: '#f0f7e6', color: '#3a7500', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>
                  <Tag size={10} style={{ marginRight: 4 }} />{product.categoryName}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ display: 'inline-block', width: 32, height: 3, borderRadius: 2, background: 'linear-gradient(90deg, #c3e92d, #5c9200)' }} />
                </div>
                <h1 className="font-poppins fw-black" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: 1.1, letterSpacing: '-.02em', color: '#1a1a1a', marginBottom: '1.25rem' }}>
                  {product.title}
                </h1>

                <div className="d-flex flex-wrap gap-3 mb-4">
                  <a href={buildWa(product.title)} target="_blank" rel="noreferrer"
                    className="btn btn-brand rounded-pill px-4 py-3 fw-black d-flex align-items-center gap-2"
                    style={{ fontSize: 14 }}>
                    <WaIcon /> WhatsApp ile Sor
                  </a>
                  <a href={buildWa(product.title, 'için fiyat teklifi almak istiyorum')} target="_blank" rel="noreferrer"
                    className="btn rounded-pill px-4 py-3 fw-black d-flex align-items-center gap-2"
                    style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', color: '#1a1a1a', fontSize: 14 }}>
                    Fiyat Al
                  </a>
                </div>

                {product.features && product.features.length > 0 && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px' }}>
                    {product.features.map((f, i) => {
                      const idx = f.indexOf(':');
                      const label = idx > -1 ? f.slice(0, idx + 1) : null;
                      const rest = idx > -1 ? f.slice(idx + 1) : f;
                      return (
                        <li key={i} className="d-flex" style={{ gap: 10, padding: '8px 0', borderBottom: i < product.features!.length - 1 ? '1px solid #ececec' : 'none' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5c9200', flexShrink: 0, marginTop: 8 }} />
                          <span style={{ color: '#444', fontSize: 13.5, lineHeight: 1.6 }}>
                            {label && <strong style={{ color: '#1a1a1a' }}>{label}</strong>}{rest}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <div className="d-flex flex-wrap mb-1" style={{ columnGap: 28, rowGap: 14 }}>
                  {TRUST_BADGES.map(b => (
                    <div key={b.title} className="d-flex align-items-center gap-2">
                      <div style={{ width: 32, height: 32, borderRadius: 9, background: '#f0f7e6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <b.icon size={15} color="#5c9200" strokeWidth={1.75} />
                      </div>
                      <span style={{ color: '#444', fontSize: 12.5, fontWeight: 700 }}>{b.title}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Açıklama ── */}
      {product.description && (
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-lg-8">
              <span className="d-inline-block font-poppins fw-black mb-4" style={{ background: '#c3e92d', color: '#0a0a0a', fontSize: 14, padding: '.55rem 1.25rem', borderRadius: 8 }}>
                Açıklama
              </span>

              {renderDescription(product.description)}
            </div>
          </div>
        </div>
      )}

      {/* ── Diğer Ürünler Carousel ── */}
      {related.length > 0 && (
        <div className="container py-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <p className="mb-1 section-label">Keşfet</p>
              <h2 className="font-poppins fw-black mb-0" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: '#1a1a1a' }}>
                Diğer Ürünler
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
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div ref={carouselRef} style={{
            display: 'flex', gap: 16, overflowX: 'auto', scrollbarWidth: 'none',
            paddingBottom: 4, scrollSnapType: 'x mandatory',
          }}>
            {related.map(p => (
              <button key={p.id} onClick={() => navigate(`/urunler/${p.category}/${p.id}`)}
                className="tp-card border-0 text-start flex-shrink-0"
                style={{ width: 'clamp(160px, 55vw, 220px)', scrollSnapAlign: 'start', display: 'block', cursor: 'pointer' }}>
                <div className="tp-card-img">
                  <img loading="lazy" src={thumb(p.imageUrl, 440, 330)} alt={p.title} />
                </div>
                <div className="tp-card-body">
                  <span className="tp-card-cat">{p.categoryName}</span>
                  <p className="tp-card-title">{p.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && images.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="tp-lightbox" onClick={() => setLightbox(false)}>
            <button onClick={() => setLightbox(false)}
              style={{ position: 'absolute', top: 16, right: 16, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={20} />
            </button>
            {images.length > 1 && <>
              <button onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length); }}
                style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronLeft size={24} />
              </button>
              <button onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length); }}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={24} />
              </button>
            </>}
            <motion.img key={activeImg} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}
              src={images[activeImg]} alt={product.title}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 12 }} />
            <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', padding: '.35rem 1rem', borderRadius: 100, color: '#fff', fontWeight: 800, fontSize: 13 }}>
              {product.title}{images.length > 1 && ` · ${activeImg + 1} / ${images.length}`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
