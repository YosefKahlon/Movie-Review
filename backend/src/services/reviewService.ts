import * as reviewRepository from '../repositories/reviewRepository';

export const getReviews = async () => {
  return reviewRepository.getAllReviews();
};

export const addReview = async (rating: number, content: string, reviewer: string, movie: string) => {
  return reviewRepository.createReview(rating, content, reviewer, movie);
};
