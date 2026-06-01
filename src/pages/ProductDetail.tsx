import { useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ChevronLeft, Tag } from 'lucide-react';
import { useProduct } from '../hooks/useProduct';

const WA = '905433494947';
const buildWa = (title: string, msg = 'hakkında bilgi almak istiyorum') =>
  `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(`Merhaba, "${title}" ${msg}.`)}`;

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);
  const { product, related, loading } = useProduct(id);

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

      {/* ── Hero ── */}
      <div className="tp-page-hero tp-page-hero--after-breadcrumb">
        <div aria-hidden="true" className="tp-hero-watermark">{(product.categoryName ?? '').toUpperCase()}</div>

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
                <div style={{
                  aspectRatio: '1/1', borderRadius: 24,
                  border: '1px solid rgba(255,255,255,.08)',
                  background: 'rgba(255,255,255,.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={product.imageUrl} alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'drop-shadow(0 16px 40px rgba(0,0,0,.5))' }} />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="col-12 col-lg-7">
              <span className="badge rounded-pill mb-3" style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>
                <Tag size={10} style={{ marginRight: 4 }} />{product.categoryName}
              </span>
              <div className="tp-hero-line" />
              <h1>{product.title}</h1>
              <p>{product.description}</p>

              {product.features && product.features.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {product.features.map((f, i) => (
                    <span key={i} className="d-inline-flex align-items-center gap-1" style={{
                      background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.15)',
                      color: 'rgba(255,255,255,.85)', fontSize: 12, fontWeight: 600,
                      padding: '.4rem .85rem', borderRadius: 100,
                    }}>
                      <CheckCircle2 size={12} color="#c3e92d" style={{ flexShrink: 0 }} />
                      {f}
                    </span>
                  ))}
                </div>
              )}

              <div className="d-flex flex-wrap gap-3">
                <a href={buildWa(product.title)} target="_blank" rel="noreferrer"
                  className="btn btn-brand rounded-pill px-4 py-3 fw-black d-flex align-items-center gap-2"
                  style={{ fontSize: 14 }}>
                  <WaIcon /> WhatsApp ile Sor
                </a>
                <a href={buildWa(product.title, 'için fiyat teklifi almak istiyorum')} target="_blank" rel="noreferrer"
                  className="btn rounded-pill px-4 py-3 fw-black d-flex align-items-center gap-2"
                  style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)', color: '#fff', fontSize: 14 }}>
                  Fiyat Al
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

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
                  <img loading="lazy" src={p.imageUrl} alt={p.title} />
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
    </div>
  );
}
