import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError('E-posta veya şifre hatalı.');
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '0 1rem' }}>
        <div style={{ background: '#141414', borderRadius: 16, padding: '2.5rem', border: '1px solid #222' }}>
          <div className="text-center mb-4">
            <p className="fw-black mb-1" style={{ fontSize: 22, color: '#fff', letterSpacing: '-.02em' }}>
              Trambolinpark
            </p>
            <p style={{ color: '#666', fontSize: 13 }}>Yönetim Paneli</p>
          </div>

          {error && (
            <div className="alert mb-3" style={{ background: 'rgba(239,68,68,.12)', border: '1px solid rgba(239,68,68,.3)', color: '#f87171', borderRadius: 8, fontSize: 13 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label style={{ color: '#aaa', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>E-POSTA</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="form-control"
                style={{ background: '#1e1e1e', border: '1px solid #333', color: '#fff', borderRadius: 8 }}
                placeholder="admin@trambolinpark.com"
              />
            </div>
            <div className="mb-4">
              <label style={{ color: '#aaa', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>ŞİFRE</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="form-control"
                style={{ background: '#1e1e1e', border: '1px solid #333', color: '#fff', borderRadius: 8 }}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn w-100 fw-black"
              style={{ background: '#c3e92d', color: '#0a0a0a', borderRadius: 8, padding: '10px' }}
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
