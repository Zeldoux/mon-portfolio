import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import components from react-router-dom for routing. 
// `BrowserRouter` is renamed as `Router` for simplicity. 
// `Routes` is the component that handles routing, and `Route` defines individual routes.

// import of layout 
import Layout from '../Layouts/Layout';

// import of Page
import MainPage from '../Pages/MainPage/MainPage';
import Dashboard from '../Pages/AdminPage/AdminPage';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';

const AppRouter = ({ token }) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout><MainPage /></Layout>} />
                
                {/* Protected route for personal dashboard */}
                {token && (
                    <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                )}

                {/* Fallback for undefined routes */}
                <Route path="*" element={<Layout><ErrorPage /></Layout>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;