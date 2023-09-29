import { Button, Col, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import Week from '../Week';
import classNames from 'classnames/bind';
import style from './Calendar.module.scss';
import { useCallback, useEffect, useState } from 'react';
import ToastMassage from '../ToastMassage';
import { filmService } from '~/services';
const cx = classNames.bind(style);

function Calendar() {
  const [currComponent, setCurrComponent] = useState(-1);
  const [isShowCopy, setIsShowCopy] = useState(false);
  const [filmsPlaying, setFilmsPlaying] = useState([]);

  const weekDays = [0, 1, 2, 3, 4, 5, 6];

  dayjs.extend(relativeTime);
  const filmTime = dayjs();

  const getFilmsPlaying = useCallback(async () => {
    const res = await filmService.getAllFilm();
    if (res.errCode === 0) {
      setFilmsPlaying(res.data);
    }
  }, []);

  const handleFilmDate = (week) => {
    console.log(filmTime.set('date', filmTime.date() + week).format('DD/MM/YYYY'));
    setCurrComponent(week);
  };

  const handleReceive = () => {
    setIsShowCopy(true);
    setTimeout(() => {
      setIsShowCopy(false);
    }, 2000);
  };

  useEffect(() => {
    getFilmsPlaying();
  }, [getFilmsPlaying]);

  return (
    <Row className={cx('contain')}>
      {isShowCopy && <ToastMassage header={''} content={'Copy mã thành công'} />}
      <Col md={8} className={cx('show-times')}>
        <div className={cx('code-discount')}>
          <div>
            <div>
              <div className={cx('code')}>Nhận ngay mã giảm giá 10000Đ khi đặt vé trên website NTFMovie</div>
              <div className={cx('limit-useful')}>HSD: 30-12-2023</div>
            </div>
            <div className={cx('receive')}>
              <Button onClick={handleReceive}>
                <span>XEMGI</span>
                <FontAwesomeIcon icon={faCopy} />
              </Button>
              <div>Nhấp vào để copy mã</div>
            </div>
          </div>
        </div>
        <section>
          <div className={cx('name-province')}>
            <h2>Lịch chiếu Bộ Đôi Báo Thủ</h2>
            <a
              href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+C%E1%BA%A7n+Th%C6%A1/@10.0299337,105.7706153,17z/data=!3m1!4b1!4m6!3m5!1s0x31a0895a51d60719:0x9d76b0035f6d53d0!8m2!3d10.0299337!4d105.7706153!16s%2Fm%2F02r6wmy?hl=vi-VN&entry=ttu"
              className={cx('province')}
            >
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Cần Thơ</span>
            </a>
          </div>
          <div className={cx('info-cinema')}>
            <div className={cx('date-time')}>
              <div className={cx('list-date')}>
                {weekDays.map((week) => {
                  return (
                    <div
                      className={cx('date-item', {
                        active: currComponent === week,
                      })}
                      key={week}
                      onClick={() => handleFilmDate(week)}
                    >
                      <div className={cx('date')}>{filmTime.set('date', filmTime.date() + week).date()}</div>
                      <div className={cx('day')}>
                        <Week dayOfWeek={filmTime.day() + week} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={cx('location-cinema')}>
              <div className={cx('img-name')}>
                <div className={cx('img')}>
                  <img alt="NTFMovie" src="https://cdn.mservice.com.vn/app/img/booking/logo_beta.png" />
                </div>
                <div className={cx('name-cinema')}>
                  <h2>NTFMovie</h2>
                  <span>CTU, Khu II, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.</span>
                </div>
              </div>
              <div className={cx('type-cinema')}>
                <h3>2D Phụ đề</h3>
                <div>
                  <Button className={cx('btn-time')}>
                    22:00 <span>~ 23:50</span>
                  </Button>
                  <Button className={cx('btn-time')}>
                    22:00 <span>~ 23:50</span>
                  </Button>
                  <Button className={cx('btn-time')}>
                    22:00 <span>~ 23:50</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className={cx('comment')}>
          <h3>Bình luận từ người xem</h3>
          <div className={cx('evaluate')}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="star"
              class="svg-inline--fa fa-star Detail_starIcon__1uuMv"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              ></path>
            </svg>
            <div class="Detail_numberStar__06XOt">
              <span>7</span>/10
            </div>
            <span>&nbsp;. 3 đánh giá</span>
          </div>
          <ul className={cx('list-user-comment')}>
            <li className={cx('user-comment-item')}>
              <div className={cx('info-user')}>
                <div className={cx('user-avatar')}>L</div>
                <div className={cx('user-name')}>
                  Lê Thành Thọ
                  <div>2 hôm trước</div>
                </div>
              </div>
              <div className={cx('user-evaluate')}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  class="svg-inline--fa fa-star Detail_starIcon__1uuMv"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  ></path>
                </svg>
                <div class="Detail_numberStar__06XOt">
                  <span>7</span>/10
                </div>
                <span>&nbsp;. Đáng xem</span>
              </div>
              <div className={cx('content-comment')}>
                Mình dư 2 vé suất 10h40 ngày 29/9 ghế H10-11. Bạn nào muốn xem nhắn mình pass cho nhé
              </div>
            </li>
          </ul>
        </div>
      </Col>
      <Col md={4} className={cx('film-playing')}>
        <h3>Phim đang chiếu</h3>
        <div className={cx('list-film-playing')}>
          {filmsPlaying.map((film, index) => {
            return (
              <div key={index} className={cx('film-item')}>
                <div className={cx('image-film')}>
                  <a href={`http://localhost:3000/details/${film.id}`}>
                    <img alt={film.name} src={film.image} />
                  </a>
                  <div className={cx('number')}>{index + 1}</div>
                </div>
                <div className={cx('detail-film')}>
                  <div
                    className={cx('age', {
                      age18: film.ageAllowed === 18,
                      age16: film.ageAllowed === 16,
                    })}
                  >
                    {film.ageAllowed}+
                  </div>
                  <a href="/">
                    <div className={cx('name')}>{film.name}</div>
                  </a>
                  <div className={cx('type')}>{film.type}</div>
                  <div className={cx('evaluate')}>
                    <span>
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                    <div>{film.evaluate}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Col>
    </Row>
  );
}

export default Calendar;
