import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="tp-footer" style={{ color: '#737373', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container py-3">
        <div className="row g-4 g-md-5 mb-4">

          <div className="col-12 col-sm-6 col-lg-3">
            <Link to="/"><img src="/logo.png" alt="Trambolinpark" style={{ height: 40, objectFit: 'contain' }} /></Link>
            <p className="mt-3 mb-3" style={{ fontSize: 13, lineHeight: 1.7, color: '#64748b', maxWidth: 260 }}>
              Hem spor, hem eğlence, hem sağlık! Çocukların enerjisini güvenle keşfettiği alanlar tasarlıyoruz.
            </p>
            <div className="d-flex gap-2">
              {[
                { href: 'https://instagram.com/_trambolinpark_', label: 'Instagram', hoverColor: '#9fc91a', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { href: 'https://youtube.com/@trambolinpark', label: 'YouTube', hoverColor: '#9fc91a', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                { href: 'https://api.whatsapp.com/send?phone=905433494947', label: 'WhatsApp', hoverColor: '#25D366', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', transition: 'background .2s, color .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = s.hoverColor; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.06)'; (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}><path d={s.path}/></svg>
                </a>
              ))}
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <h6 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
              <span style={{ width: 24, height: 3, background: '#9fc91a', borderRadius: 2, display: 'inline-block' }} />
              Kurumsal
            </h6>
            <ul className="list-unstyled mb-0" style={{ fontSize: 13 }}>
              {[{ to: '/hakkimizda', l: 'Hakkımızda' }, { to: '/galeri', l: 'Galeri' }, { to: '/kvkk', l: 'KVKK' }, { to: '/cerez-politikasi', l: 'Çerez Politikası' }].map(x => (
                <li key={x.to} className="mb-2"><Link to={x.to} style={{ color: '#94a3b8', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#9fc91a')} onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>{x.l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h6 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
              <span style={{ width: 24, height: 3, background: '#9fc91a', borderRadius: 2, display: 'inline-block' }} />
              Ürünlerimiz
            </h6>
            <ul className="list-unstyled mb-0" style={{ fontSize: 13 }}>
              {[{ to: '/urunler/trambolinler', l: 'Trambolinler' }, { to: '/urunler/soft-play-havuzlar', l: 'Soft Play & Havuzlar' }, { to: '/urunler/sisme-park', l: 'Şişme Park' }, { to: '/yedek-parcalar', l: 'Yedek Parçalar' }].map(x => (
                <li key={x.to} className="mb-2"><Link to={x.to} style={{ color: '#94a3b8', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#9fc91a')} onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>{x.l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-lg-3">
            <h6 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
              <span style={{ width: 24, height: 3, background: '#9fc91a', borderRadius: 2, display: 'inline-block' }} />
              İletişim
            </h6>
            <ul className="list-unstyled mb-0" style={{ fontSize: 13 }}>
              <li className="mb-3"><span style={{ color: '#475569', display: 'block', fontSize: 11, marginBottom: 2 }}>Adres</span><span style={{ color: '#94a3b8', lineHeight: 1.6 }}>İvedik Osb 1372 Sok. No. 33/2<br />Yenimahalle / Ankara</span></li>
              <li className="mb-3"><span style={{ color: '#475569', display: 'block', fontSize: 11, marginBottom: 2 }}>E-posta</span><a href="mailto:info@trambolinpark.com" style={{ color: '#fff', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>info@trambolinpark.com</a></li>
              <li><span style={{ color: '#475569', display: 'block', fontSize: 11, marginBottom: 2 }}>WhatsApp</span><a href="https://api.whatsapp.com/send?phone=905433494947" target="_blank" rel="noreferrer" style={{ color: '#9fc91a', fontSize: 15, textDecoration: 'none', fontWeight: 800 }}>+90 543 349 49 47</a></li>
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2 pt-4" style={{ borderTop: '1px solid #1e293b' }}>
          <p className="mb-0" style={{ fontSize: 12, color: '#475569' }}>© {new Date().getFullYear()} TRAMBOLİNPARK — MakroKEY®. Tüm hakları saklıdır.</p>
          <div className="d-flex gap-3" style={{ fontSize: 12 }}>
            <Link to="/kvkk" style={{ color: '#475569', textDecoration: 'none' }}>KVKK</Link>
            <span style={{ color: '#334155' }}>·</span>
            <Link to="/cerez-politikasi" style={{ color: '#475569', textDecoration: 'none' }}>Çerez Politikası</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
