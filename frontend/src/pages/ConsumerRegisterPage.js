import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const ConsumerRegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { register: registerUser, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await registerUser(email, password, fullName, 'customer');

    if (result.success) {
      toast.success('Welcome to StyleMatch! 🎉');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Registration failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-slate-50 to-sky-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" />
        <div className="absolute top-0 left-0 h-[520px] w-[520px] rounded-full bg-emerald-400/20 blur-3xl opacity-70 dark:bg-emerald-500/20" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-sky-400/20 blur-3xl opacity-70 dark:bg-sky-500/20" />

        <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
          <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10">
            <div className="flex flex-col justify-between rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-200/20 dark:border-slate-700/80 dark:bg-slate-900/95 dark:shadow-black/20 p-8 lg:p-14">
              <div>
                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
                  Ready to book your beauty experience
                </span>

                <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  Create your StyleMatch account
                </h1>
                <p className="mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300">
                  Join customers discovering salons, stylists, and beauty professionals. Save favorites, book instantly, and stay inspired.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200" htmlFor="fullName">
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
                      className="w-full rounded-3xl border border-slate-200/70 bg-slate-50/90 px-12 py-4 text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200" htmlFor="email">
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
                      className="w-full rounded-3xl border border-slate-200/70 bg-slate-50/90 px-12 py-4 text-slate-900 outline-none transition-all duration-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-400/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200" htmlFor="password">
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
                      className="w-full rounded-3xl border border-slate-200/70 bg-slate-50/90 px-12 py-4 text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-100 dark:focus:border-emerald-400 dark:focus:ring-emerald-400/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-800 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-300/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-300/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>

              <div className="mt-8 border-t border-slate-200/80 pt-6 text-sm text-slate-600 dark:border-slate-700/80 dark:text-slate-400">
                <p>
                  Already have an account?{' '}
                  <Link to="/auth/consumer/login" className="font-semibold text-emerald-700 hover:underline dark:text-emerald-300">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-500 to-sky-700 p-8 shadow-2xl shadow-emerald-300/25">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.15),transparent_20%)]" />
              <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute right-10 bottom-24 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="relative h-full flex flex-col justify-center">
                <div className="max-w-lg text-white">
                  <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/90">
                    Instant booking, effortless planning
                  </span>
                  <h2 className="mt-8 text-4xl font-bold text-white">
                    Find the perfect stylist in seconds.
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-white/80">
                    Discover top-rated salons, read real reviews, and book your next appointment with a beautifully modern experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerRegisterPage;
