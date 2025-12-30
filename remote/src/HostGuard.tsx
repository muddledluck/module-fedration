import React, { useEffect, useState } from 'react';

interface HostGuardProps {
  children: React.ReactNode;
  allowedHosts: string[];
}

const HostGuard: React.FC<HostGuardProps> = ({ children, allowedHosts }) => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [currentOrigin, setCurrentOrigin] = useState('');

  useEffect(() => {
    const origin = window.location.origin;
    setCurrentOrigin(origin);
    // Check if the current origin is in the allowed list
    if (allowedHosts.includes(origin)) {
      setIsAllowed(true);
    }
  }, [allowedHosts]);

  if (!isAllowed) {
    return (
      <div className="p-4 border border-red-500 bg-red-100 text-red-700 rounded shadow-sm">
        <h4 className="font-bold mb-1">⚠️ Access Restricted</h4>
        <p className="text-sm">
            This component is not authorized to run on <code>{currentOrigin}</code>.
        </p>
        <p className="text-xs mt-1 text-red-500">
            Allowed Hosts: {allowedHosts.join(', ')}
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default HostGuard;
