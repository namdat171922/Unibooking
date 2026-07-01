import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../contexts/DarkModeContext';
import {
  ArrowRight, ArrowLeft, Check, Scissors, Store, MapPin,
  Clock, Sparkles, Users, FileText, CreditCard, Eye
} from 'lucide-react';
import { toast } from 'sonner';

// Import step components (we'll create these)
import StepWelcome from '../components/onboarding/StepWelcome';
import StepCategory from '../components/onboarding/StepCategory';
import StepBusinessInfo from '../components/onboarding/StepBusinessInfo';
import StepLocation from '../components/onboarding/StepLocation';
import StepOpeningHours from '../components/onboarding/StepOpeningHours';
import StepServices from '../components/onboarding/StepServices';
import StepStaff from '../components/onboarding/StepStaff';
import StepBookingPolicy from '../components/onboarding/StepBookingPolicy';
import StepPayment from '../components/onboarding/StepPayment';
import StepReview from '../components/onboarding/StepReview';

const STEPS = [
  { id: 'welcome', icon: Sparkles, component: StepWelcome },
  { id: 'category', icon: Store, component: StepCategory },
  { id: 'info', icon: FileText, component: StepBusinessInfo },
  { id: 'location', icon: MapPin, component: StepLocation },
  { id: 'hours', icon: Clock, component: StepOpeningHours },
  { id: 'services', icon: Scissors, component: StepServices },
  { id: 'staff', icon: Users, component: StepStaff },
  { id: 'policy', icon: FileText, component: StepBookingPolicy },
  { id: 'payment', icon: CreditCard, component: StepPayment },
  { id: 'review', icon: Eye, component: StepReview },
];

const BusinessOnboardingPage = () => {
  const { t } = useTranslation();
  const { isDark } = useDarkMode();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [businessData, setBusinessData] = useState({
    category: '',
    businessName: '',
    email: '',
    phone: '',
  });

  const updateBusinessData = (data) => {
    setBusinessData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handlePublish = async () => {
    try {
      toast.success('Business published successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to publish business');
    }
  };

  const CurrentStepComponent = STEPS[currentStep].component;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50'}`}>
      {/* Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className={`h-1.5 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={`container mx-auto px-4 py-4 flex items-center justify-between ${isDark ? 'border-b border-gray-700' : ''}`}>
          <div className="flex items-center gap-4">
            <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
              StyleMatch Business
            </h1>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-text-muted'}`}>
              Step {currentStep + 1} of {STEPS.length}
            </span>
          </div>
          
          {/* Step indicators */}
          <div className="hidden md:flex items-center gap-2">
            {STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isCompleted = idx < currentStep;
              const isCurrent = idx === currentStep;
              
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isCurrent
                      ? `${isDark ? 'bg-primary/20 text-primary' : 'bg-primary bg-opacity-10 text-primary'}`
                      : isCompleted
                      ? 'bg-green-100 text-green-700'
                      : `${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-400'}`
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <StepIcon className="w-4 h-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className={`p-8 md:p-12 rounded-3xl shadow-2xl border backdrop-blur-xl ${isDark ? 'bg-gray-800/80 border-gray-700' : 'bg-white bg-opacity-80 border-white border-opacity-50'}`}>
            <CurrentStepComponent 
              data={businessData}
              updateData={updateBusinessData}
              onNext={nextStep}
              onPrev={prevStep}
              onPublish={handlePublish}
              isFirst={currentStep === 0}
              isLast={currentStep === STEPS.length - 1}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {currentStep > 0 && (
        <div className={`fixed bottom-0 left-0 right-0 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} p-4 shadow-lg`}>
          <div className="container max-w-4xl mx-auto flex justify-between items-center">
            <button
              onClick={prevStep}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all font-medium ${isDark ? 'border-gray-600 text-gray-200 hover:border-primary hover:text-primary' : 'border-gray-200 text-gray-900 hover:border-primary'}`}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            
            {currentStep < STEPS.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg transition-all"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:shadow-lg transition-all"
              >
                <Check className="w-5 h-5" />
                Publish Business
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessOnboardingPage;
