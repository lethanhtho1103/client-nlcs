import { Col } from 'react-bootstrap';
import contact from '../../assets/images/contact.png';
import styles from './ContactUserSLide.module.scss';
import classNames from 'classnames/bind';
import { Fragment } from 'react';
import { UilMapMarker } from '@iconscout/react-unicons';
import { UilEnvelopeAdd } from '@iconscout/react-unicons';
import { UilPhone } from '@iconscout/react-unicons';
import Header from '~/components/Header';

const cx = classNames.bind(styles);
function ContactUserSLide() {
  return (
    <Fragment>
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
