import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MoviesResponse} from '@src/types/APITypes';

export type MovieType = 'topRated' | 'popular' | 'upcoming' | 'nowPlaying';

const initialMovies = {
  results: [],
  page: 0,
  total_pages: 0,
  total_results: 0,
};
export type MovieState = {
  topRated: MoviesResponse;
  popular: MoviesResponse;
  upcoming: MoviesResponse;
  nowPlaying: MoviesResponse;
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
        type: MovieType;
        data: MoviesResponse;
      }>,
    ) => {
      const {type, data} = action.payload;
      state[type].results = [...state[type].results, ...data.results];
      state[type].page = data.page;
      state[type].total_pages = data.total_pages;
      state[type].total_results = data.total_results;
    },
  },
});

export const {setMovies} = moviesSlice.actions;

export default moviesSlice.reducer;
