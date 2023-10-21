import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faSignature } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '~/redux/selector';
import { userSlice } from '~/redux/reducer';
import classNames from 'classnames/bind';
import styles from './HeaderManager.module.scss';

const cx = classNames.bind(styles);

function HeaderManager({ links }) {
  const dispatch = useDispatch();
  const ref = useRef();
  const userActions = userSlice.actions;
  const userData = useSelector(userSelector);

  const handleCLickLogOut = () => {
    dispatch(userActions.toggleUserLogin());
  };

  useEffect(() => {
    const handleScrollTop = (e) => {
      const scrollTop = window.scrollY;
      if (scrollTop > 60) {
        ref.current.classList.add(cx('re-active'));
      } else {
        ref.current.classList.remove(cx('re-active'));
      }
    };
    window.addEventListener('scroll', handleScrollTop);
    return () => {};
  }, []);

  return (
    <div ref={ref} className={cx('wrap', '')}>
      <div className={cx('wrapper')}>
        <Row className="h-100 align-items-center  px-3">
          <Col md={3}>
            <Link to="/" className={cx('logo')}>
              <span>
                <FontAwesomeIcon icon={faSignature} bounce />
                NTF
              </span>
              Movies
            </Link>
          </Col>
          <Col md={6}>
            <ul className="nav justify-content-end nav-pills justify-content-end">
              {links &&
                links.map((link, i) => (
                  <li key={i + 'linksHeader'} className="nav-item mx-2">
                    <Link className={cx('nav-link', 'nav-item-link')} style={{ fontSize: 14 }} to={link.to}>
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </Col>

          <Col md={3}>
            <h2 className={cx('text-content')}>
              <span>
                Hi <b>{userData.id} !</b>
              </span>
              <Link to="/login" title="Sign out?" onClick={handleCLickLogOut}>
                <FontAwesomeIcon className={cx('icon-out')} icon={faArrowRightFromBracket} />
              </Link>
            </h2>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HeaderManager;
