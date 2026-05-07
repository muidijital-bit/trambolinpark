import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { allProducts } from '../data/mockData';

const CATEGORIES = [
  { id: 'tum-urunler', name: 'Tüm Ürünler', group: null },
  { id: 'tekli-trambolinler',    name: 'Tekli Trambolinler',        group: 'Trambolinler' },
  { id: 'yer-zemin-trambolin',   name: 'Yer (Zemin) Trambolinleri', group: 'Trambolinler' },
  { id: 'salto-trambolin',       name: 'Salto Trambolin',            group: 'Trambolinler' },
  { id: 'olimpik-trambolinler',  name: 'Olimpik Trambolinler',       group: 'Trambolinler' },
  { id: 'ticari-junior',         name: 'Ticari Junior Trambolin',    group: 'Trambolinler' },
  { id: 'profesyonel-trambolin', name: 'Profesyonel Trambolin',      group: 'Trambolinler' },
  { id: 'trambolin-parklari',    name: 'Trambolin Parkları',         group: 'Trambolinler' },
  { id: 'kucuk-top-havuzlari',       name: 'Küçük Top Havuzları',       group: 'Soft Play & Havuzlar' },
  { id: 'isletmelere-top-havuzlari', name: 'İşletmelere Top Havuzları',  group: 'Soft Play & Havuzlar' },
  { id: 'soft-play-oyun-alanlari',   name: 'Soft Play Oyun Alanları',    group: 'Soft Play & Havuzlar' },
  { id: 'soft-play-oyuncaklar',      name: 'Soft Play Oyuncaklar',       group: 'Soft Play & Havuzlar' },
  { id: 'sisme-park-junior', name: 'Şişme Park Junior', group: 'Şişme Park' },
  { id: 'sisme-buyuk',       name: 'Şişme Büyük',       group: 'Şişme Park' },
];

const PRODUCT_CATEGORY_IDS = CATEGORIES.filter(c => c.id !== 'tum-urunler').map(c => c.id);

export default function Catalog() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const activeCategoryId = categoryId || 'tum-urunler';
  const mainProducts = allProducts.filter(p => PRODUCT_CATEGORY_IDS.includes(p.category));
  const displayedProducts =
    activeCategoryId === 'tum-urunler'
      ? mainProducts
      : mainProducts.filter(p => p.category === activeCategoryId);

  const activeCategory = CATEGORIES.find(c => c.id === activeCategoryId);
  const titleText = activeCategory?.name ?? 'Ürünler';

  const getCount = (catId: string) =>
    catId === 'tum-urunler'
      ? mainProducts.length
      : mainProducts.filter(p => p.category === catId).length;

  const groups = [...new Set(CATEGORIES.filter(c => c.group).map(c => c.group!))];

  const handleCategoryClick = (catId: string) => {
    navigate(catId === 'tum-urunler' ? '/urunler' : `/urunler/${catId}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* HERO */}
      <section className="bg-[#1a1a1a] pt-24 md:pt-28 lg:pt-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 pb-8 md:pb-12">

            {/* Sol — metin */}
            <div className="flex-1">
              <span className="inline-block text-[#9fc91a] font-extrabold text-xs tracking-widest uppercase mb-4">
                ÜRÜN KATALOĞU
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                {activeCategoryId === 'tum-urunler' ? (
                  <>Tüm <span className="text-[#9fc91a]">Ürünler</span></>
                ) : (
                  <span className="text-[#9fc91a]">{titleText}</span>
                )}
              </h1>
              <p className="text-gray-400 text-base leading-relaxed max-w-md mb-6">
                Trambolin parkından soft play alanlarına, top havuzlarından şişme parklara — anahtar teslim çözümler.
              </p>
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                <span className="bg-white/10 text-white text-xs md:text-sm font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                  {displayedProducts.length} ürün
                </span>
                <span className="bg-white/10 text-white text-xs md:text-sm font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                  EN-1176 Sertifikalı
                </span>
                <span className="bg-white/10 text-white text-xs md:text-sm font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                  Anahtar Teslim
                </span>
              </div>
            </div>

            {/* Sağ — görsel */}
            <div className="w-full lg:w-[420px] h-44 md:h-60 lg:h-72 rounded-2xl md:rounded-3xl overflow-hidden shrink-0">
              <img
                src="https://matrax-web-six.vercel.app/images/galeri-yeni/galeri-10.jpg"
                alt="Ürün kataloğu"
                className="w-full h-full object-cover opacity-80"
              />
            </div>

          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 pt-8 md:pt-12 pb-16 md:pb-24">

        {/* MOBİL: yatay kaydırmalı filtre */}
        <div className="lg:hidden mb-6 -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => {
              const isActive = activeCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold transition-all ${
                    isActive
                      ? 'bg-[#1a1a1a] text-white'
                      : 'bg-white text-[#1a1a1a] border border-slate-200'
                  }`}
                >
                  {cat.name}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {getCount(cat.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* DESKTOP: sidebar */}
          <div className="hidden lg:block w-full lg:w-1/4 shrink-0">
            <h3 className="text-[#a0afbf] font-extrabold text-xs tracking-widest uppercase mb-4">KATEGORİLER</h3>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleCategoryClick('tum-urunler')}
                className={`flex items-center justify-between px-5 py-3 rounded-full font-bold transition-all duration-200 w-full text-left ${
                  activeCategoryId === 'tum-urunler'
                    ? 'bg-[#1a1a1a] text-white shadow-lg'
                    : 'bg-transparent text-[#1a1a1a] hover:bg-white hover:shadow-sm'
                }`}
              >
                <span className="text-[15px]">Tüm Ürünler</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-black ${activeCategoryId === 'tum-urunler' ? 'bg-white/20 text-white' : 'bg-[#e2e8f0] text-[#64748b]'}`}>
                  {getCount('tum-urunler')}
                </span>
              </button>

              {groups.map(group => (
                <div key={group} className="mt-4">
                  <p className="text-[10px] font-black text-[#b0bec8] tracking-widest uppercase px-2 mb-1">{group}</p>
                  {CATEGORIES.filter(c => c.group === group).map(cat => {
                    const isActive = activeCategoryId === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`flex items-center justify-between px-5 py-3 rounded-full font-bold transition-all duration-200 w-full text-left ${
                          isActive
                            ? 'bg-[#9fc91a] text-white shadow-lg'
                            : 'bg-transparent text-[#1a1a1a] hover:bg-white hover:shadow-sm'
                        }`}
                      >
                        <span className="text-[14px]">{cat.name}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-black ${isActive ? 'bg-white/30 text-white' : 'bg-[#e2e8f0] text-[#64748b]'}`}>
                          {getCount(cat.id)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Ürünler */}
          <div className="w-full lg:w-3/4">
            <div className="mb-4">
              <span className="text-[#64748b] text-sm font-bold tracking-wide">
                {displayedProducts.length} ürün
              </span>
            </div>

            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {displayedProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 flex flex-col items-center justify-center shadow-sm">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-xl font-black text-[#1a1a1a] mb-2">Ürün Bulunamadı</h3>
                <p className="text-slate-500 font-medium text-sm">Bu kategori için ürünlerimiz yakında eklenecektir.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
