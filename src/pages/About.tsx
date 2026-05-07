import PageHeader from '../components/ui/PageHeader';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <PageHeader
        title="Hakkımızda"
        badge="KURUMSAL"
        description="Trambolinpark olarak eğlence alanları tasarlıyor, üretiyor ve anahtar teslim kuruyoruz."
      />

      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-16 item-center mb-24">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#c3e92d] rounded-2xl z-0 opacity-50"></div>
            <img
              src="https://matrax-web-six.vercel.app/images/galeri-yeni/galeri-7.jpg"
              alt="Trambolinpark kurulum"
              className="w-full h-[500px] object-cover rounded-2xl shadow-xl relative z-10"
            />
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-[#b4dc28] font-bold tracking-[0.2em] uppercase mb-4 block">BİZ KİMİZ?</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1a1a1a] mb-6 leading-tight">
              Türkiye'nin Lider <span className="text-[#b4dc28]">Trambolin Parkı</span><br />Üreticisi
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              Sektördeki tecrübemiz ile kapalı ve açık alan eğlence merkezleri, trambolin parkları ve soft play sistemleri üretiminde Türkiye'nin öncü markalarından biri olmanın gururunu yaşıyoruz.
            </p>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Tasarımından üretimine ve anahtar teslim kurulumuna kadar projenin tüm aşamalarını profesyonel ekibimizle yönetiyor, çocuklar ve yetişkinler için maksimum güvenliğe sahip, yenilikçi oyun alanları inşa ediyoruz.
            </p>
            
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#b4dc28]" size={24} />
                <span className="text-[#1a1a1a] font-bold">Uluslararası Güvenlik Standartları (CE, ISO)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#b4dc28]" size={24} />
                <span className="text-[#1a1a1a] font-bold">%100 Yerli ve Milli Üretim</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#b4dc28]" size={24} />
                <span className="text-[#1a1a1a] font-bold">Profesyonel Satış Sonrası Destek ve Bakım</span>
              </div>
            </div>

            <div>
              <Link to="/iletisim" className="maxplay-button inline-flex items-center gap-2 px-8 py-4 font-bold uppercase tracking-wider text-sm rounded-none">
                Bize Ulaşın <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-black text-[#1a1a1a] mb-4">
              Vizyonumuz
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              Sektördeki teknolojik gelişmeleri ve küresel trendleri yakından takip ederek, güvenli eğlencenin sınırlarını yeniden çizen, uluslararası arenada referans alınan bir dünya markası olmak.
            </p>
          </div>
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-black text-[#1a1a1a] mb-4">
              Misyonumuz
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              Müşterilerimize yaratıcı ve maksimum güvenli özelleştirilmiş çözümler sunarken; çocukların fiziksel ve zihinsel gelişimini destekleyen sağlıklı oyun alanları tasarlamak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
