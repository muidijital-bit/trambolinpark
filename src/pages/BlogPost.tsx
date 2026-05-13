import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, ArrowRight, ChevronRight } from 'lucide-react';
import { getBlogPost, blogPosts, type BlogSection } from '../data/blogPosts';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function RenderSection({ section }: { section: BlogSection }) {
  if (section.type === 'heading') {
    return <h2 style={{ fontFamily: '"Poppins", sans-serif', fontWeight: 800, fontSize: 'clamp(1.15rem, 2vw, 1.4rem)', color: '#1a1a1a', marginTop: '2.5rem', marginBottom: '.75rem', lineHeight: 1.3 }}>{section.text}</h2>;
  }
  if (section.type === 'paragraph') {
    return <p style={{ fontSize: 15.5, color: '#444', lineHeight: 1.85, marginBottom: '1.25rem' }}>{section.text}</p>;
  }
  if (section.type === 'list') {
    return (
      <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {section.items?.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: '#444', lineHeight: 1.65 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 9 }} />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  if (section.type === 'callout') {
    return (
      <div style={{ background: 'rgba(92,146,0,.07)', border: '1.5px solid rgba(92,146,0,.2)', borderRadius: 14, padding: '1.1rem 1.4rem', margin: '2rem 0', fontSize: 14.5, color: '#3a5c00', lineHeight: 1.7, fontWeight: 500 }}>
        {section.text}
      </div>
    );
  }
  return null;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : null;

  if (!post) {
    return (
      <div className="text-center py-5" style={{ paddingTop: '8rem' }}>
        <h1 className="fw-black fs-2 mb-3">Yazı Bulunamadı</h1>
        <Link to="/blog" className="btn btn-brand rounded-pill px-5 py-3 fw-black">Blog'a Dön</Link>
      </div>
    );
  }

  const related = blogPosts.filter(p => p.slug !== post.slug && p.category === post.category).concat(
    blogPosts.filter(p => p.slug !== post.slug && p.category !== post.category)
  ).slice(0, 3);

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>

      {/* Breadcrumb — normal flow */}
      <div className="tp-pt-nav" style={{ background: '#080808', borderBottom: '1px solid rgba(255,255,255,.06)', paddingBottom: 0 }}>
        <div className="container py-2">
          <nav className="d-flex align-items-center gap-1 flex-wrap" style={{ fontSize: 11, lineHeight: 1.6 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,.45)', textDecoration: 'none' }}>Anasayfa</Link>
            <ChevronRight size={11} color="rgba(255,255,255,.3)" />
            <Link to="/blog" style={{ color: 'rgba(255,255,255,.45)', textDecoration: 'none' }}>Blog</Link>
            <ChevronRight size={11} color="rgba(255,255,255,.3)" />
            <span style={{ color: 'rgba(255,255,255,.8)', fontWeight: 700 }}>{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="tp-page-hero tp-page-hero--after-breadcrumb" style={{ paddingBottom: '3rem' }}>
        <div aria-hidden="true" className="tp-hero-watermark">{post.category.toUpperCase()}</div>

        <div className="container">
          <div className="d-flex align-items-center gap-3 mb-3">
            <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.12em', color: '#c3e92d', background: 'rgba(195,233,45,.1)', border: '1px solid rgba(195,233,45,.2)', padding: '.35rem .9rem', borderRadius: 100 }}>
              <Tag size={9} style={{ marginRight: 4 }} />{post.category}
            </span>
            <span className="d-flex align-items-center gap-1" style={{ fontSize: 12, color: 'rgba(255,255,255,.45)' }}>
              <Clock size={12} /> {post.readTime} dk okuma
            </span>
          </div>
          <div className="tp-hero-line" />
          <h1 style={{ maxWidth: 700 }}>{post.title}</h1>
          <p style={{ maxWidth: 580 }}>{post.excerpt}</p>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.35)' }}>{formatDate(post.date)}</span>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4 g-lg-5 justify-content-center">

          {/* Article */}
          <div className="col-12 col-lg-8 order-2 order-lg-1">

            {/* Cover image */}
            <div className="rounded-4 overflow-hidden mb-5" style={{ boxShadow: '0 8px 40px rgba(0,0,0,.1)' }}>
              <img src={post.coverImage} alt={post.title} style={{ width: '100%', aspectRatio: '16/8', objectFit: 'cover' }} />
            </div>

            {/* Content */}
            <div className="bg-white rounded-4 p-4 p-md-5" style={{ boxShadow: '0 2px 20px rgba(0,0,0,.05)' }}>
              {post.content.map((section, i) => (
                <RenderSection key={i} section={section} />
              ))}
            </div>

            {/* Back link */}
            <div className="mt-4">
              <Link to="/blog" className="d-inline-flex align-items-center gap-2 fw-black" style={{ fontSize: 13, color: '#555', textDecoration: 'none' }}>
                <ArrowLeft size={15} /> Blog'a Dön
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-12 col-lg-4 order-1 order-lg-2">
            <div className="tp-sidebar-sticky">

              {/* CTA */}
              <div className="rounded-4 p-4 mb-4" style={{ background: '#1a1a1a' }}>
                <p style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.15em', color: '#c3e92d', marginBottom: 8 }}>Ücretsiz Danışmanlık</p>
                <h3 className="font-poppins fw-black text-white mb-2" style={{ fontSize: 17, lineHeight: 1.3 }}>Projenizi Birlikte Planlayalım</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  Trambolin parkı yatırımınız için ücretsiz fizibilite analizi ve 3D yerleşim planı sunuyoruz.
                </p>
                <div className="d-flex flex-column gap-2">
                  <Link to="/iletisim" className="btn-accent d-flex align-items-center justify-content-center gap-2" style={{ fontSize: 13, padding: '.65rem 1rem' }}>
                    Teklif Al <ArrowRight size={14} />
                  </Link>
                  <a href="tel:+905433494947" className="btn-glass d-flex align-items-center justify-content-center gap-2" style={{ fontSize: 13, padding: '.65rem 1rem' }}>
                    +90 543 349 49 47
                  </a>
                </div>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div>
                  <p className="fw-black mb-3" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '.1em', color: '#555' }}>İlgili Yazılar</p>
                  <div className="d-flex flex-column gap-3">
                    {related.map(r => (
                      <Link key={r.slug} to={`/blog/${r.slug}`} className="d-flex gap-3 text-decoration-none"
                        style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.06)', transition: 'transform .2s' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = '')}>
                        <div style={{ width: 72, flexShrink: 0, background: '#f5f5f5' }}>
                          <img src={r.coverImage} alt={r.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="py-2 pe-3" style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: '#5c9200', marginBottom: 4 }}>{r.category}</p>
                          <p className="fw-black mb-0" style={{ fontSize: 12, color: '#1a1a1a', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{r.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
