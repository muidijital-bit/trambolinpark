import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Info, MessageCircle, ChevronRight } from 'lucide-react';
import { allProducts } from '../data/mockData';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find(p => p.id === id);

  if (!product) return (
    <div className="text-center py-5" style={{ paddingTop: '8rem !important' }}>
      <h1 className="fw-black fs-2 mb-3">Ürün Bulunamadı</h1>
      <p className="text-muted mb-4">Aradığınız ürün yayından kaldırılmış veya taşınmış olabilir.</p>
      <button onClick={() => navigate('/urunler')} className="btn btn-brand rounded-pill px-5 py-3 fw-black">Kataloga Dön</button>
    </div>
  );

  const related = [
    ...allProducts.filter(p => p.id !== product.id && p.category === product.category),
    ...allProducts.filter(p => p.id !== product.id && p.category !== product.category),
  ].slice(0, 3);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: 64 }}>

      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '.6rem 0' }}>
        <div className="container">
          <nav style={{ fontSize: 12 }} className="d-flex align-items-center gap-1 text-muted">
            <Link to="/" style={{ color: '#64748b', textDecoration: 'none' }}>Anasayfa</Link>
            <ChevronRight size={11} />
            <Link to="/urunler" style={{ color: '#64748b', textDecoration: 'none' }}>Ürünler</Link>
            <ChevronRight size={11} />
            <Link to={`/urunler/${product.category}`} style={{ color: '#64748b', textDecoration: 'none' }}>{product.categoryName}</Link>
            <ChevronRight size={11} />
            <span className="fw-bold text-dark">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container py-4 py-md-5">

        {/* Ürün detay */}
        <div className="bg-white rounded-4 p-4 p-md-5 mb-5" style={{ boxShadow: '0 4px 24px rgba(0,0,0,.05)' }}>
          <div className="row g-4 g-lg-5">

            {/* Görsel */}
            <div className="col-12 col-lg-6">
              <div className="rounded-4 d-flex align-items-center justify-content-center position-relative" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', aspectRatio: '1/1' }}>
                <span className="badge rounded-pill position-absolute" style={{ top: 20, left: 20, background: '#9fc91a', color: '#fff', fontSize: 11, fontWeight: 800, padding: '.45rem 1rem' }}>
                  {product.categoryName}
                </span>
                <img src={product.imageUrl} alt={product.title} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,.12))' }} />
              </div>
            </div>

            {/* Bilgi */}
            <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
              <h1 className="fw-black mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.2 }}>{product.title}</h1>
              <div style={{ width: 56, height: 4, background: '#9fc91a', borderRadius: 2, marginBottom: '1.5rem' }} />
              <p className="text-secondary mb-4" style={{ fontSize: 16, lineHeight: 1.7 }}>{product.description}</p>

              {product.features && product.features.length > 0 && (
                <div className="mb-4">
                  <h4 className="d-flex align-items-center gap-2 fw-bold mb-3" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '.1em', color: '#1a1a1a' }}>
                    <Info size={16} color="#9fc91a" /> Öne Çıkan Özellikler
                  </h4>
                  <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                    {product.features.map((f, i) => (
                      <li key={i} className="d-flex align-items-start gap-2" style={{ fontSize: 15, color: '#475569' }}>
                        <CheckCircle2 size={18} color="#9fc91a" style={{ marginTop: 2, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="d-flex flex-column flex-sm-row gap-3 mt-auto">
                <a href="https://api.whatsapp.com/send?phone=905433494947&text=Merhaba,%20bu%20ürün%20hakkında%20bilgi%20ve%20fiyat%20almak%20istiyorum."
                  target="_blank" rel="noreferrer"
                  className="btn btn-lg rounded-pill fw-black d-flex align-items-center justify-content-center gap-2 flex-grow-1"
                  style={{ background: '#25D366', color: '#fff', border: 'none' }}>
                  <MessageCircle size={20} /> WhatsApp'tan Ulaşın
                </a>
                <a href="https://api.whatsapp.com/send?phone=905433494947&text=Merhaba,%20fiyat%20teklifi%20almak%20istiyorum."
                  target="_blank" rel="noreferrer"
                  className="btn btn-lg btn-dark-tp rounded-pill fw-black flex-grow-1">
                  Fiyat Al
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Benzer ürünler */}
        {related.length > 0 && (
          <div>
            <h2 className="fw-black mb-4" style={{ fontSize: 22 }}>Diğer Ürünler</h2>
            <div className="row row-cols-2 row-cols-md-3 g-3">
              {related.map(p => (
                <div key={p.id} className="col">
                  <button onClick={() => navigate(`/urun/${p.id}`)} className="tp-card w-100 border-0 text-start" style={{ display: 'block' }}>
                    <div className="tp-card-img"><img loading="lazy" src={p.imageUrl} alt={p.title} /></div>
                    <div className="tp-card-body">
                      <span className="tp-card-cat">{p.categoryName}</span>
                      <p className="tp-card-title">{p.title}</p>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
