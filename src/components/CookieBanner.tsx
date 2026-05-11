import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(() => localStorage.getItem('tp-cookies') === '1');
  if (accepted) return null;
  const accept = () => { localStorage.setItem('tp-cookies', '1'); setAccepted(true); };

  return (
    <div className="tp-cookie">
      <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1rem' }}>
        Daha iyi bir deneyim için çerezleri kullanıyoruz.{' '}
        <Link to="/cerez-politikasi" className="text-brand text-decoration-underline">Çerez Politikası</Link>
      </p>
      <div className="d-flex gap-2">
        <button onClick={accept} className="btn btn-brand flex-grow-1 btn-sm rounded-pill fw-bold">Kabul Et</button>
        <button onClick={accept} className="btn btn-sm rounded-pill fw-bold" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: 'none' }}>Kapat</button>
      </div>
    </div>
  );
}
