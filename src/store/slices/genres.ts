import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type GenresState = {
  genres: Genre[];
};

export type Genre = {
  id: number;
  name: string;
};

const initialState: GenresState = {
  genres: [],
};

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
    },
  },
});
