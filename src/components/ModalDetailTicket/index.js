import classNames from 'classnames/bind';
import style from './ModalDetailTicket.module.scss';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { userService } from '~/services';

const cx = classNames.bind(style);

function ModalDetailTicket({ toggleX, detailTicket }) {
  const [isHidden, setIsHidden] = useState(false);
  const [detailCombos, setDetailCombos] = useState([]);
  const handleMouseLeave = () => {
    setIsHidden(true);
  };

  const handelClickHidden = () => {
    if (isHidden) {
      toggleX();
    }
  };

  const handleClickX = () => {
    toggleX();
  };

  const handleLongTime = (startTime, totalTime) => {
    const time = parseInt(startTime?.slice(0, 2));
    const endHour = Math.floor(time + totalTime / 60);
    const endHour24 = endHour % 24;
    const endMinutes = totalTime % 60;
    if (endHour24 < 10) {
      if (endMinutes < 10) {
        return `0${endHour24}:0${endMinutes}`;
      } else {
        return `0${endHour24}:${endMinutes}`;
      }
    } else if (endHour24 >= 10) {
      if (endMinutes < 10) {
        return `${endHour}:0${endMinutes}`;
      }
    }
    return `${endHour}:${endMinutes}`;
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  const handleGetDetailCombos = async () => {
    const listUserId = detailTicket.id;
    const res = await userService.getDetailCombos({ listUserId });
    if (res.errCode === 0) {
      setDetailCombos(res.data);
    }
  };

  const initialValue = 0;
  const sumWithInitial = detailCombos.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.detailCornWater.price,
    initialValue,
  );

  useEffect(() => {
    handleGetDetailCombos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onClick={handelClickHidden} className={cx('wrap')}>
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
                <div
                  className={cx({
                    age16: detailTicket.film.ageAllowed === 16,
                    age13: detailTicket.film.ageAllowed === 13,
                  })}
                >
                  {detailTicket.film.ageAllowed}+
                </div>
              </li>
              <li className={cx('name')}>
                <b>{detailTicket.film.name}</b>
              </li>
            </ul>
            <ul className={cx('body-film')}>
              <li className={cx('body-film-item')}>
                <div>
                  <span>THỜI GIAN</span>
                  <div>
                    <b>
                      {detailTicket.startTime} ~ {handleLongTime(detailTicket.startTime, detailTicket.film.totalTime)}
                    </b>
                  </div>
                </div>
              </li>
              <li className={cx('body-film-item')}>
                <div>
                  <span>NGÀY CHIẾU</span>
                  <div>
                    <b>{detailTicket.startDate}</b>
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
                    <b>0{detailTicket.roomId}</b>
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
                    <b>{detailTicket.seat}</b>
                  </div>
                </div>
              </li>
              <li>
                <div></div>
                <div className={cx('price')}>
                  <b>
                    {numberWithCommas(detailTicket.priceTicket * detailTicket.ticket)}
                    &nbsp;VND
                  </b>
                </div>
              </li>
            </ul>
            <div className={cx('corn-water')}>
              <h3>BẮP - NƯỚC</h3>
              {detailCombos.map((combo) => {
                return (
                  <div key={combo.id} className={cx('quantity-combo')}>
                    <b className={cx('name-combo')}>{`${combo.quantity} x ${combo.detailCornWater.name}`} </b>
                    <b className={cx('price')}>{numberWithCommas(combo.quantity * combo.detailCornWater.price)} VND</b>
                  </div>
                );
              })}
              {detailCombos.length === 0 && (
                <div className={cx('quantity-combo')}>
                  <b className={cx('no-combo')}> Bạn chưa đặt bắp nước.</b>
                </div>
              )}
            </div>
          </div>
          <ul>
            <li>
              <div>
                <div>
                  <b>Thành tiền</b>
                </div>
              </div>
              <div>
                <b className={cx('color-red')}>
                  {numberWithCommas(sumWithInitial + detailTicket.priceTicket * detailTicket.ticket)}
                  &nbsp;VND
                </b>
              </div>
            </li>
          </ul>
        </div>

        <div className={cx('payment')}>
          <div className={cx('payment-qrCode')}>
            <h4>Quét mã QR để vào phòng chiếu</h4>
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
                  {/* <img alt="" src="https://homepage.momocdn.net/pwa/images/logoMomox50.png" /> */}
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
              Sử dụng phần mềm hoặc ứng dụng Camera hỗ trợ QR code để quét mã.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDetailTicket;
