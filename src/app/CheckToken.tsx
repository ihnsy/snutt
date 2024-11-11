import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null && token.trim().length > 0) {
      navigate('/timetable');
    } else {
      navigate('/home');
    }
  }, [navigate]);

  return null;
};

export default CheckToken;
