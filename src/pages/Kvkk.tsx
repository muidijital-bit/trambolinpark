import { ShieldCheck, FileText, Lock, Mail } from 'lucide-react';

const sections = [
  {
    title: '1. Veri Sorumlusu',
    body: 'Trambolinpark (Makrokey®) olarak; 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla, kişisel verilerinizin işlenmesine ilişkin usul ve esasları aşağıda bilgilerinize sunarız.',
  },
  {
    title: '2. İşlenen Kişisel Veriler',
    body: 'İletişim formu, telefon görüşmesi, e-posta yazışması ve sözleşme süreçleri kapsamında ad-soyad, telefon, e-posta, firma bilgisi, mesaj içeriği ve teslimat adresi gibi kimlik ve iletişim verileri işlenebilir.',
  },
  {
    title: '3. Kişisel Verilerin İşlenme Amaçları',
    body: 'Talep ve şikâyetlerin değerlendirilmesi, ürün/hizmet teklifi sunulması, sözleşme süreçlerinin yürütülmesi, satış sonrası destek, faturalandırma ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.',
  },
  {
    title: '4. Kişisel Verilerin Aktarımı',
    body: 'Kişisel verileriniz; yasal yükümlülüklerimiz çerçevesinde resmi kurum ve kuruluşlar ile hizmet aldığımız iş ortakları ve tedarikçilere, yalnızca işin gerektirdiği ölçüde ve KVKK md. 8-9 hükümleri uyarınca aktarılabilir.',
  },
  {
    title: '5. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi',
    body: 'Veriler; web sitesi formları, telefon, e-posta ve fiziksel kanallar aracılığıyla; sözleşmenin kurulması/ifası, meşru menfaat ve açık rıza hukuki sebeplerine dayanılarak toplanır.',
  },
  {
    title: '6. KVKK Madde 11 Kapsamındaki Haklarınız',
    body: 'Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını öğrenme, eksik/yanlış işlenmişse düzeltilmesini isteme, silinmesini/yok edilmesini talep etme, üçüncü kişilere yapılan aktarımları öğrenme ve zarara uğramanız hâlinde tazminat talep etme haklarına sahipsiniz.',
  },
  {
    title: '7. Başvuru Yöntemi',
    body: 'KVKK kapsamındaki başvurularınızı, kimliğinizi tespit edici belgelerle birlikte info@trambolinpark.com adresine e-posta yoluyla veya tarafımıza fiziki olarak iletebilirsiniz. Başvurularınız, talebin niteliğine göre en geç 30 gün içinde sonuçlandırılır.',
  },
];

export default function Kvkk() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Header */}
      <section className="bg-[#1a1a1a] pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="inline-flex items-center gap-2 text-[#9fc91a] font-extrabold text-xs tracking-widest uppercase mb-4">
            <ShieldCheck size={13} /> KURUMSAL · KVKK
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Kişisel Verilerin Korunması<br />
            <span className="text-[#9fc91a]">Aydınlatma Metni</span>
          </h1>
          <p className="text-gray-400 mt-4 text-base max-w-2xl leading-relaxed">
            6698 sayılı Kanun kapsamında kişisel verilerinizi nasıl topladığımızı, işlediğimizi ve haklarınızı şeffaf biçimde açıklıyoruz.
          </p>
        </div>
      </section>

      {/* İçerik */}
      <section className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-14">
          {sections.map((s, i) => (
            <div key={i} className="mb-8 last:mb-0">
              <h2 className="flex items-center gap-3 text-lg font-black text-[#1a1a1a] mb-3">
                <span className="w-8 h-8 rounded-lg bg-[#9fc91a]/10 text-[#9fc91a] flex items-center justify-center shrink-0">
                  <FileText size={15} />
                </span>
                {s.title}
              </h2>
              <p className="text-slate-600 leading-relaxed pl-11">{s.body}</p>
            </div>
          ))}

          <div className="mt-10 p-6 rounded-2xl bg-[#f8fafc] border border-slate-100 flex items-start gap-4">
            <span className="w-10 h-10 rounded-xl bg-[#9fc91a]/10 text-[#9fc91a] flex items-center justify-center shrink-0">
              <Lock size={18} />
            </span>
            <div>
              <p className="font-black text-[#1a1a1a] mb-1">Sorularınız için</p>
              <a href="mailto:info@trambolinpark.com" className="inline-flex items-center gap-2 text-[#9fc91a] font-bold hover:opacity-80 transition-opacity">
                <Mail size={14} /> info@trambolinpark.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
