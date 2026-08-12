import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#f5f5f5', paddingTop: 64 }}>
      <Helmet>
        <title>Sayfa Bulunamadı (404) | Trambolinpark</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="text-center px-4" style={{ maxWidth: 480 }}>
        <p className="fw-black text-brand mb-3" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.2em' }}>404</p>
        <h1 className="fw-black mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1a1a1a' }}>Sayfa Bulunamadı</h1>
        <p className="text-secondary mb-4" style={{ fontSize: 16 }}>Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
        <Link to="/" className="btn btn-brand btn-lg rounded-pill px-5 fw-black d-inline-flex align-items-center gap-2">
          Anasayfaya Dön <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
