import * as React from 'react';

export interface Movie {
  _id: string;
  title: string;
  poster: string;
  year: number;
  description: string;
}

interface MovieListProps {
  movies: Movie[];
  getAverageRating?: (movieId: string) => number | null;
  renderReviews?: (movieId: string) => React.ReactNode;
  onPosterClick?: (id: string) => void;
}

export const MovieList: React.FC<MovieListProps> = ({ movies, getAverageRating, renderReviews, onPosterClick }) => (
  <div className="movie-grid">
    {movies.map((movie: Movie) => (
      <div className="movie-card" key={movie._id}>
        <div
          className="movie-poster-wrapper"
          style={{ cursor: onPosterClick ? 'pointer' : undefined }}
          onClick={onPosterClick ? () => onPosterClick(movie._id) : undefined}
        >
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
        </div>
        <div className="movie-info">
          <h3>{movie.title} <span className="movie-year">({movie.year})</span></h3>
          <p className="movie-desc">{movie.description}</p>
          {getAverageRating && (
            <div className="movie-rating">
              {getAverageRating(movie._id) !== null ? (
                <span>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} style={{ color: i < (getAverageRating(movie._id) || 0) ? '#FFD700' : '#ccc' }}>&#9733;</span>
                  ))}
                  <span style={{ marginLeft: 18, color: '#fff', fontSize: 13 }}>
                    {getAverageRating(movie._id)?.toFixed(1)} / 5
                  </span>
                </span>
              ) : (
                <span style={{ color: '#aaa' }}>No ratings yet</span>
              )}
            </div>
          )}
          {renderReviews && (
            <div className="movie-reviews">
              {renderReviews(movie._id)}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default MovieList;
