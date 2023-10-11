import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Details from '~/pages/Details';
import Contact from '~/pages/Contact';

const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/contact',
    component: Contact,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/details/:filmId',
    component: Details,
  },
];

export { publicRoutes };
