// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, token, message }) => {
    return token ? children : <Navigate to="/error" replace state={{ message }} />;
};

export default ProtectedRoute;