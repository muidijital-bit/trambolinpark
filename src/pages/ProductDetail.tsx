import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ChevronLeft, Tag, ArrowLeft, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProduct } from '../hooks/useProduct';
import { thumb } from '../lib/imageUtils';
import { WaIcon, TRUST_BADGES, renderDescription, breadcrumbJsonLd, toMetaDescription } from '../components/ProductDetailShared';

const WA = '905433494947';
const buildWa = (title: string, msg = 'hakkında bilgi almak istiyorum') =>
  `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(`Merhaba, "${title}" ${msg}.`)}`;

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

  const categoryName = product.categoryName ?? 'Ürünler';
  const canonicalUrl = `https://trambolinpark.com/urunler/${product.category}/${product.id}`;
  const pageTitle = `${product.title} | ${categoryName} | Trambolinpark`;
  const metaDescription = toMetaDescription(
    product.description,
    `${product.title} — ${categoryName} kategorisinde, CE belgeli ve anahtar teslim kurulum ile Trambolinpark üretimi. Fiyat teklifi için hemen iletişime geçin.`
  );
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Anasayfa', url: '/' },
    { name: 'Ürünler', url: '/urunler' },
    { name: categoryName, url: `/urunler/${product.category}` },
    { name: product.title, url: `/urunler/${product.category}/${product.id}` },
  ]);
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: metaDescription,
    category: categoryName,
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
                        ? <img src={thumb(images[activeImg], 800, 800)} alt={product.title} fetchPriority="high"
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
                  <Link to="/urunler"
                    className="btn rounded-pill px-4 py-3 fw-black d-flex align-items-center gap-2"
                    style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', color: '#1a1a1a', fontSize: 14 }}>
                    <ArrowLeft size={15} /> Geri Dön
                  </Link>
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
              <Link key={p.id} to={`/urunler/${p.category}/${p.id}`}
                className="tp-card border-0 text-start flex-shrink-0"
                style={{ width: 'clamp(160px, 55vw, 220px)', scrollSnapAlign: 'start', display: 'block', cursor: 'pointer' }}>
                <div className="tp-card-img">
                  <img loading="lazy" src={thumb(p.imageUrl, 440, 330)} alt={p.title} />
                </div>
                <div className="tp-card-body">
                  <span className="tp-card-cat">{p.categoryName}</span>
                  <p className="tp-card-title">{p.title}</p>
                </div>
              </Link>
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
