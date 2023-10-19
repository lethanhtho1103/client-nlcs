import classNames from 'classnames/bind';
import style from './HomeUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import HomeUserSLide from '~/components/HomeUserSLide';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import FilmPlaying from '~/components/FilmPlaying';
import FilmUpcoming from '~/components/FilmUpcoming';

const cx = classNames.bind(style);

function HomeUser() {
  return (
    <div className={cx('wrap')}>
      <Header />
      <Container className={cx('main')}>
        <Row className={cx('landing')}>
          <Col md={6} className={cx('landing-item')}>
            <div className={cx('landing-content')}>
              <h1 className={cx('landing-header')}>Đặt mua vé xim phim NTFMovie</h1>
              <ul className={cx('services')}>
                <li className={cx('service-description')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle opacity="0.1" cx="12" cy="12" r="12" fill="#A50064"></circle>
                    <path
                      d="M17.3332 8L9.99984 15.3333L6.6665 12"
                      stroke="#A50064"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Mua vé online,&nbsp;</span>
                  <strong> trải nghiệm phim hay</strong>
                </li>
                <li className={cx('service-description')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle opacity="0.1" cx="12" cy="12" r="12" fill="#A50064"></circle>
                    <path
                      d="M17.3332 8L9.99984 15.3333L6.6665 12"
                      stroke="#A50064"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <strong>Đặt vé an toàn</strong>&nbsp;trên NTFMovie
                </li>
                <li className={cx('service-description')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle opacity="0.1" cx="12" cy="12" r="12" fill="#A50064"></circle>
                    <path
                      d="M17.3332 8L9.99984 15.3333L6.6665 12"
                      stroke="#A50064"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  Tha hồ&nbsp;<strong>chọn chỗ ngồi, mua bắp nước</strong>&nbsp;tiện lợi
                </li>
                <li className={cx('service-description')}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle opacity="0.1" cx="12" cy="12" r="12" fill="#A50064"></circle>
                    <path
                      d="M17.3332 8L9.99984 15.3333L6.6665 12"
                      stroke="#A50064"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <strong>Lịch sử đặt vé&nbsp;</strong>được lưu lại ngay
                </li>
              </ul>
              <a href="#filmPlaying" id="phim-chieu" className={cx('btn')}>
                ĐẶT VÉ NGAY
              </a>
            </div>
          </Col>
          <Col md={6} className={cx('landing-item')}>
            <img
              alt="NTFMovie"
              src="https://homepage.momocdn.net/blogscontents/momo-upload-api-230324144446-638152658866967300.jpg"
            />
          </Col>
        </Row>
        <FilmPlaying />
        <FilmUpcoming />
        <Row className={cx('moviesTop')}>
          <Col className={cx('playing-movie')}>
            <h1 className={cx('heading-movie')}>Top phim hay trên NTFMovie</h1>
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
            <a href="/top-phim" className={cx('btn-more')}>
              Xem nhiều hơn !
            </a>
          </Col>
        </Row>
        <Row className={cx('block')}>
          <h1 className={cx('title')}>Đặt mua vé xem phim trên NTFMovie</h1>
          <div className={cx('descriptions')}>
            <div className={cx('description-item')}>
              Việc đặt vé xem phim chưa bao giờ đơn giản và dễ dàng như thế, chỉ với vài thao tác trên website bạn đã có
              thể đặt vé xem bộ phim mình yêu thích mà không phải xếp hàng tại rạp. NTFMovie có tất cả các bộ bộ phim
              lớn trên cả nước và thế giới, bộ phim nào bạn thích NTFMovie cũng có. Giá vé xem phim luôn ở mức giá cực
              kì tốt là một “đặc sản” với những ưu đãi độc quyền mà chỉ có ở NTFMovie.
            </div>
            <div className={cx('description-item')}>
              Nay buổi xem phim chiếu rạp của bạn sẽ càng tuyệt vời hơn với tính năng mua bắp nước trước khi đến rạp,
              bạn sẽ đa dạng hoá các món bắp hay thức uống mà bạn yêu thích, tạo bất ngờ cho bạn đồng hành bằng những
              combo cực chất lượng đến từ các rạp chiếu phim.
            </div>
            <div className={cx('description-item')}>
              Trong thời gian sắp tới, bên cạnh tính năng hiện đang có, NTFMovie cũng đang phát triển thêm những tính
              năng mới để cộng đồng yêu phim ảnh có thể có những cái nhìn thực tế về nội dung cũng như chất lượng phim
              trên thị trường. Những đánh giá bình luận tích cực từ phía người xem hay những trang cá nhân dành riêng
              cho những bộ phim bom tấn sẽ là nơi uy tín để cập nhật tin tức, thị hiếu về làng phim trong nước cũng như
              thế giới.
            </div>
            <h2 className={cx('title-useful')}>Lợi ích đặt vé xem phim online:</h2>
            <ul className={cx('list-usefuls')}>
              <li className={cx('useful-item')}>Hưởng các giá vé xem phim ưu đãi độc quyền từ NTFMovie.</li>
              <li className={cx('useful-item')}>
                Có cộng đồng đánh giá, nhận xét phim uy tín luôn phản ánh đúng chất lượng của phim.
              </li>
              <li className={cx('useful-item')}>
                Không giới hạn số lượng vé mua, được tích điểm thành viên của NTFMovie.
              </li>
              <li className={cx('useful-item')}>Nhanh chóng và tiện lợi, không cần xếp hàng hay vé giấy.</li>
              <li className={cx('useful-item')}>
                Cập nhật nhanh chóng các phim đang chiếu trên thị trường để đa dạng hoá lựa chọn phim.
              </li>
            </ul>
          </div>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default HomeUser;
