import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

export interface SearchItem {
  key: string;
  title: string;
  image?: string;
  badge?: string;
  href: string;
}

interface Props {
  items: SearchItem[];
  placeholder?: string;
}

export default function SidebarSearch({ items, placeholder = 'Ara...' }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const q = query.trim().toLowerCase();
  const results = q
    ? items.filter(i => i.title.toLowerCase().includes(q) || i.badge?.toLowerCase().includes(q)).slice(0, 7)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const go = (href: string) => {
    navigate(href);
    setQuery('');
    setOpen(false);
  };

  const highlight = (text: string) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: 'rgba(92,146,0,.18)', color: '#3a6000', padding: '0 2px', borderRadius: 3 }}>
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative', marginBottom: 12 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#f5f5f5', border: '1.5px solid #e8e8e8',
        borderRadius: 10, padding: '8px 12px',
        transition: 'border-color .15s',
        ...(open && q ? { borderColor: '#5c9200', background: '#fff' } : {}),
      }}>
        <Search size={14} color="#aaa" style={{ flexShrink: 0 }} />
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => { if (e.key === 'Escape') { setQuery(''); setOpen(false); } }}
          placeholder={placeholder}
          style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: '#1a1a1a' }}
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false); }}
            style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer', display: 'flex', color: '#bbb' }}>
            <X size={13} />
          </button>
        )}
      </div>

      {open && q && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
          background: '#fff', borderRadius: 12, border: '1.5px solid #e8e8e8',
          boxShadow: '0 8px 32px rgba(0,0,0,.10)', zIndex: 200, overflow: 'hidden',
        }}>
          {results.length === 0 ? (
            <div style={{ padding: '14px 16px', fontSize: 13, color: '#aaa', textAlign: 'center' }}>Sonuç bulunamadı</div>
          ) : (
            <>
              {results.map(item => (
                <button key={item.key} onClick={() => go(item.href)}
                  className="d-flex align-items-center gap-3 w-100 text-start border-0"
                  style={{ padding: '9px 12px', background: 'transparent', transition: 'background .12s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f8f8f8', border: '1px solid #eee', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.image
                      ? <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 3 }} />
                      : <div style={{ width: 20, height: 20, background: '#e0e0e0', borderRadius: 4 }} />}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p className="mb-0 fw-bold text-truncate" style={{ fontSize: 12, color: '#1a1a1a' }}>{highlight(item.title)}</p>
                    {item.badge && <p className="mb-0 text-truncate" style={{ fontSize: 10, color: '#5c9200', fontWeight: 600 }}>{item.badge}</p>}
                  </div>
                </button>
              ))}
              <div style={{ borderTop: '1px solid #f0f0f0', padding: '8px 12px' }}>
                <span style={{ fontSize: 10, color: '#bbb', fontWeight: 600 }}>{results.length} sonuç gösteriliyor</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
