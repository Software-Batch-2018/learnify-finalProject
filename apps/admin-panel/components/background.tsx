import React from 'react';

const Background = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-white dark:bg-gray-800">{children}</div>;
};

export default Background;
