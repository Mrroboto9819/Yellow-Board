import React from 'react';
import CoursePageAdmin from 'pages/components/Dashboard/CoursePage/CoursePageAdmin';
import { useMediaQuery } from 'react-responsive';

const actividades = ({ cookies, course }) => {
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
    <CoursePageAdmin Mquery="D" cookies={cookies} course={course} />
  ) : isTablet ? (
    <CoursePageAdmin Mquery="T" cookies={cookies} course={course} />
  ) : isMobile ? (
    <CoursePageAdmin Mquery="M" cookies={cookies} course={course} />
  ) : null;
};

export const getServerSideProps = async ({ params, req }) => {
  let url = 'http://localhost:6500/api/courses/';
  const res = await fetch(url + params.id);
  const data = await res.json();
  let course = data.data;
  const { cookies } = req;
  // // console.log('from server:', course);
  return { props: { course, cookies: cookies || '' } };
};

export default actividades;
