import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import Header from './layout/Header';

function PrivateRoute() {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.user) {
      return <Navigate to='/login' state={{ from: location }} />;
    }
  
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default PrivateRoute;