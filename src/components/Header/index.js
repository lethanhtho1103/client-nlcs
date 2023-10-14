import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faCaretDown,
  faGear,
  faSignature,
  faTicket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Search from '../Search';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';
import { userSlice } from '~/redux/reducer';
import { faMessage } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(style);
function Header() {
  const dispatch = useDispatch();
  const currUser = useSelector(userSelector);
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
              <a href="/start">BẮT ĐẦU</a>
            </li>
            <li className={cx('controls-item')}>
              <a href="/contact">LIÊN HỆ</a>
            </li>
          </ul>
          <div className={cx('icon-out')}>
            <div className={cx('logout')}>
              <h2>{currUser.name}</h2>

              <div className={cx('icon')}>
                <FontAwesomeIcon icon={faCaretDown} />
                <div className={cx('menu')}>
                  <h2>
                    <span>
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    {currUser.id}
                  </h2>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faTicket} />
                      Vé của tôi
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faMessage} />
                      Phản hồi
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faGear} />
                      Cài đặt
                    </li>

                    <li onClick={handleLogout}>
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                      Đăng xuất
                    </li>
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
