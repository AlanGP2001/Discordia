import React from 'react';
import Header from '../Menu/Menu';


function Layout({ children }) {
  return (
    <>
    <Header/>
      <div className="h-auto">

        {children}
        
      </div>
    </>
  );
}

export default Layout;
