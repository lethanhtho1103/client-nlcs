import { UilPostcard } from '@iconscout/react-unicons';
import { UilFileUpload } from '@iconscout/react-unicons';
import { UilEstate } from '@iconscout/react-unicons';
import NavLeft from '~/components/NavLeft';
import { useSelector } from 'react-redux';
import { isLoginSelector } from '~/redux/selector';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminShowTime.module.scss';
import TableShowTime from '~/components/TableShowTime';
import { AdminShowTimeProvider } from '~/Context/AdminShowTimeContext';
const cx = classNames.bind(styles);

const menu = {
  title: 'NTFMovies',
  desc: [
    {
      title: 'Trang chủ',
      to: '/',
      icon: UilEstate,
    },
    {
      title: 'Sắp lịch chiếu phim',
      icon: UilFileUpload,
      type: 'create-show-time',
    },
    {
      title: 'Xem tất cả lịch chiếu',
      to: '/admin/allpost',
      icon: UilPostcard,
    },
  ],
};

function AdminShowTime() {
  const isLogined = useSelector(isLoginSelector);

  const navigate = useNavigate();

  const controlPage = useCallback(() => {
    if (!isLogined) {
      navigate('/login');
    }
  }, [isLogined, navigate]);

  useEffect(() => {
    controlPage();
  }, [controlPage]);

  return (
    <AdminShowTimeProvider>
      <div className={cx('wrap')}>
        <NavLeft menu={menu} location="post" />
        <div className={cx('wrap-post')}>
          <div className={cx('menu-control')}>
            <a href="/">Trang chủ</a>/<span> Lịch chiếu </span>
          </div>
          <div className={cx('posts')}>
            <div className={cx('post-profice')}>
              <div> Chưa có lịch chiếu nào!</div>
            </div>
          </div>
        </div>
        {/* <div className={cx('profice')}>
          <div className={cx('info')}>
            <Row>
              <Col className={cx('col-wrap')} md={12}>
                <div className={cx('image')}>
                  <img className={cx('image-user')} src={user} alt="User" />
                </div>
                <h3 className={cx('content', 'name')}>{curUser.id}</h3>
                <h3 className={cx('content', 'name')}>{curUser.name}</h3>
              </Col>
              <Col className={cx('col-wrap')} md={12}>
                <span className={cx('title')}>Ngày tham gia:</span>
                <span className={cx('content')}>
                  <Moment local="vi" fromNow format="ll" date={curUser.updatedAt} />
                </span>
              </Col>

              <Col className={cx('col-wrap')} md={12}>
                <span className={cx('title')}>Email: </span>
                <span className={cx('content')}>{curUser.email}</span>
              </Col>
              <Col className={cx('col-wrap')} md={12}>
                <span className={cx('title')}>Mã lớp:</span>
                <span className={cx('content')}>{curUser.className}</span>
              </Col>
              <Col className={cx('col-wrap')} md={12}>
                <span className={cx('title')}>Trực thuộc khoa:</span>
                <span className={cx('content')}>{curUser.faculty}</span>
              </Col>
            </Row>
            <div className={cx('border')}></div>
            <div className={cx('note')}>
              <span>Ghi chú: Bạn đang đăng nhập với tư cách là Admin!</span>
            </div>
          </div>
        </div> */}
        <TableShowTime />
      </div>
    </AdminShowTimeProvider>
  );
}

export default AdminShowTime;
