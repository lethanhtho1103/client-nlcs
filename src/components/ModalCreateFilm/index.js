import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ToastMassage from '../ToastMassage';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
// import { workServices } from '~/services';
import style from './ModalCreateFilm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
function ModalCreateFilm({ isShow, handleClose, handleOk }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [origin, setOrigin] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [ageAllowed, setAgeAllowed] = useState('');
  const [startDate, setStartDate] = useState('');
  const [content, setContent] = useState('');

  const [nameErr, setNameErr] = useState('');
  const [imageErr, setImageErr] = useState('');
  const [typeErr, setTypeErr] = useState('');
  const [originErr, setOriginErr] = useState('');
  const [totalTimeErr, setTotalTimeErr] = useState('');
  const [ageAllowedErr, setAgeAllowedErr] = useState('');
  const [startDateErr, setStartDateErr] = useState('');

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
      case 'image': {
        setImage(value);
        break;
      }
      case 'type': {
        setType(value);
        break;
      }
      case 'origin': {
        setOrigin(value);
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

  const setDefaultValue = (type) => {
    if (type === 'er') {
      setNameErr('');
      setImageErr('');
      setTypeErr('');
      setOriginErr('');
      setTotalTimeErr('');
      setAgeAllowedErr('');
      setStartDateErr('');
    } else {
      setName('');
      setImage('');
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

  //   const createWork = async () => {
  //     const res = await workServices.createWork({
  //       name,
  //       startDate: time,
  //       workimage: image,
  //       pointtotalTime: totalTime,
  //       maxStudent: number,
  //       content,
  //     });

  //     if (res.errCode === 0) {
  //       toggleShowToast({ header: 'Xong', content: 'Đã tạo công việc', isShow: true });
  //       handleClose();
  //       setDefaultValue();
  //     }
  //   };

  const checkErr = (type) => {
    switch (type) {
      case 'name': {
        return nameErr.length > 0;
      }
      case 'image': {
        return imageErr.length > 0;
      }
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

    if (!image) {
      setImageErr('Link poster đang trống!');
      err = false;
    } else {
      setImageErr('');
    }

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
    if (err) setDefaultValue('er');
    return err;
  };

  const handleCLickSuccess = () => {
    if (validate()) {
      // createWork();
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
            show: nameErr || imageErr || typeErr || originErr || totalTimeErr || ageAllowedErr || startDateErr,
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
              {imageErr && (
                <li>
                  <label htmlFor="image">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    {imageErr}
                  </label>
                </li>
              )}
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
            <div>
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
            </div>

            <div className={cx('row')}>
              <div className={cx('col-md-6')}>
                <div
                  className={cx('form__group', 'field', {
                    err: checkErr('type'),
                  })}
                >
                  <input
                    required=""
                    onChange={(e) => changeInput(e, 'type')}
                    value={type}
                    name="type"
                    placeholder="type"
                    id="type"
                    className={cx('form__field')}
                    type="input"
                  ></input>
                  <label className={cx('form__label')} htmlFor="type">
                    <span>*</span> Thể loại:
                  </label>
                </div>
              </div>
              <div className={cx('col-md-6')}>
                <div
                  className={cx('form__group', 'field', {
                    err: checkErr('origin'),
                  })}
                >
                  <input
                    onChange={(e) => changeInput(e, 'origin')}
                    required=""
                    name="origin"
                    min="1"
                    placeholder="origin"
                    value={origin}
                    id="origin"
                    className={cx('form__field')}
                    type="input"
                  ></input>
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
                    <span>*</span> Thời gian chiếu:
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
                  type="datetime-local"
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
                  defaultValue={content}
                  className={cx('form__field', 'content')}
                  autoComplete="off"
                ></textarea>
                <label className={cx('form__label')} htmlFor="time">
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
