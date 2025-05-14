import React from 'react';

export const ErrorBanner: React.FC<{ message: string }> = ({ message }) => (
  <div style={{ color: 'white', background: 'crimson', padding: '8px', borderRadius: '4px' }}>
    {message}
  </div>
);
