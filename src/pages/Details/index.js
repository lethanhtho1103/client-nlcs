import Detail from '../../components/Detail';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DetailProvider } from '~/Context/DetailContext';
import { isLoginSelector } from '~/redux/selector';
function Details() {
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
  return (
    <DetailProvider>
      <Detail />
    </DetailProvider>
  );
}

export default Details;
