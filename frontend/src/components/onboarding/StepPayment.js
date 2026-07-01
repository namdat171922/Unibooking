import React, { useState } from 'react';
import { CreditCard, Check } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const PAYMENT_METHODS = [
  { id: 'vnpay', name: 'VNPay', logo: '💳', popular: true },
  { id: 'momo', name: 'MoMo', logo: '🔴', popular: true },
  { id: 'zalopay', name: 'ZaloPay', logo: '🔵', popular: true },
  { id: 'stripe', name: 'Stripe', logo: '💎', popular: false },
  { id: 'cash', name: 'Cash at Store', logo: '💵', popular: true },
];

const StepPayment = ({ data, updateData, onNext }) => {
  const { isDark } = useDarkMode();
  const [selectedMethods, setSelectedMethods] = useState(data.paymentMethods || ['cash']);
  const [paymentOptions, setPaymentOptions] = useState({
    depositRequired: data.depositRequired || false,
    fullPayment: data.fullPayment || false,
    payAtStore: data.payAtStore || true,
  });

  const toggleMethod = (methodId) => {
    if (selectedMethods.includes(methodId)) {
      setSelectedMethods(selectedMethods.filter(m => m !== methodId));
    } else {
      setSelectedMethods([...selectedMethods, methodId]);
    }
  };

  const handleSubmit = () => {
    updateData({ 
      paymentMethods: selectedMethods,
      ...paymentOptions 
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary bg-opacity-10 mb-4">
          <CreditCard className="w-8 h-8 text-primary" />
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
          Payment Setup
        </h2>
        <p className="text-text-secondary">Choose how customers can pay</p>
      </div>

      {/* Payment Methods */}
      <div>
        <label className="block text-sm font-semibold mb-4">Accepted Payment Methods</label>
        <div className="grid md:grid-cols-2 gap-4">
          {PAYMENT_METHODS.map(method => (
            <button
              key={method.id}
              onClick={() => toggleMethod(method.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedMethods.includes(method.id)
                  ? 'border-primary bg-primary bg-opacity-5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.logo}</span>
                  <div>
                    <div className="font-semibold">{method.name}</div>
                    {method.popular && (
                      <span className="text-xs text-primary">Popular in Vietnam</span>
                    )}
                  </div>
                </div>
                {selectedMethods.includes(method.id) && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Options */}
      <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={paymentOptions.depositRequired}
            onChange={(e) => setPaymentOptions({ ...paymentOptions, depositRequired: e.target.checked })}
            className="w-5 h-5 text-primary rounded"
          />
          <div>
            <div className="font-semibold">Require deposit</div>
            <div className="text-sm text-gray-600">Customers must pay deposit when booking</div>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={paymentOptions.fullPayment}
            onChange={(e) => setPaymentOptions({ ...paymentOptions, fullPayment: e.target.checked })}
            className="w-5 h-5 text-primary rounded"
          />
          <div>
            <div className="font-semibold">Allow full payment</div>
            <div className="text-sm text-gray-600">Customers can pay full amount online</div>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={paymentOptions.payAtStore}
            onChange={(e) => setPaymentOptions({ ...paymentOptions, payAtStore: e.target.checked })}
            className="w-5 h-5 text-primary rounded"
          />
          <div>
            <div className="font-semibold">Pay at store</div>
            <div className="text-sm text-gray-600">Allow payment after service</div>
          </div>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={selectedMethods.length === 0}
        className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default StepPayment;
