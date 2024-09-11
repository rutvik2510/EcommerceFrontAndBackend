// export default Dashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  UserSidebar  from "./Sidebar/UserSidebar";
import  AdminSidebar  from "./Sidebar/AdminSidebar";
 import ProductForm from './AdminProductForm.jsx';

function Dashboard() {
  const [user, setUser] = useState({ name: '', role: '' });
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {user.role === 'admin' ? (
         <AdminSidebar user={user} />
       ) : (
         <UserSidebar user={user} />
       )}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        {/* Conditional Rendering based on user role */}
        {user.role === 'admin' ? (
          <ProductForm />
        ) : (
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user.name}!
          </h1>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import  UserSidebar  from "./Sidebar/UserSidebar";
// import  AdminSidebar  from "./Sidebar/AdminSidebar";
// import ProductForm from './ProductForm.jsx';

// function Dashboard() {
//   const [user, setUser] = useState({ name: '' });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token'); 
//         if (token) {
//           const res = await axios.get('http://localhost:5000/api/user/profile', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUser(res.data); 
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <div className='flex flex-col md:flex-row'>
//     <div className="w-full md:w-1/4 lg:w-1/5">
//       {user.role === 'admin' ? (
//         <AdminSidebar user={user} />
//       ) : (
//         <UserSidebar user={user} />
//       )}
//     </div>
//     <div className="w-full md:w-3/4 lg:w-4/5 bg-gray-100 p-6">
//       <ProductForm />
//     </div>
//   </div>
//   );
// }