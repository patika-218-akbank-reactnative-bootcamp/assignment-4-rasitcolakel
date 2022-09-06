import 'react-native-gesture-handler';
import React from 'react';

import {Provider} from 'react-redux';
import store from './src/store';
import Navigation from './src/screens';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
