import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from './slices/user';
// ...
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
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

export default store;
