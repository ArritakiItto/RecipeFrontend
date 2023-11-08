import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authcontext';

function PrivateRoute({ children, ...rest }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // If the user is logged in, render the children, otherwise render null
  return isLoggedIn ? children : null;
}

export default PrivateRoute;



