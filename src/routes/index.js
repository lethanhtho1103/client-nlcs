import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Details from '~/pages/Details';
import Contact from '~/pages/Contact';
import TopFilm from '~/pages/TopFilm';
import MyTicket from '~/pages/MyTicket';

const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/top-phim',
    component: TopFilm,
  },
  {
    path: '/contact',
    component: Contact,
  },
  {
    path: '/my-ticket',
    component: MyTicket,
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
