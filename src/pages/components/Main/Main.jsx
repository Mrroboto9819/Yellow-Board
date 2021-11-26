import React, { useEffect, useState, useLayoutEffect } from 'react';
import Navbar from '../Utils/Navbar';
import Banner from './Banner';
import Incentivos from './Incentivos';
import Footer from '../Utils/Footer';
import Router from 'next/router';
import { PacmanLoader, HashLoader } from 'react-spinners';
import mainStyles from '../../../styles/main.module.scss';
import Cookies from 'js-cookie';

export default function Main({ Mquery, cookies }) {
  const [loading, setloading] = useState(false);
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

  useEffect(() => {
    setloading(true);
    let session = Cookies.get('session');
    if (cookies.userData && session === 'true') {
      setcookiedata(JSON.parse(cookies.userData));
    }
    if (cookieData.userType === 'a') {
      Router.push('/admin');
    } else if (cookieData.userType === 'u' || cookieData.userType === 'm') {
      Router.push('/dashboard');
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2500);
  }, []);

  if (loading === true) {
    return (
      <>
        <Navbar Mquery={Mquery} cookies={cookies} />
        <div className={mainStyles.perload}>
          <div className={mainStyles.preloadCard}>
            <p className={mainStyles.preloadTitle}>Page loading...</p>
            <HashLoader color="#ffc400" loading={loading} size={100} />
          </div>
        </div>
        <Footer Mquery={Mquery} />
      </>
    );
  }

  return (
    <>
      <Navbar Mquery={Mquery} cookies={cookies} />
      <Banner />
      <Incentivos />
      <Footer Mquery={Mquery} />
    </>
  );
}
