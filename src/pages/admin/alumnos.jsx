import React from 'react';
import { useMediaQuery } from 'react-responsive';
import AdminUsers from 'pages/components/Admin/Views/adminUsers';

const adminAlumnos = ({ cookies }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isTablet = useMediaQuery({
    minWidth: 600,
    maxWidth: 1224,
  });
  const isMobile = useMediaQuery({
    query: '(max-width: 599px)',
  });
  return isDesktopOrLaptop ? (
    <AdminUsers Mquery="D" cookies={cookies} />
  ) : isTablet ? (
    <AdminUsers Mquery="T" cookies={cookies} />
  ) : isMobile ? (
    <AdminUsers Mquery="M" cookies={cookies} />
  ) : null;
};

export const getServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const { cookies } = req;
  let fakeCookie = {
    userData:
      '"id":"Error","username":"Error","name":"Error","lastname":"Error","password":"Error","userType":"u","mail":"error","url":"/assets/profile/default.png","direccion":"Error","phone":"Error","birthday":"2021-11-30"',
  };
  return { props: { cookies: cookies || fakeCookie } };
};

export default adminAlumnos;
