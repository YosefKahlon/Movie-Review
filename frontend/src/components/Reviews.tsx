import * as React from 'react';
import { useState } from 'react';
import { Movie } from './Movies';

export interface Review {
  _id: string;
  movie: string; // movie id
  reviewer: string;
  content: string;
  rating: number;
}

interface ReviewListProps {
  reviews: Review[];
  movies: Movie[];
}

export const ReviewList: React.FC<ReviewListProps & { hideMovieTitle?: boolean }> = ({ reviews, movies, hideMovieTitle }) => (
  <div>
    <h2>Reviews</h2>
    <ul>
      {reviews.map((review: Review) => (
        <li key={review._id} style={{ marginBottom: 12 }}>
          {!hideMovieTitle && <strong>{movies.find((m: Movie) => m._id === review.movie)?.title || 'Unknown Movie'}: </strong>}
          <em>{review.reviewer}</em> - {review.content}
          {typeof review.rating === 'number' && (
            <span style={{ marginLeft: 8, color: '#FFD700' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

interface AddReviewProps {
  onAdd: (review: Omit<Review, '_id'>) => void;
  movies: Movie[];
  movieId?: string;
}

export const AddReview: React.FC<AddReviewProps> = ({ onAdd, movies, movieId }: AddReviewProps) => {
  const [reviewer, setReviewer] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewer.trim() || !content.trim() || rating === 0) return;
    onAdd({ movie: movieId || movies[0]._id, reviewer, content, rating });
    setReviewer('');
    setContent('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16, display: 'flex', gap: 12 }}>
      {/* Hide movie select if movieId is provided */}
      {!movieId && (
        <select value={movieId || ''} onChange={() => {}} required disabled>
          <option value="">Select Movie</option>
          {movies.map((m: Movie) => (
            <option key={m._id} value={m._id}>{m.title}</option>
          ))}
        </select>
      )}
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            style={{ cursor: 'pointer', color: i < rating ? '#FFD700' : '#ccc', fontSize: 22 }}
            onClick={() => setRating(i + 1)}
            data-testid={`star-${i}`}
          >
            ★
          </span>
        ))}
      </div>
      <button type="submit">Add Review</button>
    </form>
  );
};

export default ReviewList;
