import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { MessageSquare, Phone, Mail, Search, ChevronDown } from 'lucide-react';

const HelpSupportPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I book an appointment?',
      answer: 'Visit the business page, select your desired service and time, then confirm your booking. You will receive a confirmation email.',
    },
    {
      id: 2,
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, you can cancel or reschedule up to 24 hours before your appointment. Go to Dashboard > Appointments to manage your bookings.',
    },
    {
      id: 3,
      question: 'How do I add a business?',
      answer: 'If you are a business owner, navigate to "My Business" and click "Add Business" to create your business profile.',
    },
    {
      id: 4,
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards, debit cards, and digital wallets for payment.',
    },
    {
      id: 5,
      question: 'How can I become a business partner?',
      answer: 'Click on "For Business" section to learn more about our partnership opportunities and registration process.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Help & Support
          </h1>
          <p className="text-text-secondary">We're here to help. Find answers or contact us.</p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6 text-center">
            <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold mb-2">Live Chat</h3>
            <p className="text-sm text-text-secondary mb-4">Get instant help from our support team</p>
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors w-full">
              Start Chat
            </button>
          </div>

          <div className="card p-6 text-center">
            <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold mb-2">Call Us</h3>
            <p className="text-sm text-text-secondary mb-4">+1 (555) 123-4567</p>
            <p className="text-xs text-text-secondary">Monday - Friday, 9AM - 6PM</p>
          </div>

          <div className="card p-6 text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-sm text-text-secondary mb-4">support@stylematch.com</p>
            <p className="text-xs text-text-secondary">We'll respond within 24 hours</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-12 relative">
          <Search className="w-5 h-5 absolute left-4 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search help articles..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200"
          />
        </div>

        {/* FAQs */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-left">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform flex-shrink-0 ${
                      expandedFaq === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedFaq === faq.id && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-text-secondary">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;
