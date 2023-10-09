import classNames from 'classnames/bind';
import style from './Detail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { faChevronRight, faHouse, faStar } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import Moment from 'react-moment';
import { DetailContext } from '~/Context/DetailContext';
import ToastMassage from '../ToastMassage';
import Calendar from '../Calendar';
import Review from '../Review';

const cx = classNames.bind(style);

function Detail() {
  // const [totalTicket, setTotalTicket] = useState([]);
  const [isShowReview, setIsShowReview] = useState(false);
  const [isShowContent, setIsShowContent] = useState(false);
  const [obToast, setObToast] = useState({
    isShow: false,
    header: '',
    content: '',
  });

  const { filmInfo, countComment, avgRate } = useContext(DetailContext);

  // var remainingTicket = 0;

  const handleShowReview = () => {
    setIsShowReview(true);
  };

  const handelClickX = () => {
    setIsShowReview(false);
  };

  const toggleShowToast = () => {
    setObToast((ob) => {
      return {
        isShow: !ob.isShow,
        header: '',
        content: '',
      };
    });
  };

  const handelShowContent = () => {
    setIsShowContent(true);
  };

  const handelHiddenContent = () => {
    setIsShowContent(false);
  };

  return (
    <div className={cx('wrap')}>
      <Header />
      <ToastMassage
        handelClose={toggleShowToast}
        isShow={obToast.isShow}
        header={obToast.header}
        content={obToast.content}
      />

      <Container className={cx('main')}>
        <div className={cx('breadcrumb')}>
          <div className={cx('details-path')}>
            <ul className={cx('list-path')}>
              <li className={cx('path-item')}>
                <a href="/">
                  <FontAwesomeIcon className={cx('homeIcon')} icon={faHouse} />
                </a>
              </li>
              <li className={cx('path-item')}>
                <FontAwesomeIcon className={cx('iconRight')} icon={faChevronRight} />
                <a href="/details">Details</a>
              </li>
              <li className={cx('path-item')}>
                <FontAwesomeIcon className={cx('iconRight')} icon={faChevronRight} />
                <a href={`/details/${filmInfo.id}#phim-chieu`}>Phim chiếu</a>
              </li>
              <li className={cx('path-item')}>
                <FontAwesomeIcon className={cx('iconRight')} icon={faChevronRight} />
                <span>{filmInfo.name}</span>
              </li>
            </ul>
          </div>
        </div>
        <Row style={{ background: `url(${filmInfo.backgroundImage})` }} className={cx('detail-movie')}>
          <div className={cx('contain')}>
            <Col className={cx('detail-img')}>
              <div
                style={{
                  background: `url(${filmInfo.image})`,
                }}
                className={cx('img')}
              ></div>
              <div
                className={cx('pauseIcon', {
                  show: isShowContent === true,
                })}
                onClick={handleShowReview}
              >
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <circle stroke="#FFF" strokeWidth="2" fillOpacity=".24" fill="#000" cx="24" cy="24" r="23"></circle>
                    <path
                      d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                      fill="#FFF"
                      fillRule="nonzero"
                    ></path>
                  </g>
                </svg>
              </div>
            </Col>
            <Col className={cx('info')}>
              <div className={cx(`info-old${filmInfo.ageAllowed}`)}>{filmInfo.ageAllowed}+</div>
              <h1 className={cx('info-title')}>{filmInfo.name}</h1>
              <ul className={cx('list-title')}>
                <li className={cx('title-item')}>NTFMovie</li>
                <li className={cx('title-item', 'item-center')}>.</li>
                <li className={cx('title-item')}>2023</li>
                <li className={cx('title-item', 'item-center')}>.</li>
                <li className={cx('title-item')}>{filmInfo.totalTime} phút</li>
              </ul>
              {countComment !== 0 ? (
                <div className={cx('info-evaluate')}>
                  <FontAwesomeIcon className={cx('starIcon')} icon={faStar} />
                  <div className={cx('numberStar')}>{avgRate}</div>
                  <div className={cx('numberEvaluate')}>
                    <div>{countComment}</div>
                    <span>đánh giá</span>
                  </div>
                </div>
              ) : (
                <div className={cx('info-evaluate')}>
                  <FontAwesomeIcon className={cx('starIcon')} icon={faStar} />
                  <span>Hiện tại chưa có đánh giá nào.</span>
                </div>
              )}
              <p>{filmInfo.title}</p>
              <h3>Nội dung</h3>
              <div className={cx('content')}>
                <div
                  className={cx({
                    show: isShowContent === true,
                  })}
                >
                  {filmInfo.content}
                </div>
                <span
                  className={cx({
                    hidden: isShowContent === true,
                  })}
                  onClick={handelShowContent}
                >
                  Xem thêm
                </span>
                <span
                  className={cx({
                    show: isShowContent === true,
                  })}
                  onClick={handelHiddenContent}
                >
                  Thu gọn
                </span>
              </div>

              <div className={cx('type-date-origin')}>
                <div className={cx('item')}>
                  <div className={cx('item-title')}>Khởi chiếu</div>
                  <div className={cx('item-content')}>
                    <Moment local="vi" format="DD/MM/YYYY" date={filmInfo.startDate} />
                  </div>
                </div>
                <div className={cx('item')}>
                  <div className={cx('item-title')}>Thể loại</div>
                  <div className={cx('item-content')}>{filmInfo.type}</div>
                </div>
                <div className={cx('item')}>
                  <div className={cx('item-title')}>Quốc gia</div>
                  <div className={cx('item-content')}>{filmInfo.origin}</div>
                </div>

                {/* <div className={cx('item')}>
                        <div className={cx('item-title')}>Số vé còn lại</div>
                        <div className={cx('item-content')}>
                          {totalTicket.map((ticket) => {
                            remainingTicket = filmInfo.filmShowTime.roomShowTime.maxUser - ticket.totalTicket;
                            return remainingTicket;
                          })}
                        </div>
                      </div> */}
              </div>
            </Col>
          </div>
          {isShowReview && <Review toggleShow={handelClickX} filmInfo={filmInfo} />}
        </Row>

        {filmInfo.id < 'zc3ce148f0f10' ? (
          <Calendar avgRate={avgRate} countComment={countComment} filmInfo={filmInfo} />
        ) : (
          <></>
        )}
        <Row className={cx('moviesTop')}>
          <Col className={cx('playing-movie')}>
            <h1 className={cx('heading-movie')}>Danh sách top phim nổi bật</h1>
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
            {/* <Button className={cx('btn-more')}>Xem nhiều hơn!</Button> */}
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
              Chính vì vậy, với đông đảo người dùng sử dụng NTFMovie để đặt vé xem phim, đánh giá phim thì NTFBook xin
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

export default Detail;
