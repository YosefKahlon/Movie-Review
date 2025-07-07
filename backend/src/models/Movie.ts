import { Schema, model } from 'mongoose';

export interface IMovie {
  _id: string;
  title: string;
  poster: string;
  year: number;
  description: string;
}

// No need to use mongoose schema for static movies, but keep for type compatibility
const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
});

export default model<IMovie>('Movie', movieSchema);
