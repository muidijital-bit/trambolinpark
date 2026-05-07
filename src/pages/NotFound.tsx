import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-[#9fc91a] font-extrabold text-xs tracking-widest uppercase mb-4">404</p>
        <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4">Sayfa Bulunamadı</h1>
        <p className="text-slate-500 mb-8">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#9fc91a] hover:bg-[#8ab516] text-white font-black px-8 py-4 rounded-full transition-colors"
        >
          Anasayfaya Dön <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
