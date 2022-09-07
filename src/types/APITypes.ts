import {Genre} from '@src/store/slices/genres';
import {Movie} from '@src/store/slices/movies';

export type BaseParams = {
  api_key?: string;
  language?: string;
  query?: string;
  page?: number;
};

export type GenresResponse = {
  genres: Genre[];
};

export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
