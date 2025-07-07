import Review, { IReview } from '../models/Review';

export const getAllReviews = async () => {
  return Review.find();
};

export const createReview = async (rating: number, content: string, reviewer: string, movie: string) => {
  return Review.create({ rating, content, reviewer, movie });
};
