import classNames from 'classnames/bind';
import style from './Review.module.scss';

const cx = classNames.bind(style);

function Review({ toggleShow }) {
  const handelHidden = () => {
    toggleShow();
  };
  return (
    <div className={cx('wrap')}>
      <div className={cx('review')}>
        <div className={cx('video')}>
          <iframe
            title="dia dang sup do"
            src="https://www.youtube.com/embed/4wrFjd_t1gY?autoplay=1&enablejsapi=1&origin=https%3A%2F%2Fmomo.vn&widgetid=3"
          ></iframe>
        </div>
        <div className={cx('info_film')}>
          <img
            src="https://cinema.momocdn.net/img/12762105029421203-esgmPNY2yqx1mnVVY8vrUWU8Zrs.jpg"
            className={cx('avatar')}
            alt="dia dang sup do"
          />
          <div className={cx('info')}>
            <h3 className={cx('name-type')}>
              Địa Đàng Sụp Đổ&nbsp;
              <span>- Khoa Học Viễn Tưởng</span>
            </h3>
            <div className={cx('content')}>
              Trong tương lai, thế giới xảy ra một cuộc chiến tranh kéo dài giữa loài người và trí tuệ nhân tạo (AI).
              Joshua (John David Washington) - 1 cựu đặc vụ lì lợm, được thuê để giết “The Creator” - kẻ được xem là đầu
              não của AI và đã tạo ra 1 loại vũ khí bí ẩn đủ mạnh để kết thúc cuộc chiến và quét sạch
            </div>
            <div className={cx('btn')}>
              <a href="/" className={cx('btn-buy')}>
                Đặt vé
              </a>
              <span onClick={handelHidden} className={cx('btn-exit')}>
                Đóng
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
