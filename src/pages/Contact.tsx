import PageHeader from '../components/ui/PageHeader';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <PageHeader 
        title="İletişim" 
        description="Projeleriniz için en uygun çözümleri birlikte tasarlayalım. Bize hemen ulaşın."
      />
      
      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/50"
          >
            <h2 className="text-3xl font-black text-slate-800 mb-8">İletişim Bilgileri</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-1">Adres</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Ankara, Türkiye<br/>
                    Trambolinpark Merkez Ofisi
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-1">Telefon / WhatsApp</h4>
                  <a href="https://api.whatsapp.com/send?phone=905433494947" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-primary transition-colors font-medium">
                    +90 543 349 49 47
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-1">E-Posta</h4>
                  <a href="mailto:info@trambolinpark.com" className="text-slate-500 hover:text-primary transition-colors font-medium">
                    info@trambolinpark.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-1">Çalışma Saatleri</h4>
                  <p className="text-slate-500 font-medium">Hafta içi: 09:00 - 18:00<br/>Cumartesi: 10:00 - 15:00</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-200 rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 min-h-[400px] flex items-center justify-center relative group"
          >
            <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')" }}></div>
            <div className="absolute inset-0 bg-slate-900/10"></div>
            <div className="relative z-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl text-center max-w-sm m-4 shadow-lg">
              <MapPin size={40} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">Google Maps</h3>
              <p className="text-slate-600 mb-4 text-sm">Buraya şirketinizin canlı harita iframe bileşeni (Google Maps) gelecektir.</p>
              <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary transition-colors text-sm w-full">Yol Tarifi Al</button>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
