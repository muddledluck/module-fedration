import React from 'react';
import Button from './Button';
import './index.css';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4">Remote Application</h1>
      <Button onIncrement={() => console.log('Remote Increment Clicked')} />
    </div>
  );
};

export default App;
