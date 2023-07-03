import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ActiveUsersPage = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const loggedInUser = location.state?.loggedInUser;

  useEffect(() => {
    fetchActiveUsers();
  }, []);

  const handleLogout = (email) => {
    const logoutData = {
      email: email,
    };

      fetch(process.env.REACT_APP_LOGOUT_URL, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logoutData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Logout successful:', data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  const fetchActiveUsers = () => {
      fetch(process.env.REACT_APP_ACTIVE_USERS_URL)
      .then((response) => response.json())
      .then((data) => {
        setActiveUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching active users:', error);
      });
  };

  return (
    <div>
      <h1>Active Users Page</h1>
      <h2>Hi, {loggedInUser} you are logged in</h2>
      <button onClick={() => handleLogout(loggedInUser)}>Logout</button>
      <h3>Here are other users who are online:</h3>
      <ul>
        {activeUsers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUsersPage;
