import React from 'react';
import Dstyles from '../../../styles/footer.module.scss';

const Footer = (Mquery) => {
  return (
    <>
      <footer className={Dstyles.footer}>
        <p className={Dstyles.textFooter}>
          © 2021 Avocado's Network. All Rights Reserved. Developed and deploy
          with 🥑 by{' '}
          <a href="https://github.com/Mrroboto9819" target="_blank">
            @Mrroboto9819
          </a>
          ,{' '}
          <a href="https://github.com/NaH-22" target="_blank">
            @NaH-22
          </a>
          ,{' '}
          <a href="https://github.com/john024x" target="_blank">
            @John024x
          </a>
          ,{' '}
          <a href="https://www.twitch.tv/circlees" target="_blank">
            @circlees
          </a>{' '}
          and{' '}
          <a href="https://www.twitch.tv/torusmaximus" target="_blank">
            @Chikilin
          </a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
