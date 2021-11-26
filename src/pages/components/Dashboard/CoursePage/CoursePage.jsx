import React, { useState, useEffect, useLayoutEffect } from 'react';
import ActivityCard from '../ActivityCard';
import Styles from 'styles/oneCourse.module.scss';
import mainStyles from '../../../../styles/main.module.scss';
import { Button } from 'react-bootstrap';
import router from 'next/router';
import ButtonNew from '../ButtonNew';
import { HashLoader } from 'react-spinners';
import axios from 'axios';

const CoursePage = ({ state, course, cookies }) => {
  const [ifChange, setifChange] = useState(false);

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
    if (course) getpost(course._id);
  }, []);

  const getpost = async (id) => {
    let obj = {
      courseId: id,
    };
    let res = await axios.post('/api/posts/AllPosts', obj);
    let data = res.data;
    setCourseList(data.data);
  };

  const [courseList, setCourseList] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (cookies.userData) {
      setcookiedata(JSON.parse(cookies.userData));
    }
    setLoading(false);
  }, []);

  if (course) {
    if (state.userCourses.some((el) => el.courseId == course._id) === true) {
      return (
        <div className={Styles.Main}>
          <div className={Styles.MainContainer}>
            <div className={Styles.MainHeader}>
              <p className={Styles.MainHeaderTitle}>{course.courseName}</p>
              <div>
                <Button
                  variant="dark"
                  onClick={() => router.push('/dashboard')}
                >
                  Regresar
                </Button>
                {cookieData.userType === 'm' || cookieData.userType === 'a' ? (
                  <ButtonNew
                    setLoading={setLoading}
                    setCourseList={setCourseList}
                    cookieData={cookieData}
                    ifChange={ifChange}
                    setifChange={setifChange}
                    course={course}
                    getpost={getpost}
                  />
                ) : null}
              </div>
            </div>

            <hr />
            <div className={Styles.MainContent}>
              <p className={Styles.MainContentTitle}>Actividades</p>
              <div className={Styles.MainContentActivitys}>
                {Loading === true ? (
                  <div className={mainStyles.preloadCard}>
                    <p className={mainStyles.preloadTitle2}>Loading...</p>
                    <HashLoader />
                  </div>
                ) : courseList.length > 0 ? (
                  courseList.map((item, key) => (
                    <ActivityCard
                      cookieData={cookieData}
                      setCourseList={setCourseList}
                      setLoading={setLoading}
                      item={item}
                      ifChange={ifChange}
                      setifChange={setifChange}
                      course={course}
                      key={key}
                      getpost={getpost}
                    />
                  ))
                ) : (
                  <div className={mainStyles.nothingCount}>
                    <p className={mainStyles.nothing}>No tienes actividades</p>
                    <center>
                      <img
                        className={mainStyles.nothingImg}
                        src="https://cdn.lowgif.com/full/2df4642bdfe3f1cf-confetti-explosion-gif-www-pixshark-com-images.gif"
                        alt="error loading"
                      />
                    </center>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  if (!course) {
    return (
      <div className={Styles.Main}>
        <div className={Styles.MainContainer}>
          <div className={Styles.the404}>
            <center>
              <p className={Styles.the404Text}>No Existe este curso</p>
              <p className={Styles.the404TextSmall}>
                Si crees que es un error contacta a tu administrador
              </p>
              <br />
              <img
                className={Styles.the404Img}
                src="https://cdn-images-1.medium.com/max/800/1*qdFdhbR00beEaIKDI_WDCw.gif"
                alt="404"
              />
              <br />
              <br />
              <Button variant="dark" onClick={() => router.push('/dashboard')}>
                Regresar
              </Button>
            </center>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={Styles.Main}>
      <div className={Styles.MainContainer}>
        <div className={mainStyles.preloadCard}>
          <p className={mainStyles.preloadTitle2}>Loading...</p>
          <HashLoader />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
