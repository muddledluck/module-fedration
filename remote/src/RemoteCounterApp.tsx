import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import LocalCounter from './LocalCounter';

import HostGuard from './HostGuard';

const RemoteCounterApp = () => {
  return (
    <HostGuard allowedHosts={['http://localhost:3000']}>
      <Provider store={store}>
        <LocalCounter />
      </Provider>
    </HostGuard>
  );
};

export default RemoteCounterApp;
