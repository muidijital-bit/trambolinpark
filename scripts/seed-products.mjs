import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://skucanbrmuceruasvjui.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TP = 'https://trambolinpark.com';
const img = (path) => `${TP}/${path}`.replace('/200x200/', '/350x350/');

const OLIMPiK_FEATURES = [
  'EN-1176 / EN-913 Sertifikalı',
  'Galvanizli Çelik İskelet (Paslanmaz)',
  '6 mm Çelik Yay — Çift Galvaniz Kaplama',
  'A-1 Kalite UV Dayanımlı PVC Yay Pedi',
  'Mantar Profil Kenar Koruması',
  'Anahtar Teslim Kurulum',
  '2 Yıl Üretici Garantisi',
];

const JUNIOR_FEATURES = [
  'EN-1176 / EN-913 Sertifikalı',
  '4-10 Yaş Grubuna Özel Junior Ölçü',
  'Galvanizli Çelik İskelet (Paslanmaz)',
  '6 mm Çelik Yay — Çift Galvaniz Kaplama',
  'A-1 Kalite UV Dayanımlı PVC Yay Pedi',
  'Mantar Profil Kenar Koruması',
  'Anahtar Teslim Kurulum',
  '2 Yıl Üretici Garantisi',
];

const SOFTPLAY_FEATURES = [
  'EN-1176 Sertifikalı Tasarım',
  'Yangın Geciktirici (B-s1, d0) Sünger Dolgu',
  'Antibakteriyel & Yıkanabilir PVC Kaplama',
  'Yumuşak Köşe & Kenar Tasarımı',
  'Renk Garantili UV Stabilizatörlü Malzeme',
  'Modüler — Birleştirilebilir',
];

const PARK_FEATURES = [
  'EN-1176 / EN-913 Sertifikalı Anahtar Teslim Park',
  'Yüksek Yoğunluklu Sünger Havuzları',
  'Galvaniz Çelik Konstrüksiyon',
  'Profesyonel İşletme Yoğunluğu için Tasarım',
  'Modüler Genişletilebilir Plan',
  'Mimari & Teknik Çizim Hizmeti Dahil',
  '2 Yıl Üretici Garantisi',
];

const HAVUZ_FEATURES = [
  'EN-1176 Sertifikalı',
  'Yüksek Yoğunluklu Köpük Duvarlar',
  'Antibakteriyel & Yıkanabilir PVC Kaplama',
  'CE Sertifikalı 8 cm Toplar Dahil',
  'Özel Boyut ve Renk Seçeneği',
  'Anahtar Teslim Kurulum',
];

const OYUNCAK_FEATURES = [
  'EN-1176 Sertifikalı',
  'Antibakteriyel & Yıkanabilir PVC Kaplama',
  'Yangın Geciktirici Sünger Dolgu',
  'Yumuşak Köşe Tasarımı',
  'Modüler Yapı',
];

const products = [
  // TEKLİ TRAMBOLİNLER
  { id: 'tb-tekli-1', title: 'Ticari Kare Trambolin 1 Kişilik', description: 'Ticari kullanıma uygun kare trambolin. Profesyonel eğlence merkezleri için ideal.', image_url: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$rv9Bx1Zt2aqGpDaGJpjH.jpg`, category: 'tekli-trambolinler', category_name: 'Tekli Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'tb-tekli-2', title: 'Ticari Kare Trambolin 2 Kişilik', description: 'İki kişilik ticari kare trambolin modeli. Galvanizli çelik iskelet ve UV dayanımlı yay pedi.', image_url: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$aWyahTLXI61Tyl8kFDEl.jpg`, category: 'tekli-trambolinler', category_name: 'Tekli Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'tb-tekli-3', title: 'Ticari Kare Trambolin 3 Kişilik', description: 'Üç kişilik ticari kare trambolin. Yüksek yoğunluklu kullanım için dayanıklı yapı.', image_url: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$WTInI4C6vO2ZOLdaAE6g.jpg`, category: 'tekli-trambolinler', category_name: 'Tekli Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'tb-tekli-4', title: 'Ticari Kare Trambolin 4 Kişilik', description: 'Dört kişilik ticari kare trambolin. Yüksek dayanıklılık ve güvenlik standartları.', image_url: `${TP}/album/trambolinparkyeni/urunler/II7N6JBcpS1KZLZOAk6O.jpg`, category: 'tekli-trambolinler', category_name: 'Tekli Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'tb-tekli-5', title: 'Ticari Kare Trambolin 5 Kişilik', description: 'Beş kişilik ticari kare trambolin. Geniş atlama yüzeyi ve sağlam konstrüksiyonu ile öne çıkar.', image_url: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$03UxdqFQy1mlU5xTZEQc.jpg`, category: 'tekli-trambolinler', category_name: 'Tekli Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'tb-tekli-6', title: 'Ticari Kare Trambolin 6 Kişilik', description: 'Altı kişilik ticari kare trambolin. Eğlence parkları için profesyonel çözüm.', image_url: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$z70rxGQ4nYF1EgfPtcUz.jpg`, category: 'tekli-trambolinler', category_name: 'Tekli Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'tb-tekli-7', title: 'Ticari Kare Trambolin 8 Kişilik', description: 'Sekiz kişilik ticari kare trambolin. Büyük kapasiteli eğlence tesisleri için ideal.', image_url: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$75pLpRx6IWjwkvlu3hsd.jpg`, category: 'tekli-trambolinler', category_name: 'Tekli Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'tb-tekli-8', title: 'Ticari Kare Trambolin 10 Kişilik', description: 'On kişilik ticari kare trambolin. Yoğun kullanım için güçlendirilmiş çelik yapı.', image_url: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$7IqBTPuyBSbrW8yD2nQm.jpg`, category: 'tekli-trambolinler', category_name: 'Tekli Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'tb-tekli-9', title: 'Ticari Kare Trambolin 12 Kişilik', description: 'On iki kişilik ticari kare trambolin. Maksimum kapasite ve dayanıklılık.', image_url: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$YliVTf2jGI7EUEeS6D9G.jpg`, category: 'tekli-trambolinler', category_name: 'Tekli Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'tb-tekli-10', title: 'Ticari Kare Trambolin 15 Kişilik', description: 'On beş kişilik büyük boy ticari kare trambolin. Büyük eğlence merkezleri için.', image_url: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$aV21Z34gSPnTk89Hn3qX.jpg`, category: 'tekli-trambolinler', category_name: 'Tekli Trambolinler', features: OLIMPiK_FEATURES },

  // YER/ZEMİN TRAMBOLİN
  { id: 'tb-yer-1', title: 'Yer Park (Zemin) Trambolin TP-12', description: 'Zemin seviyesine gömülü trambolin. Düşme riski olmadan maksimum güvenlik.', image_url: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$nLGXYo1NzSU8VLqvA559.jpeg`, category: 'yer-zemin-trambolin', category_name: 'Yer/Zemin Trambolin', features: OLIMPiK_FEATURES },
  { id: 'tb-yer-2', title: 'Yer Park (Zemin) Trambolin TP-14', description: 'Zemin seviyesinde kurulum için tasarlanmış ticari trambolin. Park alanlarında güvenli kullanım.', image_url: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$03UxdqFQy1mlU5xTZEQc.jpg`, category: 'yer-zemin-trambolin', category_name: 'Yer/Zemin Trambolin', features: OLIMPiK_FEATURES },
  { id: 'tb-yer-3', title: 'Yer Park (Zemin) Trambolin TP-16', description: 'Geniş zemin trambolini. Profesyonel parklar için yer seviyesi atlama alanı.', image_url: `${TP}/media/image/350x350/album$trambolinparkyeni$urunler$z70rxGQ4nYF1EgfPtcUz.jpg`, category: 'yer-zemin-trambolin', category_name: 'Yer/Zemin Trambolin', features: OLIMPiK_FEATURES },

  // SALTO TRAMBOLİN
  { id: 'tb-salto-1', title: 'Salto Trambolin TP-122', description: 'Akrobatik hareketler için özel salto trambolini. Geniş atlama yüzeyi, güçlü yay sistemi.', image_url: `${TP}/album/trambolinparkyeni/urunler/2SbOOLt8h3RdZRameKiQ.jpg`, category: 'salto-trambolin', category_name: 'Salto Trambolin', features: ['Model: TP-122', 'Geniş atlama yüzeyi', 'Güçlü yay sistemi', 'Akrobatik hareketlere uygun', 'Eksiksiz güvenlik donanımı'] },

  // OLİMPİK TRAMBOLİNLER
  { id: 'olp-110', title: '1 Kişilik Olimpik Trambolin TP-110', description: '1 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/1-kisilik-olimpik-trambolin-tp-110-EAr.jpg`, category: 'olimpik-trambolinler', category_name: 'Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-111', title: '2 Kişilik Olimpik Trambolin TP-111', description: '2 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/2-kisilik-olimpik-trambolin-tp-111-CMr.jpg`, category: 'olimpik-trambolinler', category_name: 'Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-112', title: '3 Kişilik Olimpik Trambolin TP-112', description: '3 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/3-kisilik-olimpik-trmbolin-tp-112-r2B.jpg`, category: 'olimpik-trambolinler', category_name: 'Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-114', title: '4 Kişilik Olimpik Trambolin TP-114', description: '4 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/4-kisilik-olimpik-trambolin-tp-114-ZUr.jpg`, category: 'olimpik-trambolinler', category_name: 'Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-116', title: '6 Kişilik Olimpik Trambolin TP-116', description: '6 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/6-kisilik-olimpik-trambolin-tp-116-nnc.jpg`, category: 'olimpik-trambolinler', category_name: 'Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-119', title: '8 Kişilik Olimpik Trambolin TP-119', description: '8 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/8-kisilik-olimpik-trambolin-tp-119-fDa.jpg`, category: 'olimpik-trambolinler', category_name: 'Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-120', title: '10 Kişilik Olimpik Trambolin TP-120', description: '10 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/10-kisilik-olimpik-trambolin-tp-120-6C2.jpg`, category: 'olimpik-trambolinler', category_name: 'Olimpik Trambolinler', features: OLIMPiK_FEATURES },
  { id: 'olp-121', title: '12 Kişilik Olimpik Trambolin TP-121', description: '12 kişilik olimpik standart ölçü ticari trambolin. Galvanizli çelik iskelet, 6 mm çift kaplamalı yaylar.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/12-kisilik-olimpik-trambolin-tp-121-dx6.jpg`, category: 'olimpik-trambolinler', category_name: 'Olimpik Trambolinler', features: OLIMPiK_FEATURES },

  // PROFESYONEL TRAMBOLİN
  { id: 'prof-113', title: '4 Kişilik İnce Uzun Olimpik Trambolin TP-113', description: '4 kişilik ince ve uzun gövde tasarımlı olimpik trambolin. Dar koridorlar için ideal.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/4-kisilik-ince-uzun-olimpik-trambolin-tp-113-CZK.jpg`, category: 'profesyonel-trambolin', category_name: 'Profesyonel Trambolin', features: OLIMPiK_FEATURES },
  { id: 'prof-115', title: '5 Kişilik İnce Uzun Olimpik Trambolin TP-115', description: '5 kişilik ince ve uzun gövde tasarımlı olimpik trambolin. Dar koridorlar için ideal.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/5-kisilik-ince-uzun-olimpik-trambolin-tp-115-JCZ.jpg`, category: 'profesyonel-trambolin', category_name: 'Profesyonel Trambolin', features: OLIMPiK_FEATURES },
  { id: 'prof-117', title: '6 Kişilik İnce Uzun Olimpik Trambolin TP-117', description: '6 kişilik ince ve uzun gövde tasarımlı olimpik trambolin. Dar koridorlar için ideal.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/6-kisilik-ince-uzun-olimpik-trambolin-tp-117-y6M.jpg`, category: 'profesyonel-trambolin', category_name: 'Profesyonel Trambolin', features: OLIMPiK_FEATURES },
  { id: 'prof-118', title: '8 Kişilik İnce Uzun Olimpik Trambolin TP-118', description: '8 kişilik ince ve uzun gövde tasarımlı olimpik trambolin. Dar koridorlar için ideal.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/8-kisilik-ince-uzun-olimpik-trmbolin-tp-118-TI6.jpg`, category: 'profesyonel-trambolin', category_name: 'Profesyonel Trambolin', features: OLIMPiK_FEATURES },

  // TİCARİ JUNIOR
  { id: 'jnr-101', title: 'Ticari Junior Trambolin 1 Kişilik TP-101', description: '4-10 yaş grubuna özel 1 kişilik ticari junior trambolin.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$iIxeQoNoJpXNWUDa2qja.jpg'), category: 'ticari-junior', category_name: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-102', title: 'Ticari Junior Trambolin 2 Kişilik TP-102', description: '4-10 yaş grubuna özel 2 kişilik ticari junior trambolin.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$uF2UnUuAh1bf2J1iMfCI.jpg'), category: 'ticari-junior', category_name: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-103', title: 'Ticari Junior Trambolin 3 Kişilik TP-103', description: '4-10 yaş grubuna özel 3 kişilik ticari junior trambolin.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$awreZiFS6HgnlAlUL4o7.jpg'), category: 'ticari-junior', category_name: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-104', title: 'Ticari Junior Trambolin 4 Kişilik TP-104', description: '4-10 yaş grubuna özel 4 kişilik ticari junior trambolin.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$8DdbBFHKZfe6mRffgxKH.jpg'), category: 'ticari-junior', category_name: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-105', title: 'Ticari Junior Trambolin 5 Kişilik TP-105', description: '4-10 yaş grubuna özel 5 kişilik ticari junior trambolin.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$Vi637h7t1JeE4CdEtTEP.jpg'), category: 'ticari-junior', category_name: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-106', title: 'Ticari Junior Trambolin 6 Kişilik TP-106', description: '4-10 yaş grubuna özel 6 kişilik ticari junior trambolin.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$oyGMLheQbx9Oyrreu1Wd.jpg'), category: 'ticari-junior', category_name: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-107', title: 'Ticari Junior Trambolin 8 Kişilik TP-107', description: '4-10 yaş grubuna özel 8 kişilik ticari junior trambolin.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$RlqryWIgvYG1SGlW0CGU.jpg'), category: 'ticari-junior', category_name: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-108', title: 'Ticari Junior Trambolin 10 Kişilik TP-108', description: '4-10 yaş grubuna özel 10 kişilik ticari junior trambolin.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$IhbCWRutyIJ8IjtNFWZv.jpg'), category: 'ticari-junior', category_name: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },
  { id: 'jnr-109', title: 'Ticari Junior Trambolin 12 Kişilik TP-109', description: '4-10 yaş grubuna özel 12 kişilik ticari junior trambolin.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$tp02bhOB1ZaoJgTrfv0e.jpg'), category: 'ticari-junior', category_name: 'Ticari Junior Trambolin', features: JUNIOR_FEATURES },

  // TRAMBOLİN PARKLARI
  { id: 'tp-205', title: 'Trambolin Park TP-205', description: 'Profesyonel anahtar teslim trambolin park kurulumu. Zıplama yüzeyleri, sünger havuzu ve aktivite modülleri.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-VkT.jpg`, category: 'trambolin-parklari', category_name: 'Trambolin Parkları', features: PARK_FEATURES },
  { id: 'tp-206', title: 'Trambolin Park TP-206', description: 'Profesyonel anahtar teslim trambolin park kurulumu. Zıplama yüzeyleri, sünger havuzu ve aktivite modülleri.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-ymA.jpg`, category: 'trambolin-parklari', category_name: 'Trambolin Parkları', features: PARK_FEATURES },
  { id: 'tp-207', title: 'Trambolin Park TP-207', description: 'Profesyonel anahtar teslim trambolin park kurulumu. Zıplama yüzeyleri, sünger havuzu ve aktivite modülleri.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-lk6.jpg`, category: 'trambolin-parklari', category_name: 'Trambolin Parkları', features: PARK_FEATURES },
  { id: 'tp-208', title: 'Trambolin Park TP-208', description: 'Profesyonel anahtar teslim trambolin park kurulumu. Zıplama yüzeyleri, sünger havuzu ve aktivite modülleri.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-3l3.jpg`, category: 'trambolin-parklari', category_name: 'Trambolin Parkları', features: PARK_FEATURES },
  { id: 'tp-209', title: 'Trambolin Park TP-209', description: 'Profesyonel anahtar teslim trambolin park kurulumu. Eksiksiz eğlence merkezi çözümü.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-VkT.jpg`, category: 'trambolin-parklari', category_name: 'Trambolin Parkları', features: PARK_FEATURES },

  // KÜÇÜK TOP HAVUZLARI
  { id: 'th-311', title: 'Top Havuzu TP-311', description: 'Ticari kullanıma uygun top havuzu. Yüksek yoğunluklu köpük duvarlar, antibakteriyel PVC kaplama.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-Wao.png`, category: 'kucuk-top-havuzlari', category_name: 'Küçük Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-312', title: 'Top Havuzu TP-312', description: 'Ticari kullanıma uygun top havuzu. Kolay temizlenebilir PVC kaplama ile hijyenik kullanım.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-WbD.jpg`, category: 'kucuk-top-havuzlari', category_name: 'Küçük Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-313', title: 'Top Havuzu TP-313', description: 'Eğlence merkezi ve oyun alanları için kompakt top havuzu.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-JvF.jpg`, category: 'kucuk-top-havuzlari', category_name: 'Küçük Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-314', title: 'Top Havuzu TP-314', description: 'Orta ölçekli işletmeler için ticari top havuzu.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-I6R.jpg`, category: 'kucuk-top-havuzlari', category_name: 'Küçük Top Havuzları', features: HAVUZ_FEATURES },

  // İŞLETMELERE TOP HAVUZLARI
  { id: 'th-315', title: 'Top Havuzu TP-315', description: 'Orta ölçekli işletmeler için tasarlanmış ticari top havuzu.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-uET.jpg`, category: 'isletmelere-top-havuzlari', category_name: 'İşletmelere Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-316', title: 'Top Havuzu TP-316', description: 'Yüksek kapasiteli işletmeler için geniş orta boy ticari top havuzu.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-Zwu.jpg`, category: 'isletmelere-top-havuzlari', category_name: 'İşletmelere Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-317', title: 'Top Havuzu TP-317', description: 'Ticari eğlence sektörü için üretilmiş orta boy top havuzu.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-xwg.jpg`, category: 'isletmelere-top-havuzlari', category_name: 'İşletmelere Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-318', title: 'Top Havuzu TP-318', description: 'Eğlence merkezi ve AVM oyun alanları için geniş kapasiteli ticari top havuzu.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-lcb.jpg`, category: 'isletmelere-top-havuzlari', category_name: 'İşletmelere Top Havuzları', features: HAVUZ_FEATURES },
  { id: 'th-319', title: 'Top Havuzu TP-319', description: 'Büyük ticari tesisler için büyük boy top havuzu çözümü.', image_url: `${TP}/album/trambolinparkyeni/coklualbumler/-9H4.jpg`, category: 'isletmelere-top-havuzlari', category_name: 'İşletmelere Top Havuzları', features: HAVUZ_FEATURES },

  // SOFT PLAY OYUN ALANLARI
  { id: 'sp-501', title: 'Softplay Park TP-501', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleri.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$kjgxoxbLjL8vG5l.jpeg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-502', title: 'Softplay Park TP-502', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleri.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$FV3OamzHMw8iR61.jpeg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-503', title: 'Softplay Park TP-503', description: 'Profesyonel modüler soft play oyun sistemi. Tırmanma, kaydırak, tünel ve engel parkuru modülleri.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$4IgH4UwNDa1tQMs.jpg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-504', title: 'Softplay Park TP-504', description: 'Profesyonel modüler soft play oyun sistemi.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$Uqt8gLiSjgA6pon.jpg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-505', title: 'Softplay Park TP-505', description: 'Orta ölçekli eğlence tesisleri için ideal soft play oyun kompleksi.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$hlsMpXHkFC2OtM2.jpg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-506', title: 'Softplay Park TP-506', description: 'Profesyonel modüler soft play oyun sistemi.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$Zw8A7X6eAOlXDUI.jpg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-507', title: 'Softplay Park TP-507', description: 'Profesyonel modüler soft play oyun sistemi.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$FOrSGnRGStPYr1Q.jpg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-508', title: 'Softplay Park TP-508', description: 'Profesyonel modüler soft play oyun sistemi.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$6X8kFJZaOfKasT6ACtsq.jpeg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-509', title: 'Softplay Park TP-509', description: 'Profesyonel modüler soft play oyun sistemi.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$HaI00mz3PCBnGYjI9VTw.jpeg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-510', title: 'Softplay Park TP-510', description: 'Büyük ölçekli eğlence merkezleri için kapsamlı soft play sistemi.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$DiDyhtrFKkUfRPMIVQfZ.jpeg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-511', title: 'Softplay Park TP-511', description: 'Profesyonel modüler soft play oyun sistemi.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$CV0fkQbGBCPiKPxdibD8.jpeg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-512', title: 'Softplay Park TP-512', description: 'Profesyonel modüler soft play oyun sistemi.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$C0EDMD8dwVJvy0R4X5R7.jpeg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-513', title: 'Softplay Park TP-513', description: 'Profesyonel modüler soft play oyun sistemi.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$3ypNiUgT7VW8gAR2mUXv.jpeg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-514', title: 'Softplay Park TP-514', description: 'Büyük ölçekli soft play kompleksi.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$RlP2AUzNK0fMkPVrHMRi.jpeg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-515', title: 'Softplay Park TP-515', description: 'Modüler soft play sistemi, AVM ve eğlence merkezleri için.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$kjgxoxbLjL8vG5l.jpeg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },
  { id: 'sp-516', title: 'Softplay Park TP-516', description: 'Kapsamlı soft play kurulum paketi.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$FV3OamzHMw8iR61.jpeg'), category: 'soft-play-oyun-alanlari', category_name: 'Soft Play Oyun Alanları', features: SOFTPLAY_FEATURES },

  // SOFT PLAY OYUNCAKLAR
  { id: 'spo-701', title: 'Soft Play Oyuncak TP-701', description: 'Küçük çocuklar için güvenli soft play oyuncak.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$kjgxoxbLjL8vG5l.jpeg'), category: 'soft-play-oyuncaklar', category_name: 'Soft Play Oyuncaklar', features: OYUNCAK_FEATURES },
  { id: 'spo-702', title: 'Soft Play Oyuncak TP-702', description: 'Küçük çocuklar için güvenli soft play oyuncak.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$FV3OamzHMw8iR61.jpeg'), category: 'soft-play-oyuncaklar', category_name: 'Soft Play Oyuncaklar', features: OYUNCAK_FEATURES },
  { id: 'spo-703', title: 'Soft Play Oyuncak TP-703', description: 'Küçük çocuklar için güvenli soft play oyuncak.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$4IgH4UwNDa1tQMs.jpg'), category: 'soft-play-oyuncaklar', category_name: 'Soft Play Oyuncaklar', features: OYUNCAK_FEATURES },
  { id: 'spo-704', title: 'Soft Play Oyuncak TP-704', description: 'Küçük çocuklar için güvenli soft play oyuncak.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$Uqt8gLiSjgA6pon.jpg'), category: 'soft-play-oyuncaklar', category_name: 'Soft Play Oyuncaklar', features: OYUNCAK_FEATURES },
  { id: 'spo-705', title: 'Soft Play Oyuncak TP-705', description: 'Küçük çocuklar için güvenli soft play oyuncak.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$hlsMpXHkFC2OtM2.jpg'), category: 'soft-play-oyuncaklar', category_name: 'Soft Play Oyuncaklar', features: OYUNCAK_FEATURES },
  { id: 'spo-706', title: 'Soft Play Oyuncak TP-706', description: 'Küçük çocuklar için güvenli soft play oyuncak.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$Zw8A7X6eAOlXDUI.jpg'), category: 'soft-play-oyuncaklar', category_name: 'Soft Play Oyuncaklar', features: OYUNCAK_FEATURES },
  { id: 'spo-707', title: 'Soft Play Oyuncak TP-707', description: 'Küçük çocuklar için güvenli soft play oyuncak.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$FOrSGnRGStPYr1Q.jpg'), category: 'soft-play-oyuncaklar', category_name: 'Soft Play Oyuncaklar', features: OYUNCAK_FEATURES },
  { id: 'spo-708', title: 'Soft Play Oyuncak TP-708', description: 'Küçük çocuklar için güvenli soft play oyuncak.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$6X8kFJZaOfKasT6ACtsq.jpeg'), category: 'soft-play-oyuncaklar', category_name: 'Soft Play Oyuncaklar', features: OYUNCAK_FEATURES },
  { id: 'spo-709', title: 'Soft Play Oyuncak TP-709', description: 'Küçük çocuklar için güvenli soft play oyuncak.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$HaI00mz3PCBnGYjI9VTw.jpeg'), category: 'soft-play-oyuncaklar', category_name: 'Soft Play Oyuncaklar', features: OYUNCAK_FEATURES },
  { id: 'spo-710', title: 'Soft Play Oyuncak TP-710', description: 'Küçük çocuklar için güvenli soft play oyuncak.', image_url: img('media/image/200x200/album$trambolinparkyeni$urunler$DiDyhtrFKkUfRPMIVQfZ.jpeg'), category: 'soft-play-oyuncaklar', category_name: 'Soft Play Oyuncaklar', features: OYUNCAK_FEATURES },
];

async function seed() {
  console.log(`📦 ${products.length} ürün yükleniyor...`);

  // Upsert in batches of 20
  for (let i = 0; i < products.length; i += 20) {
    const batch = products.slice(i, i + 20);
    const { error } = await supabase.from('products').upsert(batch, { onConflict: 'id' });
    if (error) {
      console.error('❌ Hata:', error.message);
      process.exit(1);
    }
    console.log(`✅ ${Math.min(i + 20, products.length)}/${products.length} ürün yüklendi`);
  }

  console.log('🎉 Tüm ürünler başarıyla Supabase\'e aktarıldı!');
}

seed();
