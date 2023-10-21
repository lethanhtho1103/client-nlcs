import classNames from 'classnames/bind';
import style from './Comment.module.scss';
import { useContext, useState } from 'react';
import ToastMassage from '../ToastMassage';
import { Button } from 'react-bootstrap';
import { filmService } from '~/services';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DetailContext } from '~/Context/DetailContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faEllipsis, faWrench } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Comment() {
  const [isShowComment, setIsShowComment] = useState(false);
  const [isShowToastMessage, setIsShowToastMessage] = useState(false);
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(0);

  const [obToast, setObToast] = useState({
    isShow: false,
    header: '',
    content: '',
  });

  const { userId, filmComments, filmId, handleShowCommentOfUser, avgRate, countComment, handleUpdateAvgRate } =
    useContext(DetailContext);

  dayjs.extend(relativeTime);

  const handleShowComments = () => {
    setIsShowComment(true);
  };

  const handleHiddenComment = () => {
    setIsShowComment(false);
  };

  const handleSubmitComment = async () => {
    if (rate === 0) {
      alert('Vui lòng chọn đánh giá sao cho bộ phim!');
      return;
    }
    const res = await filmService.userComment(userId, filmId, comment, rate);
    if (res.errCode === 0) {
      setIsShowComment(false);
      setObToast(() => {
        return {
          isShow: true,
          herder: 'Vừa xong',
          content: 'Đã đăng tải thành công!',
        };
      });
      setIsShowToastMessage(true);
      handleShowCommentOfUser();
      handleUpdateAvgRate();
      setTimeout(() => {
        setIsShowToastMessage(false);
      }, 3000);
    }
  };

  const handleUpdateComment = async () => {
    setIsShowComment(true);
  };

  const handleDeleteComment = async () => {
    const res = await filmService.userComment(userId, filmId, '', 0);

    if (res.errCode === 0) {
      setIsShowComment(false);
      setObToast(() => {
        return {
          isShow: true,
          herder: 'Vừa xong',
          content: 'Xóa bình luận thành công!',
        };
      });
      setIsShowToastMessage(true);
      handleShowCommentOfUser();
      handleUpdateAvgRate();
      setTimeout(() => {
        setIsShowToastMessage(false);
      }, 3000);
    }
  };

  return (
    <div className={cx('comment')}>
      {isShowToastMessage && <ToastMassage header={obToast.header} content={obToast.content} />}
      <h3>Bình luận từ người xem</h3>
      {avgRate > 0 ? (
        <div className={cx('evaluate')}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="star"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
            ></path>
          </svg>
          <div className={cx('number')}>{avgRate}</div>
          <div className={cx('per-ten')}>/10</div>
          <span>
            <div>.</div>
            &nbsp;
            <span>&nbsp;{countComment} đánh giá</span>
          </span>
        </div>
      ) : (
        <div className={cx('empty-rate')}>
          Hiện tại chưa có bình luận nào. Hãy là người đầu tiên bình luận trên website NTFMovies.
        </div>
      )}
      <ul className={cx('list-user-comment')}>
        {filmComments.map((comment) => {
          let commentTime = dayjs(comment.updatedAt).fromNow();
          return (
            comment.rate > 0 && (
              <li key={comment.id} className={cx('user-comment-item')}>
                <div className={cx('info-user')}>
                  <div className={cx('user-avatar')}>{comment.userFilm.name.charAt(0)}</div>
                  <div className={cx('user-name')}>
                    <div>{comment.userFilm.name}</div>
                    <span>{commentTime}</span>
                  </div>
                  {comment.userId === userId ? (
                    <div className={cx('icon-menu')}>
                      <FontAwesomeIcon icon={faEllipsis} />
                      <div className={cx('menu')}>
                        <ul>
                          <li>
                            <FontAwesomeIcon icon={faCircleMinus} />
                            <span onClick={handleDeleteComment}>Xóa</span>
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faWrench} />
                            <span onClick={handleUpdateComment}>Chỉnh sửa</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className={cx('user-evaluate')}>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="star"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    ></path>
                  </svg>
                  <div className={cx('number')}>{comment.rate}</div>
                  <div className={cx('per-ten')}>/10</div>
                  <span>
                    <div>.</div>
                    <span>
                      {comment.rate >= 9
                        ? 'Cực phẩm!'
                        : comment.rate >= 7
                        ? 'Đáng xem'
                        : comment.rate >= 5
                        ? 'Tạm ổn'
                        : comment.rate >= 3
                        ? 'Chưa ưng lắm'
                        : 'Kén người mê'}
                    </span>
                  </span>
                </div>
                <div className={cx('content-comment')}>{comment.comment}</div>
              </li>
            )
          );
        })}
      </ul>
      {filmComments.map(
        (comment) =>
          comment.userId === userId &&
          (comment.comment === null || comment.comment === '') && (
            <Button
              key={comment.id}
              onClick={handleShowComments}
              className={cx('btn-show-evaluate', {
                hiddenComment: isShowComment === true,
              })}
            >
              Viết đánh giá
            </Button>
          ),
      )}
      <div
        className={cx('write-evaluate', {
          showComment: isShowComment === true,
        })}
      >
        <div className={cx('title')}>Chạm để đánh giá</div>
        <div className={cx('list-start')}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
            return (
              <div
                onMouseMove={() => setRate(star)}
                className={cx('start-item')}
                key={star}
                style={{
                  color: star <= rate ? '#fbbf24' : '',
                }}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="star"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  ></path>
                </svg>
              </div>
            );
          })}
        </div>
        <div className={cx('feel')}>
          <div>{rate}/10&nbsp;</div>
          <span>.</span>&nbsp;
          {rate >= 9
            ? 'Cực phẩm!'
            : rate >= 7
            ? 'Đáng xem'
            : rate >= 5
            ? 'Tạm ổn'
            : rate >= 3
            ? 'Chưa ưng lắm'
            : 'Kén người mê'}
        </div>
        <h5>Cảm nhận thêm về bộ phim</h5>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Giờ là lúc ngôn từ lên ngôi."
        />
        <div className={cx('btn')}>
          <Button onClick={handleSubmitComment} className={cx('btn-complete')}>
            Hoàn Thành
          </Button>
          <Button onClick={handleHiddenComment} className={cx('btn-exit')}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
