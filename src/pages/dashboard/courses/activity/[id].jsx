import { useMediaQuery } from 'react-responsive';
import Navbar from '../../../components/Utils/Navbar';
import Footer from '../../../components/Utils/Footer';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import ActivityPages from '../../../components/Dashboard/CoursePage/onActivity';

export const getServerSideProps = async ({ params, req }) => {
  let url = 'http://localhost:6500/api/posts/';
  const res = await fetch(url + params.id);
  const data = await res.json();
  let activity = data.data;
  const { cookies } = req;
  return { props: { activity, cookies: cookies || '' } };
};

const curso = ({ activity, cookies }) => {
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

  // console.log(activity);
  return (
    <>
      <Navbar cookies={cookies} />
      <ActivityPages activity={activity} cookies={cookies} />
      <Footer />
    </>
  );
};

export default curso;
