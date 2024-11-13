import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import Layout from '../Layouts/Layout';
import MainPage from '../Pages/MainPage/MainPage';
import AdminPage from '../Pages/AdminPage/AdminPage';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import ProtectedRoute from '../Router/ProtectedRoute';

const AppRouter = ({ token }) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout><MainPage /></Layout>} />

                {/* Protected route for admin page */}
                <Route
                    path="/adminpage"
                    element={
                        <ProtectedRoute token={token} message="Access denied. You are not authorized to view this page.">
                            <Layout><AdminPage /></Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Error page */}
                <Route path="/error" element={<Layout><ErrorPage /></Layout>} />

                {/* Fallback for undefined routes */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/error"
                            replace
                            state={{ message: "Page not found. The page you are looking for does not exist." }}
                        />
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
