import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { Star, Send, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';

const ReviewsPage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      rating: 5,
      title: 'Excellent Service!',
      comment: 'The staff was very professional and the service was amazing. Highly recommended!',
      date: '2024-06-20',
      helpful: 24,
    },
    {
      id: 2,
      author: 'Michael Chen',
      rating: 4,
      title: 'Great Experience',
      comment: 'Good service overall. The wait time was a bit long, but worth it.',
      date: '2024-06-18',
      helpful: 12,
    },
    {
      id: 3,
      author: 'Emma Wilson',
      rating: 5,
      title: 'Love This Place!',
      comment: 'Perfect haircut and styling. Will definitely come back. The atmosphere is so welcoming!',
      date: '2024-06-15',
      helpful: 18,
    },
  ]);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
  });

  const [filterRating, setFilterRating] = useState('all');

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === 'rating' ? parseInt(value) : value,
    });
  };

  const handleSubmitReview = () => {
    if (!newReview.title || !newReview.comment) {
      toast.error('Please fill in all fields');
      return;
    }

    const review = {
      id: Date.now(),
      author: user?.full_name || 'Anonymous',
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
    };

    setReviews([review, ...reviews]);
    toast.success('Review submitted successfully!');
    setNewReview({ rating: 5, title: '', comment: '' });
    setShowReviewForm(false);
  };

  const handleDeleteReview = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
    toast.success('Review deleted');
  };

  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter(r => r.rating === parseInt(filterRating));

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => distribution[r.rating]++);
    return distribution;
  };

  const distribution = getRatingDistribution();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Ratings & Reviews
          </h1>
          <p className="text-text-secondary">See what customers think about us</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Rating Summary */}
          <div className="lg:col-span-1">
            <div className="card p-8">
              {/* Average Rating */}
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-primary mb-2">{averageRating}</div>
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-text-secondary">Based on {reviews.length} reviews</p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(rating.toString())}
                    className={`w-full flex items-center gap-2 text-left p-2 rounded-lg transition-colors ${
                      filterRating === rating.toString() ? 'bg-primary bg-opacity-10' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm font-semibold w-8">{rating}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${(distribution[rating] / reviews.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-6 text-right">{distribution[rating]}</span>
                  </button>
                ))}
              </div>

              {/* Write Review Button */}
              {!showReviewForm && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full mt-8 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Write a Review
                </button>
              )}

              {/* Filter Reset */}
              {filterRating !== 'all' && (
                <button
                  onClick={() => setFilterRating('all')}
                  className="w-full mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          {/* Right: Reviews */}
          <div className="lg:col-span-2">
            {/* Write Review Form */}
            {showReviewForm && (
              <div className="card p-6 mb-8">
                <h3 className="text-xl font-bold mb-6">Share Your Experience</h3>

                <div className="space-y-4">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => setNewReview({ ...newReview, rating })}
                          className={`p-2 rounded-lg transition-all ${
                            newReview.rating >= rating
                              ? 'bg-yellow-400 text-yellow-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <Star className="w-6 h-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Review Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newReview.title}
                      onChange={handleReviewChange}
                      placeholder="Summarize your experience"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Review</label>
                    <textarea
                      name="comment"
                      value={newReview.comment}
                      onChange={handleReviewChange}
                      placeholder="Share your experience..."
                      rows="4"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleSubmitReview}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Send className="w-4 h-4" />
                    Submit Review
                  </button>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredReviews.length === 0 ? (
                <div className="card p-12 text-center">
                  <p className="text-text-secondary">No reviews yet</p>
                </div>
              ) : (
                filteredReviews.map(review => (
                  <div key={review.id} className="card p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{review.author}</p>
                          <p className="text-xs text-text-secondary">{review.date}</p>
                        </div>
                      </div>
                      {user?.id === review.id && (
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>

                    {/* Title & Comment */}
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-text-secondary mb-4">{review.comment}</p>

                    {/* Helpful */}
                    <button className="text-sm text-text-secondary hover:text-primary transition-colors">
                      👍 Helpful ({review.helpful})
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
