import classNames from 'classnames/bind';
import style from './HomeManager.module.scss';

import { Container } from 'react-bootstrap';
import HeaderManager from '~/components/HeaderManager';

const cx = classNames.bind(style);

function HomeManager() {
  const links = [
    { name: 'QUẢN LÝ PHÒNG CHIẾU', to: '/admin/my-room-ticket' },
    { name: 'QUẢN LÝ VÉ NGƯỜI DÙNG', to: '/admin/view/list-user-buy-ticket' },
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
