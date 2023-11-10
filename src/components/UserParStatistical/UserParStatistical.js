import UserParChart from '../UserParChart/UserParChart';
import { useContext, useState } from 'react';
import { AdminShowTimeContext } from '~/Context/AdminShowTimeContext';

// Scss
import styles from './UserParStatistical.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function UserParStatistical() {
  const currentYear = new Date().getFullYear();
  const startYear = 2010;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedFilmId, setSelectedFilmId] = useState('c3ce148f0f03');

  const { filmInfo } = useContext(AdminShowTimeContext);

  const yearOptions = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>,
    );
  }

  const filmOptions = [];
  filmInfo?.map((film, index) =>
    filmOptions.push(
      <option key={index} value={film.id}>
        {film.name}
      </option>,
    ),
  );

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleFilmIdChange = (event) => {
    setSelectedFilmId(event.target.value);
  };

  console.log(selectedFilmId);
  return (
    <div className={cx('wrap')}>
      <div>
        <UserParChart year={selectedYear} filmId={selectedFilmId} />
        <div className={cx('select-year')}>
          Xem biểu đồ phim
          <select onChange={handleFilmIdChange} value={selectedFilmId}>
            {filmOptions}
          </select>
        </div>
        <div className={cx('select-filmId')}>
          Xem biểu đồ ở năm
          <select onChange={handleYearChange} value={selectedYear}>
            {yearOptions}
          </select>
        </div>
        <div className={cx('footer')}>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}

export default UserParStatistical;
