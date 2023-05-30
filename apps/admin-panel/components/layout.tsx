import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-auto h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <Navbar />
        <div className="m-5 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
