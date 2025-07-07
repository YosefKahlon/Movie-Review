import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Movie } from '../components/Movies';
import { Review, AddReview, ReviewList } from '../components/Reviews';

interface MovieDetailProps {
  movies: Movie[];
  reviews: Review[];
  onAddReview: (review: Omit<Review, '_id'>) => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movies, reviews, onAddReview }: MovieDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = movies.find((m: Movie) => m._id === id);
  if (!movie) return <div>Movie not found</div>;
  const movieReviews = reviews.filter((r: Review) => r.movie === movie._id);
  const avgRating = movieReviews.length > 0 ? (movieReviews.reduce((sum: number, r: Review) => sum + r.rating, 0) / movieReviews.length) : null;

  return (
    <div className="movie-detail-page">
      <button onClick={() => navigate('/')} style={{ marginBottom: 24, background: '#3f37c9', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>&larr; Back to Movies</button>
      <div className="movie-detail-card">
        <img src={movie.poster} alt={movie.title} className="movie-detail-poster" />
        <div className="movie-detail-info">
          <h2 style={{ fontSize: 32, marginBottom: 8, color: '#3f37c9' }}>{movie.title} <span className="movie-year" style={{ color: '#888', fontSize: 22 }}>({movie.year})</span></h2>
          <p style={{ fontSize: 18, color: '#fff', marginBottom: 18 }}>{movie.description}</p>
          <div className="movie-rating" style={{ fontSize: 22, marginBottom: 18 }}>
            {avgRating !== null ? (
              <span>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} style={{ color: i < avgRating ? '#FFD700' : '#ccc', fontSize: 28 }}>&#9733;</span>
                ))}
                <span style={{ marginLeft: 10, color: '#555', fontSize: 18 }}>
                  {avgRating.toFixed(1)} / 5
                </span>
              </span>
            ) : (
              <span style={{ color: '#aaa', fontSize: 18 }}>No ratings yet</span>
            )}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 40 }}>
        <AddReview onAdd={onAddReview} movies={[movie]} movieId={movie._id} />
        <ReviewList reviews={movieReviews} movies={[movie]} hideMovieTitle />
      </div>
    </div>
  );
};

export default MovieDetail;
