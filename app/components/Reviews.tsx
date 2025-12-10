'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Data tipe Review
type Review = {
  id: number;
  name: string;
  rating: number; // 1 sampai 5
  date: string;
  comment: string;
};

export default function Reviews({ productId }: { productId: number }) {
  // State untuk List Review
  const [reviews, setReviews] = useState<Review[]>([
    // Data Dummy Awal biar gak sepi
    { id: 1, name: 'Alex Mayer', rating: 5, date: 'Oct 12, 2025', comment: 'Amazing quality! Matches my living room perfectly.' },
    { id: 2, name: 'Sarah J.', rating: 4, date: 'Nov 01, 2025', comment: 'Good product, but shipping took a bit longer than expected.' },
  ]);

  // State untuk Form Input
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  // 1. LOAD DATA dari LocalStorage (Berdasarkan Product ID)
  useEffect(() => {
    const savedReviews = localStorage.getItem(`davici_reviews_${productId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [productId]);

  // 2. SAVE DATA ke LocalStorage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReviewObj: Review = {
      id: Date.now(), // Generate ID unik pakai waktu
      name: newName || 'Anonymous',
      rating: newRating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      comment: newComment,
    };

    const updatedReviews = [newReviewObj, ...reviews]; // Taruh review baru di paling atas
    setReviews(updatedReviews);
    localStorage.setItem(`davici_reviews_${productId}`, JSON.stringify(updatedReviews));

    // Reset Form
    setNewName('');
    setNewComment('');
    setNewRating(5);
    toast.success('Review submitted! Thank you.', { icon: '⭐' });
  };

  // Helper buat render Bintang
  const renderStars = (count: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < count ? 'text-yellow-400' : 'text-gray-300'}>★</span>
    ));
  };

  return (
    <div className="mt-16 border-t border-gray-100 pt-10">
      <h2 className="text-2xl font-bold text-dark mb-8">Customer Reviews ({reviews.length})</h2>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* KOLOM KIRI: LIST REVIEW */}
        <div className="w-full lg:w-2/3 space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-dark text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
                <div className="text-sm">{renderStars(review.rating)}</div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* KOLOM KANAN: FORM REVIEW */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Rating Input (Klik Bintang) */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Your Rating</label>
                <div className="flex gap-1 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star}
                      className={`text-2xl transition ${star <= newRating ? 'text-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-200'}`}
                      onClick={() => setNewRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary transition text-sm"
                  required
                />
              </div>

              {/* Comment Input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Review</label>
                <textarea 
                  rows={4}
                  placeholder="How was the product?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-primary transition text-sm resize-none"
                  required
                ></textarea>
              </div>

              <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                Submit Review
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}