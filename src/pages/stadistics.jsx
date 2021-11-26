import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Profile from './components/Dashboard/Profile';

const profile = () => {
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
    <Profile Mquery="D" />
  ) : isTablet ? (
    <Profile Mquery="T" />
  ) : isMobile ? (
    <Profile Mquery="M" />
  ) : null;
};
export default profile;
