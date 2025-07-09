import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import moviesRouter from './api/movies';
import reviewsRouter from './api/reviews';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
app.get('/', (req, res) => {
  res.json({ message: 'Movie Review API is running!' });
});

export default app;
