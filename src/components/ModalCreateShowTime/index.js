import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { AdminShowTimeContext } from '~/Context/AdminShowTimeContext';
import { UilLabelAlt } from '@iconscout/react-unicons';
import style from './ModalCreateShowTime.module.scss';
import classNames from 'classnames/bind';
import { adminService, filmService } from '~/services';

const cx = classNames.bind(style);

function ModalCreateShowTime({ isShow, handleClose }) {
  const [filmId, setFilmId] = useState('');
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState('');
  const [roomId, setRoomId] = useState('');
  const [priceTicket, setPriceTicket] = useState();
  const [maxUser, setMaxUser] = useState();
  const [nameErr, setFilmIdErr] = useState('');
  const [startDateErr, setStartDateErr] = useState('');
  const [startTimeErr, setStartTimeErr] = useState('');
  const [roomIdErr, setRoomIdErr] = useState('');

  const [startTimes, setStartTimes] = useState([]);
  const [totalTime, setTotalTime] = useState(1);
  const { filmInfo, listRoom, handleGetAllFilmShowTime } = useContext(AdminShowTimeContext);

  const [obToast, setObToast] = useState({
    header: '',
    content: '',
    isShow: false,
  });

  function addMinutesToTime(initialTime, minutesToAdd) {
    const [hour, minute] = initialTime.split(':').map(Number); // Chuyển đổi chuỗi thành số
    // Tạo đối tượng Date cho mốc thời gian ban đầu
    const initialTimeObj = new Date();
    initialTimeObj.setHours(hour);
    initialTimeObj.setMinutes(minute);

    // Cộng thời gian
    const addedTime = new Date(initialTimeObj.getTime() + minutesToAdd * 60 * 1000); // Số phút * 60 giây/phút * 1000 ms/giây

    // Lấy giờ và phút từ kết quả
    const resultHour = addedTime.getHours();
    const resultMinute = addedTime.getMinutes();

    // Định dạng kết quả để đảm bảo giờ và phút đều là hai số
    const formattedResult = `${resultHour.toString().padStart(2, '0')}:${resultMinute.toString().padStart(2, '0')}`;

    return formattedResult;
  }

  const changeInput = async (e, type) => {
    const value = e.target.value;
    switch (type) {
      case 'filmId': {
        setFilmId(value);
        handleGetOneTotalTime(value);
        break;
      }
      case 'startDate': {
        await setStartDate(value);
        handleGetAllStartTime(filmId, value);
        if (startTimes.length > 0) {
          handleGetAllStartTime(roomId, value);
        }
        if (roomId) {
          handleGetAllStartTime(roomId, value);
        }
        break;
      }
      case 'startTime': {
        setStartTime(value);
        break;
      }
      case 'roomId': {
        await setRoomId(value);
        if (startTimes.length > 0) {
          handleGetAllStartTime(value, startDate);
        }
        if (startDate) {
          handleGetAllStartTime(value, startDate);
        }
        break;
      }
      // eslint-disable-next-line no-fallthrough
      default: {
        break;
      }
    }
  };

  const setDefaultValue = (type) => {
    if (type === 'er') {
      setFilmIdErr('');
      setStartDateErr('');
      setStartTimeErr('');
      setRoomIdErr('');
    } else {
      setFilmId('');
      setStartDate('');
      setStartTime('');
      setRoomId('');
      setMaxUser('');
      setPriceTicket('');
    }
  };

  const toggleShowToast = ({ header, content, show }) => {
    setObToast((toast) => {
      return {
        header: header ? header : '',
        content: content ? content : '',
        isShow: show ? show : !toast.isShow,
      };
    });
  };

  const handleCreateShowTime = async () => {
    const res = await adminService.createShowTime({
      filmId,
      startDate: startDate.slice(0, 10) + ' 00:00:00',
      startTime,
      roomId,
    });

    if (res.errCode === 0) {
      toggleShowToast({ header: 'Xong', content: 'Đã tạo lịch chiếu thành công', isShow: true });
      handleGetAllFilmShowTime();
      // handleClose();
      setDefaultValue();
      setTimeout(() => {
        toggleShowToast({});
      }, 3000);
    }
  };

  const checkErr = (type) => {
    switch (type) {
      case 'name': {
        return nameErr.length > 0;
      }
      case 'startDate': {
        return startDateErr.length > 0;
      }
      case 'startTime': {
        return startTimeErr.length > 0;
      }
      case 'roomId': {
        return roomIdErr.length > 0;
      }

      default: {
        break;
      }
    }
  };

  const validate = () => {
    let err = true;
    if (!filmId) {
      setFilmIdErr('Bạn phải điền tên phim!');
      err = false;
    } else {
      setFilmIdErr('');
    }
    if (!startDate) {
      setStartDateErr('Bạn chưa nhập ngày chiếu!');
      err = false;
    } else if (new Date(startDate) <= new Date()) {
      setStartDateErr('Phải là ngày trong tương lai!');
      err = false;
    } else {
      setStartDateErr('');
    }

    if (!startTime) {
      setStartTimeErr('Chưa có giờ chiếu!');
      err = false;
    } else {
      setStartTimeErr('');
    }

    if (!roomId) {
      setRoomIdErr('Phòng chiếu đang còn trống!');
      err = false;
    } else {
      setRoomIdErr('');
    }

    if (err) setDefaultValue('er');
    return err;
  };

  const handleCLickSuccess = async () => {
    if (validate()) {
      // eslint-disable-next-line no-unused-vars
      let flag = 0;
      startTimes.forEach((item) => {
        if (
          (startTime > item.startTime && startTime < addMinutesToTime(item.startTime, totalTime)) ||
          (addMinutesToTime(startTime, totalTime) > item.startTime &&
            addMinutesToTime(startTime, totalTime) < addMinutesToTime(item.startTime, totalTime))
        ) {
          flag = 1;
        }
      });
      if (flag === 1) {
        alert('Khoảng thời gian chiếu đã được sắp trước đó . Vui lòng chọn lại giờ hoặc chọn ngày khác!');
      } else {
        handleCreateShowTime();
      }
    }
  };

  const handleGetOneRoom = async () => {
    const res = await adminService.getOneRoom({ id: roomId });
    if (res.errCode === 0) {
      setMaxUser(res.data.maxUser);
      setPriceTicket(res.data.priceTicket);
    }
  };

  const handleGetOneTotalTime = async (value) => {
    const filmId = value;
    const res = await filmService.getOneFilm({ filmId });
    if (res.errCode === 0) {
      setTotalTime(res.data.totalTime);
    }
  };

  const handleGetAllStartTime = async (room, date) => {
    const roomId = room;
    const startDate = date;
    const res = await filmService.getAllStartTime({ roomId, startDate });
    if (res.errCode === 0) {
      setStartTimes(res.data);
    }
  };

  useEffect(() => {
    handleGetOneRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, filmId, startDate, startTime]);

  return (
    <div className={cx('wrap')}>
      <Modal
        show={isShow}
        onHide={() => {
          setDefaultValue('er');
          handleClose();
        }}
      >
        <ToastMassage
          isShow={obToast.isShow}
          header={obToast.header}
          content={obToast.content}
          handleClose={() => toggleShowToast({})}
        />
        <div
          className={cx('table-err', {
            show: nameErr || roomIdErr || startDateErr || startTimeErr,
          })}
        >
          <h2>
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={faBug} />
            </div>
            <span> Vui lòng kiểm tra dữ liệu đã nhập:</span>
          </h2>
          <div className={cx('wrap-err')}>
            <ul>
              {nameErr && (
                <li>
                  <label htmlFor="name">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {nameErr}
                  </label>
                </li>
              )}
              {startDateErr && (
                <li>
                  <label htmlFor="startDate">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {startDateErr}
                  </label>
                </li>
              )}
              {startTimeErr && (
                <li>
                  <label htmlFor="startTime">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {startTimeErr}
                  </label>
                </li>
              )}
              {roomIdErr && (
                <li>
                  <label htmlFor="roomId">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {roomIdErr}
                  </label>
                </li>
              )}
            </ul>
          </div>
        </div>
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>Sắp lịch chiếu phim</h5>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
              <div
                className={cx('form__group', 'field', 'section-name', {
                  err: checkErr('filmId'),
                })}
              >
                <select
                  value={filmId}
                  name="filmId"
                  id="filmId"
                  className={cx('name')}
                  onChange={(e) => changeInput(e, 'filmId')}
                >
                  <option value="">Chọn tên phim</option>
                  {filmInfo?.map((film, index) => (
                    <option key={index} value={film.id}>
                      {film.name}
                    </option>
                  ))}
                </select>
                <label className={cx('form__label')} htmlFor="filmId">
                  <span>*</span> Tên phim:
                </label>
              </div>
            </div>
            <div>
              <div
                className={cx('form__group', 'field', {
                  err: checkErr('startDate'),
                })}
              >
                <input
                  onChange={(e) => changeInput(e, 'startDate')}
                  id="startDate"
                  className={cx('form__field')}
                  type="date"
                  value={startDate}
                  autoComplete="off"
                ></input>
                <label className={cx('form__label')} htmlFor="startDate">
                  <span>*</span> Ngày chiếu:
                </label>
              </div>
            </div>
            <div className={cx('row')}>
              <div className={cx('col-md-6')}>
                <div>
                  <div
                    className={cx('form__group', 'field', 'section-room', {
                      err: checkErr('roomId'),
                    })}
                  >
                    <select
                      value={roomId}
                      name="roomId"
                      id="roomId"
                      className={cx('room')}
                      onChange={(e) => changeInput(e, 'roomId')}
                    >
                      <option value="">Chọn phòng chiếu</option>
                      {listRoom.map((room, index) => (
                        <option key={index} value={room.id}>
                          0{room.id}
                        </option>
                      ))}
                    </select>
                    <label className={cx('form__label')} htmlFor="roomId">
                      <span>*</span> Phòng chiếu:
                    </label>
                  </div>
                </div>
                <div
                  className={cx('form__group', 'field', {
                    err: checkErr('startTime'),
                  })}
                >
                  <input
                    required=""
                    placeholder="startTime"
                    id="startTime"
                    className={cx('form__field')}
                    autoComplete="off"
                    type="time"
                    step="60"
                    value={startTime}
                    onChange={(e) => changeInput(e, 'startTime')}
                  ></input>
                  {startTime && (
                    <span className={cx('add-total-time')}>~&nbsp;&nbsp;{addMinutesToTime(startTime, totalTime)}</span>
                  )}
                  <label className={cx('form__label')} htmlFor="startTime">
                    <span>*</span> Giờ chiếu:
                  </label>
                </div>
              </div>
              <div className={cx('col-md-6', 'list-start-time')}>
                {roomId && startDate && (
                  <>
                    <div>Danh sách các giờ đã chiếu</div>
                    {startTimes.length > 0 ? (
                      <ul>
                        {startTimes.map((curr) => {
                          return (
                            <li key={curr.id}>
                              <UilLabelAlt size={12} className={cx('list-style')} /> {curr.startTime} ~{' '}
                              {addMinutesToTime(curr.startTime, curr.filmShowTime.totalTime)}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <span>Chưa có giờ chiếu nào!</span>
                    )}
                  </>
                )}
              </div>
            </div>
            <div>
              <div
                className={cx('form__group', 'field', {
                  err: checkErr(''),
                })}
              >
                <input
                  required=""
                  className={cx('form__field')}
                  autoComplete="off"
                  type="input"
                  disabled={true}
                  value={maxUser || ''}
                ></input>
                <label className={cx('form__label')}>
                  <span>*</span> Số vé tối đa:
                </label>
              </div>
            </div>
            <div>
              <div
                className={cx('form__group', 'field', {
                  err: checkErr(''),
                })}
              >
                <input
                  required=""
                  className={cx('form__field')}
                  autoComplete="off"
                  type="input"
                  value={priceTicket || ''}
                  disabled={true}
                ></input>
                <label className={cx('form__label')}>
                  <span>*</span> Giá vé:
                </label>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={cx('btn')}
            variant="secondary"
            onClick={() => {
              setDefaultValue('er');
              handleClose();
            }}
          >
            Đóng
          </Button>
          <Button className={cx('btn')} variant="primary" onClick={handleCLickSuccess}>
            Tạo
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCreateShowTime;
