import React, { useState, useEffect, useLayoutEffect } from 'react';
import Dstyles from '../../../styles/navbar.module.scss';
import mainStyles from '../../../styles/main.module.scss';
import HashLoader from 'react-spinners/HashLoader';

import Router from 'next/router';
import {
  Alert,
  Button,
  Container,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';

import useSound from 'use-sound';
// import song from '';

const Navbars = ({ Mquery, cookies }) => {
  const [Show, setShow] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [Song, setSong] = useState(1);
  const [didPlay, setdidPlay] = useState(false);
  const [loading, setloading] = useState(false);
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

  const [play, { stop }] = useSound(`/assets/songs/${Song}.mp3`, {
    playbackRate,
    interrupt: true,
    volume: 1,
  });
  const renderTooltip = (props) => (
    <Tooltip className={Dstyles.whiteTooltip} id="button-tooltip" {...props}>
      {`Hey no me piques! o te pondre musica >:c`}
    </Tooltip>
  );

  const [count, setcount] = useState(0);
  const session = Cookies.get('session');

  useLayoutEffect(() => {
    setloading(true);
  }, []);

  useEffect(() => {
    if (cookies.userData && session === 'true') {
      setcookiedata(JSON.parse(cookies.userData));
    } else if (cookies.userData && session === 'false') {
      logOut();
    } else if (!cookies.userData && session === 'true') {
      Router.push('/');
      Cookies.set('session', false);
    } else if (!cookies.userData && session === 'false') {
      Router.push('/');
    } else {
      Router.push('/');
      Cookies.set('session', 'false');
    }

    if (cookieData.userType === 'a') {
      Router.push('/admin ');
    }
    if (cookieData.userType === 'u' || cookieData.userType === 'm') {
      Router.push('/dashboard');
    }

    setTimeout(() => {
      setloading(false);
    }, 2500);
  }, []);

  const logOut = async () => {
    await axios.get('/api/logout');
    Cookies.set('session', false);
    Router.push('/');
  };

  const theSong = () => {
    setcount(count + 1);
    if (count >= 10) {
      setShow(true);
    }
  };
  return (
    <Navbar expand="lg" variant="dark" bg="dark" className={Dstyles.nav}>
      <div>
        <div onClick={theSong}>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <img
              onClick={() => {
                if (cookieData) {
                  if (
                    (cookieData && cookieData.userType === 'u') ||
                    cookieData.userType === 'm'
                  ) {
                    Router.push('/dashboard');
                  } else if (cookieData.userType === 'a') {
                    Router.push('/admin');
                  }
                }
                if (!cookieData) {
                  Router.push('/');
                }
              }}
              className={Dstyles.navLogo}
              src="https://media.discordapp.net/attachments/906891142602305606/906911978646290452/yellowboard-removebg-preview1.png"
              alt="yellowboar-logo"
            />
          </OverlayTrigger>
        </div>
        {count >= 10 ? (
          <Alert show={Show} className={Dstyles.alert} variant="success">
            <center>
              <p>
                Te dije que no ahora te pondre este rolon!
                <b> Dale PLAY!</b>
                <br />
                {count >= 10 ? (
                  <>
                    <Button
                      onClick={() => stop()}
                      variant="light"
                      className={Dstyles.btnm}
                    >
                      <img
                        src="https://cdn0.iconfinder.com/data/icons/music-sets/500/219-512.png"
                        alt="play button"
                      />
                    </Button>
                    <Button
                      onClick={() => {
                        setShow(true);
                        setdidPlay(true);
                        play();
                      }}
                      variant="light"
                      className={Dstyles.btnm}
                    >
                      <img
                        src="https://vectorified.com/images/play-icon-png-14.png"
                        alt="play button"
                      />
                    </Button>
                  </>
                ) : null}
              </p>
              {didPlay === true ? (
                <img
                  src="https://c.tenor.com/TbrvG1UPBX8AAAAd/never-gonna-give-you-up-dont-give.gif"
                  alt="Rickroll!!!!!1"
                />
              ) : null}
              <p>number of click: {count}</p>
              <Button onClick={() => setShow(false)} variant="success">
                Close
              </Button>
            </center>
          </Alert>
        ) : null}
      </div>
      {session === 'true' ? (
        <div className={Dstyles.navProfile}>
          <div className={Dstyles.navProfileCont}>
            <img
              className={Dstyles.navProfileImg}
              src={cookieData.url}
              alt={`Profile of ${cookieData.name}`}
            />
            <p className={Dstyles.profileName}>
              {cookieData.name}
              <span>{cookieData.lastname}</span>
            </p>
            <p className={Dstyles.profileLogout} onClick={logOut}>
              SALIR
            </p>
          </div>
        </div>
      ) : null}
    </Navbar>
  );
};

export default Navbars;
