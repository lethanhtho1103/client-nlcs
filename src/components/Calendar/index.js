import { Button, Col, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import Week from '../Week';
import classNames from 'classnames/bind';
import style from './Calendar.module.scss';
import { useContext, useEffect, useState } from 'react';
import ToastMassage from '../ToastMassage';
import Comment from '../Comment';
import { adminService, filmService } from '~/services';
import Loader from '../Loader';
import ModalBuyTicket from '../ModalBuyTicket';
import ModalComboCornWater from '../ModalComboCornWater';
import { DetailContext } from '~/Context/DetailContext';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

function Calendar() {
  const filmTime = dayjs();
  dayjs.extend(relativeTime);

  const [currDate, setCurrDate] = useState(0);
  const [currTime, setCurrTime] = useState(-1);
  const [ticket, setTicket] = useState(1);
  const [startDate, setStartDate] = useState(filmTime.format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState('');
  const [startTimes, setStartTimes] = useState([]);
  const [totalTicket, setTotalTicket] = useState({});
  const [listUserInfo, setListUserInfo] = useState();
  const [showTime, setShowTime] = useState({});
  const [isShowCopy, setIsShowCopy] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const [isShowModalComboCornWater, setIsShowModalComboCornWater] = useState(false);

  const [obToast, setObToast] = useState({
    isShow: false,
    header: '',
    content: '',
  });

  const { userId, filmInfo, filmId, filmsPlaying, avgRate, isShowModalBuyTicket, handleLongTime, numberWithCommas } =
    useContext(DetailContext);

  const weekDays = [0, 1, 2, 3, 4, 5, 6];

  const handleFilmDate = (week) => {
    setCurrDate(week);
    setStartDate(filmTime.set('date', filmTime.date() + week).format('YYYY-MM-DD'));
  };

  const handleGetStartTime = () => {
    setTimeout(async () => {
      setIsLoader(true);
      const res = await filmService.getStartTimeFilm({ filmId, startDate });
      if (res.errCode === 0) {
        setStartTimes(res.data);
        setIsLoader(false);
        setCurrTime(-1);
        setStartTime('');
      }
    }, 700);
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

  const handelTotalTicket = async (filmId, startTime) => {
    const res = await filmService.totalTicket(filmId, startTime, startDate);
    setTotalTicket(res.data);
  };

  const getOneListUser = async (startTime) => {
    const res = await filmService.getOneListUser({ userId, filmId, startDate, startTime });
    if (res.errCode === 0) {
      setListUserInfo(res.data);
    }
  };

  const handleGetOneShowTime = async (filmId, roomId, startDate, startTime) => {
    const res = await adminService.getOneShowTime(filmId, roomId, startDate, startTime);
    if (res.errCode === 0) {
      setShowTime(res.data);
    }
  };

  const handleGetRoomId = async (filmId, startDate, startTime) => {
    const res = await adminService.getRoomId(filmId, startDate, startTime);
    if (res.errCode === 0) {
      handleGetOneShowTime(filmId, res.data.roomId, startDate, startTime);
    }
  };

  const handleSelectTime = async (startTime, index) => {
    setStartTime(startTime);
    setCurrTime(index);
    getOneListUser(startTime);
    handelTotalTicket(filmId, startTime);
    handleGetRoomId(filmId, startDate, startTime);
  };

  const handelShowBuyComboCornWater = () => {
    if (!startTime) {
      alert('Vui lòng chọn khung giờ chiếu phim.');
      return;
    }
    if (ticket > 0) {
      setIsShowModalComboCornWater(true);
    } else {
      alert('Số lượng vé không hợp lệ. Xin quý khách vui lòng đặt lại số vé!');
    }
  };

  // const handleStartDate = (startDate) => {
  //   const year = startDate.slice(0, 4);
  //   const month = startDate.slice(4, 8);
  //   const day = startDate.slice(8, 10);
  //   return day + month + year;
  // };

  const handleBuyTicket = async (filmId, ticket, seat, startTime, startDate, priceTicket, roomId) => {
    const res = await filmService.buyTicket(userId, filmId, ticket, seat, startTime, startDate, priceTicket, roomId);
    buyTicket(res);
    setTimeout(() => {
      setObToast({
        isShow: false,
        header: '',
        content: '',
      });
    }, 3500);
    return res;
  };

  const handelClickBack = () => {
    setIsShowModalComboCornWater(false);
  };

  const handleDecreaseTicket = () => {
    if (ticket >= 8) {
      setTicket(8);
    } else {
      setTicket((pre) => pre + 1);
    }
  };

  const handleIncreaseTicket = () => {
    if (ticket <= 0) {
      setTicket(0);
    } else {
      setTicket((pre) => pre - 1);
    }
  };

  // console.log(showTime);

  useEffect(() => {
    handleGetStartTime();
    handleGetOneShowTime();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, filmId]);

  return (
    <Row className={cx('contain')}>
      {isShowCopy && <ToastMassage header={''} content={'Copy mã thành công'} />}
      <ToastMassage isShow={obToast.isShow} header={obToast.header} content={obToast.content} />
      {isShowModalBuyTicket && (
        <ModalBuyTicket
          startTime={startTime}
          startDate={startDate}
          showTime={showTime}
          ticket={ticket}
          listUserInfo={listUserInfo}
          handelClickBack={handelClickBack}
          byTicket={handleBuyTicket}
        />
      )}
      {isShowModalComboCornWater && <ModalComboCornWater toggleShow={handelClickBack} />}
      <Col md={8} className={cx('show-times')}>
        <div className={cx('code-discount')}>
          <div>
            <div>
              <div className={cx('code')}>Nhận ngay mã giảm giá 10000 VND khi đặt vé trên website NTFMovies</div>
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
            <h2>Lịch chiếu {filmInfo.name}</h2>
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
                        active: currDate === week,
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
                  <img alt="NTFMovies" src="https://cdn.mservice.com.vn/app/img/booking/logo_beta.png" />
                </div>
                <div className={cx('name-cinema')}>
                  <h2>NTFMovies</h2>
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
                          onClick={() => handleSelectTime(startTimes.startTime, index)}
                          key={index}
                          className={cx('btn-time', {
                            active: currTime === index,
                          })}
                        >
                          {startTimes.startTime}{' '}
                          <span>~ {handleLongTime(startTimes.startTime, filmInfo.totalTime)}</span>
                        </Button>
                      );
                    })}

                    <div className={cx('book-ticket')}>
                      <div className={cx('quantity-remaining')}>
                        <div className={cx('quantity')}>
                          <div>Số lượng:&nbsp;</div>
                          <div className={cx('quantity')}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              onClick={() => handleIncreaseTicket()}
                              className={cx({
                                active: ticket > 0,
                              })}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <span>
                              <b>{ticket}</b>
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              className={cx({
                                notActive: ticket === 8,
                              })}
                              onClick={() => handleDecreaseTicket()}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        {startTime && (
                          <div className={cx('room-remaining')}>
                            <div className={cx('room')}>
                              <div>Phòng chiếu:</div>
                              <b>{showTime.roomId}</b>
                            </div>
                            <div className={cx('remaining')}>
                              <div>Số vé còn lại:</div>
                              <b>{filmInfo.filmShowTime.roomShowTime.maxUser - totalTicket.totalTicket}</b>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={cx('payment')}>
                        <div className={cx('temporary')}>
                          <div>Tạm tính</div>
                          <b>
                            {showTime.roomShowTime?.priceTicket > 0
                              ? numberWithCommas(showTime.roomShowTime?.priceTicket * ticket)
                              : 0}{' '}
                            VND
                          </b>
                        </div>
                        <div>
                          <Button className={cx('btn-book-ticket')} onClick={() => handelShowBuyComboCornWater()}>
                            Đặt vé ngay
                          </Button>
                        </div>
                      </div>
                    </div>
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
        <Comment />
      </Col>
      <Col md={4} className={cx('film-playing')}>
        <h3 id="phim-chieu">Phim đang chiếu</h3>
        <div className={cx('list-film-playing')}>
          {filmsPlaying.map((film, index) => {
            return (
              <div key={index} className={cx('film-item')}>
                <div className={cx('image-film')}>
                  <Link to={`http://localhost:3000/details/${film.id}`}>
                    <img alt={film.name} src={film.image} />
                  </Link>
                  <div className={cx('number')}>{index + 1}</div>
                </div>
                <div className={cx('detail-film')}>
                  <div
                    className={cx('age', {
                      age18: film.ageAllowed === 18,
                      age16: film.ageAllowed === 16,
                      age13: film.ageAllowed === 13,
                    })}
                  >
                    {film.ageAllowed}+
                  </div>
                  <Link to={`/details/${film.id}`}>
                    <div className={cx('name')}>{film.name}</div>
                  </Link>
                  <div className={cx('type')}>{film.type}</div>
                  <div className={cx('evaluate')}>
                    <span>
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                    <div>
                      {film.id === filmId && avgRate > 0
                        ? avgRate
                        : film.avgRate > 0
                        ? film.avgRate
                        : 'Chưa có đánh giá nào'}
                    </div>
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
