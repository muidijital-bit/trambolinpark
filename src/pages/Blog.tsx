import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Blog() {
  const [featured, ...rest] = blogPosts;

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* Hero */}
      <div className="tp-page-hero">
        <div aria-hidden="true" className="tp-hero-watermark">BLOG</div>
        <div className="container">
          <span className="badge rounded-pill mb-3" style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', padding: '.4rem 1rem' }}>
            Sektör & Bilgi
          </span>
          <div className="tp-hero-line" />
          <h1>Trambolinpark <span>Blog</span></h1>
          <p>Trambolin parkı yatırımı, güvenlik standartları ve işletme stratejileri üzerine sektör içgörüleri.</p>
        </div>
      </div>

      <div className="container py-5">

        {/* Featured post */}
        <div className="mb-5">
          <Link to={`/blog/${featured.slug}`} className="text-decoration-none d-block">
            <div className="row g-0 rounded-4 overflow-hidden bg-white" style={{ boxShadow: '0 4px 32px rgba(0,0,0,.07)', transition: 'transform .25s, box-shadow .25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(0,0,0,.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 32px rgba(0,0,0,.07)'; }}>

              <div className="col-12 col-lg-6">
                <div style={{ aspectRatio: '16/10', overflow: 'hidden', height: '100%', minHeight: 280 }}>
                  <img src={featured.coverImage} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .45s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = '')} />
                </div>
              </div>

              <div className="col-12 col-lg-6 d-flex flex-column justify-content-center p-4 p-lg-5">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.12em', color: '#5c9200', background: 'rgba(92,146,0,.08)', padding: '.3rem .75rem', borderRadius: 100 }}>
                    {featured.category}
                  </span>
                  <span className="d-flex align-items-center gap-1" style={{ fontSize: 12, color: '#aaa' }}>
                    <Clock size={12} /> {featured.readTime} dk okuma
                  </span>
                </div>
                <h2 className="font-poppins fw-black mb-3" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', lineHeight: 1.25, color: '#1a1a1a' }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.75, marginBottom: '1.5rem' }}>{featured.excerpt}</p>
                <div className="d-flex align-items-center justify-content-between">
                  <span style={{ fontSize: 12, color: '#bbb' }}>{formatDate(featured.date)}</span>
                  <span className="d-inline-flex align-items-center gap-1 fw-black" style={{ fontSize: 13, color: '#5c9200' }}>
                    Devamını Oku <ArrowRight size={14} />
                  </span>
                </div>
              </div>

            </div>
          </Link>
        </div>

        {/* Rest of posts */}
        <div className="row g-4">
          {rest.map(post => (
            <div key={post.slug} className="col-12 col-md-6 col-lg-4">
              <Link to={`/blog/${post.slug}`} className="text-decoration-none d-flex flex-column h-100">
                <div className="bg-white rounded-4 overflow-hidden d-flex flex-column h-100"
                  style={{ boxShadow: '0 2px 16px rgba(0,0,0,.06)', transition: 'transform .25s, box-shadow .25s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 36px rgba(0,0,0,.11)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,.06)'; }}>

                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img src={post.coverImage} alt={post.title} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .45s' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = '')} />
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.12em', color: '#5c9200', background: 'rgba(92,146,0,.08)', padding: '.25rem .65rem', borderRadius: 100 }}>
                        <Tag size={8} style={{ marginRight: 3 }} />{post.category}
                      </span>
                      <span className="d-flex align-items-center gap-1" style={{ fontSize: 11, color: '#bbb' }}>
                        <Clock size={10} /> {post.readTime} dk
                      </span>
                    </div>

                    <h3 className="font-poppins fw-black mb-2" style={{ fontSize: 16, lineHeight: 1.35, color: '#1a1a1a' }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: 13, color: '#777', lineHeight: 1.65, flexGrow: 1, marginBottom: '1.25rem' }}>
                      {post.excerpt}
                    </p>

                    <div className="d-flex align-items-center justify-content-between mt-auto pt-3" style={{ borderTop: '1px solid #f0f0f0' }}>
                      <span style={{ fontSize: 11, color: '#bbb' }}>{formatDate(post.date)}</span>
                      <span className="d-inline-flex align-items-center gap-1 fw-black" style={{ fontSize: 12, color: '#5c9200' }}>
                        Oku <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
