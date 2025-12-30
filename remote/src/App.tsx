import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import LocalCounter from './LocalCounter';
import Button from './Button';
import UserList from './UserList';
import './index.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold underline mb-4">Remote Application</h1>
        <Button onIncrement={() => console.log('Remote Increment Clicked')} />
        <LocalCounter />
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">User List</h2>
            {/* Pass a dummy handler for standalone testing */}
            <UserList onUserSelect={(user) => console.log('Selected user:', user)} />
        </div>
      </div>
    </Provider>
  );
};

export default App;
