import * as movieRepository from '../repositories/movieRepository';

export const getMovies = async () => {
  return movieRepository.getAllMovies();
};

export const getMovie = async (id: string) => {
  return movieRepository.getMovieById(id);
};
