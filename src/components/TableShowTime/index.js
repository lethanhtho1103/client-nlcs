import DataTable from '~/components/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowTime.module.scss';
import { useContext } from 'react';

import { Button } from 'react-bootstrap';
import { UilTimes } from '@iconscout/react-unicons';
import { UilPen } from '@iconscout/react-unicons';
import { UilLabelAlt } from '@iconscout/react-unicons';
import ToastMassage from '../ToastMassage';
import ModalUpdateShowTime from '../ModalUpdateShowTime';
import { AdminShowTimeContext } from '~/Context/AdminShowTimeContext';

const cx = classNames.bind(style);

function TableShowTime() {
  const { obToast, row, toggleShowUpdateShowTimeModal, showUpdateShowTime } = useContext(AdminShowTimeContext);

  const columns = [
    { Header: 'STT', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Tên phim', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Ngày chiếu', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Giờ chiếu', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Phòng chiếu', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Số vé tối đa', accessor: 'col6', filter: 'fuzzyText' },
    { Header: 'Giá vé', accessor: 'col7', filter: 'fuzzyText' },
    { Header: 'Hành động', accessor: 'col8', disableSortBy: true },
  ];

  return (
    <div
      className={cx('wrap', {
        show: true,
      })}
    >
      <div className={cx('container-content')}>
        <div className={cx('wrap-table')}>
          <h2 className={cx('title')}>Danh sách lịch chiếu của NTFMovies</h2>
          <div className={cx('note')}>
            Ghi chú:
            <ul className={cx('note-list')}>
              <li className={cx('note-item')}>
                <UilLabelAlt size={12} className={cx('list-tyle')} />
                Nhấn vào
                <Button size="sm" className={cx('btn')} variant="outline-primary">
                  <UilPen size={18} />
                </Button>
                để chỉnh sửa lịch chiếu.
              </li>
              <li className={cx('note-item')}>
                <UilLabelAlt size={12} className={cx('list-tyle')} />
                Nhấn vào
                <Button size="sm" className={cx('btn')} variant="outline-danger">
                  <UilTimes size={18} />
                </Button>
                để xóa lịch chiếu.
              </li>
            </ul>
          </div>
          <div className={cx('table')}>
            <DataTable columns={columns} data={row} />
          </div>
          <ModalUpdateShowTime isShow={showUpdateShowTime} handleClose={toggleShowUpdateShowTimeModal} />
          {obToast.content.length > 0 && (
            <ToastMassage dur={3000} isShow={obToast.show} header={obToast.header} content={obToast.content} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TableShowTime;
