import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import purgecss from '@fullhuman/postcss-purgecss'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  css: {
    // Sadece production build'de çalışır — dev'de tüm Bootstrap sınıfları kalır,
    // geliştirirken hangi sınıfın kullanılabilir olduğunu kısıtlamaz.
    // Yalnızca bootstrap.min.css + index.css'i kaynak koddaki (src/**/*.tsx) gerçek
    // kullanıma göre küçültür; site hiçbir Bootstrap JS bileşeni (modal/dropdown/
    // collapse vb. data-bs-* API'si) kullanmıyor, yalnızca CSS grid/utility sınıfları —
    // bu yüzden içerik taraması güvenli. Yine de olası dinamik/JS-toggled sınıflar için
    // küçük bir safelist bırakıldı.
    postcss: mode === 'production' ? {
      plugins: [
        purgecss({
          content: ['./index.html', './src/**/*.{ts,tsx}'],
          safelist: {
            standard: ['show', 'fade', 'active', 'disabled', 'collapse', 'collapsing', /^spinner-/, /^tp-/, /^cursor-/],
          },
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        }),
      ],
    } : undefined,
  },
}))
