import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieResponse} from '@src/types/APITypes';

const initialMovies = {
  results: [],
  page: 0,
  total_pages: 0,
  total_results: 0,
};
export type MovieState = {
  topRated: MovieResponse;
  popular: MovieResponse;
  upcoming: MovieResponse;
  nowPlaying: MovieResponse;
};

export type Movie = {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

const initialState: MovieState = {
  topRated: initialMovies,
  popular: initialMovies,
  upcoming: initialMovies,
  nowPlaying: initialMovies,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (
      state,
      action: PayloadAction<{
        type: 'topRated' | 'popular' | 'upcoming' | 'nowPlaying';
        data: MovieResponse;
      }>,
    ) => {
      const {type, data} = action.payload;
      state[type].results = [...state[type].results, ...data.results];
      state[type].page = data.page;
      state[type].total_pages = data.total_pages;
      state[type].total_results = data.total_results;
    },
    setPopular: (state, action: PayloadAction<MovieResponse>) => {
      state.popular = action.payload;
    },
    setUpcoming: (state, action: PayloadAction<MovieResponse>) => {
      state.upcoming = action.payload;
    },
    setNowPlaying: (state, action: PayloadAction<MovieResponse>) => {
      state.nowPlaying = action.payload;
    },
  },
});
