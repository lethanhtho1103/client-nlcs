import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoginSelector } from '~/redux/selector';
import FormLogin from '~/components/FormLogin';
function Login() {
  const isLogined = useSelector(isLoginSelector);
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    if (isLogined) {
      navigate('/');
    }
  }, [isLogined, navigate]);
  useEffect(() => {
    handleNavigate();
  }, [handleNavigate, isLogined]);
  return <FormLogin />;
}

export default Login;
