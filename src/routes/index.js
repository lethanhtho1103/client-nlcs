import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Details from '~/pages/Details';
import Contact from '~/pages/Contact';
import TopFilm from '~/pages/TopFilm';
import MyTicket from '~/pages/MyTicket';
import Invalid_404 from '~/pages/Invalid_404';
import AdminPost from '~/pages/AdminPost';
import AdminFilmManager from '~/pages/AdminFilmManager';
import AdminStatistical from '~/pages/AdminStatistical';

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
  {
    path: '/admin/my-room-ticket',
    component: AdminPost,
  },
  {
    path: '/admin/view/list-user-buy-ticket',
    component: AdminFilmManager,
  },
  {
    path: '/admin/statistical',
    component: AdminStatistical,
  },
  {
    path: '*',
    component: Invalid_404,
  },
];

export { publicRoutes };
