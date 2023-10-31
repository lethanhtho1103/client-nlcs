import classNames from 'classnames/bind';
import style from './ModalComboCornWater.module.scss';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { DetailContext } from '~/Context/DetailContext';
import corn_water from '../../assets/images/corn_water.png';
const cx = classNames.bind(style);

function ModalComboCornWater({ toggleShow }) {
  // const [cornWaterId, setCornWaterId] = useState('');
  // const [isHidden, setIsHidden] = useState(false);
  // const handleMouseLeave = () => {
  //   setIsHidden(true);
  // };

  // const handelClickHidden = () => {
  //   if (isHidden) {
  //     toggleShow();
  //   }
  // };
  const {
    handelShowBuyTicket,
    // filmId,
    // userId,
    comboCornWater,
    numberWithCommas,
    quantityCombo1,
    quantityCombo2,
    quantityCombo3,
    quantityCombo4,
    handleDecrease,
    handleIncrease,
    getQuantityCombo,
  } = useContext(DetailContext);

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
                  <img src={corn_water} alt="Combo - bắp nước" />
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
                      onClick={() => handleDecrease(combo.id)}
                      className={cx({
                        active: getQuantityCombo(combo.id) > 0,
                      })}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>
                      <b>{getQuantityCombo(combo.id)}</b>
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className={cx({
                        notActive: getQuantityCombo(combo.id) === 8,
                      })}
                      onClick={() => handleIncrease(combo.id)}
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
            <b>
              {numberWithCommas(
                quantityCombo1 * comboCornWater[0].price +
                  quantityCombo2 * comboCornWater[1].price +
                  quantityCombo3 * comboCornWater[2].price +
                  quantityCombo4 * comboCornWater[3].price,
              )}{' '}
              VND
            </b>
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
