// GA4 event yardımcıları. gtag, App.tsx > SiteHelmet içinde yalnızca site_settings'te
// bir Google Analytics ID tanımlıysa yüklenir — o yüzden burada her çağrı güvenli şekilde
// window.gtag varlığını kontrol eder (ID girilmemişse hiçbir şey yapmaz, hata atmaz).
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// gtag.js kurulumunu JS üzerinden, imperatif olarak yapar. Daha önce bu kurulum
// Helmet içinde satır içi <script>{...}</script> olarak render ediliyordu — ama
// React/react-helmet-async boş bir <script> elementini önce DOM'a ekleyip içeriğini
// sonradan dolduruyor, tarayıcılar bu şekilde eklenen satır içi script'leri
// ÇALIŞTIRMAZ (script içeriği, elemente eklenmeden önce hazır olmalı). Sonuç:
// window.gtag hiç tanımlanmıyor, trackEvent/trackPageView sessizce no-op oluyor,
// hiçbir event GA4'e ulaşmıyordu. Bu fonksiyon dataLayer/gtag'i doğrudan JS ile
// kurup script'i document.createElement ile ekleyerek bu tuzağı bypass eder.
export function initGtag(measurementId: string) {
  if (typeof window === 'undefined' || !measurementId) return;
  if (typeof window.gtag === 'function') return; // zaten kurulu (StrictMode / re-render)

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

// SPA route değişiminde manuel page_view — gtag.js yalnızca ilk script yüklendiğinde
// otomatik page_view atar, React Router ile yapılan sonraki geçişleri görmez.
export function trackPageView(path: string) {
  trackEvent('page_view', {
    page_path: path,
    page_location: window.location.href,
  });
}

// tel: / mailto: / WhatsApp linklerine tıklamaları dönüşüm olarak işaretler.
// document üzerinde tek bir delege click listener — sitede yeni bir CTA eklendiğinde
// ayrıca kod eklemeye gerek kalmaz, otomatik yakalanır.
export function initClickTracking() {
  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest('a[href]') as HTMLAnchorElement | null;
    if (!link) return;
    const href = link.getAttribute('href') ?? '';
    const common = { link_url: href, page_path: window.location.pathname };
    if (href.startsWith('tel:')) {
      trackEvent('phone_click', common);
    } else if (href.startsWith('mailto:')) {
      trackEvent('email_click', common);
    } else if (href.includes('api.whatsapp.com') || href.includes('wa.me')) {
      trackEvent('whatsapp_click', common);
    }
  };
  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler);
}
