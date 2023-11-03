import React, { createContext, useEffect, useState } from 'react';
import { adminService, filmService } from '~/services';
import Moment from 'react-moment';
import { Modal, Button } from 'react-bootstrap';
import { UilTimes, UilCheck } from '@iconscout/react-unicons';

export const AdminShowTimeContext = createContext();

export const AdminShowTimeProvider = ({ children }) => {
  const [filmInfo, setFilmInfo] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const [row, setRow] = useState([]);
  const [rowCancel, setRowCancel] = useState([]);

  const [show, setShow] = useState(false);
  const [filmId, setFilmId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (filmId, roomId, startDate, startTime) => {
    setShow(true);
    setFilmId(filmId);
    setRoomId(roomId);
    setStartDate(startDate);
    setStartTime(startTime);
  };

  const handleClickCancel = async (filmId, roomId, date, startTime) => {
    const dateObject = new Date(date);
    const startDate = formatDate(dateObject);
    await adminService.deleteOneShowTime(filmId, roomId, date, startTime);
    const res = await adminService.cancelOneShowTime(filmId, roomId, startDate, startTime);
    if (res.errCode === 0) {
      toggleShowToast({ header: 'Xong', content: 'Hủy lịch chiếu thành công!', isShow: true });
      handleGetAllFilmShowTime();
      handleGetAllFilmShowTimeCancel();
      setTimeout(() => {
        toggleShowToast({});
      }, 3000);
    }
  };

  const handleDelete = () => {
    handleClickCancel(filmId, roomId, startDate, startTime);
    handleClose();
  };

  const [obToast, setObToast] = useState({
    header: '',
    content: '',
    isShow: false,
  });

  const handleGetAllFilm = async () => {
    const res = await filmService.getAllFilms();
    if (res.errCode === 0) {
      setFilmInfo(res.data);
    }
  };

  const handleGetAllRoom = async () => {
    const res = await adminService.getAllRoom();
    if (res.errCode === 0) {
      setListRoom(res.data);
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  const toggleShowToast = ({ header, content, show }) => {
    setObToast((toast) => {
      return {
        header: header ? header : '',
        content: content ? content : '',
        isShow: show ? show : !toast.isShow,
      };
    });
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: index + 1,
        col2: row.filmShowTime.name,
        col3: <Moment local="vi" format="DD/MM/YYYY" date={row.startDate} />,
        col4: row.startTime,
        col5: `0${row.roomShowTime.id}`,
        col6: row.roomShowTime.maxUser,
        col7: `${numberWithCommas(row.roomShowTime.priceTicket)} VND`,
        col8: (
          <>
            {row.status === 1 ? (
              <Button
                size="sm"
                variant="outline-danger"
                style={{ marginRight: '16px' }}
                onClick={() => handleShow(row.filmId, row.roomShowTime.id, row.startDate, row.startTime)}
              >
                <UilTimes size={18} />
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline-primary"
                style={{ marginRight: '16px' }}
                onClick={() => handleShow(row.filmId, row.roomShowTime.id, row.startDate, row.startTime)}
              >
                <UilCheck size={18} />
              </Button>
            )}
          </>
        ),
        // col6: moment(row.createdAt).format('LL'),
      };
    });
    setRow(dataRow);
  };

  const convertToDataRowCancel = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: index + 1,
        col2: row.filmShowTime.name,
        col3: <Moment local="vi" format="DD/MM/YYYY" date={row.startDate} />,
        col4: row.startTime,
        col5: `0${row.roomShowTime.id}`,
        col6: row.roomShowTime.maxUser,
        col7: `${numberWithCommas(row.roomShowTime.priceTicket)} VND`,
      };
    });
    setRowCancel(dataRow);
  };

  const handleGetAllFilmShowTime = async () => {
    const res = await adminService.getAllFilmShowTime();
    if (res.errCode === 0) {
      convertToDataRow(res.data);
    }
  };

  const handleGetAllFilmShowTimeCancel = async () => {
    const res = await adminService.getAllFilmShowTimeCancel();
    if (res.errCode === 0) {
      convertToDataRowCancel(res.data);
    }
  };

  const DeleteConfirmationDialog = () => {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          className="modal-header"
          style={{
            backgroundColor: '#fff',
            borderRadius: '5px',
            padding: '20px 20px 10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Modal.Title style={{ fontSize: '24px' }}>Xác nhận hủy lịch chiếu</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="modal-body"
          style={{
            padding: '20px 20px 20px',
          }}
        >
          Nếu hủy lịch chiếu thì sẽ không thể khôi phục lại. Bạn có chắc chắn muốn hủy?
        </Modal.Body>
        <Modal.Footer
          className="modal-footer"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              backgroundColor: '#385678',
              color: '#fff',
              fontSize: '1.3rem',
              fontWeight: '600',
              borderRadius: '5px',
              padding: '7.4px 16px',
              marginRight: '8px',
              border: 'none',
            }}
          >
            Đóng
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            style={{
              backgroundColor: '#d9534f',
              color: '#fff',
              fontSize: '1.3rem',
              fontWeight: '600',
              borderRadius: '5px',
              padding: '7px 16px',
            }}
          >
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  useEffect(() => {
    handleGetAllFilm();
    handleGetAllRoom();
    handleGetAllFilmShowTime();
    handleGetAllFilmShowTimeCancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminShowTimeContext.Provider
      value={{
        filmInfo,
        listRoom,
        row,
        rowCancel,
        obToast,
        DeleteConfirmationDialog,
        handleGetAllFilmShowTime,
      }}
    >
      {children}
    </AdminShowTimeContext.Provider>
  );
};
