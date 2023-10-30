import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { filmService } from '~/services';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';

export const DetailContext = createContext();

export const DetailProvider = ({ children }) => {
  const [filmInfo, setFilmInfo] = useState({});
  const [listUserInfo, setListUserInfo] = useState();
  const [filmComments, setFilmComment] = useState([]);
  const [filmsPlaying, setFilmsPlaying] = useState([]);
  const [comboCornWater, setComboCornWater] = useState([]);

  const [isShowModalBuyTicket, setIsShowModalBuyTicket] = useState(false);
  const { filmId } = useParams();
  const currUser = useSelector(userSelector);
  const userId = currUser.id;

  const [quantityCombo1, setQuantityCombo1] = useState(0);
  const [quantityCombo2, setQuantityCombo2] = useState(0);
  const [quantityCombo3, setQuantityCombo3] = useState(0);
  const [quantityCombo4, setQuantityCombo4] = useState(0);

  const handleDecrease = (id) => {
    switch (id) {
      case 'CW01':
        if (quantityCombo1 === 0) {
          setQuantityCombo1(0);
        } else {
          setQuantityCombo1((pre) => pre - 1);
        }
        break;
      case 'CW02':
        if (quantityCombo2 === 0) {
          setQuantityCombo2(0);
        } else {
          setQuantityCombo2((pre) => pre - 1);
        }
        break;
      case 'CW03':
        if (quantityCombo3 === 0) {
          setQuantityCombo3(0);
        } else {
          setQuantityCombo3((pre) => pre - 1);
        }
        break;
      case 'CW04':
        if (quantityCombo4 === 0) {
          setQuantityCombo4(0);
        } else {
          setQuantityCombo4((pre) => pre - 1);
        }
        break;
      default:
        break;
    }
  };

  const handleIncrease = (id) => {
    switch (id) {
      case 'CW01':
        if (quantityCombo1 >= 8) {
          setQuantityCombo1(8);
        } else {
          setQuantityCombo1((pre) => pre + 1);
        }
        break;
      case 'CW02':
        if (quantityCombo2 >= 8) {
          setQuantityCombo2(8);
        } else {
          setQuantityCombo2((pre) => pre + 1);
        }
        break;
      case 'CW03':
        if (quantityCombo3 >= 8) {
          setQuantityCombo3(8);
        } else {
          setQuantityCombo3((pre) => pre + 1);
        }
        break;
      case 'CW04':
        if (quantityCombo4 >= 8) {
          setQuantityCombo4(8);
        } else {
          setQuantityCombo4((pre) => pre + 1);
        }
        break;
      default:
        break;
    }
  };

  const getQuantityCombo = (id) => {
    switch (id) {
      case 'CW01':
        return quantityCombo1;

      case 'CW02':
        return quantityCombo2;

      case 'CW03':
        return quantityCombo3;

      case 'CW04':
        return quantityCombo4;

      default:
        return 0;
    }
  };

  let countComment = 0;
  countComment = filmComments.filter((userComment) => userComment.comment?.length > 0).length;
  console.log(countComment);
  let arrRate = filmComments.filter((userComment) => userComment.rate > 0);
  let lengthArrRate = arrRate.length;

  let initRate = 0;
  let totalRate = arrRate.reduce((accumulator, current) => accumulator + current.rate, initRate);

  const avgRate = (totalRate / lengthArrRate).toFixed(1);

  const handleShowCommentOfUser = async () => {
    const res = await filmService.getAllCommentFilm(filmId);
    setFilmComment(res.data);
  };

  const getInfoOneFilm = async () => {
    const res = await filmService.getOneFilm({ filmId });
    if (res.errCode === 0) {
      setFilmInfo(res.data);
    }
  };

  const handelClickX = () => {
    setIsShowModalBuyTicket(false);
  };

  const handelShowBuyTicket = () => {
    setIsShowModalBuyTicket(true);
  };

  const getFilmsPlaying = async () => {
    const res = await filmService.getAllFilm(10);
    if (res.errCode === 0) {
      setFilmsPlaying(res.data);
    }
  };

  const getAllComboCornWater = async () => {
    const res = await filmService.getAllCommentComboCornWater();
    setComboCornWater(res.data);
  };

  const getOneListUser = async () => {
    const res = await filmService.getOneListUser({ userId, filmId });
    if (res.errCode === 0) {
      setListUserInfo(res.data);
    }
  };

  const handleUpdateAvgRate = async () => {
    const id = filmId;
    const res = await filmService.updateAvgRate(id, avgRate);
    if (res.errCode === 0) {
    }
  };

  const handleLongTime = (startTime, totalTime) => {
    const time = parseInt(startTime?.slice(0, 2));
    const endHour = Math.floor(time + totalTime / 60);
    const endHour24 = endHour % 24;
    const endMinutes = totalTime % 60;
    if (endHour24 < 10) {
      if (endMinutes < 10) {
        return `0${endHour24}:0${endMinutes}`;
      } else {
        return `0${endHour24}:${endMinutes}`;
      }
    } else if (endHour24 >= 10) {
      if (endMinutes < 10) {
        return `${endHour}:0${endMinutes}`;
      }
    }
    return `${endHour}:${endMinutes}`;
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  useEffect(() => {
    getInfoOneFilm();
    handleShowCommentOfUser();
    handleUpdateAvgRate();
    getFilmsPlaying();
    getAllComboCornWater();
    getOneListUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filmId, userId, avgRate]);
  return (
    <DetailContext.Provider
      value={{
        filmInfo,
        filmId,
        userId,
        filmComments,
        avgRate,
        countComment,
        filmsPlaying,
        comboCornWater,
        isShowModalBuyTicket,
        quantityCombo1,
        quantityCombo2,
        quantityCombo3,
        quantityCombo4,
        listUserInfo,
        handleShowCommentOfUser,
        handleUpdateAvgRate,
        handleLongTime,
        handelClickX,
        handelShowBuyTicket,
        numberWithCommas,
        handleDecrease,
        handleIncrease,
        getQuantityCombo,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};
