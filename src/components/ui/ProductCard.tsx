import { Link } from 'react-router-dom';
import type { Product } from '../../data/mockData';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const categoryLabel = product.categoryName ?? product.category;

  return (
    <Link to={`/urun/${product.id}`} className="block group h-full">
      <div className="bg-white rounded-2xl md:rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center p-3 md:p-6 relative h-full">
        {/* Kategori badge */}
        <div className="absolute top-3 left-3 md:top-6 md:left-6 bg-[#9fc91a] text-white text-[9px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full z-10 tracking-wider truncate max-w-[60%]">
          {categoryLabel}
        </div>

        {/* Görsel */}
        <div className="w-full h-32 sm:h-40 md:h-56 mb-3 md:mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="object-contain max-h-full w-full"
            loading="lazy"
          />
        </div>

        {/* Başlık */}
        <h3 className="text-center font-black text-[#1a1a1a] text-sm md:text-base lg:text-lg px-1 leading-tight group-hover:text-[#9fc91a] transition-colors">
          {product.title}
        </h3>
      </div>
    </Link>
  );
}
