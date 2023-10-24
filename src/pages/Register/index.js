import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoginSelector } from '~/redux/selector';
import FormRegister from '~/components/FormRegister';
function Register() {
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
  return <FormRegister />;
}

export default Register;
