import React from 'react';
import adminStyles from '../../../styles/admin.module.scss';

import Adminbtn from './Adminbtn';

const Admin = () => {
  return (
    <div className={adminStyles.admin}>
      <div className={adminStyles.adminCont}>
        <Adminbtn
          path="alumnos"
          title="Administrar usuarios"
          icon="/assets/icons/user.png"
        />
        <Adminbtn
          path="courses"
          title="Administrar cursos"
          icon="/assets/icons/courses.png"
        />
      </div>
    </div>
  );
};

export default Admin;
