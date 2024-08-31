import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Sidebar from './Sidebar';  // Import Sidebar component

function UrlDataUser() {
  const [user, setUser] = useState({ name: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('http://localhost:5000/api/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data); 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return <Sidebar user={user} />;
}

export default UrlDataUser;
