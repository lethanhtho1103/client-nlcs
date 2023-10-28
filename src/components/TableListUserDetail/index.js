import DataTable from '~/components/DataTable';
import { UilAngleDoubleLeft } from '@iconscout/react-unicons';
import classNames from 'classnames/bind';
import style from './TableListUserDetail.module.scss';
import { useEffect, useState } from 'react';
import { adminService } from '~/services';
const cx = classNames.bind(style);

function TableListUserDetail({
  toggleShowTable,
  filmId,
  filmName,
  startTime,
  startDate,
  roomId,
  totalTicket,
  priceTicket,
}) {
  const [row, setRow] = useState([]);
  const [sumPrice, setSumPrice] = useState(0);

  const columns = [
    { Header: 'STT', accessor: 'col1', filter: 'fuzzyText' },
    { Header: 'Mã người dùng', accessor: 'col2', filter: 'fuzzyText' },
    { Header: 'Tên người dùng', accessor: 'col3', filter: 'fuzzyText' },
    { Header: 'Số vé', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Combo bắp nước', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Số lượng combo', accessor: 'col6', filter: 'fuzzyText' },
    { Header: 'Thành tiền', accessor: 'col7', disableSortBy: true },
  ];

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: index + 1,
        col2: row.userId,
        col3: row.userFilm.name,
        col4: row.ticket,
        col5: row.cornWaterId,
        col6: row.quantityCombo,
        col7: `${numberWithCommas(row.priceTicket * row.ticket)} VND`,
        // col6: moment(row.createdAt).format('LL'),
      };
    });
    setRow(dataRow);
  };

  const getListUserDetailTable = async () => {
    const res = await adminService.getListUserDetailTable({ filmId, startTime, startDate });
    if (res.errCode === 0) {
      convertToDataRow(res.data);
      handleGetSumPrice(res.data);
    }
  };

  const handleGetSumPrice = (data) => {
    const initPrice = 0;
    const sumPrice = data.reduce((acc, curr) => acc + curr.priceTicket * curr.ticket, initPrice);
    setSumPrice(sumPrice);
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
          <h2 className={cx('title')}>{filmName}</h2>
          <div className={cx('control')}>
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
              <span className={cx('more-number', 'tl-right')}>{numberWithCommas(sumPrice)} VND</span>
            </div>
          </div>
          <div className={cx('table')}>
            <DataTable columns={columns} data={row} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableListUserDetail;
