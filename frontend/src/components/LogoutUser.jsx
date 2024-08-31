import { useNavigate } from 'react-router-dom';


const handleLogout = (setUser) => {
    const navigate = useNavigate();

    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  export default handleLogout;