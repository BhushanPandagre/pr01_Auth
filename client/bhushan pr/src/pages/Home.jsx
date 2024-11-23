import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import a CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1 className="title">Welcome to the MERN Auth App</h1>
        <div className="link-container">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/register" className="btn btn-secondary">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
