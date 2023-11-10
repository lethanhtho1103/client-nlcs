import axios from '~/axios';

const userService = {
  async login(id, password) {
    const res = await axios.post('/api/v1/login', {
      id: id,
      password: password,
    });
    return res.data;
  },

  async register(name, id, password, confPass) {
    const res = await axios.post('/api/v1/register', {
      name: name,
      id: id,
      password: password,
      confPass: confPass,
    });
    return res.data;
  },

  async getDetailCombos({ listUserId }) {
    const res = await axios.get('/api/v1/detailCombos', {
      params: {
        listUserId: listUserId,
      },
    });
    return res.data;
  },

  async updateUserMoneyRefund(id, moneyRefund) {
    try {
      const data = {
        moneyRefund,
      };
      const res = await axios.patch(`/api/v1/user/money-refund?id=${id}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userService;
