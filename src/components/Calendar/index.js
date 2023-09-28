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
            <div className={cx('province')}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Cần Thơ</span>
            </div>
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
