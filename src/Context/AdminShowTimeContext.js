import React, { createContext, useEffect, useState } from 'react';
import { adminService, filmService } from '~/services';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';
import { UilTimes } from '@iconscout/react-unicons';
import { UilPen } from '@iconscout/react-unicons';

export const AdminShowTimeContext = createContext();

export const AdminShowTimeProvider = ({ children }) => {
  const [filmInfo, setFilmInfo] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const [row, setRow] = useState([]);

  const [filmIdOld, setFilmId] = useState('');
  const [nameOld, setName] = useState('');
  const [startDateOld, setStartDate] = useState('');
  const [startTimeOld, setStartTime] = useState('');
  const [roomIdOld, setRoomId] = useState();
  const [maxUsersOld, setMaxUsers] = useState();
  const [priceTicketOld, setPriceTicket] = useState();

  const [showUpdateShowTime, setShowUpdateShowTime] = useState(false);

  const [obToast, setObToast] = useState({
    header: '',
    content: '',
    isShow: false,
  });

  const handleGetAllFilm = async () => {
    const res = await filmService.getAllFilm(15);
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

  const handleClickDelete = async (filmId, roomId, startDate, startTime) => {
    const res = await adminService.deleteOneShowTime({ filmId, roomId, startDate, startTime });
    if (res.errCode === 0) {
      toggleShowToast({ header: 'Xong', content: 'Xóa bản ghi thành công!', isShow: true });
      handleGetAllFilmShowTime();
      setTimeout(() => {
        toggleShowToast({});
      }, 3000);
    }
  };

  const handleClickUpdate = (filmId, name, roomId, startDate, startTime, maxUser, priceTicket) => {
    setFilmId(filmId);
    setName(name);
    setStartDate(startDate);
    setStartTime(startTime);
    setRoomId(roomId);
    setMaxUsers(maxUser);
    setPriceTicket(priceTicket);
    setShowUpdateShowTime(true);
  };

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
            <Button
              size="sm"
              variant="outline-primary"
              style={{ marginRight: '14px' }}
              onClick={() =>
                handleClickUpdate(
                  row.filmId,
                  row.filmShowTime.name,
                  row.roomShowTime.id,
                  row.startDate,
                  row.startTime,
                  row.roomShowTime.maxUser,
                  row.roomShowTime.priceTicket,
                )
              }
            >
              <UilPen size={18} />
            </Button>
            <Button
              size="sm"
              variant="outline-danger"
              style={{ marginRight: '14px' }}
              onClick={() => handleClickDelete(row.filmId, row.roomShowTime.id, row.startDate, row.startTime)}
            >
              <UilTimes size={18} />
            </Button>
          </>
        ),
        // col6: moment(row.createdAt).format('LL'),
      };
    });
    setRow(dataRow);
  };

  const handleGetAllFilmShowTime = async () => {
    const res = await adminService.getAllFilmShowTime();
    if (res.errCode === 0) {
      convertToDataRow(res.data);
    }
  };

  const toggleShowUpdateShowTimeModal = () => {
    setShowUpdateShowTime((show) => !show);
  };

  useEffect(() => {
    handleGetAllFilm();
    handleGetAllRoom();
    handleGetAllFilmShowTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AdminShowTimeContext.Provider
      value={{
        filmIdOld,
        nameOld,
        startDateOld,
        startTimeOld,
        roomIdOld,
        maxUsersOld,
        priceTicketOld,
        filmInfo,
        listRoom,
        row,
        obToast,
        showUpdateShowTime,
        toggleShowUpdateShowTimeModal,
        handleGetAllFilmShowTime,
      }}
    >
      {children}
    </AdminShowTimeContext.Provider>
  );
};
