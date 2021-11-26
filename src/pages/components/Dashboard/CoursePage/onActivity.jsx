import React, { useState, useEffect } from 'react';
import Styles from 'styles/oneCourse.module.scss';
import mainStyles from '../../../../styles/main.module.scss';
import ActivityCardStyles from '../../../../styles/activitycard.module.scss';
import { HashLoader } from 'react-spinners';
import { Button, Alert } from 'react-bootstrap';
import router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import FileCard from '../FileCard';

const onActivity = ({ activity, cookies }) => {
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
  let date = new Date(activity.OnePost.createdAt);
  let PostDate = `${date.getMonth()} / ${date.getDate()} / ${date.getFullYear()}`;

  let date2 = new Date(activity.OnePost.date);
  let LastDay = `${date2.getMonth()} / ${date2.getDate()} / ${date2.getFullYear()}`;
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (cookies.userData) {
      setcookiedata(JSON.parse(cookies.userData));
    }
    setLoading(false);
  }, []);

  const [FileList, setFileList] = useState([]);

  useEffect(() => {
    const GetFiles = async () => {
      let res = await axios.post('/api/delivery/UserDataDeliver', {
        id: activity.CourseData._id,
        activityDeliver: activity,
      });
      let data = res.data;
      setFileList(data.data);
      // console.log(data.data);
    };
    GetFiles();
  }, []);

  const GetFiles2 = async () => {
    let res = await axios.post('/api/delivery/UserDataDeliver', {
      id: activity.CourseData._id,
    });
    let data = res.data;
    setFileList(data.data);
    // console.log(data.data);
  };

  // console.log(activity);
  if (activity) {
    return (
      <div className={Styles.Main}>
        <div className={Styles.MainContainer}>
          <div className={Styles.MainHeader}>
            <p className={Styles.MainHeaderTitle}>
              {`Actividad ${activity.OnePost.activityNum} `}
            </p>
            <div>
              {cookieData.userType === 'm' || cookieData.userType === 'u' ? (
                <Button
                  variant="dark"
                  onClick={() => {
                    router.push(
                      `/dashboard/courses/${activity.CourseData._id}`
                    );
                  }}
                >
                  Regresar
                </Button>
              ) : (
                <Button
                  variant="dark"
                  onClick={() => {
                    router.push(`/admin/delivers/${activity.CourseData._id}`);
                  }}
                >
                  Regresar
                </Button>
              )}
            </div>
          </div>

          <hr />
          <div className={Styles.MainContent}>
            <div className={Styles.MainContentActivitys}>
              <div className={ActivityCardStyles.activityCard}>
                <div className={ActivityCardStyles.metadata}>
                  <p>
                    <span>Fecha de publicación: </span>
                    {PostDate}
                  </p>
                  <p>
                    <span>Fecha limite de entrega: </span>
                    {LastDay}
                  </p>
                </div>
                <h3>{activity.OnePost.postTitle}</h3>
                <p className={ActivityCardStyles.contend}>
                  {activity.OnePost.content}
                </p>
                <p className={ActivityCardStyles.ext}>Material Extra </p>
                {activity.OnePost.extraResource.length > 0 ? (
                  activity.OnePost.extraResource.map((link, key) => (
                    <div key={key} className={ActivityCardStyles.ExtraLinks}>
                      <Link target="_blank" href={link}>
                        <div className={ActivityCardStyles.ExtraLinksCard}>
                          <p
                            className={ActivityCardStyles.ExtraLinksCardTitle}
                          >{`Material Extra ${key + 1}`}</p>
                          <p
                            className={
                              ActivityCardStyles.ExtraLinksCardDescription
                            }
                          >{`Material de clase con el que te podras apoyar visita: ${link}`}</p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <Alert className={Styles.AlertText} variant="info">
                    No hay material extra
                  </Alert>
                )}
                <div className={ActivityCardStyles.footerAct}>
                  <a
                    className={ActivityCardStyles.showfile}
                    href={activity.OnePost.file}
                    download
                  >
                    Click para descargar documento
                  </a>
                  {cookieData.userType === 'm' ||
                  cookieData.userType === 'a' ? null : (
                    <Button className={ActivityCardStyles.btn} variant="dark">
                      Subir actividad
                    </Button>
                  )}
                </div>
              </div>

              <div className={ActivityCardStyles.activityCard}>
                <div className={ActivityCardStyles.header1}>
                  <span>Entregas de los alumnos</span>
                </div>
                <div>
                  {FileList && FileList.length > 0 ? (
                    FileList.map((file, key) => (
                      <FileCard
                        file={file}
                        key={key}
                        cookieData={cookieData}
                        activity={activity}
                        GetFiles2={GetFiles2}
                      />
                    ))
                  ) : (
                    <p>No hay entregas</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className={Styles.Main}>
        <div className={Styles.MainContainer}>
          <div className={Styles.the404}>
            <center>
              <p className={Styles.the404Text}>No Existe esta Actividad</p>
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

export default onActivity;
