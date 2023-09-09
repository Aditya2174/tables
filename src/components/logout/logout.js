import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import './logout.css'
const LogoutButton = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform Google logout
    googleLogout();

    // Redirect the user to the sign-in page
    setLoginUser({});
    navigate('/'); // Navigate to the sign-in page
  };

  return (
    <button className="button" onClick={handleLogout}>
      Logout From Google Account
    </button>
  );
};

export default LogoutButton