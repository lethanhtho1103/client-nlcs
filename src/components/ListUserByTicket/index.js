import { useState, useEffect, useRef } from 'react';

// import MoreWork from '../MoreWork';
import { Col } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './ListUserByTicket.module.scss';

const cx = classNames.bind(styles);

function ListUserByTicket({ listUser }) {
  const [isVisible, setIsVisible] = useState(false);
  // const [totalTicket, setTotalTicket] = useState([]);
  const workRef = useRef(null);

  // const handelTotalTicket = async () => {
  //   const res = await filmService.totalTicket(filmId, startTime);
  //   setTotalTicket(res.data);
  // };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (workRef.current) {
      observer.observe(workRef.current);
    }

    return () => {
      if (workRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(workRef.current);
      }
    };
  }, []);

  console.log();

  return (
    <div
      className={cx('wrap', {
        visible: isVisible,
      })}
    >
      <div className={cx('wrap-item')} ref={workRef}>
        <div className={cx('item')}>
          <div className="row">
            <Col sm={4} className={cx('title')}>
              Ngày chiếu
            </Col>
            <Col sm={4} className={cx('title')}>
              Tên phim
            </Col>
            <Col sm={4} className={cx('title')}>
              Giờ chiếu
            </Col>
          </div>

          <div className="row mb-2">
            <Col sm={4} className={cx('name-main')}>
              {/* {moment({listUser.film.startDate}).format('L')} ({moment(listUser.film.startDate).endOf().fromNow()} ) */}
              {listUser.startDate}
            </Col>
            <Col sm={4} className={cx('name-main')}>
              {listUser.film.name}
            </Col>
            <Col sm={4} className={cx('name-main')}>
              {listUser.startTime}
            </Col>
          </div>
          <div className="row">
            <Col sm={12} className={cx('more')}>
              <hr />
              <h2>Thông tin thêm</h2>
            </Col>
          </div>

          <div className="row">
            <Col sm={4}>
              <span className={cx('more-content')}>Số vé đã đặt:</span>
            </Col>
            <Col sm={3}>
              <span className={cx('more-number')}>{listUser.totalTicket}</span>
            </Col>
          </div>
          <div className="row">
            <Col sm={4}>
              <span className={cx('more-content')}>Đơn giá vé:</span>
            </Col>
            <Col sm={8}>
              <span className={cx('more-number')}>{numberWithCommas(listUser.priceTicket)} VNĐ</span>
            </Col>
          </div>
          <div className="row">
            <Col sm={4}>
              <span className={cx('more-content')}>Thành tiền:</span>
            </Col>
            <Col sm={8}>
              <span className={cx('more-number')}>
                {numberWithCommas(listUser.totalTicket * listUser.priceTicket)} VNĐ
              </span>
            </Col>
          </div>
          {/* <div className="row">
            <Col sm={10}>
              <span className={cx('more-content')}>
                <b>Ghi chú:</b>
              </span>
              <span className={cx('more-number')}>Phim hay</span>
            </Col>
          </div> */}
        </div>
        {/* {!admin && <MoreWork id={id} getWorks={getWorks} />} */}
      </div>
    </div>
  );
}

export default ListUserByTicket;
