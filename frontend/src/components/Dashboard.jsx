import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  UserSidebar  from "./UserSidebar";
import  AdminSidebar  from "./AdminSidebar";

function Dashboard() {
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

  return (
  <div className='flex'>
     <div>
     {user.role=='admin' ? <AdminSidebar user={user}/> : <UserSidebar user={user}/>}
  </div>
  <div className='ml-4'>
      <h1 className="text-2xl font-bold">Welcome to your dashboard, {user.name}!</h1>
    </div>
    </div>
  );
}

export default Dashboard;

