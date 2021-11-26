import Dstyles from '../../../styles/navbar.module.scss';
import Dstyles2 from '../../../styles/banner.module.scss';
import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { Alert } from 'react-bootstrap';

export default function Banner() {
  const [state, setstate] = useState({
    user: '',
    psw: '',
    session: false,
    loading: false,
    error: null,
    userData: {},
  });

  const [msg, setMsg] = useState(null);

  const setValue = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {msg === null ? (
        ''
      ) : (
        <Alert className={Dstyles2.alert} variant="danger">
          {msg}
        </Alert>
      )}
      <section className={Dstyles.LogoBanner}>
        <p>
          We are not just another <i>board</i>
        </p>
      </section>
      <div className={Dstyles2.Foreground}>
        <form>
          <input
            name="user"
            id="user"
            onChange={(e) => setValue(e)}
            type="text"
            placeholder="Username"
            className={Dstyles2.Username}
          />
          <input
            name="psw"
            onChange={(e) => setValue(e)}
            id="pws"
            type="password"
            placeholder="Password"
            className={Dstyles2.Password}
          />
          <button
            type="button"
            className={Dstyles2.Ingresar}
            onClick={async () => {
              let res = await axios.post('api/signin', state);
              let data = res.data;

              if (data.Success === true) {
                setMsg(JSON.stringify(data.msg));
                Cookies.set('session', true);
                if (data.data.userType === 'm' || data.data.userType === 'u') {
                  Router.push('/dashboard');
                }
                if (data.data.userType === 'a') {
                  Router.push('/admin');
                }
              }
              if (data.Success === false) {
                setMsg(JSON.stringify(data.msg));
                Router.push('/');
              }
              setTimeout(() => {
                setMsg(null);
              }, 3000);
            }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </>
  );
}
