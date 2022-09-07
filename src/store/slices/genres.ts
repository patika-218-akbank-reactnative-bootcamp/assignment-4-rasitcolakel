import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type GenresState = {
  data: Genre[];
};

export type Genre = {
  id: number;
  name: string;
};

const initialState: GenresState = {
  data: [],
};

export const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.data = action.payload;
    },
  },
});

export const {setGenres} = genresSlice.actions;

export default genresSlice.reducer;
