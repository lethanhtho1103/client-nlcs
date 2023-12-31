import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UilEstate } from '@iconscout/react-unicons';
import NavLeft from '~/components/NavLeft';
import { useSelector } from 'react-redux';
import { isLoginSelector } from '~/redux/selector';
import classNames from 'classnames/bind';
import styles from './AdminStatistical.module.scss';
import { AdminShowTimeProvider } from '~/Context/AdminShowTimeContext';
import { Tab, Tabs } from 'react-bootstrap';
import UserParStatistical from '~/components/UserParStatistical/UserParStatistical';
import CornWaterStatistical from '~/components/CornWaterStatistical/CornWaterStatistical';

const cx = classNames.bind(styles);

const menu = {
  title: 'NTFMovies',
  desc: [
    {
      title: 'Trang chủ',
      to: '/',
      icon: UilEstate,
    },
  ],
};

function AdminStatistical() {
  const isLogined = useSelector(isLoginSelector);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('student-par');

  const controlPage = useCallback(() => {
    if (!isLogined) {
      navigate('/login');
    }
  }, [isLogined, navigate]);

  function handleTabSelect(key) {
    setActiveTab(key);
  }

  useEffect(() => {
    controlPage();
  }, [controlPage]);

  return (
    <AdminShowTimeProvider>
      <div className={cx('wrap')}>
        <NavLeft menu={menu} location="map" />
        <div className={cx('map')}>
          <div className={cx('menu-control')}>
            <a href="/">Trang chủ</a>/<span> Thống kê</span>
          </div>
          <Tabs
            defaultActiveKey="student-par"
            id="work"
            className="mb-3"
            activeKey={activeTab}
            onSelect={handleTabSelect}
          >
            <Tab
              eventKey="student-par"
              tabClassName={cx({
                active: activeTab === 'student-par',
              })}
              title="Doanh thu phim"
            >
              <UserParStatistical />
            </Tab>
            <Tab
              eventKey="post"
              title="Doanh thu bắp nước"
              tabClassName={cx({
                active: activeTab === 'post',
              })}
            >
              <CornWaterStatistical />
            </Tab>
          </Tabs>
        </div>
      </div>
    </AdminShowTimeProvider>
  );
}

export default AdminStatistical;
