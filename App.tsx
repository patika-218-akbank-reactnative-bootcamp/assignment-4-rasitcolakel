import 'react-native-gesture-handler';
import React from 'react';

import {Provider} from 'react-redux';
import store from './src/store';
import Navigation from './src/screens';

export const config = {
  API_URL: 'http://192.168.1.6:3000/',
  MOVIE_API_URL: 'https://api.themoviedb.org/3/',
};
const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
