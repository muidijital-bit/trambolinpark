import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon, X, ArrowLeft, Wrench, Tag } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSparePartByKey } from '../hooks/useSparePartByKey';
import { thumb } from '../lib/imageUtils';
import { WaIcon, TRUST_BADGES, renderDescription, breadcrumbJsonLd, toMetaDescription } from '../components/ProductDetailShared';

const WA = '905433494947';
const buildWa = (title: string) =>
  `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(`Merhaba, "${title}" hakkında bilgi almak istiyorum.`)}`;

export default function YedekParcaDetay() {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { result, loading } = useSparePartByKey(key);

  useEffect(() => { setActiveImg(0); setLightbox(false); }, [key]);

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
  const images = [part.image, ...(part.gallery ?? [])].filter(Boolean) as string[];

  const scroll = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: dir === 'right' ? 260 : -260, behavior: 'smooth' });
  };

  const canonicalUrl = `https://trambolinpark.com/yedek-parcalar/${part.key}`;
  const pageTitle = `${part.title} | Trambolin Yedek Parça | Trambolinpark`;
  const metaDescription = toMetaDescription(
    part.desc,
    `${part.title} — orijinal trambolin yedek parçası. Hızlı kargo, uygun fiyat. Sipariş için WhatsApp'tan hemen bilgi alın.`
  );
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Anasayfa', url: '/' },
    { name: 'Yedek Parçalar', url: '/yedek-parcalar' },
    ...(subcategory ? [{ name: subcategory.title, url: '/yedek-parcalar' }] : []),
    { name: part.title, url: `/yedek-parcalar/${part.key}` },
  ]);
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: part.title,
    description: metaDescription,
    category: subcategory?.title ?? category.title,
    ...(images.length ? { image: images } : {}),
    brand: { '@type': 'Brand', name: 'Trambolinpark' },
    url: canonicalUrl,
  };

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        {images[0] && <meta property="og:image" content={thumb(images[0], 1200, 630)} />}
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(productLd)}</script>
      </Helmet>

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

      {/* ── Parça Kartı ── */}
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
                        ? <img src={thumb(images[activeImg], 800, 800)} alt={part.title} fetchPriority="high"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, color: '#ccc' }}>
                            <Wrench size={48} />
                            <span style={{ fontSize: 12 }}>Görsel mevcut değil</span>
                          </div>}
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
                  <Tag size={10} style={{ marginRight: 4 }} />{subcategory?.title ?? category.title}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ display: 'inline-block', width: 32, height: 3, borderRadius: 2, background: 'linear-gradient(90deg, #c3e92d, #5c9200)' }} />
                </div>
                <h1 className="font-poppins fw-black" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: 1.1, letterSpacing: '-.02em', color: '#1a1a1a', marginBottom: '1.25rem' }}>
                  {part.title}
                </h1>

                <div className="d-flex flex-wrap gap-3 mb-4">
                  <a href={buildWa(part.title)} target="_blank" rel="noreferrer"
                    className="btn btn-brand rounded-pill px-4 py-3 fw-black d-flex align-items-center gap-2"
                    style={{ fontSize: 14 }}>
                    <WaIcon /> WhatsApp ile Sor
                  </a>
                  <Link to="/yedek-parcalar"
                    className="btn rounded-pill px-4 py-3 fw-black d-flex align-items-center gap-2"
                    style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', color: '#1a1a1a', fontSize: 14 }}>
                    <ArrowLeft size={15} /> Geri Dön
                  </Link>
                </div>

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
      {part.desc && (
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-lg-8">
              <span className="d-inline-block font-poppins fw-black mb-4" style={{ background: '#c3e92d', color: '#0a0a0a', fontSize: 14, padding: '.55rem 1.25rem', borderRadius: 8 }}>
                Açıklama
              </span>

              {renderDescription(part.desc)}
            </div>
          </div>
        </div>
      )}

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
                <ChevronRightIcon size={24} />
              </button>
            </>}
            <motion.img key={activeImg} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}
              src={images[activeImg]} alt={part.title}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 12 }} />
            <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', padding: '.35rem 1rem', borderRadius: 100, color: '#fff', fontWeight: 800, fontSize: 13 }}>
              {part.title}{images.length > 1 && ` · ${activeImg + 1} / ${images.length}`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
