import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TopFilmUserSlide from '~/components/TopFilmUserSlide';
import { isLoginSelector } from '~/redux/selector';
function TopFilm() {
  const isLogined = useSelector(isLoginSelector);
  const navigate = useNavigate();
  const handleNavigate = useCallback(() => {
    if (!isLogined) {
      navigate('/login');
    }
  }, [isLogined, navigate]);

  useEffect(() => {
    handleNavigate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogined]);
  return <TopFilmUserSlide />;
}

export default TopFilm;
