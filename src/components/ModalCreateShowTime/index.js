import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { AdminShowTimeContext } from '~/Context/AdminShowTimeContext';
import style from './ModalCreateShowTime.module.scss';
import classNames from 'classnames/bind';
import { adminService } from '~/services';

const cx = classNames.bind(style);

function ModalCreateShowTime({ isShow, handleClose }) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [roomId, setRoomId] = useState('');
  const [priceTicket, setPriceTicket] = useState();
  const [maxUser, setMaxUser] = useState();

  const [nameErr, setNameErr] = useState('');
  const [startDateErr, setStartDateErr] = useState('');
  const [startTimeErr, setStartTimeErr] = useState('');
  const [roomIdErr, setRoomIdErr] = useState('');

  const { filmInfo, listRoom, handleGetAllFilmShowTime } = useContext(AdminShowTimeContext);

  const [obToast, setObToast] = useState({
    header: '',
    content: '',
    isShow: false,
  });

  const changeInput = (e, type) => {
    const value = e.target.value;
    switch (type) {
      case 'name': {
        setName(value);
        break;
      }
      case 'startDate': {
        setStartDate(value);
        break;
      }
      case 'startTime': {
        setStartTime(value);
        break;
      }
      case 'roomId': {
        setRoomId(value);
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
      setNameErr('');
      setStartDateErr('');
      setStartTimeErr('');
      setRoomIdErr('');
    } else {
      setName('');
      setStartDate('');
      setStartTime('');
      setRoomId('');
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
      filmId: name,
      startDate,
      startTime,
      roomId,
    });

    if (res.errCode === 0) {
      toggleShowToast({ header: 'Xong', content: 'Đã tạo lịch chiếu thành công', isShow: true });
      handleGetAllFilmShowTime();
      handleClose();
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
    if (!name) {
      setNameErr('Bạn phải điền tên phim!');
      err = false;
    } else {
      setNameErr('');
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

  const handleCLickSuccess = () => {
    if (validate()) {
      handleCreateShowTime();
    }
  };

  const handleGetOneRoom = async () => {
    const res = await adminService.getOneRoom({ id: roomId });
    if (res.errCode === 0) {
      setMaxUser(res.data.maxUser);
      setPriceTicket(res.data.priceTicket);
    }
  };

  useEffect(() => {
    handleGetOneRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return (
    <>
      <ToastMassage
        isShow={obToast.isShow}
        header={obToast.header}
        content={obToast.content}
        handleClose={() => toggleShowToast({})}
      />
      <Modal
        show={isShow}
        onHide={() => {
          setDefaultValue('er');
          handleClose();
        }}
      >
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
                  err: checkErr('name'),
                })}
              >
                <select
                  value={name}
                  name="name"
                  id="name"
                  className={cx('name')}
                  onChange={(e) => changeInput(e, 'name')}
                >
                  <option value="">Chọn tên phim</option>
                  {filmInfo?.map((film, index) => (
                    <option key={index} value={film.id}>
                      {film.name}
                    </option>
                  ))}
                </select>
                <label className={cx('form__label')} htmlFor="name">
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
                  type="datetime-local"
                  value={startDate}
                  autoComplete="off"
                ></input>
                <label className={cx('form__label')} htmlFor="startDate">
                  <span>*</span> Ngày khởi chiếu:
                </label>
              </div>
            </div>
            <div>
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
                  type="input"
                  value={startTime}
                  onChange={(e) => changeInput(e, 'startTime')}
                ></input>
                <label className={cx('form__label')} htmlFor="startTime">
                  <span>*</span> Giờ chiếu:
                </label>
              </div>
            </div>
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
    </>
  );
}

export default ModalCreateShowTime;
