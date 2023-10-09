import classNames from 'classnames/bind';
import style from './ModalComboCornWater.module.scss';
import { Button } from 'react-bootstrap';
import { useCallback, useContext, useState } from 'react';
import { DetailContext } from '~/Context/DetailContext';

const cx = classNames.bind(style);

function ModalComboCornWater({ toggleShow, comboCornWater }) {
  const [quantity, setQuantity] = useState(0);
  // const [isHidden, setIsHidden] = useState(false);

  const { handelShowBuyTicket } = useContext(DetailContext);

  const increase = useCallback(() => setQuantity(quantity + 1), [quantity]);
  const decrease = useCallback(() => setQuantity(quantity - 1), [quantity]);

  const handleDecrease = () => {
    if (quantity <= 0) {
      setQuantity(0);
    } else {
      decrease();
    }
  };

  const handleIncrease = (quantity) => {
    if (quantity >= 8) {
      setQuantity(8);
    } else {
      increase();
    }
  };

  // const handleMouseLeave = () => {
  //   setIsHidden(true);
  // };

  // const handelClickHidden = () => {
  //   if (isHidden) {
  //     toggleShow();
  //   }
  // };

  const handleClickX = () => {
    toggleShow();
  };

  return (
    <div className={cx('wrap')}>
      <div className={cx('combo')}>
        <div className={cx('header')}>
          <svg
            onClick={handleClickX}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
          </svg>
          <b>Combo - Bắp nước</b>
        </div>
        <div className={cx('list-combo')}>
          {comboCornWater.map((combo) => {
            return (
              <div key={combo.id} className={cx('combo-item')}>
                <div className={cx('image')}>
                  <img
                    src="https://booking.bhdstar.vn/CDN/media/entity/get/ItemGraphic/662285?allowPlaceHolder=true"
                    alt="Combo - bắp nước"
                  />
                </div>
                <ul>
                  <li className={cx('title')}>
                    <b>
                      {combo.name} - <span>{combo.price}</span> VND
                    </b>
                  </li>
                  <li className={cx('description')}>{combo.description}</li>
                  <li className={cx('quantity')}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      onClick={handleDecrease}
                      className={cx({
                        active: quantity > 0,
                      })}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>
                      <b>{quantity}</b>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className={cx({
                        notActive: quantity === 8,
                      })}
                      onClick={() => handleIncrease(combo.quantity)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
        <div className={cx('footer')}>
          <div className={cx('total')}>
            <span>Tổng cộng</span>
            <b>0 VND</b>
          </div>
          <Button className={cx('btn-continue')} onClick={handelShowBuyTicket}>
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalComboCornWater;
