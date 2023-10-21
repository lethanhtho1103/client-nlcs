import classNames from 'classnames/bind';
import style from './HomeManager.module.scss';

import { Container } from 'react-bootstrap';
import HeaderManager from '~/components/HeaderManager';

const cx = classNames.bind(style);

function HomeManager() {
  const links = [
    { name: 'BÀI ĐĂNG CỦA TÔI', to: '/admin/mypost' },
    { name: 'QUẢN LÝ CÔNG TÁC TÌNH NGUYỆN', to: '/admin/view/list-user-req' },
    { name: 'THỐNG KÊ', to: '/admin/statistical' },
  ];
  return (
    <>
      <div className={cx('wrap')}>
        <div className={cx('header')}>
          <Container>
            <HeaderManager links={links} />
            <div className={cx('header-main')}>
              <h2>Những bộ phim nào sẽ sớm được ra mắt tiếp theo?</h2>
              <span>
                Đây là trang web quản lý dành cho admin, việc tạo ra các lịch chiếu phim, thống kê doanh số và giải
                quyết thắc mắc sẽ do bạn quyết định và giải quyết!
              </span>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default HomeManager;
