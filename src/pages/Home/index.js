import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoginSelector } from '~/redux/selector';

function Home() {
  const isLogined = useSelector(isLoginSelector);
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    if (!isLogined) {
      navigate('/login');
    }
  }, [isLogined, navigate]);
  useEffect(() => {
    handleNavigate();
  }, [handleNavigate, isLogined]);
  return <h1>Home</h1>;
}

export default Home;
