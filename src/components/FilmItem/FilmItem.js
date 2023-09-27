// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './FilmItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function FilmItem({ data }) {
  return (
    <Link to={`http://localhost:3000/details/${data.id}`} className={cx('wrapper')}>
      <img src={data.image} className={cx('avatar')} alt={data.name} />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>233</span>
          {/* {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />} */}
        </h4>
        <span className={cx('username')}>{data.type}</span>
      </div>
    </Link>
  );
}

export default FilmItem;
