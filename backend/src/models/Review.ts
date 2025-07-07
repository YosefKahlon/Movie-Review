import { Schema, model } from 'mongoose';

export interface IReview {
  _id?: string;
  rating: number;
  content: string;
  reviewer: string; // reviewer name
  movie: string; // movie _id
}

const reviewSchema = new Schema<IReview>({
  rating: { type: Number, required: true },
  content: { type: String, required: true },
  reviewer: { type: String, required: true },
  movie: { type: String, required: true },
});

export default model<IReview>('Review', reviewSchema);
