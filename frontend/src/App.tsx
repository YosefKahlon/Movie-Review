import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList, { Movie } from './components/Movies';
import ReviewList, { AddReview, Review } from './components/Reviews';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
    fetchReviews();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get('/api/movies');
      setMovies(res.data);
    } catch (err) {
      // handle error
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get('/api/reviews');
      setReviews(res.data);
    } catch (err) {
      // handle error
    }
  };

  const handleAddReview = async (review: Omit<Review, '_id'>) => {
    await axios.post('/api/reviews', review);
    await fetchReviews(); // Ensure reviews are updated before re-render
  };

  // Home: grid of posters
  const handlePosterClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="app-container">
      <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>🎬 Movie Review App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <MovieList
              movies={movies}
              getAverageRating={id => {
                const movieReviews = reviews.filter(r => r.movie === id);
                if (movieReviews.length === 0) return null;
                return movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length;
              }}
              renderReviews={undefined}
              // @ts-ignore
              onPosterClick={handlePosterClick}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetail
              movies={movies}
              reviews={reviews}
              onAddReview={handleAddReview}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
