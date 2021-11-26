import { useState, useEffect, useLayoutEffect } from 'react';
import Navbar from '../Utils/Navbar';
import Footer from '../Utils/Footer';
import Admin from './Admin';
import mainStyles from '../../../styles/main.module.scss';
import AdminStyles from '../../../styles/admin.module.scss';
import HashLoader from 'react-spinners/HashLoader';
import Router from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

// const Admin = lazy(() => import('./Admin'));

const AdminDash = ({ Mquery, cookies }) => {
  useLayoutEffect(() => {
    setloading(true);
  }, []);

  useEffect(() => {
    if (cookies.userData && session === 'true') {
      setcookiedata(JSON.parse(cookies.userData));
    }
    setTimeout(() => {
      setloading(false);
    }, 1500);
  }, []);

  const session = Cookies.get('session');
  const [time, setTime] = useState(5);
  const [loading, setloading] = useState(false);
  const [Show, setShow] = useState(false);
  const [cookieData, setcookiedata] = useState({
    userData: {
      id: '',
      username: '',
      name: '',
      lastname: '',
      password: '',
      userType: '',
      mail: '',
      url: '/assets/profile/default.png',
      direccion: '',
      phone: '',
      birthday: '',
    },
  });

  if (loading === true) {
    return (
      <>
        <Navbar Mquery={Mquery} cookies={cookies} />
        <div className={mainStyles.perload}>
          <div className={mainStyles.preloadCard}>
            <p className={mainStyles.preloadTitle}>
              Welcome back {cookieData.name}!
            </p>
            <HashLoader color="#ffc400" loading={loading} size={100} />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Navbar Mquery={Mquery} cookies={cookies} />
      <div className={AdminStyles.bgcolor}>
        <p className={AdminStyles.HeaderTitleDash}> Panel de Administracion</p>
        <Admin />
      </div>
      <Footer Mquery={Mquery} />
    </div>
  );
};

export default AdminDash;
