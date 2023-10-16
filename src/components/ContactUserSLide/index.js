import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { Col } from 'react-bootstrap';
import contact from '../../assets/images/contact.png';
import styles from './ContactUserSLide.module.scss';
import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { faArrowRightFromBracket, faCaretDown, faGear, faSignature, faTicket } from '@fortawesome/free-solid-svg-icons';
import { UilMapMarker } from '@iconscout/react-unicons';
import { UilEnvelopeAdd } from '@iconscout/react-unicons';
import { UilPhone } from '@iconscout/react-unicons';
import Header from '../Header';

const cx = classNames.bind(styles);

function ContactUserSLide() {
  return (
    <Fragment>
      {/* <div className={cx('header')}>
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

          <div className={cx('controls')}>
            <ul className={cx('controls-list')}>
              <li className={cx('controls-item')}>
                <a href="/top-phim">Top phim</a>
              </li>
              <li className={cx('controls-item', 'active')}>
                <a href="/contact">Liên hệ</a>
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
                      <li>
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
      </div> */}
      <Header contact={'contact'} />
      <div id="contact">
        <div className={cx('row', 'g-5', 'header-contact')}>
          <Col md={5}>
            <div className={cx('image')}>
              <img alt="" src={contact}></img>
            </div>
          </Col>
          <Col md={6}>
            <div className={cx('title')}>
              <h2>
                Liên hệ với các admin nếu có bất kì thắc mắc gì trong quá trình đặt vé xem phim qua các thông tin dưới
                đây:
              </h2>
              <ul>
                <li>
                  <UilMapMarker />
                  <span>
                    Địa chỉ:
                    <span className={cx('hight-light')}>
                      (NTFMovie, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ).
                    </span>
                  </span>
                </li>
                <li>
                  <UilPhone />
                  <span>
                    Hotline:<span className={cx('hight-light')}>(0972221953)</span>
                  </span>
                </li>
                <li>
                  <UilEnvelopeAdd />
                  <span>
                    Email:<span className={cx('hight-light')}>(thob2014791@student.ctu.edu.vn)</span>
                  </span>
                </li>
              </ul>
            </div>
          </Col>
        </div>
      </div>
    </Fragment>
  );
}

export default ContactUserSLide;
