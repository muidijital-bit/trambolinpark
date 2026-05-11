import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSlider() {
  return (
    <div className="tp-hero" style={{ height: '88vh', marginTop: 64, background: '#000' }}>
      <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .6 }}>
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="tp-hero-overlay" />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container text-center px-4">
          <h1 className="display-3 fw-black text-white mb-3" style={{ textShadow: '0 4px 24px rgba(0,0,0,.5)', lineHeight: 1.1 }}>
            Yeni Nesil Trambolin Parkları
          </h1>
          <p className="fs-5 text-white mb-5 mx-auto" style={{ maxWidth: 600, opacity: .9, textShadow: '0 2px 8px rgba(0,0,0,.4)' }}>
            Maksimum güvenlik ve sınırsız eğlenceyi bir araya getiriyoruz.
          </p>
          <Link to="/urunler" className="btn btn-lg rounded-pill px-5 py-3 fw-black d-inline-flex align-items-center gap-2"
            style={{ background: '#c3e92d', color: '#1a1a1a', boxShadow: '0 10px 30px rgba(195,233,45,.35)', fontSize: '1.05rem' }}>
            Ürünleri İncele <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
