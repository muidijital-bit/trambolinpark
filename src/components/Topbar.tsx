import { Mail, Phone } from 'lucide-react';

export default function Topbar() {
  return (
    <div className="bg-[#1a1a1a] text-[#a0afbf] py-2 hidden md:block text-sm border-b border-[#243342]">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="text-white font-medium">Bize Ulaşın :</span>
          <a href="mailto:info@trambolinpark.com" className="hover:text-white transition-colors flex items-center gap-2">
            <Mail size={16} /> info@trambolinpark.com
          </a>
          <a href="tel:+905433494947" className="hover:text-white transition-colors flex items-center gap-2">
            <Phone size={16} /> +90 543 349 49 47
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="text-white border-r border-[#435c75] pr-3 font-semibold hover:text-[#f5cf11]">TR</a>
          <a href="#" className="hover:text-white transition-colors">EN</a>
        </div>
      </div>
    </div>
  );
}
