import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Info, MessageCircle } from 'lucide-react';
import { allProducts } from '../data/mockData';
import ProductCard from '../components/ui/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the product in our mock database
  const product = allProducts.find(p => p.id === id);

  // If not found, show a simple error
  if (!product) {
    return (
      <div className="min-h-screen pt-40 pb-20 bg-[#f8fafc] flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-black text-[#1a1a1a] mb-4">Ürün Bulunamadı</h1>
        <p className="text-slate-500 mb-8">Aradığınız ürün yayından kaldırılmış veya taşınmış olabilir.</p>
        <button onClick={() => navigate('/trambolinler')} className="bg-[#9fc91a] text-white px-8 py-3 rounded-full font-bold">
          Kataloga Dön
        </button>
      </div>
    );
  }

  // Get some related products (just picking random 3 from the same dataset for demo)
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 3);
  
  // Try to determine a category label based on ID
  const categoryLabel = product.id.includes('top-havuzu') ? 'Soft Play' : 
                        product.id.includes('park') ? 'Anahtar Teslim Park' : 'Trambolin Serisi';

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-[#9fc91a] font-bold text-sm uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Geri Dön
        </button>

        {/* Product Showcase */}
        <div className="bg-white rounded-[40px] p-6 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Left: Image Box */}
            <div className="w-full lg:w-1/2">
              <div className="bg-slate-50 rounded-[32px] w-full aspect-square sm:aspect-[4/3] lg:aspect-square flex items-center justify-center p-8 relative border border-slate-100">
                 {/* Category Badge placed on image like the cards */}
                 <div className="absolute top-6 left-6 bg-[#9fc91a] text-white text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-md">
                   {categoryLabel}
                 </div>
                 
                 <img 
                   src={product.imageUrl} 
                   alt={product.title} 
                   className="w-full h-full object-contain drop-shadow-xl"
                 />
              </div>
            </div>

            {/* Right: Info Box */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h1 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-6 leading-tight">
                {product.title}
              </h1>
              
              <div className="w-20 h-1.5 bg-[#9fc91a] mb-8 rounded-full"></div>
              
              <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 font-medium">
                {product.description}
              </p>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="mb-10">
                  <h4 className="flex items-center gap-2 font-bold text-[#1a1a1a] uppercase tracking-widest text-sm mb-4">
                     <Info size={18} className="text-[#9fc91a]" /> Öne Çıkan Özellikler
                  </h4>
                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                        <CheckCircle2 size={20} className="text-[#9fc91a] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <a 
                  href="https://api.whatsapp.com/send?phone=905433494947&text=Merhaba,%20bu%20ürün%20hakkında%20bilgi%20ve%20fiyat%20almak%20istiyorum." 
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] text-white font-bold py-4 px-8 rounded-full text-center hover:bg-[#128C7E] transition-all duration-300 flex-1 shadow-lg hover:shadow-xl transform flex justify-center items-center gap-2"
                >
                  <MessageCircle size={20} /> WhatsApp'tan Ulaşın
                </a>
                <a 
                  href="https://api.whatsapp.com/send?phone=905433494947&text=Merhaba,%20fiyat%20teklifi%20almak%20istiyorum." 
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1a1a1a] text-white font-bold py-4 px-8 rounded-full text-center hover:bg-black transition-all duration-300 flex-1 shadow-lg hover:shadow-xl transform flex justify-center items-center gap-2"
                >
                  Fiyat Al
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Similar Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-[#1a1a1a]">Benzer Sistemler</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
