import React from 'react';
// import { createStore, applyMiddleware } from 'redux';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
// import thunk from 'redux';
// import rootReducer from './src/stores/rootReducer';
import Navigation from './navigation';
import store from './stores';
import { COLORS } from './constants';

// const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Navigation />
    </Provider>
  );

  // return <Navigation />;
};

export default App;
