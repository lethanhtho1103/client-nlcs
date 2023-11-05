import DataTable from '~/components/DataTable';
import { UilAngleDoubleLeft } from '@iconscout/react-unicons';
import classNames from 'classnames/bind';
import style from './TableListUserDetail.module.scss';
import { useEffect, useState } from 'react';
import { adminService } from '~/services';
import { UilLabelAlt } from '@iconscout/react-unicons';

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
    { Header: 'Số ghế', accessor: 'col4', filter: 'fuzzyText' },
    { Header: 'Combo bắp nước', accessor: 'col5', filter: 'fuzzyText' },
    { Header: 'Thành tiền', accessor: 'col6', filter: 'fuzzyText' },
  ];

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  const handelGetCornWater = (detailCombos) => {
    let comboString = '';
    detailCombos?.forEach((combo) => {
      comboString = comboString + `${combo.quantity} x ${combo.cornWaterId}, `;
    });
    return comboString.slice(0, comboString.lastIndexOf(','));
  };

  const totalComboPrice = (detailCombos) => {
    const initialValue = 0;
    const sumWithInitial = detailCombos.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.detailCornWater.price,
      initialValue,
    );
    return sumWithInitial;
  };

  const convertToDataRow = (row) => {
    const dataRow = row.map((row, index) => {
      return {
        col1: index + 1,
        col2: row.userId,
        col3: row.userFilm.name,
        col4: row.seat,
        col5: handelGetCornWater(row.detailListUser) || 'Không có',
        col6: `${numberWithCommas(totalComboPrice(row.detailListUser) + row.priceTicket * row.ticket)} VND`,
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
    const sumPrice = data.reduce(
      (acc, curr) => acc + curr.priceTicket * curr.ticket + totalComboPrice(curr.detailListUser),
      initPrice,
    );

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
              <span className={cx('more-content')}>Đơn giá:</span>
              <span className={cx('more-number')}>{numberWithCommas(priceTicket)} VND</span>
            </div>
            <div className={cx('wrap-more')}>
              <span className={cx('more-content')}>Tổng tiền:</span>
              <span style={{ color: 'red' }} className={cx('more-number', 'tl-right')}>
                {numberWithCommas(sumPrice)} VND
              </span>
            </div>
          </div>
          <div className={cx('note')}>
            Ghi chú:
            <ul className={cx('note-list')}>
              <li className={cx('note-item')}>
                <UilLabelAlt size={12} className={cx('list-tyle')} />
                CW01: 01 bắp lớn vị ngọt + 02 nước lớn + 01 xúc xích lốc xoáy (181.000 VND)
              </li>
              <li className={cx('note-item')}>
                <UilLabelAlt size={12} className={cx('list-tyle')} />
                CW02: 01 bắp lớn vị ngọt + 01 nước lớn + 01 khoai lắc (150.000 VND)
              </li>
              <li className={cx('note-item')}>
                <UilLabelAlt size={12} className={cx('list-tyle')} />
                CW03: 01 bắp lớn vị ngọt + 01 nước lớn + 01 xúc xích lốc xoáy (150.000 VND)
              </li>
              <li className={cx('note-item')}>
                <UilLabelAlt size={12} className={cx('list-tyle')} />
                CW04: 01 bắp lớn vị ngọt + 02 nước lớn + 01 khoai lắc (179.000 VND)
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

export default TableListUserDetail;
