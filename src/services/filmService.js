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
};

export default filmService;
