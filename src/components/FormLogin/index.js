import { useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSignature, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './FormLogin.module.scss';
import classNames from 'classnames/bind';

import { userSlice } from '~/redux/reducer';
import { userService } from '~/services';
import Loader from '../Loader';

const cx = classNames.bind(styles);

function FormLogin() {
  const btnSubmitRef = useRef();
  const userInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState(false);
  const [isCheckBox, setIsCheckBox] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [errInput, setErrInput] = useState('');
  const [isLoader, setIsloader] = useState(false);

  const handleChange = (e, type) => {
    if (type === 'user') {
      setUserInput(e.target.value);
    } else if (type === 'pass') {
      setPassInput(e.target.value);
    } else if (type === 'checkbox') {
      setIsCheckBox((isCheckBox) => !isCheckBox);
    }
  };

  const handleClickSubmit = async () => {
    setIsloader(true);
    var idLoader = await setTimeout(async () => {
      const res = await userService.login(userInput, passInput);
      setErrInput(res.errMessage);
      setIsloader(false);
      clearTimeout(idLoader);
      if (res.errCode === 0) {
        saveUserLogin(res.userData);
      } else {
        setUserInput('');
        setPassInput('');
        userInputRef.current.focus();
      }
    }, 500);
  };

  const saveUserLogin = (data) => {
    dispatch(userSlice.actions.saveUserLogin(data));
    dispatch(userSlice.actions.toggleUserLogin(true));
    setIsLogined(true);
  };

  const handleNavigate = useCallback(() => {
    if (isLogined) {
      navigate('/');
    }
  }, [isLogined, navigate]);

  const handleKeyDownSubmit = () => {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) btnSubmitRef?.current.click();
    });
  };

  useEffect(() => {
    handleNavigate();
    handleKeyDownSubmit();
  }, [handleNavigate, isLogined]);

  return (
    <>
      {isLoader && <Loader />}
      <div className={cx('header')}>
        <div>
          <Link to="/" className={cx('logo')}>
            <span>
              <FontAwesomeIcon icon={faSignature} bounce />
              NTF
            </span>
            Movie
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
        <div sm={4}>
          <div className={cx('content')}>
            <h2> Welcome!!!</h2>
            <p>
              Những tựa phim Việt Nam và quốc tế đình đám, hấp dẫn, hài hước, kịnh tính, kinh dị, lôi cuống,... Tất cả
              đều có trên NTFMovie với giá chỉ từ 60.000 VND. Bạn đã có tài khoản chưa? Nhấn ngay nút "Bắt đầu" để tạo
              hoặc kích hoạt lại tư cách thành viên của bạn.
            </p>
            <Button
              className={cx('btn-start')}
              onClick={() => {
                userInputRef.current.focus();
              }}
            >
              Bắt đầu
            </Button>
          </div>
        </div>
        <div>
          <div className={cx('login')}>
            <h2> Đăng nhập </h2>
            <Form>
              <Form.Group className={cx('mb-4', 'form-gr')}>
                <Form.Control
                  value={userInput}
                  ref={userInputRef}
                  onChange={(e) => handleChange(e, 'user')}
                  required
                  id="user"
                  autoComplete="off"
                />
                <Form.Label className={cx('title-input')} htmlFor="user">
                  <FontAwesomeIcon icon={faUser} bounce />
                  Tên đăng nhập
                </Form.Label>
              </Form.Group>

              <Form.Group className={cx('mb-4', 'form-gr')}>
                <Form.Control
                  required
                  value={passInput}
                  onChange={(e) => handleChange(e, 'pass')}
                  type="password"
                  id="password"
                />
                <Form.Label className={cx('title-input')} htmlFor="password">
                  <FontAwesomeIcon icon={faLock} bounce />
                  Mật khẩu
                </Form.Label>
              </Form.Group>
              <Form.Group className={cx('remember-forgot')}>
                <Form.Label>
                  <input
                    className={cx('check')}
                    checked={isCheckBox}
                    onChange={(e) => handleChange(e, 'checkbox')}
                    type="checkbox"
                  />
                  Ghi nhớ tôi
                </Form.Label>
                <Link to="/"> Quên mật khẩu? </Link>
              </Form.Group>
              <span className={cx('err')}>{errInput}</span>
              <div>
                <Button className={cx('submit')} onClick={handleClickSubmit} ref={btnSubmitRef}>
                  Đăng nhập
                </Button>
              </div>
              <div className={cx('register-link')}>
                <p> Bạn mới tham gia NTFMovie?</p>
                <Link to="/register"> Đăng ký ngay</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormLogin;
