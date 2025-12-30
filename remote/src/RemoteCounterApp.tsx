import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import LocalCounter from './LocalCounter';

const RemoteCounterApp = () => {
  return (
    <Provider store={store}>
      <LocalCounter />
    </Provider>
  );
};

export default RemoteCounterApp;
