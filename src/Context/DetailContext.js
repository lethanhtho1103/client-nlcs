import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { filmService } from '~/services';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';

export const DetailContext = createContext();

export const DetailProvider = ({ children }) => {
  const [filmInfo, setFilmInfo] = useState({});
  const [filmComments, setFilmComment] = useState([]);
  const [filmsPlaying, setFilmsPlaying] = useState([]);
  const [isShowModalBuyTicket, setIsShowModalBuyTicket] = useState(false);
  const { filmId } = useParams();
  const currUser = useSelector(userSelector);
  const userId = currUser.id;

  let countComment = 0;
  countComment = filmComments.filter((userComment) => userComment.comment !== null).length;
  let arrRate = filmComments.filter((userComment) => userComment.rate !== null);
  let initRate = 0;
  let totalRate = arrRate.reduce((accumulator, current) => accumulator + current.rate, initRate);

  const avgRate = (totalRate / countComment).toFixed(1);

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

  const handleUpdateAvgRate = async () => {
    const id = filmId;
    const res = await filmService.updateAvgRate(id, avgRate);
    if (res.errCode === 0) {
      console.log(res.avgRate);
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
        isShowModalBuyTicket,
        handleShowCommentOfUser,
        handleUpdateAvgRate,
        handleLongTime,
        handelClickX,
        handelShowBuyTicket,
        numberWithCommas,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};
