// @ts-nocheck
import request from 'supertest';
import mongoose from 'mongoose';

// Increase Jest timeout for slow DB operations
jest.setTimeout(20000);

beforeAll(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/movie-review-test');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
});
import app from '../src/app';

describe('Review API', () => {
  afterAll(async () => {
    if (mongoose.connection && mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.disconnect();
  });

  it('should create a new review', async () => {
    const review = {
      reviewer: 'Test User',
      content: 'Great movie!',
      rating: 5,
      movie: '1',
    };
    const res = await request(app).post('/api/reviews').send(review);
    expect(res.status).toBe(201);
    expect(res.body.reviewer).toBe('Test User');
  });

  it('should fetch reviews for a movie', async () => {
    // Ensure at least one review exists for movie '1'
    await request(app).post('/api/reviews').send({
      reviewer: 'Fetch Test',
      content: 'Fetch test review',
      rating: 4,
      movie: '1',
    });
    const res = await request(app).get('/api/reviews/1');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
