import React from 'react';
import { Scissors, Sparkles, Heart, Wind, Eye, Stethoscope } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const CATEGORIES = [
  {
    id: 'hair_salon',
    name: 'Hair Salon',
    nameVi: 'Salon Tóc',
    icon: Scissors,
    color: 'from-purple-500 to-pink-500',
    description: 'Hair cutting, coloring, styling'
  },
  {
    id: 'barber_shop',
    name: 'Barber Shop',
    nameVi: 'Tiệm Cắt Tóc Nam',
    icon: Scissors,
    color: 'from-blue-500 to-cyan-500',
    description: 'Men\'s grooming and haircuts'
  },
  {
    id: 'nail_salon',
    name: 'Nail Salon',
    nameVi: 'Tiệm Nail',
    icon: Sparkles,
    color: 'from-pink-500 to-rose-500',
    description: 'Manicure, pedicure, nail art'
  },
  {
    id: 'spa',
    name: 'Spa & Wellness',
    nameVi: 'Spa & Chăm sóc',
    icon: Wind,
    color: 'from-green-500 to-emerald-500',
    description: 'Massage, facial, body treatments'
  },
  {
    id: 'eyelash_studio',
    name: 'Eyelash Studio',
    nameVi: 'Studio Nối Mi',
    icon: Eye,
    color: 'from-indigo-500 to-purple-500',
    description: 'Eyelash extensions, brow services'
  },
  {
    id: 'beauty_clinic',
    name: 'Beauty Clinic',
    nameVi: 'Phòng khám Thẩm mỹ',
    icon: Stethoscope,
    color: 'from-orange-500 to-red-500',
    description: 'Aesthetic treatments, skincare'
  },
];

const StepCategory = ({ data, updateData, onNext }) => {
  const { isDark } = useDarkMode();

  const handleSelect = (categoryId) => {
    updateData({ category: categoryId });
    setTimeout(onNext, 300);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
          Choose Your Business Type
        </h2>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          Select the category that best describes your business
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isSelected = data.category === category.id;

          return (
            <button
              key={category.id}
              onClick={() => handleSelect(category.id)}
              className={`group relative p-6 rounded-2xl border-2 transition-all text-left hover:shadow-xl ${
                isSelected
                  ? isDark
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-primary bg-primary bg-opacity-5 shadow-lg'
                  : isDark
                  ? 'border-gray-700 bg-gray-800/30 hover:border-primary hover:bg-gray-700/50'
                  : 'border-gray-200 bg-white hover:border-primary hover:bg-gray-50'
              }`}
              data-testid={`category-${category.id}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{category.name}</h3>
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{category.nameVi}</p>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{category.description}</p>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepCategory;
