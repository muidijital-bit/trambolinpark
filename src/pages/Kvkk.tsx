import { Helmet } from 'react-helmet-async';
import { FileText, Lock, Mail } from 'lucide-react';

const sections = [
  { title: '1. Veri Sorumlusu', body: 'Trambolinpark olarak; 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla, kişisel verilerinizin işlenmesine ilişkin usul ve esasları aşağıda bilgilerinize sunarız.' },
  { title: '2. İşlenen Kişisel Veriler', body: 'İletişim formu, telefon görüşmesi, e-posta yazışması ve sözleşme süreçleri kapsamında ad-soyad, telefon, e-posta, firma bilgisi, mesaj içeriği ve teslimat adresi gibi kimlik ve iletişim verileri işlenebilir.' },
  { title: '3. Kişisel Verilerin İşlenme Amaçları', body: 'Talep ve şikâyetlerin değerlendirilmesi, ürün/hizmet teklifi sunulması, sözleşme süreçlerinin yürütülmesi, satış sonrası destek, faturalandırma ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.' },
  { title: '4. Kişisel Verilerin Aktarımı', body: 'Kişisel verileriniz; yasal yükümlülüklerimiz çerçevesinde resmi kurum ve kuruluşlar ile hizmet aldığımız iş ortakları ve tedarikçilere, yalnızca işin gerektirdiği ölçüde ve KVKK md. 8-9 hükümleri uyarınca aktarılabilir.' },
  { title: '5. Toplanma Yöntemi ve Hukuki Sebebi', body: 'Veriler; web sitesi formları, telefon, e-posta ve fiziksel kanallar aracılığıyla; sözleşmenin kurulması/ifası, meşru menfaat ve açık rıza hukuki sebeplerine dayanılarak toplanır.' },
  { title: '6. KVKK Madde 11 Kapsamındaki Haklarınız', body: 'Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını öğrenme, eksik/yanlış işlenmişse düzeltilmesini isteme, silinmesini talep etme ve zarara uğramanız hâlinde tazminat talep etme haklarına sahipsiniz.' },
  { title: '7. Başvuru Yöntemi', body: 'KVKK kapsamındaki başvurularınızı info@trambolinpark.com adresine e-posta yoluyla iletebilirsiniz. Başvurularınız en geç 30 gün içinde sonuçlandırılır.' },
];

export default function Kvkk() {
  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <Helmet>
        <title>KVKK Aydınlatma Metni | Trambolinpark</title>
        <meta name="description" content="Trambolinpark KVKK aydınlatma metni: kişisel verilerinizin işlenme amaçları, hukuki sebepleri ve haklarınız hakkında bilgilendirme." />
        <link rel="canonical" href="https://trambolinpark.com/kvkk" />
      </Helmet>
      <div className="tp-page-hero">
        <div aria-hidden="true" className="tp-hero-watermark">KVKK</div>
        <div className="container">
          <span className="badge rounded-pill mb-3" style={{ background: 'rgba(195,233,45,.15)', color: '#c3e92d', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>KURUMSAL · KVKK</span>
          <div className="tp-hero-line" />
          <h1 className="display-5 fw-black text-white mb-2">Kişisel Verilerin <span style={{ color: '#c3e92d' }}>Korunması</span></h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 520 }}>6698 sayılı Kanun kapsamında kişisel verilerinizi nasıl işlediğimizi ve haklarınızı şeffaf biçimde açıklıyoruz.</p>
        </div>
      </div>
      <div className="container py-5" style={{ maxWidth: 860 }}>
        <div className="bg-white rounded-4 p-4 p-md-5" style={{ border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,.05)' }}>
          {sections.map((s, i) => (
            <div key={i} className={i < sections.length - 1 ? 'mb-4 pb-4 border-bottom' : ''}>
              <h2 className="d-flex align-items-center gap-2 fw-black mb-2" style={{ fontSize: 16, color: '#1a1a1a' }}>
                <span className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ width: 32, height: 32, background: 'rgba(195,233,45,.1)', color: 'var(--accent)' }}><FileText size={14} /></span>
                {s.title}
              </h2>
              <p className="mb-0 text-secondary" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 44 }}>{s.body}</p>
            </div>
          ))}
          <div className="mt-4 p-4 rounded-3 d-flex align-items-start gap-3" style={{ background: '#f5f5f5', border: '1px solid #e2e8f0' }}>
            <span className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ width: 40, height: 40, background: 'rgba(195,233,45,.1)', color: 'var(--accent)' }}><Lock size={18} /></span>
            <div>
              <p className="fw-black mb-1" style={{ fontSize: 14, color: '#1a1a1a' }}>Sorularınız için</p>
              <a href="mailto:info@trambolinpark.com" className="d-inline-flex align-items-center gap-1 text-brand fw-bold text-decoration-none" style={{ fontSize: 14 }}><Mail size={14} /> info@trambolinpark.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
