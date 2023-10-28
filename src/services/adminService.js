import axios from '~/axios';

const adminService = {
  async getListUserAndSumTicket() {
    const res = await axios.get('/api/v1/list-user/sum-ticket');
    return res.data;
  },

  async getListUserDetailTable({ filmId, startTime, startDate }) {
    if ((filmId, startTime, startDate)) {
      const res = await axios.get('/api/v1/list-user/detail-table', {
        params: {
          filmId: filmId,
          startTime: startTime,
          startDate: startDate,
        },
      });
      return res.data;
    }

    return 'Thiếu tham số truyền vào';
  },

  async getAllFilmShowTime() {
    try {
      const res = await axios.get('/api/v1/film/get-all-showtime');
      return res.data;
    } catch (error) {
      console.log('Lỗi');
    }
  },
};

export default adminService;
