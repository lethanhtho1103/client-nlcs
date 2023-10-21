import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoginSelector, isManagerSelector } from '~/redux/selector';
import HomeUser from './HomeUser';
import HomeManager from './HomeManager';

function Home() {
  const isLogined = useSelector(isLoginSelector);
  const isManager = useSelector(isManagerSelector);
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    if (!isLogined) {
      navigate('/login');
    }
  }, [isLogined, navigate]);
  useEffect(() => {
    handleNavigate();
  }, [handleNavigate, isLogined]);
  return <>{isManager ? <HomeManager /> : <HomeUser />}</>;
}

export default Home;
