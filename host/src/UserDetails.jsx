import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  // In a real app, we would fetch user details by ID here.
  // For now, we'll just display the ID.

  return (
    <div className="host-container" style={{ marginTop: '20px', borderColor: '#007bff' }}>
      <h1>User Details (Host Page)</h1>
      <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2>User ID: {userId}</h2>
        <p>This page is part of the <strong>Host Application</strong> (React 17).</p>
        <p>It was navigated to from the <strong>Remote Application</strong> (React 19) User List.</p>
        
        <hr style={{ margin: '20px 0' }} />
        
        <button 
          onClick={() => navigate(-1)}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Back to User List
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
