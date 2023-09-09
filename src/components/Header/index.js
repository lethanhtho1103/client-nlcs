import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSignature, faUser } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);
function Header() {
  return (
    <div className={cx('header')}>
      <div className={cx('header-nav')}>
        <div className={cx('logo')}>
          <a href="/">
            <span>
              <FontAwesomeIcon icon={faSignature} bounce />
              NTF
            </span>
            Movie
          </a>
        </div>
        <div className={cx('search')}>
          <input placeholder="Search accounts and videos" spellCheck={false} />

          {/* <button className={cx('clear')}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>

              <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}
          <button className={cx('search-btn')}>
            <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
              ></path>
            </svg>
          </button>
        </div>
        <div className={cx('controls')}>
          <ul className={cx('controls-list')}>
            <li className={cx('controls-item')}>
              <a href="#home">NHÀ</a>
            </li>
            <li className={cx('controls-item')}>
              <a href="#stated">BẮT ĐẦU</a>
            </li>
            <li className={cx('controls-item')}>
              <a href="#contact">LIÊN HỆ</a>
            </li>
          </ul>
          <div className={cx('icon-out')}>
            <div className={cx('logout')}>
              <h2>Lê Thành Thọ</h2>
              <div className={cx('icon')}>
                <FontAwesomeIcon icon={faCaretDown} />
                <div className={cx('menu')}>
                  <h2>
                    <span>
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    B2014791
                  </h2>
                  <ul>
                    <li>Đăng xuất</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
