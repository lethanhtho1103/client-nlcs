import axios from '~/axios';

const filmService = {
  async getAllFilm() {
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
};

export default filmService;
