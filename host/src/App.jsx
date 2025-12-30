import React, { Suspense } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import store from './store';
import ErrorBoundary from './ErrorBoundary';
import UserDetails from './UserDetails';
import './index.css';

const RemoteButton = React.lazy(() => import('remoteApp/Button'));
const RemoteUserList = React.lazy(() => import('remoteApp/UserList'));

const Dashboard = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="host-container">
      <h1>Host App (React 17) - Dashboard</h1>
      <nav style={{ marginBottom: '20px' }}>
          <Link to="/user" style={{ marginRight: '15px', color: 'blue' }}>View Full User List Page</Link>
      </nav>

      <p>Redux Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Host Increment Button
      </button>

      <hr style={{ margin: '20px 0' }} />

      <h2>Remote Components (React 19)</h2>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading Remote Component...</div>}>
           <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
              {/* Feature 1: Button with Redux Update */}
              <div style={{ border: '1px dashed #ccc', padding: '10px' }}>
                  <h4>Remote Button</h4>
                  <RemoteButton onIncrement={() => dispatch({ type: 'INCREMENT' })} />
              </div>

              {/* Feature 2: Embed User List in Dashboard */}
              <div style={{ border: '1px dashed #ccc', padding: '10px' }}>
                  <h4>Remote User List (Embedded)</h4>
                  <RemoteUserList onUserSelect={(user) => navigate(`/user/${user.id}`)} />
              </div>
           </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const UserListPage = () => {
  const navigate = useNavigate();
  return (
    <div className="host-container">
      <h1>Full User List (Host Page)</h1>
      <p>This page is a dedicated route <code>/user</code> rendering the Remote List.</p>
      <Link to="/" style={{ color: 'blue', marginBottom: '10px', display: 'block' }}>← Back to Dashboard</Link>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading List...</div>}>
           <RemoteUserList onUserSelect={(user) => navigate(`/user/${user.id}`)} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<UserListPage />} />
        <Route path="/user/:userId" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
