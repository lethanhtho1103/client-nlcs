import { useState } from 'react';
import CornWaterParChart from '../CornWaterParChart/CornWaterParChart';
// Scss
import styles from './CornWaterStatistical.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function CornWaterStatistical() {
  const currentYear = new Date().getFullYear();
  const startYear = 2010;
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const yearOptions = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>,
    );
  }

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <div className={cx('wrap')}>
      <div>
        <CornWaterParChart year={selectedYear} />

        <div className={cx('select')}>
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

export default CornWaterStatistical;
