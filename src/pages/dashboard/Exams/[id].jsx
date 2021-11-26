import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../../components/Utils/Navbar';
import Footer from '../../components/Utils/Footer';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import CreateExam from '../../components/Dashboard/CoursePage/CreateExam';
import axios from 'axios';

export const getServerSideProps = async ({ params, req }) => {
  let url = 'http://localhost:6500/api/courses/';
  const res = await fetch(url + params.id);
  const data = await res.json();
  let course = data.data;
  const { cookies } = req;
  return { props: { course: course || { _id: 404 }, cookies: cookies || '' } };
};

const curso = ({ course, cookies }) => {
  const [cookieData, setcookiedata] = useState({
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
  });

  const [courseData, setsourseData] = useState({
    _id: course._id,
    teacher: 'Not Found',
    courseName: 'Not Found',
    description: 'Not Found',
    students: 0,
    startDate: 'Not Found',
  });
  const [state, setstate] = useState({
    userCourses: [],
    userTasks: [],
  });

  useEffect(async () => {
    if (cookies.userData) {
      const { id } = JSON.parse(cookies.userData);
      let res = await axios.post('/api/courses/userinCourse', { id: id });

      let results = res.data;
      setstate({
        ...state,
        userCourses: results.data,
      });

      setsourseData(course);
    }
  }, []);
  const D = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const T = useMediaQuery({
    minWidth: 600,
    maxWidth: 1224,
  });
  const M = useMediaQuery({
    query: '(max-width: 599px)',
  });

  return (
    <>
      <Navbar cookies={cookies} />
      <CreateExam
        setcookiedata={setcookiedata}
        state={state}
        course={courseData}
        courseId={courseData._id}
        cookies={cookies}
      />
      <Footer />
    </>
  );
};

export default curso;
