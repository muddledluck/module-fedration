import React from 'react';
import './index.css'; // Ensure Tailwind logic is pulled in if not already

interface ButtonProps {
    onIncrement: () => void;
}

const Button: React.FC<ButtonProps> = ({ onIncrement }) => {
  return (
    <div className="p-4 border border-gray-300 rounded shadow-lg">
        <h3 className="text-xl font-bold mb-2">Remote Button Component</h3>
        <p className="mb-4">This button uses Tailwind <code>bg-red-500</code>.</p>
        <p className="text-sm text-gray-400 mb-2">(Clicking this should increment Host Counter)</p>
        {/* Tailwind bg-red-500 SHOULD be RED. Host maps it to BLUE. */}
        <button 
          onClick={onIncrement}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Update Host State (Increment)
        </button>
    </div>
  );
};

export default Button;
