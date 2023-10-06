import axios from '~/axios';

const filmService = {
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

  async buyTicket(userId, filmId, ticket) {
    const res = await axios.post('/api/v1/film/register', {
      filmId,
      userId,
      ticket,
    });
    return res.data;
  },

  async totalTicket(filmId) {
    const res = await axios.get('/api/v1/film/total-ticket?filmId=' + filmId);
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

  async getAllCommentFilm(filmId) {
    if (filmId) {
      const res = await axios.get(`/api/v1/film/get-all-comments?filmId=${filmId}`);
      return res.data;
    }
    console.log(filmId);
    return 'Thiếu tham số truyền vào';
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
};

export default filmService;
