import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Check for the token whenever this component tries to render
  const token = localStorage.getItem('fm_token');

  // If no token found, kick them back to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, let them pass
  return children;
};

export default AdminRoute;