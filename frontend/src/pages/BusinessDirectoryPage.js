import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Building2, MapPin, Phone, Globe, Users, Clock } from 'lucide-react';

const BusinessDirectoryPage = () => {
  const [businesses] = useState([
    {
      id: 1,
      name: 'Modern Hair Salon',
      category: 'Salon',
      rating: 4.8,
      reviews: 324,
      address: '123 Main St, City',
      phone: '+1 (555) 123-4567',
      website: 'www.modernhair.com',
      employees: 12,
      hours: '9:00 AM - 6:00 PM',
      image: '💇',
    },
    {
      id: 2,
      name: 'Elite Barbershop',
      category: 'Barbershop',
      rating: 4.9,
      reviews: 456,
      address: '456 Oak Ave, City',
      phone: '+1 (555) 234-5678',
      website: 'www.elitebarbershop.com',
      employees: 8,
      hours: '10:00 AM - 7:00 PM',
      image: '💈',
    },
    {
      id: 3,
      name: 'Premium Spa Center',
      category: 'Spa',
      rating: 4.7,
      reviews: 298,
      address: '789 Elm St, City',
      phone: '+1 (555) 345-6789',
      website: 'www.premiumspa.com',
      employees: 15,
      hours: '10:00 AM - 8:00 PM',
      image: '🧖',
    },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Business Directory
          </h1>
          <p className="text-text-secondary">Discover businesses in our network</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <div key={business.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-secondary h-32 flex items-center justify-center">
                <span className="text-6xl">{business.image}</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{business.name}</h3>
                <p className="text-sm text-text-secondary mb-4">{business.category}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold">{business.rating}</span>
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-xs text-text-secondary">({business.reviews} reviews)</span>
                </div>

                {/* Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-text-secondary">{business.address}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <a href={`tel:${business.phone}`} className="text-primary hover:underline">
                      {business.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                    <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {business.website}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-text-secondary">{business.employees} employees</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-text-secondary">{business.hours}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDirectoryPage;
