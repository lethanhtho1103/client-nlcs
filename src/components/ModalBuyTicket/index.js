import classNames from 'classnames/bind';
import style from './ModelBuyTicket.module.scss';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import Moment from 'react-moment';
import { useContext, useState } from 'react';
import ToastMassage from '../ToastMassage';
// import vnpay from '../../assets/images/vnpay.png';
import Paypal from '../PayPal';
import { DetailContext } from '~/Context/DetailContext';

const cx = classNames.bind(style);

function ModalBuyTicket({ byTicket, ticket, startTime, startDate, handelClickBack }) {
  const [isShowCopy, setIsShowCopy] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const { filmInfo, handleLongTime, handelClickX, numberWithCommas } = useContext(DetailContext);

  const handleMouseLeave = () => {
    setIsHidden(true);
  };

  const handelClickHidden = () => {
    if (isHidden) {
      handelClickX();
    }
  };

  const handleClickX = () => {
    handelClickX();
  };

  const handleBuyTicket = (e) => {
    byTicket(filmInfo.id);
    handelClickX();
    handelClickBack();
  };

  const handleReceive = () => {
    setIsShowCopy(true);
    setTimeout(() => {
      setIsShowCopy(false);
    }, 2000);
  };

  return (
    <div onClick={handelClickHidden} className={cx('wrap')}>
      {isShowCopy && <ToastMassage header={''} content={'Copy mã thành công'} />}
      <div onMouseLeave={handleMouseLeave} className={cx('ticket')}>
        <Button className={cx('exit')} onClick={handleClickX}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </Button>

        <div className={cx('info-ticket')}>
          <div className={cx('info-film')}>
            <ul className={cx('header-film')}>
              <li className={cx('age')}>
                <div>{filmInfo.ageAllowed}+</div>
              </li>
              <li className={cx('name')}>
                <b>{filmInfo.name}</b>
              </li>
            </ul>
            <ul className={cx('body-film')}>
              <li className={cx('body-film-item')}>
                <div>
                  <span>THỜI GIAN</span>
                  <div>
                    <b>
                      {startTime} ~ {handleLongTime(startTime, filmInfo.totalTime)}
                    </b>
                  </div>
                </div>
              </li>
              <li className={cx('body-film-item')}>
                <div>
                  <span>NGÀY CHIẾU</span>
                  <div>
                    <b>
                      <Moment local="vi" format="DD/MM/YYYY" date={startDate} />
                    </b>
                  </div>
                </div>
              </li>
              <li className={cx('body-film-item', 'address')}>
                <div>
                  <span>RẠP</span>
                  <div>
                    <b>NTFMoive</b>
                  </div>
                  <div className={cx('address')}>CTU, Khu II, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.</div>
                </div>
              </li>
              <li className={cx('body-film-item')}>
                <div>
                  <span>PHÒNG CHIẾU</span>
                  <div>
                    <b>0{filmInfo.filmShowTime.roomId}</b>
                  </div>
                </div>
              </li>
              <li className={cx('body-film-item')}>
                <div>
                  <span>ĐỊNH DẠNG</span>
                  <div>
                    <b>2D Phụ đề</b>
                  </div>
                </div>
              </li>
            </ul>
            <ul className={cx('seat')}>
              <li>
                <div>
                  <span>SỐ GHẾ</span>
                  <div>
                    <b>{ticket}</b>
                  </div>
                </div>
              </li>
              <li>
                <div></div>
                <div className={cx('price')}>
                  <b>{numberWithCommas(filmInfo.filmShowTime.roomShowTime.priceTicket * ticket)}&nbsp;VNĐ</b>
                </div>
              </li>
              <li>
                <div>
                  <span>BẮP - NƯỚC</span>
                  <div>
                    <b>1 x Beta Combo 69oz</b>
                  </div>
                </div>
              </li>
              <li>
                <div></div>
                <div className={cx('price')}>
                  <b>{numberWithCommas(90000)}&nbsp;VNĐ</b>
                </div>
              </li>
            </ul>
          </div>
          <ul>
            <li>
              <div>
                <div>
                  <b>Tạm tính</b>
                </div>
              </div>
              <div>
                <b className={cx('color-red')}>
                  {numberWithCommas(filmInfo.filmShowTime.roomShowTime.priceTicket * ticket)}&nbsp;VNĐ
                </b>
              </div>
            </li>
          </ul>
          <div className={cx('description')}>Ưu đãi (nếu có) sẽ được áp dụng ở bước thanh toán.</div>
          <div className={cx('discount')}>
            <div>
              <div>
                <div className={cx('code')}>Nhận ngay mã giảm giá 10000 VNĐ khi đặt vé trên website NTFMovie</div>
                <div className={cx('limit-useful')}>HSD: 30-12-2023</div>
              </div>
              <Button onClick={handleReceive} className={cx('receive')}>
                <span>Nhận</span>
                <FontAwesomeIcon icon={faCopy} />
              </Button>
            </div>
          </div>
        </div>

        <div className={cx('payment')}>
          {/* <div className={cx('payment-qrCode')}>
            <h4>Quét mã QR bằng MoMo để thanh toán</h4>
            <div className={cx('qr-container')}>
              <div className={cx('qr-scan')}>
                <div className={cx('qr-radiant')}>
                  <img
                    alt="radiant"
                    src="https://homepage.momocdn.net/jk/momo2020/img/qrcode/qrcode-gradient.png"
                    className={cx('img-flui')}
                  />
                </div>
                <div className={cx('qr-border')}>
                  <img
                    alt="border"
                    src="https://homepage.momocdn.net/jk/momo2020/img/qrcode/border-qrcode.svg"
                    className={cx('img-fluid')}
                  />
                </div>
                <div className={cx('qr-image')}>
                  <canvas height="268" width="268"></canvas>
                  <img alt="" src="https://homepage.momocdn.net/pwa/images/logoMomox50.png" />
                  <img className={cx('img1')} alt="" src="https://cdn.ttgtmedia.com/rms/misc/qr_code_barcode.jpg" />
                </div>
              </div>
            </div>
            <div className={cx('description')}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                ></path>
              </svg>
              Sử dụng App MoMo hoặc ứng dụng Camera hỗ trợ QR code để quét mã.
            </div>
            <div className={cx('direct-payment')}>
              <input checked={isChecked} onChange={toggleChecked} type="checkbox" id="check" />
              <label htmlFor="check">
                <img alt="VnPay" src={vnpay} className={cx('img-vnpay')} />{' '}
                <a href="http://localhost:8888/order/create_payment_url">Thanh toán tiền bằng ví VNPAY</a>
              </label>
            </div>

            <Button className={cx('book-ticket')} onClick={handleBuyTicket}>
              Đặt vé
            </Button>
          </div> */}
          <div className={cx('paypal')}>
            <h2>Thanh toán tiền bằng PayPal</h2>
            <Paypal handleBuyTicket={handleBuyTicket} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBuyTicket;
