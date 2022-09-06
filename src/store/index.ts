import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {themeSlice} from './slices/theme';
import {userSlice} from './slices/user';
// ...
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    theme: themeSlice.reducer,
  },
  // devtools is enabled by default in development mode
  devTools: true,
  middleware: getDefaultMiddleware => {
    if (__DEV__) {
      // Redux devtools with flipper
      const createDebugger = require('redux-flipper').default;

      return getDefaultMiddleware().concat(createDebugger());
    }

    return getDefaultMiddleware();
  },
});
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
