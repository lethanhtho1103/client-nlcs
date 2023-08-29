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
};

export default userService;
