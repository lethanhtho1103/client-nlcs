import { Container, Row, Col } from 'react-bootstrap';
import { UilFacebookF } from '@iconscout/react-unicons';
import { UilInstagram } from '@iconscout/react-unicons';
import { UilMapMarker } from '@iconscout/react-unicons';
import { UilEnvelopeAdd } from '@iconscout/react-unicons';
import { UilPhone } from '@iconscout/react-unicons';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('wrap')}>
      <hr />

      <Container>
        <div className={cx('bor1')}>
          <Row>
            <Col sm={5}>
              <h1 className={cx('title')}>
                <FontAwesomeIcon icon={faSignature} bounce />
                NTFMovie
              </h1>
              <div className={cx('decs')}>
                Những tựa phim Việt Nam và quốc tế đình đám, hấp dẫn, hài hước, kịnh tính, kinh dị, lôi cuống,... Tất cả
                đều có trên NTFMovie với giá chỉ từ 60.000₫ cho một bộ phim.
              </div>
              <div className={cx('social')}>
                <div>
                  <a href="https://www.facebook.com/chiss.thoss?mibextid=ZbWKwL">
                    <UilFacebookF />
                  </a>
                </div>
                <div>
                  <a href="https://www.instagram.com/_tho1103/">
                    <UilInstagram />
                  </a>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <h2 className={cx('title2')}>Cinema</h2>
              <ul className={cx('list1')}>
                <li>About me</li>
                <li>Experiences</li>
                <li>Careers</li>
              </ul>
            </Col>
            <Col sm={4}>
              <h2 className={cx('title2')}>Get in touch</h2>
              <ul className={cx('list2')}>
                <li>
                  <div className={cx('list2-wrap')}>
                    <div className={cx('list2-icon')}>
                      <UilMapMarker />
                    </div>
                    <div>
                      <h2 className={cx('title3')}>LOCATION</h2>
                      <span>NTFMovie, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={cx('list2-wrap')}>
                    <div className={cx('list2-icon')}>
                      <UilEnvelopeAdd />
                    </div>

                    <div>
                      <h2 className={cx('title3')}>EMAIL OF ME</h2>
                      <span>thob2014791@student.ctu.edu.vn</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={cx('list2-wrap')}>
                    <div className={cx('list2-icon')}>
                      <UilPhone />
                    </div>
                    <div>
                      <h2 className={cx('title3')}>CALL WITH ME</h2>
                      <span>+0972221953</span>
                    </div>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
        <div className={cx('box2')}>
          <h3> Copyright &#169; 2023 , All rights reserved. Powered by Le Thanh Tho.</h3>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
