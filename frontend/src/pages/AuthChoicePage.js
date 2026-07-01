import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, ShoppingBag, ArrowRight } from 'lucide-react';

const AuthChoicePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white dark:bg-gray-900">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF9] via-[#F5F2ED] to-[#E8E5DF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 dark:bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 dark:bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-block mb-4">
            <Scissors className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Welcome to StyleMatch
            </span>
          </h1>
          <p className="text-xl text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
            Are you looking to book appointments or manage your beauty business?
          </p>
        </div>

        {/* Choice Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Consumer Option */}
          <div
            onClick={() => navigate('/auth/consumer/register')}
            className="group cursor-pointer animate-in fade-in slide-in-from-left duration-700 delay-100"
          >
            <div className="h-full p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-[2rem] shadow-lg border border-white/50 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
              {/* Card background shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h2 className="text-3xl font-bold mb-3 text-text-primary dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  I'm Looking For Services
                </h2>
                <p className="text-text-secondary dark:text-gray-400 mb-8 leading-relaxed">
                  Book appointments with verified professionals, browse portfolios, and discover the perfect salon or stylist.
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {[
                    '⚡ Instant online booking',
                    '🎨 Browse professional portfolios',
                    '⭐ Read verified reviews',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-text-secondary">
                      <span>{feature.split(' ')[0]}</span>
                      <span>{feature.slice(2)}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary-hover text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-text-secondary mt-6">
                  Already have an account?{' '}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/auth/consumer/login');
                    }}
                    className="text-primary font-bold hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Business Option */}
          <div
            onClick={() => navigate('/auth/business/register')}
            className="group cursor-pointer animate-in fade-in slide-in-from-right duration-700 delay-100"
          >
            <div className="h-full p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-[2rem] shadow-lg border border-white/50 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
              {/* Card background shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Scissors className="w-8 h-8 text-secondary" />
                </div>

                {/* Content */}
                <h2 className="text-3xl font-bold mb-3 text-text-primary dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  I'm a Service Provider
                </h2>
                <p className="text-text-secondary dark:text-gray-400 mb-8 leading-relaxed">
                  Grow your business with online booking, manage staff, track analytics, and reach more customers.
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {[
                    '📱 Professional online presence',
                    '📅 Automated appointment booking',
                    '📊 Business analytics & insights',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-text-secondary">
                      <span>{feature.split(' ')[0]}</span>
                      <span>{feature.slice(2)}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="w-full px-6 py-4 bg-gradient-to-r from-secondary to-secondary-hover text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                  Grow Your Business
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-text-secondary mt-6">
                  Already have an account?{' '}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/auth/business/login');
                    }}
                    className="text-secondary font-bold hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-text-muted dark:text-gray-500">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
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

export default AuthChoicePage;
