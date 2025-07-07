import { Router } from 'express';
import * as movieService from '../services/movieService';

const router = Router();

router.get('/', async (req, res) => {
  const movies = await movieService.getMovies();
  res.json(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await movieService.getMovie(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
});

export default router;
