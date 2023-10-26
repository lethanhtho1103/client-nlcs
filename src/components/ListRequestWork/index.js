import { Row, Col, Button } from 'react-bootstrap';
import ToastMassage from '../ToastMassage';
import ModalAuth from '../ModalAuth';
import { UilCheck } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import classNames from 'classnames/bind';
import { UilLabelAlt } from '@iconscout/react-unicons';
import styles from './ListRequestWork.module.scss';
import { UilAngleDoubleLeft } from '@iconscout/react-unicons';
import { workServices } from '~/services';
import TableWork from '../TableWork';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selector';

import { useEffect, useState, useCallback } from 'react';
import Moment from 'react-moment';
const cx = classNames.bind(styles);

function ListRequestWork({ listUsers }) {
  // Tao table
  const [data, setData] = useState([]);

  const convertToDataRow = (rows) => {
    const dataRow = rows.map((row, index) => {
      return {
        col1: index + 1,
        col2: row.userWork.id,
        col3: row.userWork.name,
        col4: row.userWork.email,
        col5: row.userWork.className,
        col6: (
          <>
            <Button size="sm" className={cx('btn')} variant="outline-primary">
              <UilCheck size={18} />
            </Button>
            <Button size="sm" className={cx('btn')} variant="outline-danger">
              <UilTimes size={18} />
            </Button>
          </>
        ),
      };
    });
    return dataRow;
  };

  const getWorkReq = async () => {
    if (res.errCode === 0) {
      if (res.works.length > 0) {
        const dataRow = convertToDataRow(res.works);
        setData(dataRow);
        return res.works[0];
      }
    } else {
      setData([]);
    }
    return {};
  };

  const columns = [
    { Header: 'STT', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'MSSV', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Tên', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Email', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Lớp', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Hành động', accessor: 'col6', disableSortBy: true },
  ];

  useEffect(() => {
    getWorkReq();
  }, []);
  return (
    <>
      <div
        className={cx('wrap', {
          show: true,
        })}
      >
        <div className={cx('container-content')}>
          <div title="Quay lại" className={cx('icon-back')}>
            <UilAngleDoubleLeft size={28} />
          </div>
          <div className={cx('wrap-table')}>
            <h2 className={cx('title')}>danh sách vé</h2>
            <div className={cx('control')}>
              <div className={cx('wrap-more')}>
                <span className={cx('more-content')}>Ngày bắt đầu:</span>
                <span className={cx('more-number')}>
                  {/* <Moment local="vi" format="ll">
                    {workInfo?.startDate}
                  </Moment> */}
                  22/10/2023
                </span>
              </div>
              <div className={cx('wrap-more')}>
                <span className={cx('more-content')}>Nơi làm việc:</span>
                <span className={cx('more-number')}> Kinh dị</span>
              </div>
              <div className={cx('wrap-more')}>
                <span className={cx('more-content')}>Tối đa: </span>
                <span className={cx('more-number')}> 200</span>
              </div>

              <div className={cx('wrap-more')}>
                <span className={cx('more-content')}>Hiện tại: </span>
                <span className={cx('more-number')}> 33</span>
              </div>
            </div>
            <div className={cx('note')}>
              Ghi chú:
              <ul className={cx('note-list')}>
                <li className={cx('note-item')}>
                  <UilLabelAlt size={12} className={cx('list-tyle')} />
                  Nhấn vào
                  <Button size="sm" className={cx('btn')} variant="outline-primary">
                    <UilCheck size={18} />
                  </Button>
                  để duyệt sinh viên vào danh sách tham gia.
                </li>
                <li className={cx('note-item')}>
                  <UilLabelAlt size={12} className={cx('list-tyle')} />
                  Nhấn vào
                  <Button size="sm" className={cx('btn')} variant="outline-danger">
                    <UilTimes size={18} />
                  </Button>
                  để xóa sinh viên ra khỏi danh sách đăng ký tham gia.
                </li>
              </ul>
            </div>

            <div className={cx('table')}>
              {data.length > 0 ? (
                <TableWork columns={columns} data={data} />
              ) : (
                <div className={cx('done')}>Các yêu cầu đã được xử lý! </div>
              )}

              <ToastMassage
                isShow={toastOb.show}
                header={toastOb.header}
                content={toastOb.content}
                handleClose={() => toggleShowToast({})}
              />
              <ModalAuth
                header="Bạn có chắc muốn xóa?"
                main="Hành động này sẽ xóa bản ghi trong cơ sở dữ liệu và không thể khôi phục"
                isShowModal={isShowModal}
                handleOk={handleDeleteRow}
                ToggleShowModal={toggleShowModal}
                deleteId={reqUser}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListRequestWork;
