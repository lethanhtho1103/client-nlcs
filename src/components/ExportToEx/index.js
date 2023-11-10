import { Button } from 'react-bootstrap';
import * as XLSX from 'xlsx/xlsx.mjs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-regular-svg-icons';

import styles from './ExportToEx.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function ExportToEx({ data, handelGetCornWater, totalComboPrice, filmName, totalTicket }) {
  const convertData = (data) => {
    return data.map((data, index) => {
      return {
        STT: index + 1,
        'Mã người dùng': data.userId,
        'Tên người dùng': data.userFilm.name,
        'Số ghế': data.seat,
        'Combo bắp nước': handelGetCornWater(data.detailListUser) || 'Không có',
        'Thành tiền': totalComboPrice(data.detailListUser) + data.priceTicket * data.ticket,
      };
    });
  };

  const handleClickExportFile = () => {
    if (!data) return;
    const dataConvert = convertData(data);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataConvert, { origin: 'B5' });

    const mergeCellStyle = {
      alignment: { horizontal: 'center', vertical: 'center' },
      font: { bold: true },
    };

    XLSX.utils.aoa_to_sheet([
      ['', 'Cell B3', 'Cell C3', 'Cell D3', 'Cell E3', 'Cell F3', 'Cell G3'],
      ['', '', '', '', '', '', ''],
    ]);
    worksheet['!merges'] = [{ s: { r: 2, c: 1 }, e: { r: 2, c: 6 } }];
    worksheet['!cols'] = [{ autoWidth: true }];

    // worksheet['B4'].v = { s: mergeCellStyle, v: 'Danh sách tham gia tình nguyện' };

    worksheet['B3'] = { t: 's', v: `Danh sách khách hàng đặt vé phim "${filmName}"` };
    worksheet['B3'].s = mergeCellStyle;

    const startColIndex = 1; // cột B
    const endColIndex = 10; // cột K

    // Thay đổi chiều rộng cho từng cột trong khoảng B-K
    for (let colIndex = startColIndex; colIndex <= endColIndex; colIndex++) {
      if (!worksheet['!cols']) {
        worksheet['!cols'] = [];
      }

      if (!worksheet['!cols'][colIndex] && [7, 8].indexOf(colIndex) === -1) {
        worksheet['!cols'][colIndex] = {};
      }
    }
    worksheet['!cols'][1] = { width: 6 };
    worksheet['!cols'][2] = { width: 18 };
    worksheet['!cols'][3] = { width: 26 };
    worksheet['!cols'][4] = { width: 12 };
    worksheet['!cols'][5] = { width: 24 };
    worksheet['!cols'][6] = { width: 16 };
    worksheet['!cols'][9] = { width: 16 };
    worksheet['!cols'][10] = { width: 14 };

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        ['Ngày chiếu', data[0].startDate],
        ['Giờ chiếu', data[0].startTime],
        ['Phòng chiếu', `0${data[0].roomId}`],
        ['Số vé hiện tại', totalTicket],
      ],
      { origin: 'J5' },
    );

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách vé của khách hàng');
    XLSX.writeFile(workbook, `volunter_${new Date().getTime()}.xlsx`);
  };

  return (
    <Button variant="outline-success" className={cx('btn-export')} onClick={handleClickExportFile}>
      Xuất ra file
      <FontAwesomeIcon icon={faFileExcel} />
    </Button>
  );
}

export default ExportToEx;
