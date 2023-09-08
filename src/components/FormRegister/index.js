import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSignature, faUser, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import styles from './FormRegister.module.scss';
import classNames from 'classnames/bind';
import { useRef, useState, useCallback, useEffect } from 'react';
import { userService } from '~/services';
import Loader from '../Loader';
const cx = classNames.bind(styles);

function FormRegister() {
  const btnSubmitRef = useRef();
  const fullNameRef = useRef();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [userInput, setUserInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [confPass, setConfPass] = useState('');
  const [isCheckBox, setIsCheckBox] = useState(true);
  const [errInput, setErrInput] = useState('');
  const [isLoader, setIsloader] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleChange = (e, type) => {
    if (type === 'user') {
      setUserInput(e.target.value);
    } else if (type === 'pass') {
      setPassInput(e.target.value);
    } else if (type === 'fullName') {
      setFullName(e.target.value);
    } else if (type === 'confPass') {
      setConfPass(e.target.value);
    } else if (type === 'checkbox') {
      setIsCheckBox((isCheckBox) => !isCheckBox);
    }
  };

  const handelSubmit = async () => {
    setIsloader(true);
    var idLoader = await setTimeout(async () => {
      const res = await userService.register(fullName, userInput, passInput, confPass);
      setErrInput(res.errMessage);
      setIsloader(false);
      clearTimeout(idLoader);
      if (res.errCode === 0) {
        setIsRegister(true);
      } else {
        setUserInput('');
        setPassInput('');
        setConfPass('');
        fullNameRef.current.focus();
      }
    }, 500);
  };

  const handleNavigate = useCallback(() => {
    if (isRegister) {
      alert('Đăng ký tài khoản thành công!');
      navigate('/login');
    }
  }, [isRegister, navigate]);

  const handleKeyDownSubmit = () => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') btnSubmitRef.current.click();
    });
  };

  useEffect(() => {
    handleNavigate();
    handleKeyDownSubmit();
  }, [handleNavigate, isRegister]);

  return (
    <>
      {isLoader && <Loader />}
      <div className={cx('header')}>
        <div>
          <Link to="/" className={cx('logo')}>
            <FontAwesomeIcon icon={faSignature} bounce />
            NTFMovie
          </Link>
        </div>

        <div>
          <nav className={cx('nav')}>
            <Link to="/"> Home </Link>
            <Link to="/"> About </Link>
            <Link to="/"> Menu </Link>
            <Link to="/"> Review </Link>
            <Link to="/"> Contact </Link>
          </nav>
        </div>
      </div>

      <div className={cx('home')}>
        <div>
          <div className={cx('content')}>
            <h2> Welcome!!!</h2>
            <p>
              Những tựa phim Việt Nam và quốc tế đình đám, hấp dẫn, hài hước, kịnh tính, kinh dị, lôi cuống,... Tất cả
              đều có trên NTFMovie với giá chỉ từ 60.000₫. Bạn đã có tài khoản chưa? Nhấn ngay nút "Bắt đầu" để tạo hoặc
              kích hoạt lại tư cách thành viên của bạn.
            </p>
            <Button
              className={cx('btn-start')}
              onClick={() => {
                fullNameRef.current.focus();
              }}
            >
              Bắt đầu
            </Button>
          </div>
        </div>
        <div>
          <div className={cx('login')}>
            <h2> Đăng ký </h2>
            <Form>
              <Form.Group className={cx('mb-4', 'form-gr')}>
                <Form.Control
                  required
                  ref={fullNameRef}
                  id="fullName"
                  autoComplete="off"
                  value={fullName}
                  onChange={(e) => handleChange(e, 'fullName')}
                />
                <Form.Label className={cx('title-input')} htmlFor="fullName">
                  <FontAwesomeIcon icon={faUserPen} bounce />
                  Họ và tên
                </Form.Label>
              </Form.Group>
              <Form.Group className={cx('mb-4', 'form-gr')}>
                <Form.Control
                  required
                  id="user"
                  autoComplete="off"
                  value={userInput}
                  onChange={(e) => handleChange(e, 'user')}
                />
                <Form.Label className={cx('title-input')} htmlFor="user">
                  <FontAwesomeIcon icon={faUser} bounce />
                  Tên đăng nhập
                </Form.Label>
              </Form.Group>
              <Form.Group className={cx('mb-4', 'form-gr')}>
                <Form.Control
                  required
                  type="password"
                  id="password"
                  value={passInput}
                  onChange={(e) => handleChange(e, 'pass')}
                />
                <Form.Label className={cx('title-input')} htmlFor="password">
                  <FontAwesomeIcon icon={faLock} bounce />
                  Mật khẩu
                </Form.Label>
              </Form.Group>
              <Form.Group className={cx('mb-4', 'form-gr')}>
                <Form.Control
                  required
                  type="password"
                  id="password-confirm"
                  value={confPass}
                  onChange={(e) => handleChange(e, 'confPass')}
                />
                <Form.Label className={cx('title-input')} htmlFor="password-confirm">
                  <FontAwesomeIcon icon={faLock} bounce />
                  Nhập lại mật khẩu
                </Form.Label>
              </Form.Group>
              <Form.Group className={cx('remember-forgot')}>
                <Form.Label>
                  <input
                    className={cx('check')}
                    type="checkbox"
                    checked={isCheckBox}
                    onChange={(e) => handleChange(e, 'checkbox')}
                  />
                  <span>Tôi đồng ý với điều khoản dịch vụ</span>
                </Form.Label>
              </Form.Group>
              <span className={cx('err')}>{errInput}</span>
              <div>
                <Button ref={btnSubmitRef} className={cx('submit')} onClick={handelSubmit}>
                  Đăng ký
                </Button>
              </div>
              <div className={cx('register-link')}>
                <p> Bạn đã có tài khoản trước đó?</p>
                <Link to="/login"> Đăng nhập ngay</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormRegister;
