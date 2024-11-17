import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ErrorPage = () => {
  const location = useLocation();
  const errorMessage = location.state?.message || "An unexpected error occurred.";

  return (
      <div className="error-page">
          <h1>Oops! Something went wrong.</h1>
          <div className="error-message">
              <p>{errorMessage}</p>
          </div>
          <Link to="/" className="back-link">
              Return to Main Page
          </Link>
      </div>
  );
};

export default ErrorPage;


