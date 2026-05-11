import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="tp-page-hero">
        <div className="container">
          <span className="badge rounded-pill mb-3" style={{ background: 'rgba(159,201,26,.15)', color: '#9fc91a', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>KURUMSAL</span>
          <h1 className="display-5 fw-black text-white mb-2">Hakkımızda</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 500 }}>Trambolinpark olarak eğlence alanları tasarlıyor, üretiyor ve anahtar teslim kuruyoruz.</p>
        </div>
      </div>

      <div className="container py-5">

        {/* Ana bölüm */}
        <div className="row g-5 align-items-center mb-5 pb-2">
          <div className="col-12 col-lg-5">
            <div className="position-relative">
              <div style={{ position: 'absolute', top: -16, left: -16, width: 100, height: 100, background: '#9fc91a', borderRadius: 16, opacity: .35, zIndex: 0 }} />
              <img src="https://matrax-web-six.vercel.app/images/galeri-yeni/galeri-7.jpg" alt="Kurulum" className="img-fluid rounded-4 position-relative" style={{ zIndex: 1, boxShadow: '0 16px 48px rgba(0,0,0,.14)' }} />
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <p className="fw-black mb-2 text-uppercase" style={{ fontSize: 11, letterSpacing: '.2em', color: '#9fc91a' }}>BİZ KİMİZ?</p>
            <h2 className="fw-black mb-3" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', lineHeight: 1.2, color: '#1a1a1a' }}>
              Türkiye'nin Lider<br /><span style={{ color: '#9fc91a' }}>Trambolin Parkı</span> Üreticisi
            </h2>
            <p className="text-secondary mb-3" style={{ fontSize: 16, lineHeight: 1.75 }}>
              Sektördeki tecrübemiz ile kapalı ve açık alan eğlence merkezleri, trambolin parkları ve soft play sistemleri üretiminde Türkiye'nin öncü markalarından biri olmanın gururunu yaşıyoruz.
            </p>
            <p className="text-secondary mb-4" style={{ fontSize: 16, lineHeight: 1.75 }}>
              Tasarımından üretimine ve anahtar teslim kurulumuna kadar projenin tüm aşamalarını profesyonel ekibimizle yönetiyor, maksimum güvenliğe sahip yenilikçi oyun alanları inşa ediyoruz.
            </p>
            <div className="d-flex flex-column gap-2 mb-4">
              {['Uluslararası Güvenlik Standartları (EN-1176)', '%100 Yerli ve Milli Üretim', 'Profesyonel Satış Sonrası Destek ve Bakım'].map((item, i) => (
                <div key={i} className="d-flex align-items-center gap-2">
                  <CheckCircle2 size={20} color="#9fc91a" style={{ flexShrink: 0 }} />
                  <span className="fw-bold" style={{ fontSize: 15, color: '#1a1a1a' }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/iletisim" className="btn btn-brand rounded-pill px-5 py-3 fw-black d-inline-flex align-items-center gap-2">
              Bize Ulaşın <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Vizyon & Misyon */}
        <div className="row g-4">
          {[
            { title: 'Vizyonumuz', text: 'Sektördeki teknolojik gelişmeleri ve küresel trendleri yakından takip ederek, güvenli eğlencenin sınırlarını yeniden çizen, uluslararası arenada referans alınan bir dünya markası olmak.' },
            { title: 'Misyonumuz', text: 'Müşterilerimize yaratıcı ve maksimum güvenli özelleştirilmiş çözümler sunarken; çocukların fiziksel ve zihinsel gelişimini destekleyen sağlıklı oyun alanları tasarlamak.' },
          ].map((item, i) => (
            <div key={i} className="col-12 col-md-6">
              <div className="bg-white rounded-4 p-4 p-md-5 h-100" style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,.05)' }}>
                <h3 className="fw-black mb-3" style={{ fontSize: 20, color: '#1a1a1a' }}>{item.title}</h3>
                <p className="text-secondary mb-0" style={{ fontSize: 15, lineHeight: 1.75 }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
