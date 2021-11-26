import React, { lazy, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
// import Main from './components/Main/Main';
const Main = lazy(() => import('./components/Main/Main'));

const index = ({ cookies }) => {
  const TheLoading = () => (
    <HashLoader color="#ffc400" loading={loading} size={100} />
  );
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
    <Suspense fallback={TheLoading}>
      <Main Mquery="D" cookies={cookies} />
    </Suspense>
  ) : isTablet ? (
    <Suspense fallback={TheLoading}>
      <Main Mquery="T" cookies={cookies} />
    </Suspense>
  ) : isMobile ? (
    <Suspense fallback={TheLoading}>
      <Main Mquery="M" cookies={cookies} />
    </Suspense>
  ) : null;
};

export const getServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const { cookies } = req;

  return { props: { cookies: cookies || '' } };
};

export default index;
