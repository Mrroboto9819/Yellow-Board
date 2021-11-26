import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StylesMenu from '../../../styles/menu.module.scss';

const Menu = ({ setView, data, view }) => {
  useEffect(() => {
    if (view === 'cursos') {
      document.getElementById('cursos').classList.add('active');
      document.getElementById('perfil').classList.remove('active');
    }
    if (view === 'perfil') {
      document.getElementById('perfil').classList.add('active');
      document.getElementById('cursos').classList.remove('active');
    }
  }, [view]);

  return (
    <>
      <aside className={StylesMenu.menu}>
        <>
          <p className={StylesMenu.user}>Bienvenid@ {data.name || ''}</p>
          <a
            href="#courses"
            id="cursos"
            onClick={() => {
              setView('cursos');
            }}
          >
            Cursos
          </a>
          <a
            href="#profile"
            id="perfil"
            onClick={(e) => {
              setView('perfil');
            }}
          >
            Perfil
          </a>
        </>
      </aside>
    </>
  );
};

export default Menu;
