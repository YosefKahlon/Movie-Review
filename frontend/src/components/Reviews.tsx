import * as React from 'react';
import { useState } from 'react';
import { Movie } from './Movies';

export interface Review {
  _id: string;
  movie: string; // movie id
  reviewer: string;
  content: string;
}

interface ReviewListProps {
  reviews: Review[];
  movies: Movie[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews, movies }: ReviewListProps) => (
  <div>
    <h2>Reviews</h2>
    <ul>
      {reviews.map((review: Review) => (
        <li key={review._id} style={{ marginBottom: 12 }}>
          <strong>{movies.find((m: Movie) => m._id === review.movie)?.title || 'Unknown Movie'}:</strong> <em>{review.reviewer}</em> - {review.content}
        </li>
      ))}
    </ul>
  </div>
);

interface AddReviewProps {
  onAdd: (review: Omit<Review, '_id'>) => void;
  movies: Movie[];
}

export const AddReview: React.FC<AddReviewProps> = ({ onAdd, movies }: AddReviewProps) => {
  const [movie, setMovie] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!movie || !reviewer.trim() || !content.trim()) return;
    onAdd({ movie, reviewer, content });
    setMovie('');
    setReviewer('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <select value={movie} onChange={e => setMovie(e.target.value)} required>
        <option value="">Select Movie</option>
        {movies.map((m: Movie) => (
          <option key={m._id} value={m._id}>{m.title}</option>
        ))}
      </select>
      <input
        type="text"
        value={reviewer}
        onChange={e => setReviewer(e.target.value)}
        placeholder="Your name"
        required
      />
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Review"
        required
      />
      <button type="submit">Add Review</button>
    </form>
  );
};

export default ReviewList;
