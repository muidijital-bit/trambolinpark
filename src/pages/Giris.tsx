import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import { Eye, EyeOff } from 'lucide-react';

type Mode = 'login' | 'forgot';

export default function Giris() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => { setError(''); setSuccess(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    reset();

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError('E-posta veya şifre hatalı.');
      else navigate('/hesabim');

    } else {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/hesabim`,
      });
      if (error) setError(error.message);
      else setSuccess('Şifre sıfırlama bağlantısı e-postanıza gönderildi.');
    }

    setLoading(false);
  };

  const titles: Record<Mode, string> = {
    login: 'Giriş Yap',
    forgot: 'Şifremi Unuttum',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1rem 2rem' }}>
      <Helmet>
        <title>Giriş Yap | Trambolinpark</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div style={{ width: '100%', maxWidth: 420 }}>

        <div className="text-center mb-4">
          <Link to="/"><img src="/logo-dark.png" alt="Trambolinpark" style={{ height: 64, objectFit: 'contain' }} /></Link>
        </div>

        <div style={{ background: '#fff', borderRadius: 20, padding: '2.5rem', border: '1px solid #ebebeb', boxShadow: '0 8px 40px rgba(0,0,0,.07)' }}>


          <h2 style={{ fontSize: 20, fontWeight: 900, fontFamily: 'Poppins, sans-serif', marginBottom: '1.5rem', color: '#1a1a1a' }}>
            {titles[mode]}
          </h2>

          {error && (
            <div style={{ background: '#fff5f5', border: '1px solid #fecaca', color: '#dc2626', borderRadius: 10, padding: '10px 14px', fontSize: 13, marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', borderRadius: 10, padding: '10px 14px', fontSize: 13, marginBottom: '1rem' }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
<div className="mb-3">
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>E-posta</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="form-control" style={{ borderRadius: 10, fontSize: 14, padding: '10px 14px' }}
                placeholder="ornek@email.com" />
            </div>

            {mode !== 'forgot' && (
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: 6 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '.1em' }}>Şifre</label>
                  {mode === 'login' && (
                    <button type="button" onClick={() => { setMode('forgot'); reset(); }}
                      style={{ background: 'none', border: 'none', fontSize: 11, color: '#5c9200', cursor: 'pointer', fontWeight: 600 }}>
                      Şifremi Unuttum
                    </button>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                    className="form-control" style={{ borderRadius: 10, fontSize: 14, padding: '10px 40px 10px 14px' }}
                    placeholder="••••••••" minLength={6} />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', display: 'flex' }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: '#c3e92d', color: '#0a0a0a', fontWeight: 900, fontSize: 14, fontFamily: 'Poppins, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .7 : 1, transition: 'opacity .2s' }}>
              {loading ? 'Lütfen bekleyin...' : titles[mode]}
            </button>

            {mode === 'forgot' && (
              <button type="button" onClick={() => { setMode('login'); reset(); }}
                style={{ width: '100%', marginTop: 10, padding: '10px', borderRadius: 10, border: '1.5px solid #e0e0e0', background: 'transparent', color: '#555', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                ← Giriş sayfasına dön
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
