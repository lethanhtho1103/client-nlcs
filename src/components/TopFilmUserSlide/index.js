import { Col, Container, Row } from 'react-bootstrap';
import Header from '../Header';
import classNames from 'classnames/bind';
import style from './TopFilm.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faStar } from '@fortawesome/free-regular-svg-icons';
import Footer from '../Footer';
import { useEffect, useState } from 'react';
import { filmService } from '~/services';
const cx = classNames.bind(style);

function TopFilmUserSlide() {
  const [filmsPlaying, setFilmsPlaying] = useState([]);
  const getFilmsPlaying = async () => {
    const res = await filmService.getAllFilm(10);
    if (res.errCode === 0) {
      setFilmsPlaying(res.data);
    }
  };

  useEffect(() => {
    getFilmsPlaying();
  }, []);

  return (
    <div className={cx('wrap')}>
      <Header active={'active'} />
      <Container className={cx('main')}>
        <Row className={cx('moviesTop')}>
          <Col className={cx('playing-movie')}>
            <h1 className={cx('heading-movie')}>
              Top phim hay trên <span>NTFMovie</span>
            </h1>
            <h3>
              Danh sách phim hay được ưa chuộng trên MoMo được cập nhật liên tục với đa dạng các thể loại, quốc gia.
            </h3>
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
          </Col>
        </Row>
        <Row className={cx('contain')}>
          <Col md={8} className={cx('top-film')}>
            <div className={cx('list-top-film')}>
              <div className={cx('top-film-item')}>
                <div className={cx('list-image')}>
                  <div className={cx('image1')}>
                    <img
                      alt=""
                      src="https://cinema.momocdn.net/img/8551141392882546-pHYq6KZ78JkUcGB7sCbetN6gtSK.jpg"
                    ></img>
                  </div>
                  <div className={cx('image2')}>
                    <img
                      className={cx('img1')}
                      alt=""
                      src="https://cinema.momocdn.net/img/6101132112518870-1302522.jpg"
                    ></img>
                  </div>
                  <div className={cx('image3')}>
                    <img
                      alt=""
                      src="https://cinema.momocdn.net/img/20112293302825158-qVuibhJnyRrRCcr8e3bhmBpi0Z1.jpg"
                    ></img>
                  </div>
                  <div className={cx('image4')}>
                    <img
                      alt=""
                      src="https://cinema.momocdn.net/img/12744073754606903-3o3GE709vaU2O1A3g62ZAewQiVP.jpg"
                    ></img>
                  </div>
                  <div className={cx('image5')}>
                    <img
                      alt=""
                      src="	https://cinema.momocdn.net/img/12744539559079075-2wDBg6JcjhoWyw3LCy2k4XMHOBV.jpg"
                    ></img>
                  </div>
                </div>
              </div>
              <div className={cx('content')}>
                <a href="/" className={cx('title')}>
                  Danh sách phim hành động 2023 được khán giả đánh giá cao
                </a>
                <p>
                  Cùng NTFMovie đón xem danh sách phim hành động 2023 mãn nhãn và được khán giả đánh giá cao nhất trong
                  thời gian gần đây.
                </p>
                <div className={cx('view')}>
                  <span>15/10/2023</span>
                  <div>
                    <span>.</span>
                  </div>
                  <FontAwesomeIcon icon={faEye} />
                  <div>425 lượt xem</div>
                </div>
              </div>
            </div>
            <div className={cx('list-top-film')}>
              <div className={cx('top-film-item')}>
                <div className={cx('list-image')}>
                  <div className={cx('image1')}>
                    <img
                      alt=""
                      src="https://cinema.momocdn.net/img/19823532580186290-3gsRQEqvMzkUdirHrZ10MdqamCR.jpg"
                    ></img>
                  </div>
                  <div className={cx('image2')}>
                    <img
                      className={cx('img1')}
                      alt=""
                      src="https://cinema.momocdn.net/img/9031046777181035-p6dtCtsVWCVzfpAliA9x7jmk1V4.jpg"
                    ></img>
                  </div>
                  <div className={cx('image3')}>
                    <img
                      alt=""
                      src="https://cinema.momocdn.net/img/14294563933601826-fkXxIK3PoyXu95VbZ5Blzlnxi5O.jpg"
                    ></img>
                  </div>
                  <div className={cx('image4')}>
                    <img alt="" src="https://cinema.momocdn.net/img/12742892972932812-thum.jpg"></img>
                  </div>
                  <div className={cx('image5')}>
                    <img
                      alt=""
                      src="https://cinema.momocdn.net/img/12743744242186248-e2PgZ620g2cxJs3k1AwM7w2teV5.jpg"
                    ></img>
                  </div>
                </div>
              </div>
              <div className={cx('content')}>
                <a href="/" className={cx('title')}>
                  Danh sách phim Trinh thám 2023 đáng mong đợi
                </a>
                <p>
                  NTFMovie xin phép giới thiệu đến các bạn danh sách những bộ phim trinh thám 2023 đáng mong đợi. Với
                  những câu chuyện ly kỳ, bí ẩn và những nhân vật tài ba, các bộ phim này hứa hẹn sẽ mang đến cho khán
                  giả những giờ phút giải trí tuyệt vời và kịch tính đến tận cùng.
                </p>
                <div className={cx('view')}>
                  <span>15/10/2023</span>
                  <div>
                    <span>.</span>
                  </div>
                  <FontAwesomeIcon icon={faEye} />
                  <div>666 lượt xem</div>
                </div>
              </div>
            </div>
            <div className={cx('list-top-film')}>
              <div className={cx('top-film-item')}>
                <div className={cx('list-image')}>
                  <div className={cx('image1')}>
                    <img
                      alt=""
                      src="https://homepage.momocdn.net/cinema/momo-upload-api-230815151332-638277092129311549.jpeg"
                    ></img>
                  </div>
                  <div className={cx('image2')}>
                    <img
                      className={cx('img2')}
                      alt=""
                      src="https://homepage.momocdn.net/cinema/momo-upload-api-230814150412-638276222520234366.jpeg"
                    ></img>
                  </div>
                  <div className={cx('image3')}>
                    <img
                      alt=""
                      src="https://homepage.momocdn.net/cinema/momo-upload-api-230814144020-638276208209486358.jpeg"
                    ></img>
                  </div>
                  <div className={cx('image4')}>
                    <img
                      alt=""
                      src="https://homepage.momocdn.net/cinema/momo-upload-api-230809103427-638271740672441193.jpeg"
                    ></img>
                  </div>
                  <div className={cx('image5')}>
                    <img
                      alt=""
                      src="https://homepage.momocdn.net/cinema/momo-upload-api-230816100615-638277771759186136.jpeg
"
                    ></img>
                  </div>
                </div>
              </div>
              <div className={cx('content')}>
                <a href="/" className={cx('title')}>
                  Top phim bộ Hàn Quốc cực hay 2023
                </a>
                <p>Cùng MoMo cập nhật danh sách phim truyền hình Hàn 2023 cực hay và đáng mong đợi nhất.</p>
                <div className={cx('view')}>
                  <span>15/10/2023</span>
                  <div>
                    <span>.</span>
                  </div>
                  <FontAwesomeIcon icon={faEye} />
                  <div>112 lượt xem</div>
                </div>
              </div>
            </div>
            <div className={cx('list-top-film')}>
              <div className={cx('top-film-item')}>
                <div className={cx('list-image')}>
                  <div className={cx('image1')}>
                    <img alt="" src="	https://cinema.momocdn.net/img/12742892972932812-thum.jpg"></img>
                  </div>
                  <div className={cx('image2')}>
                    <img
                      className={cx('img1')}
                      alt=""
                      src="	https://cinema.momocdn.net/img/479417b7-cc6c-483a-8a37-ab3a7a6a758b-67606546214754942.jpg"
                    ></img>
                  </div>
                  <div className={cx('image3')}>
                    <img
                      alt=""
                      src="	https://homepage.momocdn.net/cinema/momo-upload-api-230726092811-638259604919625155.jpg"
                    ></img>
                  </div>
                  <div className={cx('image4')}>
                    <img
                      alt=""
                      src="https://homepage.momocdn.net/cinema/momo-upload-api-230525155120-638206266806446300.jpg"
                    ></img>
                  </div>
                  <div className={cx('image5')}>
                    <img alt="" src="https://cinema.momocdn.net/img/6704881794142482-poster.jpg"></img>
                  </div>
                </div>
              </div>
              <div className={cx('content')}>
                <a href="/" className={cx('title')}>
                  Top phim điện ảnh Hàn Quốc 2023 đáng chờ đón
                </a>
                <p>
                  Top phim điện ảnh Hàn Quốc 2023 không chỉ mang lại cho khán giả những câu chuyện đầy cảm xúc và tình
                  huống hấp dẫn mà còn thể hiện sự đa dạng trong thể loại và chất lượng sản xuất.
                </p>
                <div className={cx('view')}>
                  <span>15/10/2023</span>
                  <div>
                    <span>.</span>
                  </div>
                  <FontAwesomeIcon icon={faEye} />
                  <div>1.2K lượt xem</div>
                </div>
              </div>
            </div>
            <div className={cx('list-top-film')}>
              <div className={cx('top-film-item')}>
                <div className={cx('list-image')}>
                  <div className={cx('image1')}>
                    <img
                      alt=""
                      src="https://cinema.momocdn.net/img/9052993364936878-5b2bhwRq08ZYFlH5dwmoKSweQ9n.jpg"
                    ></img>
                  </div>
                  <div className={cx('image2')}>
                    <img
                      className={cx('img1')}
                      alt=""
                      src="https://cinema.momocdn.net/img/7384372112236542-usWWy8zq2XKGnBVsVbSW0bLPIti.jpg"
                    ></img>
                  </div>
                  <div className={cx('image3')}>
                    <img alt="" src="https://cinema.momocdn.net/img/8550563954419752-700x1000-tid-noi.jpg"></img>
                  </div>
                  <div className={cx('image4')}>
                    <img
                      alt=""
                      src="https://cinema.momocdn.net/img/10863494415666785-n%C6%A1i-ta-g%E1%BA%B7p-nhau.jpg"
                    ></img>
                  </div>
                  <div className={cx('image5')}>
                    <img
                      alt=""
                      src="	https://cinema.momocdn.net/img/5855239557355108-bVwBbN9xEU3Emr68tN5yqtw8EKF.jpg"
                    ></img>
                  </div>
                </div>
              </div>
              <div className={cx('content')}>
                <a href="/" className={cx('title')}>
                  Top phim hài 2023 khiến bạn không thể nhịn cười
                </a>
                <p>
                  Năm 2023 đã là một năm đặc biệt với hàng loạt bộ phim hài đầy hài hước và sáng tạo, mang lại cho khán
                  giả những khoảnh khắc thú vị và giải trí đáng nhớ.
                </p>
                <div className={cx('view')}>
                  <span>15/10/2023</span>
                  <div>
                    <span>.</span>
                  </div>
                  <FontAwesomeIcon icon={faEye} />
                  <div>1.8K lượt xem</div>
                </div>
              </div>
            </div>
            <div className={cx('list-top-film')}>
              <div className={cx('top-film-item')}>
                <div className={cx('list-image')}>
                  <div className={cx('image1')}>
                    <img
                      alt=""
                      src="https://cinema.momocdn.net/img/12742458114511069-1JOWR6ogL1wZtLuqGMTNpSAhbM8.jpg"
                    ></img>
                  </div>
                  <div className={cx('image2')}>
                    <img
                      alt=""
                      src="https://cinema.momocdn.net/img/12743358661566026-qAYIZWKhxCzgoX4YFSs0VgNHrRs.jpg"
                    ></img>
                  </div>
                  <div className={cx('image3')}>
                    <img
                      alt=""
                      src="https://cinema.momocdn.net/img/12761761282115566-smuWsT9G7f2YRHhVgzfRdxmPHT7.jpg"
                    ></img>
                  </div>
                  <div className={cx('image4')}>
                    <img
                      alt=""
                      src="https://cinema.momocdn.net/img/12753097245288952-rZGFcl01VIdfMpLOIuiO6IFdq1U.jpg"
                    ></img>
                  </div>
                  <div className={cx('image5')}>
                    <img
                      alt=""
                      src="https://homepage.momocdn.net/cinema/momo-upload-api-230707151938-638243399787064015.jpeg"
                    ></img>
                  </div>
                </div>
              </div>
              <div className={cx('content')}>
                <a href="/" className={cx('title')}>
                  Top phim hoạt hình 2023 xuất sắc nhất từ đầu năm đến nay (P1)
                </a>
                <p>NTFMovie gửi bạn danh sách Top phim Hoạt Hình hấp dẫn từ đầu năm 2023 đến nay.</p>
                <div className={cx('view')}>
                  <span>15/10/2023</span>
                  <div>
                    <span>.</span>
                  </div>
                  <FontAwesomeIcon icon={faEye} />
                  <div>2.4K lượt xem</div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={4} className={cx('film-playing')}>
            <h3 id="phim-chieu">Phim đang chiếu</h3>
            <div className={cx('list-film-playing')}>
              {filmsPlaying.map((film, index) => {
                return (
                  <div key={index} className={cx('film-item')}>
                    <div className={cx('image-film')}>
                      <a href={`http://localhost:3000/details/${film.id}`}>
                        <img alt={film.name} src={film.image} />
                      </a>
                      <div className={cx('number')}>{index + 1}</div>
                    </div>
                    <div className={cx('detail-film')}>
                      <div
                        className={cx('age', {
                          age18: film.ageAllowed === 18,
                          age16: film.ageAllowed === 16,
                          age13: film.ageAllowed === 13,
                        })}
                      >
                        {film.ageAllowed}+
                      </div>
                      <a href={`/details/${film.id}`}>
                        <div className={cx('name')}>{film.name}</div>
                      </a>
                      <div className={cx('type')}>{film.type}</div>
                      <div className={cx('evaluate')}>
                        <span>
                          <FontAwesomeIcon icon={faStar} />
                        </span>
                        <div>{filmsPlaying.avgRate > 0 ? filmsPlaying.avgRate : 'Chưa có đánh giá nào'}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
        <Row className={cx('block')}>
          <h1 className={cx('title')}>Khám phá Top Phim Hay - Trải nghiệm không thể bỏ qua!</h1>
          <div className={cx('descriptions')}>
            <div className={cx('description-item')}>
              "Top phim hay" là một thuật ngữ để chỉ đến danh sách hoặc bảng xếp hạng các bộ phim được đánh giá cao về
              chất lượng, nghệ thuật, diễn xuất, kịch bản và/hoặc giải trí. Nó thường dựa trên sự đánh giá của khán giả,
              nhà phê bình hoặc các tổ chức điện ảnh uy tín.
            </div>
            <div className={cx('description-item')}>
              Tuy "Top phim hay" là một khái niệm tương đối và có thể thay đổi theo thời gian và từng nguồn đánh giá,
              nhưng một số danh sách phim nổi tiếng như "100 phim hay nhất mọi thời đại" của American Film Institute
              (AFI) hoặc "IMDb Top 250" (dựa trên đánh giá của cộng đồng người dùng trên IMDb) có thể được coi là ví dụ
              cho "top phim hay".
            </div>
            <div className={cx('description-item')}>
              Chính vì vậy, với đông đảo người dùng sử dụng NTFMovie để đặt vé xem phim, đánh giá phim thì NTFMovie xin
              phép được tổng hợp và liệt kê ra những danh sách phim hay được đánh giá tốt nhất với đầy đủ các thể loại,
              quốc gia cũng như chất lượng của mỗi bộ phim.
            </div>
          </div>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default TopFilmUserSlide;
