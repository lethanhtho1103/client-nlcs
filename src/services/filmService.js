import axios from '~/axios';

const filmService = {
  async getAllFilm() {
    try {
      const res = await axios.get('/api/v1/film/get-all-playing');
      return res.data;
    } catch (error) {
      console.log('Lỗi');
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
};

export default filmService;
