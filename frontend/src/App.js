import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { Toaster } from '@/components/ui/sonner';
import './i18n';
import './index.css';
import AnimatedBackground from './components/AnimatedBackground';
import { useLocation } from 'react-router-dom';
import { useDarkMode } from './contexts/DarkModeContext';

// Pages
import HomePage from './pages/HomePage';
import BusinessesPage from './pages/BusinessesPage';
import BusinessDetailPage from './pages/BusinessDetailPage';
import AuthChoicePage from './pages/AuthChoicePage';
import ConsumerLoginPage from './pages/ConsumerLoginPage';
import ConsumerRegisterPage from './pages/ConsumerRegisterPage';
import BusinessLoginPage from './pages/BusinessLoginPage';
import BusinessRegisterPage from './pages/BusinessRegisterPage';
import DashboardPage from './pages/DashboardPage';
import BusinessDashboardPage from './pages/BusinessDashboardPage';
import CreateBusinessPage from './pages/CreateBusinessPage';
import BusinessOnboardingPage from './pages/BusinessOnboardingPage';
import UserProfilePage from './pages/UserProfilePage';
import MyBusinessPage from './pages/MyBusinessPage';
import ActivityPage from './pages/ActivityPage';
import MessagesPage from './pages/MessagesPage';
import FavoritesPage from './pages/FavoritesPage';
import SettingsPage from './pages/SettingsPage';
import HelpSupportPage from './pages/HelpSupportPage';
import BusinessDirectoryPage from './pages/BusinessDirectoryPage';
import ServicesPage from './pages/ServicesPage';
import PackagesPage from './pages/PackagesPage';
import SalesPage from './pages/SalesPage';
import ReviewsPage from './pages/ReviewsPage';
import RevenueAnalyticsPage from './pages/RevenueAnalyticsPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <>
      <div className="app-content-above-animated">
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/businesses" element={<BusinessesPage />} />
        <Route path="/businesses/:id" element={<BusinessDetailPage />} />
        <Route path="/business-directory" element={<BusinessDirectoryPage />} />

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthChoicePage />} />
        <Route path="/auth/consumer/login" element={<ConsumerLoginPage />} />
        <Route path="/auth/consumer/register" element={<ConsumerRegisterPage />} />
        <Route path="/auth/business/login" element={<BusinessLoginPage />} />
        <Route path="/auth/business/register" element={<BusinessRegisterPage />} />

        {/* Legacy routes - redirect to new auth flow */}
        <Route path="/login" element={<Navigate to="/auth/consumer/login" replace />} />
        <Route path="/register" element={<Navigate to="/auth/consumer/register" replace />} />

        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <BusinessOnboardingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-business"
          element={
            <ProtectedRoute>
              <MyBusinessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/business/dashboard"
          element={
            <ProtectedRoute>
              <BusinessDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <ActivityPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/help" element={<HelpSupportPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <ServicesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/packages"
          element={
            <ProtectedRoute>
              <PackagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <SalesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <ReviewsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/revenue"
          element={
            <ProtectedRoute>
              <RevenueAnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-business"
          element={
            <ProtectedRoute>
              <CreateBusinessPage />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}

function App() {
  // Wrap AppContent with providers but compute route-based palette here
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <AuthProvider>
          <RouteBackgroundWrapper />
        </AuthProvider>
      </DarkModeProvider>
    </BrowserRouter>
  );
}

function RouteBackgroundWrapper() {
  const location = useLocation();
  const { isDark } = useDarkMode();

  // Default palettes for main areas; can expand if needed
  const routePalettes = {
    '/auth': {
      bgA: isDark ? 'rgba(20,83,45,0.08)' : 'rgba(16,185,129,0.12)',
      bgB: isDark ? 'rgba(20,83,80,0.08)' : 'rgba(14,165,233,0.12)',
      bgC: isDark ? 'rgba(10,50,40,0.08)' : 'rgba(6,182,212,0.12)',
      blob1: isDark ? 'rgba(20,120,80,0.5)' : 'rgba(16,185,129,0.55)',
      blob2: isDark ? 'rgba(10,120,160,0.45)' : 'rgba(14,165,233,0.45)'
    },
    '/business': {
      bgA: isDark ? 'rgba(30,60,120,0.08)' : 'rgba(6,182,212,0.12)',
      bgB: isDark ? 'rgba(40,80,30,0.08)' : 'rgba(16,185,129,0.12)',
      bgC: isDark ? 'rgba(80,30,60,0.06)' : 'rgba(14,165,233,0.12)',
      blob1: isDark ? 'rgba(6,182,212,0.45)' : 'rgba(6,182,212,0.55)',
      blob2: isDark ? 'rgba(16,185,129,0.45)' : 'rgba(16,185,129,0.45)'
    },
    'default': {
      bgA: isDark ? 'rgba(8,20,30,0.08)' : 'rgba(16,185,129,0.12)',
      bgB: isDark ? 'rgba(20,30,40,0.06)' : 'rgba(14,165,233,0.12)',
      bgC: isDark ? 'rgba(6,12,20,0.06)' : 'rgba(6,182,212,0.12)',
      blob1: isDark ? 'rgba(16,185,129,0.45)' : 'rgba(16,185,129,0.55)',
      blob2: isDark ? 'rgba(14,165,233,0.4)' : 'rgba(14,165,233,0.45)'
    }
  };

  // Choose a palette based on the current pathname prefix
  const pathname = location.pathname || '/';
  let palette = routePalettes.default;
  if (pathname.startsWith('/auth')) palette = routePalettes['/auth'];
  else if (pathname.startsWith('/business') || pathname.startsWith('/onboarding')) palette = routePalettes['/business'];

  return (
    <>
      <AnimatedBackground palette={palette} />
      <AppContent />
    </>
  );
}

export default App;
