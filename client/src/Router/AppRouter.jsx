import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import MainPage from '../Pages/MainPage/MainPage';
import AdminPage from '../Pages/AdminPage/AdminPage';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import ProtectedRoute from '../Router/ProtectedRoute';

const AppRouter = () => {
    const token = localStorage.getItem('token'); // Dynamically read from localStorage

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout><MainPage /></Layout>} />
                <Route
                    path="/adminpage"
                    element={
                        <ProtectedRoute
                            token={token} // Use latest token from localStorage
                            message="Access denied. You are not authorized to view this page."
                        >
                            <Layout><AdminPage /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route path="/error" element={<Layout><ErrorPage /></Layout>} />
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