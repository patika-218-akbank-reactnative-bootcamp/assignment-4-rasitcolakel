import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColorSchemeName} from 'react-native';
import {darkTheme, ThemeType} from '../../assets/darkTheme';
import {lightTheme} from '../../assets/lightTheme';

// This is the type of the theme object that can be LIGHT or DARK
type uiType = {
  loading: boolean;
};
const initialState: ThemeType & uiType = {
  ...lightTheme,
  loading: false,
};
export const themeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // This is the action that will be dispatched when the theme is changed, payload is the theme name
    setTheme: (state, action: PayloadAction<ColorSchemeName>) => {
      const newTheme = action.payload === 'dark' ? darkTheme : lightTheme;
      state.colors = newTheme.colors;
      state.name = newTheme.name;
    },
    // This is the action that will be dispatched when the theme is changed, payload not required
    toogleTheme: state => {
      const newTheme = state.name === 'dark' ? darkTheme : lightTheme;
      state.colors = newTheme.colors;
      state.name = newTheme.name;
    },
  },
});

export const {setTheme, toogleTheme} = themeSlice.actions;

export default themeSlice.reducer;
