import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSignature, faUser } from '@fortawesome/free-solid-svg-icons';
import Search from '../Search';
import { useDispatch } from 'react-redux';
import { userSlice } from '~/redux/reducer';

const cx = classNames.bind(style);
function Header() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userSlice.actions.toggleUserLogin());
  };

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
        <Search />
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
                    <li onClick={handleLogout}>Đăng xuất</li>
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
