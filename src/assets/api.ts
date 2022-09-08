import {BaseParams, GenresResponse, MoviesResponse} from '@src/types/APITypes';
import axios from 'axios';
import {config} from './config';

function camelToUnderscore(key: string): string {
  var result = key.replace(/([A-Z])/g, ' $1');
  return result.split(' ').join('_').toLowerCase();
}

export const movieRequest = async (
  baseUrl: string,
  params?: BaseParams,
): Promise<MoviesResponse> => {
  const request = await axios.get<MoviesResponse>(
    config.MOVIE_API_URL + 'movie/' + camelToUnderscore(baseUrl),
    {
      params: {
        ...params,
        api_key: config.API_KEY,
        language: 'en-US',
      },
    },
  );
  return request.data;
};

export const genreRequest = async () => {
  const request = await axios.get<GenresResponse>(
    config.MOVIE_API_URL + 'genre/movie/list',
    {
      params: {
        api_key: config.API_KEY,
        language: 'en-US',
      },
    },
  );
  return request.data;
};

export const getCasts = async (id: number) => {
  const request = await axios.get(
    config.MOVIE_API_URL + 'movie/' + id + '/credits',
    {
      params: {
        api_key: config.API_KEY,
        language: 'en-US',
      },
    },
  );
  return request.data;
};
