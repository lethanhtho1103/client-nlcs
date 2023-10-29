import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AdminShowTimeContext } from '~/Context/AdminShowTimeContext';
import style from './ModalUpdateShowTime.module.scss';
import classNames from 'classnames/bind';
import { adminService } from '~/services';

const cx = classNames.bind(style);

function ModalUpdateShowTime({ isShow, handleClose }) {
  const {
    filmIdOld,
    nameOld,
    startDateOld,
    startTimeOld,
    roomIdOld,
    maxUsersOld,
    priceTicketOld,
    filmInfo,
    listRoom,
    handleGetAllFilmShowTime,
  } = useContext(AdminShowTimeContext);

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [roomId, setRoomId] = useState('');
  const [priceTicket, setPriceTicket] = useState('');
  const [maxUser, setMaxUser] = useState('');

  const [obToast, setObToast] = useState({
    header: '',
    content: '',
    isShow: false,
  });

  const changeInput = (e, type, valueOld) => {
    const value = e.target.value || valueOld;
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
      case 'maxUser': {
        setMaxUser(value);
        break;
      }
      case 'priceTicket': {
        setPriceTicket(value);
        break;
      }
      // eslint-disable-next-line no-fallthrough
      default: {
        break;
      }
    }
  };

  const setDefaultValue = () => {
    setName('');
    setStartDate('');
    setStartTime('');
    setRoomId('');
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
    // const res = await adminService.createShowTime({
    //   filmId: name,
    //   startDate,
    //   startTime,
    //   roomId,
    // });

    // if (res.errCode === 0) {
    //   toggleShowToast({ header: 'Xong', content: 'Đã tạo lịch chiếu thành công', isShow: true });
    //   handleGetAllFilmShowTime();
    //   handleClose();
    //   setDefaultValue();
    //   setTimeout(() => {
    //     toggleShowToast({});
    //   }, 3000);
    // }
    console.log(name, startDate, startTime, roomId, priceTicket, maxUser);
  };

  const handleCLickSuccess = () => {
    handleCreateShowTime();
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
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>Sắp lịch chiếu phim</h5>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
              <div className={cx('form__group', 'field', 'section-name')}>
                <select
                  value={name || filmIdOld || ''}
                  name="name"
                  id="name"
                  className={cx('name')}
                  onChange={(e) => changeInput(e, 'name', filmIdOld)}
                >
                  <option value="">{nameOld}</option>
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
              <div className={cx('form__group', 'field')}>
                <input
                  onChange={(e) => changeInput(e, 'startDate', startDateOld)}
                  id="startDate"
                  className={cx('form__field')}
                  type="datetime-local"
                  value={startDate || startDateOld || ''}
                  autoComplete="off"
                ></input>
                <label className={cx('form__label')} htmlFor="startDate">
                  <span>*</span> Ngày khởi chiếu:
                </label>
              </div>
            </div>
            <div>
              <div className={cx('form__group', 'field')}>
                <input
                  required=""
                  placeholder="startTime"
                  id="startTime"
                  className={cx('form__field')}
                  autoComplete="off"
                  type="input"
                  value={startTime || startTimeOld || ''}
                  onChange={(e) => changeInput(e, 'startTime', startTimeOld)}
                ></input>
                <label className={cx('form__label')} htmlFor="startTime">
                  <span>*</span> Giờ chiếu:
                </label>
              </div>
            </div>
            <div>
              <div className={cx('form__group', 'field', 'section-room')}>
                <select
                  value={roomId || roomIdOld || ''}
                  name="roomId"
                  id="roomId"
                  className={cx('room')}
                  onChange={(e) => changeInput(e, 'roomId', roomIdOld)}
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
              <div className={cx('form__group', 'field')}>
                <input
                  required=""
                  className={cx('form__field')}
                  autoComplete="off"
                  type="input"
                  name="maxUser"
                  value={maxUser || maxUsersOld || ''}
                  onChange={(e) => changeInput(e, 'maxUser', maxUsersOld)}
                ></input>
                <label className={cx('form__label')}>
                  <span>*</span> Số vé tối đa:
                </label>
              </div>
            </div>
            <div>
              <div className={cx('form__group', 'field')}>
                <input
                  required=""
                  className={cx('form__field')}
                  autoComplete="off"
                  type="input"
                  value={priceTicket || priceTicketOld || ''}
                  name="priceTicket"
                  onChange={(e) => changeInput(e, 'maxUser', priceTicketOld)}
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
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateShowTime;
