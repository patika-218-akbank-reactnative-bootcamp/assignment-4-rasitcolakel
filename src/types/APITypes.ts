import {Genre} from '../store/slices/genres';
import {Movie} from '../store/slices/movies';

export type BaseParams = {
  params: {
    api_key: string;
    language: string;
  };
};

export type GenresRequest = BaseParams & {};

export type GenresResponse = {
  genres: Genre[];
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
