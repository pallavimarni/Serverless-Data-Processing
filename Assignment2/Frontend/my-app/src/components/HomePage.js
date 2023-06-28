import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/registration">Register</Link>
      <br />
      <Link to="/active-users">Active Users</Link>
    </div>
  );
};

export default HomePage;
