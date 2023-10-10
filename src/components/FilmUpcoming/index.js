import classNames from 'classnames/bind';
import style from './FilmUpcoming.module.scss';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import { filmService } from '~/services';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

function FilmUpcoming() {
  const [films, setFilms] = useState([]);
  const getFilms = useCallback(async () => {
    const res = await filmService.getAllFilmUpComing();
    if (res.errCode === 0) {
      setFilms(res.data);
    }
  }, []);

  useEffect(() => {
    getFilms();
  }, [getFilms]);

  return (
    <Row className={cx('moviesUpcoming')}>
      <Col sm={12} className={cx('playing-movie')}>
        <h1 className={cx('heading-movie')}>Phim sắp chiếu</h1>
        <Row className={cx('list-movie')}>
          {films.map((film, index) => {
            return (
              <Col key={index} className={cx('movie-item')}>
                <Link to={`http://localhost:3000/details/${film.id}`} className={cx('home-product-item-link')}>
                  <div className={cx('home-product-item-up')}>
                    <div
                      style={{
                        backgroundImage: `url(${film.image})`,
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
                    <h4 className={cx('home-product-item__name-black')}>{film.name}</h4>
                    <div className={cx('home-product-item__price')}>
                      <span className={cx('home-product-item__price-old')}>{film.type}</span>
                    </div>
                    <div className={cx('home-product-item__action')}>
                      <div className={cx('home-product-item__rating')}>
                        <FontAwesomeIcon className={cx('home-product-item__rating-gold')} icon={faStar} />
                      </div>
                      <div className={cx('home-product-item__sold-black')}>
                        {film.evaluate > 0 ? film.evaluate : 'Chưa đánh giá'}
                      </div>
                    </div>

                    <div className={cx('home-product-item__favourite')}>
                      <span className={cx(`age${film.ageAllowed}`)}>{film.ageAllowed}+</span>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
        <a href="#phim-chieu" className={cx('btn-search-movie')}>
          Tìm phim chiếu rạp
        </a>
      </Col>
    </Row>
  );
}

export default FilmUpcoming;
