import classNames from 'classnames/bind';
import style from './HomeUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSignature, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
// import HomeUserSLide from '~/components/HomeUserSLide';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import Footer from '~/components/Footer';

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
      <Container className={cx('main')}>
        <Row className={cx('landing')}>
          <Col md={6} className={cx('landing-item')}>
            <div className={cx('landing-content')}>
              <h1 className={cx('landing-header')}>Đặt mua vé xim phim NTFMovie</h1>
              <ul className={cx('services')}>
                <li className={cx('service-description')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle opacity="0.1" cx="12" cy="12" r="12" fill="#A50064"></circle>
                    <path
                      d="M17.3332 8L9.99984 15.3333L6.6665 12"
                      stroke="#A50064"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Mua vé online,&nbsp;</span>
                  <strong> trải nghiệm phim hay</strong>
                </li>
                <li className={cx('service-description')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle opacity="0.1" cx="12" cy="12" r="12" fill="#A50064"></circle>
                    <path
                      d="M17.3332 8L9.99984 15.3333L6.6665 12"
                      stroke="#A50064"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <strong>Đặt vé an toàn</strong>&nbsp;trên NTFMovie
                </li>
                <li className={cx('service-description')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle opacity="0.1" cx="12" cy="12" r="12" fill="#A50064"></circle>
                    <path
                      d="M17.3332 8L9.99984 15.3333L6.6665 12"
                      stroke="#A50064"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  Tha hồ&nbsp;<strong>chọn chỗ ngồi, mua bắp nước</strong>&nbsp;tiện lợi
                </li>
                <li className={cx('service-description')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle opacity="0.1" cx="12" cy="12" r="12" fill="#A50064"></circle>
                    <path
                      d="M17.3332 8L9.99984 15.3333L6.6665 12"
                      stroke="#A50064"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
              alt="NTFMovie"
              src="https://homepage.momocdn.net/blogscontents/momo-upload-api-230324144446-638152658866967300.jpg"
            />
          </Col>
        </Row>
        <Row className={cx('moviesPlaying')}>
          <Col sm={12} className={cx('playing-movie')}>
            <h1 className={cx('heading-movie')}>Phim đang chiếu</h1>
            <Row className={cx('list-movie')}>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item')}>
                    <div
                      style={{
                        backgroundImage:
                          'url(https://cinema.momocdn.net/img/14058240908407865-c9kVD7W8CT5xe4O3hQ7bFWwk68U.jpg)',
                      }}
                      className={cx('home-product-item__img')}
                    >
                      <div className={cx('home-product-item__pause')}>
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <g fill="none" fillRule="evenodd">
                            <circle
                              stroke="#FFF"
                              strokeWidth="2"
                              fillOpacity=".24"
                              fill="#000"
                              cx="24"
                              cy="24"
                              r="23"
                            ></circle>
                            <path
                              d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                              fill="#FFF"
                              fillRule="nonzero"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <div className={cx('home-product-item__number')}>1</div>
                    </div>
                    <h4 className={cx('home-product-item__name')}>Ác Quỷ Ma Sơ 2</h4>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old')}>Kinh Dị, Bí Ẩn</span>
                    </div>
                    <div className={cx('home-product-item__action')}>
                      <div className={cx('home-product-item__rating')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-gold')} icon={faStar} />
                      </div>
                      <div className={cx('home-product-item__sold')}>9.1</div>
                    </div>

                    <div className={cx('home-product-item__favourite')}>
                      <span>18+</span>
                    </div>
                    <div className={cx('home-product-item__sale-off')}>
                      <span className={cx('home-product-item__sale-off-label')}>ĐẶT TRƯỚC</span>
                    </div>
                  </div>
                </a>
              </Col>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item')}>
                    <div
                      style={{
                        backgroundImage: 'url(https://cinema.momocdn.net/img/17498461059164213-poster.jpg)',
                      }}
                      className={cx('home-product-item__img')}
                    >
                      <div className={cx('home-product-item__pause')}>
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <g fill="none" fillRule="evenodd">
                            <circle
                              stroke="#FFF"
                              strokeWidth="2"
                              fillOpacity=".24"
                              fill="#000"
                              cx="24"
                              cy="24"
                              r="23"
                            ></circle>
                            <path
                              d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                              fill="#FFF"
                              fillRule="nonzero"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <div className={cx('home-product-item__number')}>2</div>
                    </div>
                    <h4 className={cx('home-product-item__name')}>Địa Bàn Sụp đổ</h4>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old')}>Khoa Học Viễn Tưởng, Chính trị</span>
                    </div>
                    <div className={cx('home-product-item__action')}>
                      <div className={cx('home-product-item__rating')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-gold')} icon={faStar} />
                      </div>
                      <div className={cx('home-product-item__sold')}>8.8</div>
                    </div>

                    <div className={cx('home-product-item__favourite')}>
                      <span className={cx('sixteen')}>16+</span>
                    </div>
                  </div>
                </a>
              </Col>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item')}>
                    <div
                      style={{
                        backgroundImage: 'url(https://cinema.momocdn.net/img/18544324979906627-poster.jpg)',
                      }}
                      className={cx('home-product-item__img')}
                    >
                      <div className={cx('home-product-item__pause')}>
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <g fill="none" fillRule="evenodd">
                            <circle
                              stroke="#FFF"
                              strokeWidth="2"
                              fillOpacity=".24"
                              fill="#000"
                              cx="24"
                              cy="24"
                              r="23"
                            ></circle>
                            <path
                              d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                              fill="#FFF"
                              fillRule="nonzero"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <div className={cx('home-product-item__number')}>3</div>
                    </div>
                    <h4 className={cx('home-product-item__name')}>Bộ Đôi Báo Thủ</h4>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old')}>Chính Trọ, Gay Cấn</span>
                    </div>
                    <div className={cx('home-product-item__action')}>
                      <div className={cx('home-product-item__rating')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-gold')} icon={faStar} />
                      </div>
                      <div className={cx('home-product-item__sold')}>7.7</div>
                    </div>

                    <div className={cx('home-product-item__favourite')}>
                      <span className={cx('sixteen')}>16+</span>
                    </div>
                  </div>
                </a>
              </Col>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item')}>
                    <div
                      style={{
                        backgroundImage:
                          'url(https://cinema.momocdn.net/img/12744073754606903-3o3GE709vaU2O1A3g62ZAewQiVP.jpg)',
                      }}
                      className={cx('home-product-item__img')}
                    >
                      <div className={cx('home-product-item__pause')}>
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <g fill="none" fillRule="evenodd">
                            <circle
                              stroke="#FFF"
                              strokeWidth="2"
                              fillOpacity=".24"
                              fill="#000"
                              cx="24"
                              cy="24"
                              r="23"
                            ></circle>
                            <path
                              d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                              fill="#FFF"
                              fillRule="nonzero"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <div className={cx('home-product-item__number')}>4</div>
                    </div>
                    <h4 className={cx('home-product-item__name')}>Thiện Ác Đối Đầu 3</h4>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old')}>Hình Sự, Hành Động</span>
                    </div>
                    <div className={cx('home-product-item__action')}>
                      <div className={cx('home-product-item__rating')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-gold')} icon={faStar} />
                      </div>
                      <div className={cx('home-product-item__sold')}>8.9</div>
                    </div>

                    <div className={cx('home-product-item__favourite')}>
                      <span>18+</span>
                    </div>
                  </div>
                </a>
              </Col>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item')}>
                    <div
                      style={{
                        backgroundImage:
                          'url(https://cinema.momocdn.net/img/91346315107942627-ixLH2iM9at8BbuLr5wQWnCfwhJO.jpg)',
                      }}
                      className={cx('home-product-item__img')}
                    >
                      <div className={cx('home-product-item__pause')}>
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <g fill="none" fillRule="evenodd">
                            <circle
                              stroke="#FFF"
                              strokeWidth="2"
                              fillOpacity=".24"
                              fill="#000"
                              cx="24"
                              cy="24"
                              r="23"
                            ></circle>
                            <path
                              d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                              fill="#FFF"
                              fillRule="nonzero"
                            ></path>
                          </g>
                        </svg>
                      </div>
                      <div className={cx('home-product-item__number')}>5</div>
                    </div>
                    <h4 className={cx('home-product-item__name')}>Oppenheimer</h4>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old')}>Lịch sử, Chính Trị</span>
                    </div>
                    <div className={cx('home-product-item__action')}>
                      <div className={cx('home-product-item__rating')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-gold')} icon={faStar} />
                      </div>
                      <div className={cx('home-product-item__sold')}>8.6</div>
                    </div>

                    <div className={cx('home-product-item__favourite')}>
                      <span>18+</span>
                    </div>
                    <div className={cx('home-product-item__sale-off')}>
                      <span className={cx('home-product-item__sale-off-label')}>ĐẶT TRƯỚC</span>
                    </div>
                  </div>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={cx('moviesUpcoming')}>
          <Col sm={12} className={cx('playing-movie')}>
            <h1 className={cx('heading-movie')}>Phim sắp chiếu</h1>
            <Row className={cx('list-movie')}>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item-up')}>
                    <div
                      style={{
                        backgroundImage:
                          'url(https://cinema.momocdn.net/img/15087893214581577-dRgYeBp48TwCU84d6BR7A3VwfUi.jpg)',
                      }}
                      className={cx('home-product-item__img-up')}
                    >
                      <div className={cx('home-product-item__pause')}>
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <g fill="none" fillRule="evenodd">
                            <circle
                              stroke="#FFF"
                              strokeWidth="2"
                              fillOpacity=".24"
                              fill="#000"
                              cx="24"
                              cy="24"
                              r="23"
                            ></circle>
                            <path
                              d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                              fill="#FFF"
                              fillRule="nonzero"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <h4 className={cx('home-product-item__name-black')}>Người Vợ Cuối Cùng</h4>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old')}>Chính Kịch, Lãng Mạn</span>
                    </div>
                    <div className={cx('home-product-item__action')}>
                      <div className={cx('home-product-item__rating')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-gold')} icon={faStar} />
                      </div>
                      <div className={cx('home-product-item__sold-black')}>9</div>
                    </div>

                    <div className={cx('home-product-item__favourite')}>
                      <span className={cx('sixteen')}>16+</span>
                    </div>
                  </div>
                </a>
              </Col>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item-up')}>
                    <div
                      style={{
                        backgroundImage:
                          'url(	https://cinema.momocdn.net/img/9026105750181167-apFcKjQlxzFj2MY9d0rxdyT0ykv.jpg)',
                      }}
                      className={cx('home-product-item__img-up')}
                    >
                      <div className={cx('home-product-item__pause')}>
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <g fill="none" fillRule="evenodd">
                            <circle
                              stroke="#FFF"
                              strokeWidth="2"
                              fillOpacity=".24"
                              fill="#000"
                              cx="24"
                              cy="24"
                              r="23"
                            ></circle>
                            <path
                              d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                              fill="#FFF"
                              fillRule="nonzero"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <h4 className={cx('home-product-item__name-black')}>Đất Rừng Phương Nam</h4>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old')}>Chiến Tranh, Chính Kịch</span>
                    </div>
                    <div className={cx('home-product-item__action')}>
                      <div className={cx('home-product-item__rating')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-gold')} icon={faStar} />
                      </div>
                      <div className={cx('home-product-item__sold-black')}>7</div>
                    </div>

                    <div className={cx('home-product-item__favourite')}>
                      <span className={cx('thirteen')}>13+</span>
                    </div>
                  </div>
                </a>
              </Col>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item-up')}>
                    <div
                      style={{
                        backgroundImage:
                          'url(https://cinema.momocdn.net/img/90576470029227527-y5rrebdZsGgpKb2U52rxMQTYbn0.jpg)',
                      }}
                      className={cx('home-product-item__img-up')}
                    >
                      <div className={cx('home-product-item__pause')}>
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <g fill="none" fillRule="evenodd">
                            <circle
                              stroke="#FFF"
                              strokeWidth="2"
                              fillOpacity=".24"
                              fill="#000"
                              cx="24"
                              cy="24"
                              r="23"
                            ></circle>
                            <path
                              d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                              fill="#FFF"
                              fillRule="nonzero"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <h4 className={cx('home-product-item__name-black')}>Mikey 17</h4>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old')}>Khoa Học Viễn Tưởng, Phiêu Lưu</span>
                    </div>
                    <div className={cx('home-product-item__action')}>
                      <div className={cx('home-product-item__rating')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-gold')} icon={faStar} />
                      </div>
                      <div className={cx('home-product-item__sold-black')}>8.3</div>
                    </div>

                    <div className={cx('home-product-item__favourite')}>
                      <span className={cx('sixteen')}>16+</span>
                    </div>
                  </div>
                </a>
              </Col>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item-up')}>
                    <div
                      style={{
                        backgroundImage:
                          'url(https://cinema.momocdn.net/img/13186238604554021-kCikp0AOTPZITIFqIA9cBKByYuE.jpg)',
                      }}
                      className={cx('home-product-item__img-up')}
                    >
                      <div className={cx('home-product-item__pause')}>
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <g fill="none" fillRule="evenodd">
                            <circle
                              stroke="#FFF"
                              strokeWidth="2"
                              fillOpacity=".24"
                              fill="#000"
                              cx="24"
                              cy="24"
                              r="23"
                            ></circle>
                            <path
                              d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                              fill="#FFF"
                              fillRule="nonzero"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <h4 className={cx('home-product-item__name-black')}>Cậu bé đến từ trái đất</h4>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old')}>Hài, Khoa học viễn tưởng</span>
                    </div>
                    <div className={cx('home-product-item__action')}>
                      <div className={cx('home-product-item__rating')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-gold')} icon={faStar} />
                      </div>
                      <div className={cx('home-product-item__sold-black')}>9.3</div>
                    </div>

                    <div className={cx('home-product-item__favourite')}>
                      <span className={cx('p')}>P</span>
                    </div>
                  </div>
                </a>
              </Col>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item-up')}>
                    <div
                      style={{
                        backgroundImage:
                          'url(https://cinema.momocdn.net/img/15591453796668783-l2dEOWoGcksuHB7or18LbVfb1On.jpg)',
                      }}
                      className={cx('home-product-item__img-up')}
                    >
                      <div className={cx('home-product-item__pause')}>
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <g fill="none" fillRule="evenodd">
                            <circle
                              stroke="#FFF"
                              strokeWidth="2"
                              fillOpacity=".24"
                              fill="#000"
                              cx="24"
                              cy="24"
                              r="23"
                            ></circle>
                            <path
                              d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                              fill="#FFF"
                              fillRule="nonzero"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <h4 className={cx('home-product-item__name-black')}>Điều Ước</h4>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old')}>Hoạt Hình, Nhạc, Giả Tưởng</span>
                    </div>
                    <div className={cx('home-product-item__action')}>
                      <div className={cx('home-product-item__rating')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-gold')} icon={faStar} />
                      </div>
                      <div className={cx('home-product-item__sold-black')}>7.9</div>
                    </div>

                    <div className={cx('home-product-item__favourite')}>
                      <span className={cx('k')}>K</span>
                    </div>
                  </div>
                </a>
              </Col>
            </Row>
            <Button className={cx('btn-search-movie')}>Tìm phim chiếu rạp</Button>
          </Col>
        </Row>
        <Row className={cx('moviesTop')}>
          <Col className={cx('playing-movie')}>
            <h1 className={cx('heading-movie')}>Top phim hay trên NTFMovie</h1>
            <Row className={cx('list-movie')}>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item')}>
                    <div className={cx('home-product-item__img-top')}>
                      <img
                        className={cx('top1')}
                        src="https://cinema.momocdn.net/img/14986958043931320-bWsvsKwvX7RazmVgqmXgGnAipXn.jpg"
                        alt="Top1"
                      />
                      <img
                        className={cx('top2')}
                        src="https://cinema.momocdn.net/img/12074699513178226-cswPVyXwQ13dFHU1KFS8dpFxIyY.jpg"
                        alt="Top2"
                      />
                      <img
                        className={cx('top3')}
                        src="https://homepage.momocdn.net/cinema/momo-upload-api-230726112627-638259675879296733.jpg"
                        alt="Top3"
                      />
                      <img
                        className={cx('top4')}
                        src="https://homepage.momocdn.net/cinema/momo-upload-api-230525153950-638206259909352599.jpg"
                        alt="Top4"
                      />
                      <img
                        className={cx('top5')}
                        src="https://cinema.momocdn.net/img/86928996225187344-2uxNnsL4tCK2c4d9FuiCoea4ku7.jpg"
                        alt="Top5"
                      />
                    </div>
                    <h1 className={cx('home-product-item__name-top')}>Top phim siêu anh hùng 2023 đáng được chờ đợi</h1>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old-top')}>
                        Siêu anh hùng luôn là đề tài được các nhà làm phim nung nấu nhiều ý tưởng và khai thác triệt để.
                        Cùng NTFMovie tham khảo nhanh các phim siêu anh hùng hấp dẫn nhé.
                      </span>
                    </div>
                    <div className={cx('home-product-item__action-top')}>
                      <div className={cx('home-product-item__date-top')}>19/10/2023 . &nbsp;</div>
                      <div className={cx('home-product-item__rating-top')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-top')} icon={faEye} />
                      </div>
                      <div className={cx('home-product-item__sold-top')}>&nbsp;678 lượt xem</div>
                    </div>
                  </div>
                </a>
              </Col>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item')}>
                    <div className={cx('home-product-item__img-top')}>
                      <img
                        className={cx('top1')}
                        src="https://cinema.momocdn.net/img/12762105029421203-esgmPNY2yqx1mnVVY8vrUWU8Zrs.jpg"
                        alt="Top1"
                      />
                      <img
                        className={cx('top2')}
                        src="https://cinema.momocdn.net/img/12744539559079075-2wDBg6JcjhoWyw3LCy2k4XMHOBV.jpg"
                        alt="Top2"
                      />
                      <img
                        className={cx('top3')}
                        src="https://cinema.momocdn.net/img/12670988562548971-1BMqOORP7cnYyrfR2nectAQLw1I.jpg"
                        alt="Top3"
                      />
                      <img
                        className={cx('top4')}
                        src="https://cinema.momocdn.net/img/12074699513178226-cswPVyXwQ13dFHU1KFS8dpFxIyY.jpg"
                        alt="Top4"
                      />
                      <img
                        className={cx('top5')}
                        src="https://cinema.momocdn.net/img/2995715139969098-conmemay.jpg"
                        alt="Top5"
                      />
                    </div>
                    <h1 className={cx('home-product-item__name-top')}>
                      Top 14 phim hành động viễn tưởng 2023 lôi cuốn và hấp dẫn
                    </h1>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old-top')}>
                        Năm 2023 đã chứng kiến sự trỗi dậy mạnh mẽ của thể loại phim hành động viễn tưởng với những tác
                        phẩm đáng chú ý.
                      </span>
                    </div>
                    <div className={cx('home-product-item__action-top')}>
                      <div className={cx('home-product-item__date-top')}>19/10/2023 . &nbsp;</div>
                      <div className={cx('home-product-item__rating-top')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-top')} icon={faEye} />
                      </div>
                      <div className={cx('home-product-item__sold-top')}>&nbsp;770 lượt xem</div>
                    </div>
                  </div>
                </a>
              </Col>
              <Col className={cx('movie-item')}>
                <a href="/" className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item')}>
                    <div className={cx('home-product-item__img-top')}>
                      <img
                        className={cx('top1')}
                        src="https://cinema.momocdn.net/img/89450245714602845-3.jpg"
                        alt="Top1"
                      />
                      <img
                        className={cx('top2')}
                        src="https://cinema.momocdn.net/img/88668829503516544-2.jpg"
                        alt="Top2"
                      />
                      <img
                        className={cx('top3')}
                        src="https://homepage.momocdn.net/cinema/momo-upload-api-220715172239-637935025591723119.jpeg"
                        alt="Top3"
                      />
                      <img
                        className={cx('top4')}
                        src="https://cinema.momocdn.net/img/1769222641137689-5.jpg"
                        alt="Top4"
                      />
                      <img
                        className={cx('top5')}
                        src="https://homepage.momocdn.net/cinema/momo-upload-api-230726092811-638259604919625155.jpg"
                        alt="Top5"
                      />
                    </div>
                    <h1 className={cx('home-product-item__name-top')}>
                      Phim hành động Hàn Quốc hay mãn nhãn và kịch tính
                    </h1>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old-top')}>
                        Phim hành động Hàn Quốc luôn được khán giả yêu thích bởi sự hấp dẫn, kịch tính và mãn nhãn.
                        Nhanh tay đến NTFMovie xem nào.
                      </span>
                    </div>
                    <div className={cx('home-product-item__action-top')}>
                      <div className={cx('home-product-item__date-top')}>19/10/2023 . &nbsp;</div>
                      <div className={cx('home-product-item__rating-top')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-top')} icon={faEye} />
                      </div>
                      <div className={cx('home-product-item__sold-top')}>&nbsp;890 lượt xem</div>
                    </div>
                  </div>
                </a>
              </Col>
            </Row>
            <Button className={cx('btn-more')}>Xem nhiều hơn!</Button>
          </Col>
        </Row>
        <Row className={cx('block')}>
          <h1 className={cx('title')}>Đặt mua vé xem phim trên NTFMovie</h1>
          <div className={cx('descriptions')}>
            <div className={cx('description-item')}>
              Việc đặt vé xem phim chưa bao giờ đơn giản và dễ dàng như thế, chỉ với vài thao tác trên website bạn đã có
              thể đặt vé xem bộ phim mình yêu thích mà không phải xếp hàng tại rạp. NTFMovie có tất cả các bộ bộ phim
              lớn trên cả nước và thế giới, bộ phim nào bạn thích NTFMovie cũng có. Giá vé xem phim luôn ở mức giá cực
              kì tốt là một “đặc sản” với những ưu đãi độc quyền mà chỉ có ở NTFMovie.
            </div>
            <div className={cx('description-item')}>
              Nay buổi xem phim chiếu rạp của bạn sẽ càng tuyệt vời hơn với tính năng mua bắp nước trước khi đến rạp,
              bạn sẽ đa dạng hoá các món bắp hay thức uống mà bạn yêu thích, tạo bất ngờ cho bạn đồng hành bằng những
              combo cực chất lượng đến từ các rạp chiếu phim.
            </div>
            <div className={cx('description-item')}>
              Trong thời gian sắp tới, bên cạnh tính năng hiện đang có, NTFMovie cũng đang phát triển thêm những tính
              năng mới để cộng đồng yêu phim ảnh có thể có những cái nhìn thực tế về nội dung cũng như chất lượng phim
              trên thị trường. Những đánh giá bình luận tích cực từ phía người xem hay những trang cá nhân dành riêng
              cho những bộ phim bom tấn sẽ là nơi uy tín để cập nhật tin tức, thị hiếu về làng phim trong nước cũng như
              thế giới.
            </div>
            <h2 className={cx('title-useful')}>Lợi ích đặt vé xem phim online:</h2>
            <ul className={cx('list-usefuls')}>
              <li className={cx('useful-item')}>Hưởng các giá vé xem phim ưu đãi độc quyền từ NTFBook.</li>
              <li className={cx('useful-item')}>
                Có cộng đồng đánh giá, nhận xét phim uy tín luôn phản ánh đúng chất lượng của phim.
              </li>
              <li className={cx('useful-item')}>
                Không giới hạn số lượng vé mua, được tích điểm thành viên của NTFBook.
              </li>
              <li className={cx('useful-item')}>Nhanh chóng và tiện lợi, không cần xếp hàng hay vé giấy.</li>
              <li className={cx('useful-item')}>
                Cập nhật nhanh chóng các phim đang chiếu trên thị trường để đa dạng hoá lựa chọn phim.
              </li>
            </ul>
          </div>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default HomeUser;
