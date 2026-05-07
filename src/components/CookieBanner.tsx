import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(() => localStorage.getItem('tp-cookies') === '1');

  if (accepted) return null;

  const accept = () => {
    localStorage.setItem('tp-cookies', '1');
    setAccepted(true);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-sm z-[80] bg-[#1a1a1a] text-white rounded-2xl p-5 shadow-2xl border border-white/10">
      <p className="text-sm text-gray-300 leading-relaxed mb-4">
        Daha iyi bir deneyim için çerezleri kullanıyoruz.{' '}
        <Link to="/cerez-politikasi" className="text-[#9fc91a] underline underline-offset-2 hover:opacity-80">
          Çerez Politikası
        </Link>
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="flex-1 bg-[#9fc91a] hover:bg-[#8ab516] text-white font-black text-sm py-2.5 rounded-xl transition-colors"
        >
          Kabul Et
        </button>
        <button
          onClick={accept}
          className="px-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm py-2.5 rounded-xl transition-colors"
        >
          Kapat
        </button>
      </div>
    </div>
  );
}
