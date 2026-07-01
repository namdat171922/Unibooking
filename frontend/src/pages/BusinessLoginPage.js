import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, ArrowRight, Smartphone, BarChart3, Users } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { toast } from 'sonner';

const BusinessLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const { isDark } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'business_owner') {
      navigate('/business/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      toast.success('Welcome back!');
      navigate('/business/dashboard');
    } else {
      toast.error(result.error || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="relative min-h-screen overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800' : 'bg-gradient-to-br from-[#FDF7F1] via-[#F5F2ED] to-[#EBF0FF]'}`} />
        <div className="absolute top-0 left-0 h-[520px] w-[520px] rounded-full bg-secondary/15 blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl opacity-70" />

        <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
          <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10">
            <div className={`flex flex-col justify-between rounded-[2rem] border p-8 lg:p-14 ${isDark ? 'border-slate-700/80 bg-slate-900/95 shadow-black/20' : 'border-slate-200/80 bg-white/95 shadow-slate-200/20'}`}>
              <div>
                <span className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
                  Business owner login
                </span>

                <h1 className={`mt-8 text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'} sm:text-5xl`}>
                  Welcome back.
                </h1>
                <p className={`mt-4 max-w-xl text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Sign in to manage your appointments, team, and analytics from one beautiful dashboard.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`} htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors" />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`w-full rounded-3xl border px-12 py-4 outline-none transition-all duration-300 ${isDark ? 'border-slate-700/80 bg-slate-900/90 text-slate-100 focus:border-secondary focus:ring-secondary/10' : 'border-slate-200/70 bg-slate-50/90 text-slate-900 focus:border-primary focus:ring-primary/10'}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`} htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors" />
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={`w-full rounded-3xl border px-12 py-4 outline-none transition-all duration-300 ${isDark ? 'border-slate-700/80 bg-slate-900/90 text-slate-100 focus:border-secondary focus:ring-secondary/10' : 'border-slate-200/70 bg-slate-50/90 text-slate-900 focus:border-primary focus:ring-primary/10'}`}
                    />
                  </div>
                </div>

                <div className={`flex items-center justify-between text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  <Link to="#" className="font-medium text-secondary hover:underline">
                    Forgot password?
                  </Link>
                  <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Business access</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-3xl px-6 py-4 text-base font-bold transition-all duration-300 ${isDark ? 'bg-gradient-to-r from-secondary to-secondary-hover text-white shadow-secondary/20' : 'bg-gradient-to-r from-primary to-primary-hover text-slate-900 shadow-primary/20'} hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className={`mt-8 border-t pt-6 ${isDark ? 'border-slate-700/80 text-slate-400' : 'border-slate-200/80 text-slate-600'}`}>
                <p>
                  Don't have an account?{' '}
                  <Link to="/auth/business/register" className="font-semibold text-secondary hover:underline">
                    Create one now
                  </Link>
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] p-8 shadow-2xl shadow-secondary/25">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-slate-900 opacity-95" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.18),transparent_20%)]" />
              <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute right-8 bottom-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="relative h-full flex flex-col justify-center">
                <div className="max-w-lg text-white">
                  <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
                    Efficient business control
                  </span>
                  <h2 className="mt-8 text-4xl font-bold text-white">
                    Build the beauty business you want.
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-white/80">
                    Manage appointments, staff, and analytics from a polished dashboard designed for modern salons.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.85); }
        }
        .animate-blob { animation: blob 8s infinite; }
      `}</style>
    </div>
  );
};

export default BusinessLoginPage;
