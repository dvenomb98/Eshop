import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';


const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = UserAuth();
  

  if (!user || isLoading) {
    
    return <Navigate to='/signin' />;
  }

  return children;
};

export default ProtectedRoute;