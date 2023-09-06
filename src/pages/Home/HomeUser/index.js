import classNames from 'classnames/bind';
import style from './HomeUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSignature, faUser } from '@fortawesome/free-solid-svg-icons';
// import HomeUserSLide from '~/components/HomeUserSLide';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row } from 'react-bootstrap';

const cx = classNames.bind(style);

function HomeUser() {
  return (
    <div className={cx('wrap')}>
      <div className={cx('header')}>
        <div className={cx('header-nav')}>
          <div className={cx('logo')}>
            <a href="/">
              <span>
                <FontAwesomeIcon icon={faSignature} bounce />
                NTF
              </span>
              Book
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
            {/* <ul className={cx('controls-list')}>
              <li className={cx('controls-item')}>
                <a href="#home">NHÀ</a>
              </li>
              <li className={cx('controls-item')}>
                <a href="#stated">BẮT ĐẦU</a>
              </li>
              <li className={cx('controls-item')}>
                <a href="#contact">LIÊN HỆ</a>
              </li>
            </ul> */}
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
      <Container className={cx('main')}>
        <Row className={cx('landing')}>
          <Col md={6} className={cx('landing-item')}>
            <div className={cx('landing-content')}>
              <h1 className={cx('landing-header')}>Đặt mua vé xim phim NTFBook</h1>
              <ul className={cx('services')}>
                <li className={cx('service-description')}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="jsx-e18afbcea943561a block shrink-0"
                  >
                    <circle
                      opacity="0.1"
                      cx="12"
                      cy="12"
                      r="12"
                      fill="#A50064"
                      class="jsx-e18afbcea943561a fill-cus"
                    ></circle>
                    <path
                      d="M17.3332 8L9.99984 15.3333L6.6665 12"
                      stroke="#A50064"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="jsx-e18afbcea943561a"
                    ></path>
                  </svg>
                  <span>Mua vé online,&nbsp;</span>
                  <strong> trải nghiệm phim hay</strong>
                </li>
                <li className={cx('service-description')}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="jsx-e18afbcea943561a block shrink-0"
                  >
                    <circle
                      opacity="0.1"
                      cx="12"
                      cy="12"
                      r="12"
                      fill="#A50064"
                      class="jsx-e18afbcea943561a fill-cus"
                    ></circle>
                    <path
                      d="M17.3332 8L9.99984 15.3333L6.6665 12"
                      stroke="#A50064"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="jsx-e18afbcea943561a"
                    ></path>
                  </svg>
                  <strong>Đặt vé an toàn</strong>&nbsp;trên NTFBook
                </li>
                <li className={cx('service-description')}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="jsx-e18afbcea943561a block shrink-0"
                  >
                    <circle
                      opacity="0.1"
                      cx="12"
                      cy="12"
                      r="12"
                      fill="#A50064"
                      class="jsx-e18afbcea943561a fill-cus"
                    ></circle>
                    <path
                      d="M17.3332 8L9.99984 15.3333L6.6665 12"
                      stroke="#A50064"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="jsx-e18afbcea943561a"
                    ></path>
                  </svg>
                  Tha hồ&nbsp;<strong>chọn chỗ ngồi, mua bắp nước</strong>&nbsp;tiện lợi
                </li>
                <li className={cx('service-description')}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="jsx-e18afbcea943561a block shrink-0"
                  >
                    <circle
                      opacity="0.1"
                      cx="12"
                      cy="12"
                      r="12"
                      fill="#A50064"
                      class="jsx-e18afbcea943561a fill-cus"
                    ></circle>
                    <path
                      d="M17.3332 8L9.99984 15.3333L6.6665 12"
                      stroke="#A50064"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="jsx-e18afbcea943561a"
                    ></path>
                  </svg>
                  <strong>Lịch sử đặt vé&nbsp;</strong>được lưu lại ngay
                </li>
              </ul>
              <Button className={cx('btn')}>ĐẶT VÉ NGAY</Button>
            </div>
          </Col>
          <Col md={6} className={cx('landing-item')}>
            <img
              alt="NTFBook"
              src="https://homepage.momocdn.net/img/momo-upload-api-230818134243-638279629633749960.jpg"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeUser;
