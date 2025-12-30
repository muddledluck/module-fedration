import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, increment, decrement } from './store';

const LocalCounter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="p-4 mt-6 border border-blue-300 bg-blue-50 rounded shadow-md">
      <h3 className="text-lg font-bold text-blue-800 mb-2">Remote Local Redux Store</h3>
      <p className="mb-4 text-sm text-gray-600">
        This state is <strong>local</strong> to the Remote Application and independent of the Host.
      </p>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => dispatch(decrement())}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
        >
          -
        </button>
        <span className="text-2xl font-bold text-gray-800">{count}</span>
        <button
          onClick={() => dispatch(increment())}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default LocalCounter;
