import DataTable from '~/components/DataTable';
import classNames from 'classnames/bind';
import style from './TableShowTime.module.scss';
import { useEffect, useState } from 'react';
import { adminService } from '~/services';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';
import { UilTimes } from '@iconscout/react-unicons';
import { UilPen } from '@iconscout/react-unicons';
import { UilLabelAlt } from '@iconscout/react-unicons';

const cx = classNames.bind(style);

function TableShowTime() {
  const [row, setRow] = useState([]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

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

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: index + 1,
        col2: row.filmShowTime.name,
        col3: <Moment local="vi" format="DD/MM/YYYY" date={row.startDate} />,
        col4: row.startTime,
        col5: row.roomShowTime.id,
        col6: row.roomShowTime.maxUser,
        col7: `${numberWithCommas(row.roomShowTime.priceTicket)} VND`,
        col8: (
          <>
            <Button size="sm" className={cx('btn')} variant="outline-primary">
              <UilPen size={18} />
            </Button>
            <Button size="sm" className={cx('btn')} variant="outline-danger">
              <UilTimes size={18} />
            </Button>
          </>
        ),
        // col6: moment(row.createdAt).format('LL'),
      };
    });
    setRow(dataRow);
  };

  const getListUserDetailTable = async () => {
    const res = await adminService.getAllFilmShowTime();
    if (res.errCode === 0) {
      convertToDataRow(res.data);
    }
  };

  useEffect(() => {
    getListUserDetailTable();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={cx('wrap', {
        show: true,
      })}
    >
      <div className={cx('container-content')}>
        <div className={cx('wrap-table')}>
          <h2 className={cx('title')}>Danh sách lịch chiếu của NTFMovies</h2>
          {/* <div class
          Name={cx('control')}>
            <div className={cx('wrap-more')}>
              <span className={cx('more-content')}>Ngày chiếu:</span>
              <span className={cx('more-number')}>{startDate}</span>
            </div>
            <div className={cx('wrap-more')}>
              <span className={cx('more-content')}>Phòng chiếu:</span>
              <span className={cx('more-number')}>0{roomId}</span>
            </div>
            <div className={cx('wrap-more')}>
              <span className={cx('more-content')}>Giờ chiếu: </span>
              <span className={cx('more-number')}>{startTime}</span>
            </div>
            <div className={cx('wrap-more')}>
              <span className={cx('more-content')}>Số vé hiện tại:</span>
              <span className={cx('more-number')}>{totalTicket}</span>
            </div>
            <div className={cx('wrap-more')}>
              <span className={cx('more-content')}>Tổng tiền:</span>
              <span className={cx('more-number', 'tl-right')}>VND</span>
            </div>
          </div> */}
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
        </div>
      </div>
    </div>
  );
}

export default TableShowTime;
