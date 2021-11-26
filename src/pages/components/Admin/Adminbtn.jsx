import React from 'react';
import adminStyles from '../../../styles/adminbtn.module.scss';
import Router from 'next/router';

const Adminbtn = ({ path, icon, title }) => {
  const setPath = () => {
    Router.push(`/admin/${path}`);
  };

  return (
    <div onClick={() => setPath()} className={adminStyles.btn}>
      <img
        className={adminStyles.btnImg}
        src={icon}
        alt={`admin icon for ${title}`}
      />
      <p className={adminStyles.btnTitle}>{title}</p>
    </div>
  );
};

export default Adminbtn;
