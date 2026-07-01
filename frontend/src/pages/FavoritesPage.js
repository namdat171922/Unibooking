import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { Heart, Trash2, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

const FavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Modern Hair Salon',
      category: 'Salon',
      rating: 4.8,
      address: '123 Main St, City',
      savedAt: '2024-06-20',
    },
    {
      id: 2,
      name: 'Premium Spa Center',
      category: 'Spa',
      rating: 4.9,
      address: '456 Oak Ave, City',
      savedAt: '2024-06-15',
    },
  ]);

  const handleRemove = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
    toast.success('Removed from favorites');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            My Favorites
          </h1>
          <p className="text-text-secondary">Businesses you've saved</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-text-secondary">No favorites yet</p>
            </div>
          ) : (
            favorites.map(fav => (
              <div key={fav.id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{fav.name}</h3>
                    <p className="text-sm text-text-secondary">{fav.category}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(fav.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{fav.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span>Saved {fav.savedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{fav.rating}</span>
                  <span className="text-sm text-text-secondary">⭐</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
