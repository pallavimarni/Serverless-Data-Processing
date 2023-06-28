import React, { useEffect, useState } from 'react';

const ActiveUsersPage = () => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of active users
    fetch('http://localhost:6006/online')
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the list of active users
        setActiveUsers(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the API request
        console.error('Error fetching active users:', error);
      });
  }, []);

  const handleLogout = (email) => {
    // Create the logout request payload
    const logoutData = {
      email: email,
    };

    // Send the logout request
    fetch('http://localhost:6006/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logoutData),
    })
      .then((response) => response.json())
      .then((data) => {
   
        console.log('Logout successful:', data);
   
        fetchActiveUsers();
      })
      .catch((error) => {
       
        console.error('Error logging out:', error);
      });
  };

  const fetchActiveUsers = () => {
    fetch('http://localhost:6006/online')
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
      <ul>
        {activeUsers.map((user) => (
          <li key={user}>
            {user}
            <button onClick={() => handleLogout(user)}>Logout</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUsersPage;
