import DataTable from '~/components/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowTime.module.scss';
import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { UilLabelAlt, UilTimes } from '@iconscout/react-unicons';
import ToastMassage from '../ToastMassage';
import { AdminShowTimeContext } from '~/Context/AdminShowTimeContext';

const cx = classNames.bind(style);

function TableShowTime() {
  const { obToast, row, rowCancel, DeleteConfirmationDialog } = useContext(AdminShowTimeContext);
  const [isShowCancelShowTime, setIsShowCancelShowTime] = useState(false);
  const [isShowTime, setIsShowTime] = useState(true);

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

  const columnsCancel = [
    { Header: 'STT', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Tên phim', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Ngày chiếu', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Giờ chiếu', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Phòng chiếu', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Số vé tối đa', accessor: 'col6', filter: 'fuzzyText' },
    { Header: 'Giá vé', accessor: 'col7', filter: 'fuzzyText' },
  ];

  const handleShowCancelShowTime = () => {
    setIsShowCancelShowTime(true);
    setIsShowTime(false);
  };

  const handleShowTime = () => {
    setIsShowCancelShowTime(false);
    setIsShowTime(true);
  };

  return (
    <div
      className={cx('wrap', {
        show: true,
      })}
    >
      <div className={cx('container-content')}>
        {isShowTime && (
          <div className={cx('wrap-table')}>
            <div className={cx('view-showtime')} onClick={handleShowCancelShowTime}>
              Xem danh sách lịch chiếu đã hủy
            </div>
            <h2 className={cx('title')}>Danh sách lịch chiếu của NTFMovies</h2>
            <div className={cx('note')}>
              Ghi chú:
              <ul className={cx('note-list')}>
                {/* <li className={cx('note-item')}>
                  <UilLabelAlt size={12} className={cx('list-tyle')} />
                  Nhấn vào
                  <Button size="sm" className={cx('btn')} variant="outline-primary">
                    <UilCheck size={18} />
                  </Button>
                  để phục hồi lịch chiếu.
                </li> */}
                <li className={cx('note-item')}>
                  <UilLabelAlt size={12} className={cx('list-tyle')} />
                  Nhấn vào
                  <Button size="sm" className={cx('btn')} variant="outline-danger">
                    <UilTimes size={18} />
                  </Button>
                  để hủy lịch chiếu.
                </li>
              </ul>
            </div>
            <div className={cx('table')}>
              <DataTable columns={columns} data={row} />
            </div>
            {DeleteConfirmationDialog()}
            {obToast.content.length > 0 && (
              <ToastMassage dur={3000} isShow={obToast.show} header={obToast.header} content={obToast.content} />
            )}
          </div>
        )}
        {isShowCancelShowTime && (
          <div className={cx('wrap-table')}>
            <div className={cx('view-showtime')} onClick={handleShowTime}>
              Xem danh sách lịch chiếu
            </div>
            <h2 className={cx('title')}>Danh sách lịch chiếu đã bị hủy của NTFMovies</h2>
            {/* <div className={cx('note')}>
              Ghi chú:
              <ul className={cx('note-list')}>
                <li className={cx('note-item')}>
                  <UilLabelAlt size={12} className={cx('list-tyle')} />
                  Nhấn vào
                  <Button size="sm" className={cx('btn')} variant="outline-primary">
                    <UilCheck size={18} />
                  </Button>
                  để phục hồi lịch chiếu.
                </li>
                <li className={cx('note-item')}>
                  <UilLabelAlt size={12} className={cx('list-tyle')} />
                  Nhấn vào
                  <Button size="sm" className={cx('btn')} variant="outline-danger">
                    <UilTimes size={18} />
                  </Button>
                  để hủy lịch chiếu.
                </li>
              </ul>
            </div> */}
            <div className={cx('table')}>
              {rowCancel.length > 0 ? (
                <DataTable columns={columnsCancel} data={rowCancel} />
              ) : (
                <div className={cx('no-show-time')}>Không có lịch chiếu nào bị hủy.</div>
              )}
            </div>
            {DeleteConfirmationDialog()}
            {obToast.content.length > 0 && (
              <ToastMassage dur={3000} isShow={obToast.show} header={obToast.header} content={obToast.content} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TableShowTime;
