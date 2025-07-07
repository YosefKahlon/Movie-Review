import { staticMovies } from '../data/staticMovies';
import { IMovie } from '../models/Movie';

export const getAllMovies = async (): Promise<IMovie[]> => {
  return staticMovies;
};

export const getMovieById = async (id: string): Promise<IMovie | undefined> => {
  return staticMovies.find(m => m._id === id);
};
