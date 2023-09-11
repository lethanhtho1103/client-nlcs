import classNames from 'classnames/bind';
import style from './Film.module.scss';
const cx = classNames.bind(style);

function Post() {
  return <div className={cx('wrap')}></div>;
}

export default Post;
