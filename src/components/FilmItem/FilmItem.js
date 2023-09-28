import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './FilmItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function FilmItem({ data }) {
  return (
    <div className={cx('wrapper')}>
      <Link to={`http://localhost:3000/details/${data.id}`} className={cx('content')}>
        <img src={data.image} className={cx('avatar')} alt={data.name} />
        <div className={cx('info')}>
          <h4 className={cx('name')}>
            <span>{data.name}</span>
            {/* {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />} */}
          </h4>
          <span className={cx('type')}>{data.type}</span>
          <div className={cx('evaluate')}>
            <FontAwesomeIcon className={cx('starIcon')} icon={faStar} />
            <span className={cx('numberStar')}>{data.evaluate}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FilmItem;
