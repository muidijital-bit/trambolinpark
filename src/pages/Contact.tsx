import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Merhaba, iletişim formundan mesaj geldi:\n\nAd Soyad: ${form.name}\nTelefon: ${form.phone}\nE-posta: ${form.email}\nMesaj: ${form.message}`
    );
    window.open(`https://api.whatsapp.com/send?phone=905433494947&text=${text}`, '_blank');
    setSent(true);
    setForm({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24">
      <PageHeader
        title="İletişim"
        badge="BİZE ULAŞIN"
        description="Projeleriniz için en uygun çözümleri birlikte tasarlayalım. Bize hemen ulaşın."
      />

      <div className="container mx-auto px-4 lg:px-8 mt-12 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Sol — iletişim bilgileri */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm"
          >
            <h2 className="text-2xl font-black text-[#1a1a1a] mb-8">İletişim Bilgileri</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#9fc91a]/10 text-[#9fc91a] rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-black text-[#1a1a1a] mb-0.5">Adres</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    İvedik Osb 1372 Sok. No. 33/2<br />Yenimahalle / Ankara
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#9fc91a]/10 text-[#9fc91a] rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-black text-[#1a1a1a] mb-0.5">WhatsApp</h4>
                  <a
                    href="https://api.whatsapp.com/send?phone=905433494947"
                    target="_blank" rel="noreferrer"
                    className="text-slate-500 hover:text-[#9fc91a] transition-colors text-sm font-medium"
                  >
                    +90 543 349 49 47
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#9fc91a]/10 text-[#9fc91a] rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-black text-[#1a1a1a] mb-0.5">E-Posta</h4>
                  <a
                    href="mailto:info@trambolinpark.com"
                    className="text-slate-500 hover:text-[#9fc91a] transition-colors text-sm font-medium"
                  >
                    info@trambolinpark.com
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://api.whatsapp.com/send?phone=905433494947"
              target="_blank" rel="noreferrer"
              className="mt-8 flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe57] text-white font-black py-4 rounded-2xl transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp ile Yaz
            </a>
          </motion.div>

          {/* Sağ — iletişim formu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm"
          >
            <h2 className="text-2xl font-black text-[#1a1a1a] mb-8">Mesaj Gönderin</h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <CheckCircle2 size={48} className="text-[#9fc91a]" />
                <p className="text-[#1a1a1a] font-black text-lg">Mesajınız iletildi!</p>
                <p className="text-slate-500 text-sm text-center">WhatsApp'tan devam edebilirsiniz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Ad Soyad *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Adınız Soyadınız"
                      className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] outline-none focus:border-[#9fc91a] focus:ring-2 focus:ring-[#9fc91a]/20 transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Telefon</label>
                    <input
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+90 5xx xxx xx xx"
                      className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] outline-none focus:border-[#9fc91a] focus:ring-2 focus:ring-[#9fc91a]/20 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">E-Posta</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="ornek@email.com"
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] outline-none focus:border-[#9fc91a] focus:ring-2 focus:ring-[#9fc91a]/20 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5">Mesajınız *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Projeniz veya ürün hakkında bilgi almak istediğiniz konuyu yazın..."
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#1a1a1a] outline-none focus:border-[#9fc91a] focus:ring-2 focus:ring-[#9fc91a]/20 transition-all resize-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 w-full bg-[#9fc91a] hover:bg-[#8ab516] text-white font-black py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#9fc91a]/25"
                >
                  <Send size={18} /> Gönder
                </button>

                <p className="text-center text-xs text-slate-400">
                  Form gönderildiğinde WhatsApp üzerinden iletilir.
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
