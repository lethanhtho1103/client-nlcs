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
import { filmService, adminService } from '~/services';

const cx = classNames.bind(style);

function ModalBuyTicket({ byTicket, ticket, listUserInfo, showTime, startTime, startDate, handelClickBack }) {
  const [isShowCopy, setIsShowCopy] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const {
    filmInfo,
    handleLongTime,
    handelClickX,
    numberWithCommas,
    comboCornWater,
    getQuantityCombo,
    quantityCombo1,
    quantityCombo2,
    quantityCombo3,
    quantityCombo4,
    cw01,
    cw02,
    cw03,
    cw04,
  } = useContext(DetailContext);

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

  const totalTicket = parseInt(listUserInfo?.ticket) + parseInt(ticket);

  const handleBuyComboCornWater = async (listUserId) => {
    if (quantityCombo1 > 0) {
      await filmService.buyComboCornWater(listUserId, quantityCombo1, cw01);
    }
    if (quantityCombo2 > 0) {
      await filmService.buyComboCornWater(listUserId, quantityCombo2, cw02);
    }
    if (quantityCombo3 > 0) {
      await filmService.buyComboCornWater(listUserId, quantityCombo3, cw03);
    }
    if (quantityCombo4 > 0) {
      await filmService.buyComboCornWater(listUserId, quantityCombo4, cw04);
    }
  };

  const handleUpdateCurrUser = async (filmId, roomId, startDate, startTime, ticket) => {
    await adminService.updateCurrUser(filmId, roomId, startDate, startTime, ticket);
  };

  const handleBuyTicket = async (e) => {
    let res;
    if (totalTicket && listUserInfo.startTime === startTime) {
      res = byTicket(
        filmInfo.id,
        totalTicket,
        handleQuantitySeat(),
        startTime,
        startDate,
        filmInfo.filmShowTime.roomShowTime.priceTicket,
        filmInfo.filmShowTime.roomShowTime.id,
      );
    } else {
      res = byTicket(
        filmInfo.id,
        ticket,
        handleQuantitySeat(),
        startTime,
        startDate,
        filmInfo.filmShowTime.roomShowTime.priceTicket,
        filmInfo.filmShowTime.roomShowTime.id,
      );
    }
    handelClickX();
    handelClickBack();
    if (showTime.currUser > 0) {
      handleUpdateCurrUser(
        filmInfo.id,
        filmInfo.filmShowTime.roomShowTime.id,
        startDate,
        startTime,
        showTime.currUser + ticket,
      );
    } else {
      handleUpdateCurrUser(filmInfo.id, filmInfo.filmShowTime.roomShowTime.id, startDate, startTime, ticket);
      console.log(ticket);
    }
    return res;
  };

  const handleReceive = () => {
    setIsShowCopy(true);
    setTimeout(() => {
      setIsShowCopy(false);
    }, 2000);
  };

  const handleQuantitySeat = () => {
    let seat = '';
    // const init = showTime.currUser || 0;
    // const maxUser = showTime.currUser ? showTime.currUser + ticket : ticket;
    for (let i = showTime.currUser + 1; i <= showTime.currUser + ticket; i++) {
      seat = seat + `${i}, `;
    }
    const index = seat.lastIndexOf(',');
    return seat.slice(0, index);
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
                  <div className={cx('address')}>NTFMoive, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ.</div>
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
                    <b>{handleQuantitySeat() || ticket}</b>
                  </div>
                </div>
              </li>
              <li>
                <div></div>
                <div className={cx('price')}>
                  <b>{numberWithCommas(filmInfo.filmShowTime.roomShowTime.priceTicket * ticket)}&nbsp;VND</b>
                </div>
              </li>
            </ul>
            <div className={cx('corn-water')}>
              <h3>BẮP - NƯỚC</h3>
              {comboCornWater
                .filter((combo) => getQuantityCombo(combo.id) > 0)
                .map((combo) => (
                  <div key={combo.id} className={cx('quantity-combo')}>
                    <b className={cx('name-combo')}>{`${getQuantityCombo(combo.id)} x ${combo.name}`} </b>
                    <b className={cx('price')}>{numberWithCommas(getQuantityCombo(combo.id) * combo.price)} VND</b>
                  </div>
                ))}
              {quantityCombo1 <= 0 && quantityCombo2 <= 0 && quantityCombo3 <= 0 && quantityCombo4 <= 0 && (
                <div className={cx('quantity-combo')}>
                  <b className={cx('name-combo')}>Bạn chưa đặt bắp nước.</b>
                </div>
              )}
            </div>
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
                  {numberWithCommas(
                    filmInfo.filmShowTime.roomShowTime.priceTicket * ticket +
                      (quantityCombo1 * comboCornWater[0].price +
                        quantityCombo2 * comboCornWater[1].price +
                        quantityCombo3 * comboCornWater[2].price +
                        quantityCombo4 * comboCornWater[3].price),
                  )}
                  &nbsp;VND
                </b>
              </div>
            </li>
          </ul>
          <div className={cx('description')}>Ưu đãi (nếu có) sẽ được áp dụng ở bước thanh toán.</div>
          <div className={cx('discount')}>
            <div>
              <div>
                <div className={cx('code')}>Nhận ngay mã giảm giá 10000 VND khi đặt vé trên website NTFMovies</div>
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
          <div className={cx('paypal')}>
            <h2>Thanh toán tiền bằng PayPal</h2>
            <Paypal handleBuyComboCornWater={handleBuyComboCornWater} handleBuyTicket={handleBuyTicket} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBuyTicket;
