import { Button, Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSignature, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './FormLogin.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function FormLogin() {
  return (
    <>
      <Row className={cx('header')}>
        <Col sm={3}>
          <Link to="/" className={cx('logo')}>
            <FontAwesomeIcon icon={faSignature} bounce />
            NTFBook
          </Link>
        </Col>

        <Col sm={9}>
          <nav className={cx('nav')}>
            <Link to="/"> Home </Link>
            <Link to="/"> About </Link>
            <Link to="/"> Menu </Link>
            <Link to="/"> Review </Link>
            <Link to="/"> Contact </Link>
          </nav>
        </Col>
      </Row>

      <Row className={cx('home')}>
        <Col sm={4}>
          <div className={cx('content')}>
            <h2> Welcome!!!</h2>
            <p>
              Những tựa phim Việt Nam và quốc tế đình đám, hấp dẫn, hài hước, kịnh tính, kinh dị, lôi cuống,... Tất cả
              đều có trên TFBook với giá chỉ từ 90.000₫. Bạn đã có tài khoản chưa? Nhấn ngay nút "Bắt đầu" để tạo hoặc
              kích hoạt lại tư cách thành viên của bạn.
            </p>
            <Link to="#"> Bắt đầu </Link>
          </div>
        </Col>
        <Col sm={8}>
          <div className={cx('login')}>
            <h2> Đăng nhập </h2>
            <Form action="/">
              <Form.Group className={cx('mb-4', 'form-gr')}>
                <Form.Control required id="user" autoComplete="off" />
                <Form.Label className={cx('title-input')} htmlFor="user">
                  <FontAwesomeIcon icon={faUser} bounce />
                  Tên đăng nhập
                </Form.Label>
              </Form.Group>

              <Form.Group className={cx('mb-4', 'form-gr')}>
                <Form.Control required type="password" id="password" />
                <Form.Label className={cx('title-input')} htmlFor="password">
                  <FontAwesomeIcon icon={faLock} bounce />
                  Mật khẩu
                </Form.Label>
              </Form.Group>
              <Form.Group className={cx('remember-forgot')}>
                <Form.Label>
                  {' '}
                  <Form.Control required type="checkbox" /> Ghi nhớ tôi
                </Form.Label>
                <Link to="/"> Quên mật khẩu? </Link>
              </Form.Group>
              <div>
                <Button className={cx('submit')} type="submit">
                  {' '}
                  Đăng nhập{' '}
                </Button>
              </div>
              <div className={cx('register-link')}>
                <p> Bạn mới tham gia TFBook?</p>
                <Link to="/register"> Đăng ký ngay</Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default FormLogin;
