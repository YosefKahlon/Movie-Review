import { Router } from 'express';
import * as reviewService from '../services/reviewService';
import Review from '../models/Review';

const router = Router();

router.get('/', async (req, res) => {
  const reviews = await reviewService.getReviews();
  res.json(reviews);
});

router.get('/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const reviews = await Review.find({ movie: movieId });
  res.status(200).json(reviews);
});

router.post('/', async (req, res) => {
  const { rating, content, reviewer, movie } = req.body;
  if (!rating || !content || !reviewer || !movie) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const review = await reviewService.addReview(rating, content, reviewer, movie);
  res.status(201).json(review);
});

export default router;
