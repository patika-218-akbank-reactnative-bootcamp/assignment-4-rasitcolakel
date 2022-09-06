import {createSlice} from '@reduxjs/toolkit';

export type UserState = {
  user: null | UserType;
};
export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    user: null,
  },
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
