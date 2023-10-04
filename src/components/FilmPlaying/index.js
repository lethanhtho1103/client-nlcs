import classNames from 'classnames/bind';
import style from './FilmPlaying.module.scss';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import { filmService } from '~/services';
import { Link } from 'react-router-dom';

// import Moment from 'react-moment';
const cx = classNames.bind(style);

function FilmPlaying() {
  const [films, setFilms] = useState([]);
  // const [limit, setLimit] = useState(0);
  const [offset, setOffset] = useState(0);

  const handleSetOffsetRight = () => {
    setOffset(5);
  };

  const handleSetOffsetLeft = () => {
    setOffset(0);
  };

  const getFilms = useCallback(async () => {
    const res = await filmService.getAllFilm(5, offset);
    if (res.errCode === 0) {
      setFilms(res.data);
    }
  }, [offset]);

  useEffect(() => {
    getFilms();
  }, [getFilms]);

  return (
    <Row className={cx('moviesPlaying')}>
      <Col sm={12} className={cx('playing-movie')}>
        <h1 className={cx('heading-movie')}>Phim đang chiếu</h1>
        <Row className={cx('list-movie')}>
          <div
            onClick={handleSetOffsetLeft}
            className={cx('btn', {
              left: true,
              hidden: offset === 0,
            })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </div>
          {films.map((film, index) => {
            return (
              <Col key={film.id} className={cx('movie-item')}>
                <Link to={`http://localhost:3000/details/${film.id}`} className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item')}>
                    <div
                      style={{
                        backgroundImage: `url(${film.image})`,
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
                      <div className={cx('home-product-item__number')}>{index + 1}</div>
                    </div>
                    <h4 className={cx('home-product-item__name')}>{film.name}</h4>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old')}>{film.type}</span>
                    </div>
                    <div className={cx('home-product-item__action')}>
                      <div className={cx('home-product-item__rating')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-gold')} icon={faStar} />
                      </div>

                      {/* <Moment local="vi" format="DD/MM/YYYY" date={film.evaluate} /> */}
                      <div className={cx('home-product-item__sold')}>{film.evaluate}</div>
                    </div>

                    <div className={cx('home-product-item__favourite')}>
                      <span className={cx(`age${film.ageAllowed}`)}>{film.ageAllowed}+</span>
                    </div>
                    <div className={cx(`home-product-item__sale-off${film.ageAllowed}`)}>
                      <span className={cx(`home-product-item__sale-off-label${film.ageAllowed}`)}>ĐẶT TRƯỚC</span>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
          <div
            onClick={handleSetOffsetRight}
            className={cx('btn', {
              right: true,
              hidden: offset !== 0,
            })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </Row>
      </Col>
    </Row>
  );
}

export default FilmPlaying;
