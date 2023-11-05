import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import style from './ModalCreateFilm.module.scss';
import classNames from 'classnames/bind';
import { filmService } from '~/services';

const cx = classNames.bind(style);
function ModalCreateFilm({ isShow, handleClose }) {
  const [name, setName] = useState('');
  // const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [origin, setOrigin] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [ageAllowed, setAgeAllowed] = useState('');
  const [startDate, setStartDate] = useState('');
  const [content, setContent] = useState('');

  const [nameErr, setNameErr] = useState('');
  // const [imageErr, setImageErr] = useState('');
  const [typeErr, setTypeErr] = useState('');
  const [originErr, setOriginErr] = useState('');
  const [totalTimeErr, setTotalTimeErr] = useState('');
  const [ageAllowedErr, setAgeAllowedErr] = useState('');
  const [startDateErr, setStartDateErr] = useState('');
  const [contentErr, setContentErr] = useState('');

  const [obToast, setObToast] = useState({
    header: '',
    content: '',
    isShow: false,
  });

  const changeInput = (e, type) => {
    const value = e.target.value;
    switch (type) {
      case 'name': {
        setName(value);
        break;
      }
      // case 'image': {
      //   setImage(value);
      //   break;
      // }
      case 'type': {
        setType(value);
        break;
      }
      case 'origin': {
        setOrigin(value);
        const newSuggestions = filterSuggestions(value);
        setSuggestions(newSuggestions);
        setShowSuggestions(newSuggestions.length > 0);

        break;
      }
      case 'totalTime': {
        setTotalTime(value);
        break;
      }
      case 'ageAllowed': {
        setAgeAllowed(value);
        break;
      }
      case 'startDate': {
        setStartDate(value);
        break;
      }
      case 'content': {
        setContent(value);
        break;
      }

      // eslint-disable-next-line no-fallthrough
      default: {
        break;
      }
    }
  };

  const [suggestions, setSuggestions] = useState(['Mỹ', 'Nhật Bản', 'Việt Nam', 'Thái Lan', 'Hàn Quốc', 'Trung Quốc']);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Hàm này sẽ được gọi khi người dùng chọn một gợi ý từ danh sách
  const selectSuggestion = (suggestion) => {
    setOrigin(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    setOrigin(suggestion);
  };

  const filterSuggestions = (value) => {
    // Thực hiện lọc danh sách gợi ý dựa trên giá trị nhập vào
    const filtered = suggestions.filter((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase()));
    return filtered;
  };

  const setDefaultValue = (type) => {
    if (type === 'er') {
      setNameErr('');
      // setImageErr('');
      setTypeErr('');
      setOriginErr('');
      setTotalTimeErr('');
      setAgeAllowedErr('');
      setStartDateErr('');
      setContentErr('');
    } else {
      setName('');
      // setImage('');
      setType('');
      setOrigin('');
      setTotalTime('');
      setAgeAllowed('');
      setStartDate('');
      setContent('');
    }
  };

  const toggleShowToast = ({ header, content, show }) => {
    setObToast((toast) => {
      return {
        header: header ? header : '',
        content: content ? content : '',
        isShow: show ? show : !toast.isShow,
      };
    });
  };

  const createFilm = async () => {
    const res = await filmService.createFilm({
      name,
      type,
      // image,
      origin,
      startDate,
      totalTime,
      ageAllowed,
      content,
    });

    if (res.errCode === 0) {
      toggleShowToast({ header: 'Xong', content: 'Đã tạo phim thành công', isShow: true });
      handleClose();
      setDefaultValue();
    }
  };

  const checkErr = (type) => {
    switch (type) {
      case 'name': {
        return nameErr.length > 0;
      }
      // case 'image': {
      //   return imageErr.length > 0;
      // }
      case 'type': {
        return typeErr.length > 0;
      }
      case 'origin': {
        return originErr.length > 0;
      }
      case 'totalTime': {
        return totalTimeErr.length > 0;
      }
      case 'ageAllowed': {
        return ageAllowedErr.length > 0;
      }
      case 'startDate': {
        return startDateErr.length > 0;
      }
      case 'content': {
        return contentErr.length > 0;
      }
      default: {
        break;
      }
    }
  };

  const validate = () => {
    let err = true;
    if (!name) {
      setNameErr('Bạn phải điền tên phim!');
      err = false;
    } else {
      setNameErr('');
    }

    // if (!image) {
    //   setImageErr('Link poster đang trống!');
    //   err = false;
    // } else {
    //   setImageErr('');
    // }

    if (!type) {
      setTypeErr('Bạn chưa nhập thể loại phim!');
      err = false;
    } else {
      setTypeErr('');
    }

    if (!origin) {
      setOriginErr('Chưa có thông tin quốc gia!');
      err = false;
    } else {
      setOriginErr('');
    }

    if (!totalTime) {
      setTotalTimeErr('Bạn phải điền tổng thời gian chiếu của phim!');
      err = false;
    } else {
      setTotalTimeErr('');
    }

    if (!ageAllowed) {
      setAgeAllowedErr('Độ tuổi cho phép để xem phim chưa có!');
      err = false;
    } else {
      setAgeAllowedErr('');
    }

    if (!startDate) {
      setStartDateErr('Bạn chưa nhập ngày khởi chiếu!');
      err = false;
    } else if (new Date(startDate) <= new Date()) {
      setStartDateErr('Phải là ngày trong tương lai!');
      err = false;
    } else {
      setStartDateErr('');
    }

    if (!content) {
      setContentErr('Bạn phải điền nội dung của phim!');
      err = false;
    } else {
      setContentErr('');
    }
    if (err) setDefaultValue('er');
    return err;
  };

  const handleCLickSuccess = () => {
    if (validate()) {
      createFilm();
    }
  };

  return (
    <>
      <ToastMassage
        isShow={obToast.isShow}
        header={obToast.header}
        content={obToast.content}
        handleClose={() => toggleShowToast({})}
      />
      <Modal
        show={isShow}
        onHide={() => {
          setDefaultValue('er');
          handleClose();
        }}
      >
        <div
          className={cx('table-err', {
            show:
              nameErr ||
              // imageErr ||
              typeErr ||
              originErr ||
              totalTimeErr ||
              ageAllowedErr ||
              startDateErr ||
              contentErr,
          })}
        >
          <h2>
            <div className={cx('icon')}>
              <FontAwesomeIcon icon={faBug} />
            </div>
            <span> Vui lòng kiểm tra dữ liệu đã nhập:</span>
          </h2>
          <div className={cx('wrap-err')}>
            <ul>
              {nameErr && (
                <li>
                  <label htmlFor="name">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {nameErr}
                  </label>
                </li>
              )}
              {/* {imageErr && (
                <li>
                  <label htmlFor="image">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {imageErr}
                  </label>
                </li>
              )} */}
              {typeErr && (
                <li>
                  <label htmlFor="type">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {typeErr}
                  </label>
                </li>
              )}
              {originErr && (
                <li>
                  <label htmlFor="origin">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {originErr}
                  </label>
                </li>
              )}
              {totalTimeErr && (
                <li>
                  <label htmlFor="totalTime">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {totalTimeErr}
                  </label>
                </li>
              )}
              {ageAllowedErr && (
                <li>
                  <label htmlFor="ageAllowed">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {ageAllowedErr}
                  </label>
                </li>
              )}
              {startDateErr && (
                <li>
                  <label htmlFor="startDate">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {startDateErr}
                  </label>
                </li>
              )}
              {contentErr && (
                <li>
                  <label htmlFor="content">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {contentErr}
                  </label>
                </li>
              )}
            </ul>
          </div>
        </div>
        <Modal.Header closeButton>
          <h5 className={cx('modal-title')}>Tạo Phim Mới</h5>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div>
              <div
                className={cx('form__group', 'field', {
                  err: checkErr('name'),
                })}
              >
                <input
                  required=""
                  placeholder="Name"
                  id="name"
                  className={cx('form__field')}
                  autoComplete="off"
                  type="input"
                  value={name}
                  onChange={(e) => changeInput(e, 'name')}
                ></input>
                <label className={cx('form__label')} htmlFor="name">
                  <span>*</span> Tên phim:
                </label>
              </div>
            </div>
            {/* <div>
              <div
                className={cx('form__group', 'field', {
                  err: checkErr('image'),
                })}
              >
                <input
                  required=""
                  placeholder="image"
                  id="image"
                  className={cx('form__field')}
                  autoComplete="off"
                  type="input"
                  value={image}
                  onChange={(e) => changeInput(e, 'image')}
                ></input>
                <label className={cx('form__label')} htmlFor="image">
                  <span>*</span> Link poster:
                </label>
              </div>
            </div> */}
            <div>
              <div>
                <div
                  className={cx('form__group', 'field', 'section-type', {
                    err: checkErr('type'),
                  })}
                >
                  <select
                    value={type}
                    name="type"
                    id="type"
                    className={cx('type')}
                    onChange={(e) => changeInput(e, 'type')}
                  >
                    <option value="">Chọn thể loại</option>
                    <option value="Khoa Học Viễn tưởng">Khoa Học Viễn tưởng</option>
                    <option value="Kinh dị, Ma, Gay cấn">Kinh dị, Ma, Gay cấn</option>
                    <option value="Hài, Hoạt hình, Phiêu lưu">Hài, Hoạt hình, Phiêu lưu</option>
                    <option value="Hành động, Hình sự, Gay cấn">Hành động, Hình sự, Gay cấn</option>
                    <option value="Chính kịch, Tội phạm, Trinh thám">Chính kịch, Tội phạm, Trinh thám</option>
                    <option value="Lãng mạn, Tình cảm">Lãng mạn, Tình cảm</option>
                  </select>
                  <label className={cx('form__label')} htmlFor="type">
                    <span>*</span> Thể loại:
                  </label>
                </div>
              </div>
              <div>
                <div
                  className={cx('form__group', 'field', {
                    err: checkErr('origin'),
                  })}
                >
                  <input
                    onChange={(e) => changeInput(e, 'origin')}
                    onBlur={() => setShowSuggestions(false)}
                    required=""
                    name="origin"
                    min="1"
                    placeholder="origin"
                    value={origin}
                    id="origin"
                    className={cx('form__field')}
                    type="input"
                  ></input>
                  {showSuggestions && (
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => selectSuggestion(suggestion)}>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                  <label className={cx('form__label')} htmlFor="origin">
                    <span>*</span> Quốc gia:
                  </label>
                </div>
              </div>
            </div>
            <div className={cx('row')}>
              <div className={cx('col-md-6')}>
                <div
                  className={cx('form__group', 'field', {
                    err: checkErr('totalTime'),
                  })}
                >
                  <input
                    required=""
                    onChange={(e) => changeInput(e, 'totalTime')}
                    value={totalTime}
                    name="totalTime"
                    placeholder="totalTime"
                    id="totalTime"
                    className={cx('form__field')}
                    type="number"
                  ></input>
                  <label className={cx('form__label')} htmlFor="totalTime">
                    <span>*</span> Thời gian chiếu: (phút)
                  </label>
                </div>
              </div>
              <div className={cx('col-md-6')}>
                <div
                  className={cx('form__group', 'field', {
                    err: checkErr('ageAllowed'),
                  })}
                >
                  <input
                    onChange={(e) => changeInput(e, 'ageAllowed')}
                    required=""
                    name="ageAllowed"
                    min="1"
                    placeholder="ageAllowed"
                    value={ageAllowed}
                    id="ageAllowed"
                    className={cx('form__field')}
                    type="number"
                  ></input>
                  <label className={cx('form__label')} htmlFor="ageAllowed">
                    <span>*</span> Độ tuổi cho phép:
                  </label>
                </div>
              </div>
            </div>
            <div>
              <div
                className={cx('form__group', 'field', {
                  err: checkErr('startDate'),
                })}
              >
                <input
                  onChange={(e) => changeInput(e, 'startDate')}
                  id="startDate"
                  className={cx('form__field')}
                  type="date"
                  value={startDate}
                  autoComplete="off"
                ></input>
                <label className={cx('form__label')} htmlFor="startDate">
                  <span>*</span> Ngày khởi chiếu:
                </label>
              </div>
            </div>
            <div>
              <div className={cx('form__group', 'field')}>
                <textarea
                  onChange={(e) => changeInput(e, 'content')}
                  id="content"
                  name="content"
                  defaultValue={content}
                  className={cx('form__field', 'content')}
                  autoComplete="off"
                ></textarea>
                <label className={cx('form__label')} htmlFor="content">
                  Nội dung:
                </label>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={cx('btn')}
            variant="secondary"
            onClick={() => {
              setDefaultValue('er');
              handleClose();
            }}
          >
            Đóng
          </Button>
          <Button className={cx('btn')} variant="primary" onClick={handleCLickSuccess}>
            Tạo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateFilm;
