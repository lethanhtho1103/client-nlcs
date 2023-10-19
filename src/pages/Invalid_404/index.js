import classNames from 'classnames/bind';
import style from './Invalid_404.module.scss';
const cx = classNames.bind(style);
function Invalid_404() {
  return (
    <div className={cx('wrap')}>
      <div className={cx('container')}>
        <div className={cx('number')}>404</div>
        <div className={cx('title')}>Page Not Found</div>
        <div className={cx('description')}>Xin lỗi, trang bạn đang tìm kiếm không tồn tại!</div>
        <a href="/" className={cx('btn')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Quay lại trang chủ
        </a>
      </div>
    </div>
  );
}

export default Invalid_404;
