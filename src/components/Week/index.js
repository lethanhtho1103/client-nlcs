import dayjs from 'dayjs';
function Week({ dayOfWeek }) {
  if (dayOfWeek % 7 === dayjs().day()) {
    return 'Hôm nay';
  } else if (dayOfWeek % 7 === 0) {
    return 'Chủ nhật';
  } else if (dayOfWeek % 7 === 1) {
    return 'Thứ 2';
  } else if (dayOfWeek % 7 === 2) {
    return 'Thứ 3';
  } else if (dayOfWeek % 7 === 3) {
    return 'Thứ 4';
  } else if (dayOfWeek % 7 === 4) {
    return 'Thứ 5';
  } else if (dayOfWeek % 7 === 5) {
    return 'Thứ 6';
  } else if (dayOfWeek % 7 === 6) {
    return 'Thứ 7';
  }
}

export default Week;
