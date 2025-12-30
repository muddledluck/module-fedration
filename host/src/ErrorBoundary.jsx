import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          border: '1px solid #ff4444',
          borderRadius: '5px',
          backgroundColor: '#ffeaea',
          color: '#d32f2f'
        }}>
          <h3>⚠️ Remote Service Unavailable</h3>
          <p>The Remote Child Application seems to be down.</p>
          <p><em>(Make sure port 3001 is running)</em></p>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
