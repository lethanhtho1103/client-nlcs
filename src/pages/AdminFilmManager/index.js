import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoginSelector, userSelector } from '~/redux/selector';
import { useSelector } from 'react-redux';
import { UilEstate } from '@iconscout/react-unicons';
import { UilListUl } from '@iconscout/react-unicons';
import { UilPlus } from '@iconscout/react-unicons';
import { Container, Row, Col } from 'react-bootstrap';
import { adminService } from '~/services';
import NavLeft from '~/components/NavLeft';
import classNames from 'classnames/bind';
import styles from './AdminFilmManager.module.scss';
import ListUserByTicket from '~/components/ListUserByTicket';
import TableListUserDetail from '~/components/TableListUserDetail';
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
  const [filmId, setFilmId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [roomId, setRoomId] = useState('');
  const [filmName, setFilmName] = useState('');
  const [totalTicket, setTotalTicket] = useState();
  const [priceTicket, setPriceTicket] = useState();

  const [isShowTable, setIsShowTable] = useState(false);
  const [listUsers, setListUsers] = useState([]);

  const controlPage = useCallback(() => {
    if (!isLogined) {
      navigate('/login');
    }

    if (curUser && curUser.type !== 'admin') {
      navigate('/');
    }
  }, [curUser, isLogined, navigate]);

  const toggleShowTable = () => {
    setIsShowTable((show) => {
      return !show;
    });
  };

  const handleCLickDetail = (filmId, startTime, startDate, totalTicket, roomId, filmName, priceTicket) => {
    setFilmId(filmId);
    setStartTime(startTime);
    setStartDate(startDate);
    setTotalTicket(totalTicket);
    setRoomId(roomId);
    setFilmName(filmName);
    setPriceTicket(priceTicket);
    setIsShowTable(true);
  };

  const getListUsers = async () => {
    const res = await adminService.getListUserAndSumTicket();
    if (res.errCode === 0) {
      setListUsers(res.data);
      // convertToDataRow(res.data);
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
                        <span
                          className={cx('detail-work-req')}
                          onClick={() =>
                            handleCLickDetail(
                              listUser.filmId,
                              listUser.startTime,
                              listUser.startDate,
                              listUser.totalTicket,
                              listUser.roomId,
                              listUser.film.name,
                              listUser.priceTicket,
                            )
                          }
                        >
                          Xem chi tiết
                        </span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            {isShowTable && (
              <TableListUserDetail
                row={listUsers}
                filmId={filmId}
                filmName={filmName}
                startTime={startTime}
                startDate={startDate}
                totalTicket={totalTicket}
                roomId={roomId}
                priceTicket={priceTicket}
                toggleShowTable={toggleShowTable}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminFilmManager;
