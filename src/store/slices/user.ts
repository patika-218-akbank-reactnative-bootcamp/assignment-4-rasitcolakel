import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type UserState = {
  accessToken: string | null;
  user: null | UserType;
};
export type UserType = {
  id: number;
  name: string;
  email: string;
};
const initialState: UserState = {
  accessToken: null,
  user: null,
};
export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
