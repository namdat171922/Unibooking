import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User as UserIcon, ArrowRight, Award, Calendar, BarChart3 } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { toast } from 'sonner';

const BusinessRegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { register: registerUser, user } = useAuth();
  const { isDark } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'business_owner') {
      navigate('/onboarding');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await registerUser(email, password, fullName, 'business_owner');

    if (result.success) {
      toast.success('Welcome to StyleMatch!');
      navigate('/onboarding');
    } else {
      toast.error(result.error || 'Registration failed');
    }

    setLoading(false);
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="relative min-h-screen overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800' : 'bg-gradient-to-br from-emerald-100 via-slate-50 to-sky-100'}`} />
        <div className="absolute top-0 left-0 h-[520px] w-[520px] rounded-full bg-emerald-400/20 blur-3xl opacity-70 dark:bg-emerald-500/20" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-sky-400/20 blur-3xl opacity-70 dark:bg-sky-500/20" />

        <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
          <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10">
            <div className={`flex flex-col justify-between rounded-[2rem] border p-8 lg:p-14 ${isDark ? 'border-slate-700/80 bg-slate-900/95 shadow-black/20' : 'border-slate-200/80 bg-white/95 shadow-slate-200/20'}`}>
              <div>
                <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-300">
                  Build your business presence faster
                </span>

                <h1 className={`mt-8 text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'} sm:text-5xl`}>
                  Create your StyleMatch business account
                </h1>
                <p className={`mt-4 max-w-xl text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Manage bookings, staff, and analytics with a beautiful business-first dashboard built for salons.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`} htmlFor="fullName">
                    User Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-600" />
                    <input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className={`w-full rounded-3xl border px-12 py-4 outline-none transition-all duration-300 ${isDark ? 'border-slate-700/80 bg-slate-900/90 text-slate-100 focus:border-emerald-400 focus:ring-emerald-400/10' : 'border-slate-200/70 bg-slate-50/90 text-slate-900 focus:border-emerald-500 focus:ring-emerald-500/10'}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`} htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-sky-600" />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`w-full rounded-3xl border px-12 py-4 outline-none transition-all duration-300 ${isDark ? 'border-slate-700/80 bg-slate-900/90 text-slate-100 focus:border-sky-400 focus:ring-sky-400/10' : 'border-slate-200/70 bg-slate-50/90 text-slate-900 focus:border-sky-500 focus:ring-sky-500/10'}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`} htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-600" />
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className={`w-full rounded-3xl border px-12 py-4 outline-none transition-all duration-300 ${isDark ? 'border-slate-700/80 bg-slate-900/90 text-slate-100 focus:border-emerald-400 focus:ring-emerald-400/10' : 'border-slate-200/70 bg-slate-50/90 text-slate-900 focus:border-emerald-500 focus:ring-emerald-500/10'}`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-3xl px-6 py-4 text-base font-bold transition-all duration-300 ${isDark ? 'bg-gradient-to-r from-emerald-500 to-emerald-800 text-white shadow-emerald-300/20' : 'bg-gradient-to-r from-sky-500 to-sky-800 text-slate-900 shadow-sky-300/20'} hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <div className={`mt-8 border-t pt-6 ${isDark ? 'border-slate-700/80 text-slate-400' : 'border-slate-200/80 text-slate-600'}`}>
                <p>
                  Already have an account?{' '}
                  <Link to="/auth/business/login" className="font-semibold text-sky-700 hover:underline dark:text-sky-300">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-500 to-emerald-700 p-8 shadow-2xl shadow-sky-300/25">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.15),transparent_20%)]" />
              <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute right-10 bottom-24 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="relative h-full flex flex-col justify-center">
                <div className="max-w-lg text-white">
                  <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/90">
                    Grow bookings with high-impact branding
                  </span>
                  <h2 className="mt-8 text-4xl font-bold text-white">
                    Launch a modern salon experience.
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-white/80">
                    Manage clients, online bookings, and staff from a polished business dashboard built for beauty professionals.
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

export default BusinessRegisterPage;
