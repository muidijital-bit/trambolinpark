import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-slate-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">

          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex flex-col items-start">
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-primary">TRAMBOLİN<span className="text-white">PARK</span></span>
            </Link>
            <p className="text-sm text-slate-400 mt-3 leading-relaxed max-w-xs">
              Hem spor, hem eğlence, hem sağlık! Çocukların enerjisini güvenle keşfettiği alanlar tasarlıyoruz.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-4 md:mb-6 flex items-center gap-2">
              <span className="w-6 h-1 bg-primary rounded-full"></span>
              Kurumsal
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/hakkimizda" className="hover:text-primary transition-colors text-sm">Hakkımızda</Link></li>
              <li><Link to="/galeri" className="hover:text-primary transition-colors text-sm">Galeri</Link></li>
              <li><Link to="/kvkk" className="hover:text-primary transition-colors text-sm">KVKK</Link></li>
              <li><Link to="/cerez-politikasi" className="hover:text-primary transition-colors text-sm">Çerez Politikası</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-4 md:mb-6 flex items-center gap-2">
              <span className="w-6 h-1 bg-secondary rounded-full"></span>
              Ürünlerimiz
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/urunler" className="hover:text-secondary transition-colors text-sm">Tüm Ürünler</Link></li>
              <li><Link to="/urunler/olimpik-trambolinler" className="hover:text-secondary transition-colors text-sm">Trambolinler</Link></li>
              <li><Link to="/urunler/soft-play-oyun-alanlari" className="hover:text-secondary transition-colors text-sm">Soft Play & Havuzlar</Link></li>
              <li><Link to="/urunler/sisme-park-junior" className="hover:text-secondary transition-colors text-sm">Şişme Park</Link></li>
              <li><Link to="/yedek-parcalar" className="hover:text-secondary transition-colors text-sm">Yedek Parçalar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-4 md:mb-6 flex items-center gap-2">
              <span className="w-6 h-1 bg-primary rounded-full"></span>
              İletişim
            </h4>
            <ul className="space-y-3">
              <li className="text-sm">
                <span className="block text-slate-500 mb-0.5">E-posta</span>
                <a href="mailto:info@trambolinpark.com" className="hover:text-primary transition-colors font-medium text-white text-sm">info@trambolinpark.com</a>
              </li>
              <li className="text-sm">
                <span className="block text-slate-500 mb-0.5">WhatsApp</span>
                <a href="https://api.whatsapp.com/send?phone=905433494947" target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors font-bold text-base">
                  +90 543 349 49 47
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 md:pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">© {new Date().getFullYear()} TRAMBOLİNPARK. Tüm hakları saklıdır.</p>
          <div className="flex gap-3 text-xs">
            <Link to="/kvkk" className="text-slate-500 hover:text-white transition-colors">KVKK</Link>
            <span className="text-slate-700">·</span>
            <Link to="/cerez-politikasi" className="text-slate-500 hover:text-white transition-colors">Çerez Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
