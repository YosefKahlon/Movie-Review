import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import moviesRouter from './api/movies';
import reviewsRouter from './api/reviews';
import connectDB from './config/prisma';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter);
app.get('/', (req, res) => {
  res.json({ message: 'Movie Review API is running!' });
});

export default app;
