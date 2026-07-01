import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const ConsumerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      toast.success('Welcome back! 🎉');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDF7F1] via-[#F5EEF4] to-[#EBF0FF] dark:from-[#020617] dark:via-[#0B1120] dark:to-[#111827]" />
        <div className="absolute top-0 left-0 h-[520px] w-[520px] rounded-full bg-primary/15 blur-3xl opacity-60 dark:bg-secondary/20" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-secondary/15 blur-3xl opacity-60 dark:bg-primary/20" />

        <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
          <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-10">
            <div className="flex flex-col justify-between rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-200/20 dark:border-slate-700/80 dark:bg-slate-900/90 dark:shadow-black/20 p-8 lg:p-14">
              <div>
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  Login to your account
                </span>

                <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  Welcome back.
                </h1>
                <p className="mt-4 max-w-xl text-base text-slate-600 dark:text-slate-300">
                  Sign in to book your next appointment, manage reservations, and keep your beauty routine on track.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-3xl border border-slate-200/70 bg-slate-50/90 px-12 py-4 text-slate-900 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-100 dark:focus:border-secondary dark:focus:ring-secondary/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary" />
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-3xl border border-slate-200/70 bg-slate-50/90 px-12 py-4 text-slate-900 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-100 dark:focus:border-secondary dark:focus:ring-secondary/10"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                  <Link to="#" className="font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                  <span className="text-slate-500 dark:text-slate-500">Secure login</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-gradient-to-r from-primary to-primary-hover px-6 py-4 text-base font-bold text-gray-900 dark:text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-8 border-t border-slate-200/80 pt-6 text-sm text-slate-600 dark:border-slate-700/80 dark:text-slate-400">
                <p>
                  New around here?{' '}
                  <Link to="/auth/consumer/register" className="font-semibold text-primary hover:underline">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-secondary p-8 shadow-2xl shadow-primary/25">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.18),transparent_20%)]" />
              <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute right-10 bottom-24 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="relative h-full flex flex-col justify-center">
                <div className="max-w-lg">
                  <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/90">
                    Beauty appointments made effortless
                  </span>
                  <h2 className="mt-8 text-4xl font-bold text-white">
                    Your next style is just a click away.
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-white/80">
                    Discover top-rated professionals, browse portfolios, and book instantly with a modern, polished experience.
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

export default ConsumerLoginPage;
