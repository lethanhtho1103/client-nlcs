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
};

export default adminService;
