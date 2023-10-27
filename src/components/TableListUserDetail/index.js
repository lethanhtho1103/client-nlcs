import TableListUser from '~/components/TableListUser';
import { UilAngleDoubleLeft } from '@iconscout/react-unicons';
import Moment from 'react-moment';
import classNames from 'classnames/bind';
import style from './TableListUserDetail.module.scss';
import { useEffect, useState } from 'react';
import { adminService } from '~/services';
const cx = classNames.bind(style);

function TableListUserDetail({ toggleShowTable, filmId, startTime, startDate, totalTicket }) {
  const [row, setRow] = useState([]);
  const columns = [
    { Header: 'STT', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Mã người dùng', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Tên người dùng', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Số vé', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Combo bắp nước', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Thành tiền', accessor: 'col6', disableSortBy: true },
  ];

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: index + 1,
        col2: row.startDate,
        col3: row.startTime,
        col4: row.ticket,
        col5: row.comment,
        col6: row.priceTicket,
        // col6: moment(row.createdAt).format('LL'),
      };
    });
    setRow(dataRow);
  };

  const getListUserDetailTable = async () => {
    const res = await adminService.getListUserDetailTable({ filmId, startTime, startDate });
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
        <div title="Quay lại" className={cx('icon-back')} onClick={toggleShowTable}>
          <UilAngleDoubleLeft size={28} />
        </div>
        <div className={cx('wrap-table')}>
          <h2 className={cx('title')}>Địa đàng sụp đổ</h2>
          <div className={cx('control')}>
            <div className={cx('wrap-more')}>
              <span className={cx('more-content')}>Ngày chiếu:</span>
              <span className={cx('more-number')}>{startDate}</span>
            </div>
            <div className={cx('wrap-more')}>
              <span className={cx('more-content')}>Phòng chiếu:</span>
              <span className={cx('more-number')}> </span>
            </div>
            <div className={cx('wrap-more')}>
              <span className={cx('more-content')}>Giờ chiếu: </span>
              <span className={cx('more-number')}>{startTime}</span>
            </div>
            <div className={cx('wrap-more')}>
              <span className={cx('more-content')}>Số vé tối đa: </span>
              <span className={cx('more-number')}>{}</span>
            </div>
            <div className={cx('wrap-more')}>
              <span className={cx('more-content')}>Hiện tại: </span>
              <span className={cx('more-number')}>{totalTicket}</span>
            </div>
          </div>
          <div className={cx('table')}>
            <TableListUser columns={columns} data={row} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableListUserDetail;
