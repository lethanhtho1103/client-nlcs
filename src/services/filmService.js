import axios from '~/axios';

const filmService = {
  async createFilm({ name, type, image, origin, startDate, totalTime, ageAllowed, content }) {
    const res = await axios.post('/api/v1/film/create', {
      name,
      type,
      image,
      origin,
      startDate,
      totalTime,
      ageAllowed,
      content,
    });
    return res.data;
  },

  async getAllFilm(limit, offset) {
    try {
      const res = await axios.get('/api/v1/film/get-all-playing', {
        params: {
          limit: limit,
          offset: offset,
        },
      });
      return res.data;
    } catch (error) {
      console.log(limit, offset);
    }
  },

  async getAllFilmUpComing() {
    try {
      const res = await axios.get('/api/v1/film/get-all-upcoming');
      return res.data;
    } catch (error) {
      console.log('Lỗi');
    }
  },

  async getAllFilms() {
    try {
      const res = await axios.get('/api/v1/film/get-all');
      return res.data;
    } catch (error) {
      console.log('Lỗi');
    }
  },

  async getOneFilm({ filmId }) {
    if (filmId) {
      const res = await axios.get('/api/v1/film/get-one', {
        params: {
          filmId: filmId,
        },
      });
      return res.data;
    }

    return 'Thiếu tham số truyền vào';
  },

  async getOneListUser({ filmId, userId, startDate, startTime }) {
    if (filmId) {
      const res = await axios.get('/api/v1/listuser/get-one-film-user-reg', {
        params: {
          filmId: filmId,
          userId: userId,
          startDate: startDate,
          startTime: startTime,
        },
      });
      return res.data;
    }

    return 'Thiếu tham số truyền vào';
  },

  async buyTicket(userId, filmId, ticket, seat, startTime, startDate, priceTicket, roomId) {
    const res = await axios.post('/api/v1/film/register', {
      filmId,
      userId,
      ticket,
      seat,
      startTime,
      startDate,
      priceTicket,
      roomId,
    });
    return res.data;
  },

  async buyComboCornWater(listUserId, quantity, cornWaterId) {
    const res = await axios.post('/api/v1/detail-combo/create', {
      listUserId,
      quantity,
      cornWaterId,
    });
    return res.data;
  },

  async totalTicket(filmId, startTime, startDate) {
    const res = await axios.get(
      `/api/v1/film/total-ticket?filmId=${filmId}&startTime=${startTime}&startDate=${startDate}`,
    );
    return res.data;
  },

  async searchFilm(name) {
    try {
      const res = await axios.get('/api/v1/film/search-films', {
        params: {
          name,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async userComment(userId, filmId, comment, rate) {
    try {
      const data = {
        comment,
        rate,
      };
      const res = await axios.patch(`/api/v1/user-comment?userId=${userId}&filmId=${filmId}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async updateAvgRate(id, avgRate) {
    try {
      const data = {
        avgRate,
      };
      const res = await axios.patch(`/api/v1/film/avgRate?id=${id}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  async getAllCommentFilm(filmId) {
    if (filmId) {
      const res = await axios.get(`/api/v1/film/get-all-comments?filmId=${filmId}`);
      return res.data;
    }
    console.log(filmId);
    return 'Thiếu tham số truyền vào';
  },

  async getAllTicketRegister(userId) {
    if (userId) {
      const res = await axios.get(`/api/v1/listuser/film-user-register?userId=${userId}`);
      return res.data;
    }
    console.log(userId);
    return 'Thiếu tham số truyền vào';
  },

  async getAllListUser() {
    const res = await axios.get('/api/v1/film/get-all-listuser');
    return res.data;
  },

  async getStartTimeFilm({ filmId, startDate }) {
    if (filmId) {
      const res = await axios.get('/api/v1/film/get-all-start-time', {
        params: {
          filmId: filmId,
          startDate: startDate,
        },
      });
      return res.data;
    }

    return 'Thiếu tham số truyền vào';
  },

  async getAllCommentComboCornWater() {
    const res = await axios.get('/api/v1/film/get-all-combo-corn-water');
    return res.data;
  },

  // async buyComboCornWater(userId, filmId, cornWaterId, quantityCombo) {
  //   try {
  //     const data = {
  //       cornWaterId,
  //       quantityCombo,
  //     };
  //     const res = await axios.patch(`/api/v1/film/buy-combo-corn-water?userId=${userId}&filmId=${filmId}`, data);
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};

export default filmService;
