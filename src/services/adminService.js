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

  async deleteOneShowTime({ filmId, roomId, startDate, startTime }) {
    if ((filmId, roomId, startTime, startDate)) {
      const res = await axios.delete('/api/v1/show-times/delete-one', {
        params: {
          filmId: filmId,
          roomId: roomId,
          startDate: startDate,
          startTime: startTime,
        },
      });
      return res.data;
    }

    return 'Thiếu tham số truyền vào';
  },

  async getAllRoom() {
    try {
      const res = await axios.get('/api/v1/room/get-all-room');
      return res.data;
    } catch (error) {
      console.log('Lỗi');
    }
  },

  async getOneRoom({ id }) {
    if (id) {
      const res = await axios.get('/api/v1/room/get-one', {
        params: {
          id: id,
        },
      });
      return res.data;
    }

    return 'Thiếu tham số truyền vào';
  },

  async createShowTime({ filmId, startDate, startTime, roomId }) {
    const res = await axios.post('/api/v1/show-time/create', {
      filmId,
      startDate,
      startTime,
      roomId,
    });
    return res.data;
  },

  async getOneShowTime(filmId, roomId, startDate, startTime) {
    if ((filmId, roomId, startTime, startDate)) {
      const res = await axios.get(
        `/api/v1/show-time/get-one?filmId=${filmId}&roomId=${roomId}&startDate=${startDate}&startTime=${startTime}`,
      );
      return res.data;
    }

    return 'Thiếu tham số truyền vào';
  },

  async getRoomId(filmId, startDate, startTime) {
    if ((filmId, startTime, startDate)) {
      const res = await axios.get(
        `/api/v1/show-time/get-roomId?filmId=${filmId}&startDate=${startDate}&startTime=${startTime}`,
      );
      return res.data;
    }

    return 'Thiếu tham số truyền vào';
  },

  async updateCurrUser(filmId, roomId, startDate, startTime, currUser) {
    try {
      const data = {
        currUser,
      };
      const res = await axios.patch(
        `/api/v1/show-time/currUser?filmId=${filmId}&roomId=${roomId}&startDate=${startDate}&startTime=${startTime}`,
        data,
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default adminService;
