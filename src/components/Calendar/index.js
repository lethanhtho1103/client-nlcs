import { Button, Col, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import Week from '../Week';
import classNames from 'classnames/bind';
import style from './Calendar.module.scss';
import { useEffect, useState } from 'react';
import ToastMassage from '../ToastMassage';
import Comment from '../Comment';
import { filmService } from '~/services';
import Loader from '../Loader';
import ModalBuyTicket from '../ModalBuyTicket';
const cx = classNames.bind(style);

function Calendar({
  filmComments,
  filmId,
  userId,
  avgRate,
  countComment,
  handleShowCommentOfUser,
  filmsPlaying,
  filmInfo,
  ticket,
  currUser,
}) {
  const filmTime = dayjs();
  dayjs.extend(relativeTime);

  const [currComponent, setCurrComponent] = useState(0);
  const [startDate, setStartDate] = useState(filmTime.format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState();
  const [startTimes, setStartTimes] = useState([]);
  const [isShowCopy, setIsShowCopy] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isShowModalBuyTicket, setIsShowModalBuyTicket] = useState(false);
  const [obToast, setObToast] = useState({
    isShow: false,
    header: '',
    content: '',
  });

  const weekDays = [0, 1, 2, 3, 4, 5, 6];

  const handleFilmDate = (week) => {
    setCurrComponent(week);
    setStartDate(filmTime.set('date', filmTime.date() + week).format('YYYY-MM-DD'));
  };

  const handleGetStartTime = () => {
    setTimeout(async () => {
      setIsLoader(true);
      const res = await filmService.getStartTimeFilm({ filmId, startDate });
      if (res.errCode === 0) setStartTimes(res.data);
      setIsLoader(false);
    }, 500);
  };

  const handleLongTime = (startTime, totalTime) => {
    const time = parseInt(startTime.slice(0, 2));
    const endHour = Math.floor(time + totalTime / 60);
    const endMinutes = totalTime % 60;
    if (endMinutes < 10) {
      return `${endHour}:0${endMinutes}`;
    }
    return `${endHour}:${endMinutes}`;
  };

  const handleReceive = () => {
    setIsShowCopy(true);
    setTimeout(() => {
      setIsShowCopy(false);
    }, 2000);
  };

  const buyTicket = (res) => {
    setObToast(() => {
      return {
        isShow: true,
        herder: 'Xong',
        content: res.errMessage,
      };
    });
  };

  const handelShowBuyTicket = (startTime) => {
    // if (ticket > 0 && ticket <= maxUser) {
    //   setIsShowModalBuyTicket(true);
    // } else {
    //   alert('Số lượng vé không hợp lệ. Vui lòng đặt lại số vé!');
    // }
    if (ticket > 0 && ticket <= 123) {
      setIsShowModalBuyTicket(true);
      setStartTime(startTime);
    } else {
      alert('Số lượng vé không hợp lệ. Vui lòng đặt lại số vé!');
    }
  };

  const handleBuyTicket = async (filmId) => {
    const res = await filmService.buyTicket(currUser.id, filmId, ticket);
    buyTicket(res);
    setTimeout(() => {
      setObToast({
        isShow: false,
        header: '',
        content: '',
      });
    }, 3500);
  };

  const handelClickX = () => {
    setIsShowModalBuyTicket(false);
  };

  useEffect(() => {
    handleGetStartTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  return (
    <Row className={cx('contain')}>
      {isShowCopy && <ToastMassage header={''} content={'Copy mã thành công'} />}
      <ToastMassage isShow={obToast.isShow} header={obToast.header} content={obToast.content} />
      {isShowModalBuyTicket && (
        <ModalBuyTicket
          handleLongTime={handleLongTime}
          startTime={startTime}
          filmInfo={filmInfo}
          ticket={ticket}
          toggleShow={handelClickX}
          byTicket={handleBuyTicket}
        />
      )}
      <Col md={8} className={cx('show-times')}>
        <div className={cx('code-discount')}>
          <div>
            <div>
              <div className={cx('code')}>Nhận ngay mã giảm giá 10000 VNĐ khi đặt vé trên website NTFMovie</div>
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
              target="_blank"
              href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+C%E1%BA%A7n+Th%C6%A1/@10.0299337,105.7706153,17z/data=!3m1!4b1!4m6!3m5!1s0x31a0895a51d60719:0x9d76b0035f6d53d0!8m2!3d10.0299337!4d105.7706153!16s%2Fm%2F02r6wmy?hl=vi-VN&entry=ttu"
              className={cx('province')}
              rel="northerner noreferrer"
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
                {isLoader && <Loader />}

                {startTimes.length > 0 ? (
                  <div>
                    <h3>2D Phụ đề</h3>
                    {startTimes.map((startTimes, index) => {
                      return (
                        <Button
                          onClick={() => handelShowBuyTicket(startTimes.startTime)}
                          key={index}
                          className={cx('btn-time')}
                        >
                          {startTimes.startTime}{' '}
                          <span>~ {handleLongTime(startTimes.startTime, filmInfo.totalTime)}</span>
                        </Button>
                      );
                    })}
                  </div>
                ) : (
                  <div className={cx('empty-start-time')}>
                    <div className={cx('image-empty')}>
                      <img
                        src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/not-found.svg"
                        alt="Not found"
                      />
                    </div>
                    <h3>Ôi, Không tìm thấy suất chiếu rồi.</h3>
                    <span>Bạn hãy thử tìm ngày khác nhé</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <Comment
          filmId={filmId}
          userId={userId}
          filmComments={filmComments}
          countComment={countComment}
          avgRate={avgRate}
          handleShowCommentOfUser={handleShowCommentOfUser}
        />
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
