import React from 'react';
import { useMediaQuery } from 'react-responsive';
import AdminCourses from 'pages/components/Admin/Views/adminCourses';

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
    <AdminCourses Mquery="D" cookies={cookies} />
  ) : isTablet ? (
    <AdminCourses Mquery="T" cookies={cookies} />
  ) : isMobile ? (
    <AdminCourses Mquery="M" cookies={cookies} />
  ) : null;
};

export const getServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const { cookies } = req;

  return { props: { cookies: cookies || '' } };
};

export default adminAlumnos;
