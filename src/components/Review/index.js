import classNames from 'classnames/bind';
import style from './Review.module.scss';
import { useState } from 'react';

const cx = classNames.bind(style);

function Review({ toggleShow, filmInfo }) {
  const [isHidden, setIsHidden] = useState(false);

  const handleMouseLeave = () => {
    setIsHidden(true);
  };

  console.log(filmInfo);

  const handelClickHidden = () => {
    if (isHidden) {
      toggleShow();
    }
  };

  const handelHidden = () => {
    toggleShow();
  };
  return (
    <div onClick={handelClickHidden} className={cx('wrap')}>
      <div onMouseLeave={handleMouseLeave} className={cx('review')}>
        <div className={cx('video')}>
          <iframe title={filmInfo.name} src={`https://www.youtube.com/embed/${filmInfo.trailer}`}></iframe>
        </div>
        <div className={cx('info_film')}>
          <img src={filmInfo.image} alt={filmInfo.name} />
          <div className={cx('info')}>
            <h3 className={cx('name-type')}>
              {filmInfo.name}&nbsp;
              <span>- {filmInfo.type}</span>
            </h3>
            <div className={cx('content')}>{filmInfo.content}</div>
            <div className={cx('btn')}>
              <a href="/" className={cx('btn-buy')}>
                Đặt vé
              </a>
              <span onClick={handelHidden} className={cx('btn-exit')}>
                Đóng
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
