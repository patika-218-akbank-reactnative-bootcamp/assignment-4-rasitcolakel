import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MoviesResponse} from '@src/types/APITypes';

export type MovieType =
  | 'topRated'
  | 'popular'
  | 'upcoming'
  | 'nowPlaying'
  | 'searchedMovies';

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
  searchedMovies: MoviesResponse;
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

export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

const initialState: MovieState = {
  topRated: initialMovies,
  popular: initialMovies,
  upcoming: initialMovies,
  nowPlaying: initialMovies,
  searchedMovies: initialMovies,
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
        isClear?: boolean;
      }>,
    ) => {
      const {type, data} = action.payload;
      if (action.payload.isClear) {
        state[type] = data;
      } else {
        state[type].results = [...state[type].results, ...data.results];
      }
      state[type].page = data.page;
      state[type].total_pages = data.total_pages;
      state[type].total_results = data.total_results;
    },
  },
});

export const {setMovies} = moviesSlice.actions;

export default moviesSlice.reducer;
