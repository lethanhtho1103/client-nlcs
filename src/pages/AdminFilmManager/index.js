import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoginSelector, userSelector } from '~/redux/selector';
import { useSelector } from 'react-redux';
import { UilEstate } from '@iconscout/react-unicons';
// import Loader from '~/components/Loader';
import { UilListUl } from '@iconscout/react-unicons';
import { UilPlus } from '@iconscout/react-unicons';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { filmService } from '~/services';
import NavLeft from '~/components/NavLeft';
import classNames from 'classnames/bind';
import styles from './AdminFilmManager.module.scss';
import ListUserByTicket from '~/components/ListUserByTicket';
import TableListUser from '~/components/TableListUser';
import { UilCheck } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import { UilAngleDoubleLeft } from '@iconscout/react-unicons';
import { UilLabelAlt } from '@iconscout/react-unicons';
import Moment from 'react-moment';
const cx = classNames.bind(styles);

const menu = {
  title: 'NTFMovies',
  desc: [
    {
      title: 'Trang chủ',
      to: '/',
      icon: UilEstate,
    },
    {
      title: 'Xem danh sách người mua vé',
      to: '/admin/view/list-user-work',
      icon: UilListUl,
    },
    {
      title: 'Tạo phim mới',
      icon: UilPlus,
      type: 'create-film',
    },
  ],
};

function AdminFilmManager() {
  const navigate = useNavigate();
  const isLogined = useSelector(isLoginSelector);
  const curUser = useSelector(userSelector);
  const [row, setRow] = useState([]);

  // const [isShowTable, setIsShowTable] = useState(false);
  const [listUsers, setListUsers] = useState([]);

  // const [currWorkId, setCurrWorkId] = useState('');

  const controlPage = useCallback(() => {
    if (!isLogined) {
      navigate('/login');
    }

    if (curUser && curUser.type !== 'admin') {
      navigate('/');
    }
  }, [curUser, isLogined, navigate]);

  // const toggleShowTable = () => {
  //   setIsShowTable((show) => {
  //     return !show;
  //   });
  // };

  // const handleCLickDetail = (workId) => {
  //   setCurrWorkId(workId);
  //   setIsShowTable(true);
  // };
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

  // const getTable = () => {
  //   const data = convertToDataRow(listUsers);
  //   setRow(data);
  // };

  const getListUsers = async () => {
    const res = await filmService.getAllListUser();
    if (res.errCode === 0) {
      setListUsers(res.data);
      convertToDataRow(res.data);
    }
  };

  useEffect(() => {
    controlPage();
    getListUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlPage]);

  return (
    <div className={cx('wrap')}>
      <NavLeft menu={menu} location="work" />
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={9} className={cx('wrap-req')}>
            <div className={cx('menu-control')}>
              <a href="/">Trang chủ</a>/<span> Danh sách đặt vé</span>
            </div>
            <h2 className={cx('title')}>Danh sách đặt vé của người dùng</h2>
            {/* <ListUserByTicket showTimes={showTimes} /> */}

            <div className={cx('works')}>
              {listUsers.length === 0 ? (
                <h2 className={cx('no-req')}>Chưa có người dùng nào đặt vé!</h2>
              ) : (
                <>
                  {listUsers.map((listUser) => {
                    return (
                      <div key={listUser.id} className={cx('wrap-work')}>
                        <ListUserByTicket listUser={listUser} />
                        <span className={cx('detail-work-req')}>Xem chi tiết</span>
                      </div>
                    );
                  })}
                  {/* <div
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
                            <span className={cx('more-number')}>
                              <Moment local="vi" format="ll">
                                22/12/2023
                              </Moment>
                            </span>
                          </div>
                          <div className={cx('wrap-more')}>
                            <span className={cx('more-content')}>Phòng chiếu:</span>
                            <span className={cx('more-number')}> </span>
                          </div>
                          <div className={cx('wrap-more')}>
                            <span className={cx('more-content')}>Giờ chiếu: </span>
                            <span className={cx('more-number')}>19:00</span>
                          </div>
                          <div className={cx('wrap-more')}>
                            <span className={cx('more-content')}>Số vé tối đa: </span>
                            <span className={cx('more-number')}> 2000</span>
                          </div>
                          <div className={cx('wrap-more')}>
                            <span className={cx('more-content')}>Hiện tại: </span>
                            <span className={cx('more-number')}> 30</span>
                          </div>
                        </div>
                        <div className={cx('table')}>
                          <TableListUser columns={columns} data={row} />
                        </div>
                      </div>
                    </div>
                  </div> */}
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      {/* {isShowTable && (
        <ListRequestWork
          getNameWorkAndCountRes={getNameWorkAndCountRes}
          workId={currWorkId}
          show={isShowTable}
          toggleShowTable={toggleShowTable}
        />
      )} */}
    </div>
  );
}

export default AdminFilmManager;
