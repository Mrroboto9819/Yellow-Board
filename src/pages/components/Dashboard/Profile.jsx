import React, { useState, useEffect } from 'react';
import mainStyles from '../../../styles/main.module.scss';
import profileStyles from '../../../styles/profile.module.scss';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { Button, Alert } from 'react-bootstrap';

const Profile = ({ Mquery, data, uid }) => {
  useEffect(() => {
    getUser();
  }, [update]);

  const [Alertshow, setAlertshow] = useState('');
  const [image, setImage] = useState('');
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const uploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];

      if (!i) {
        setAlertshow('Error imagen no admitida o no hay imagen');
        setTimeout(() => {
          setAlertshow('');
        }, 5000);
        setImage(i);
        return (
          <Alert className={profileStyles.alert} variant="danger">
            {Alertshow}
          </Alert>
        );
      }

      if (i.name === state.udta[0].url) {
        setAlertshow('La imagen es la misma...');
        setTimeout(() => {
          setAlertshow('');
        }, 5000);
      } else {
        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
      }
    }
  };

  const uploadToServer = async () => {
    if (image) {
      if (image.name.replace(/\s/g, '_') === state.udta[0].url) {
        setAlertshow('La imagen es la misma...');
        setTimeout(() => {
          setAlertshow('');
        }, 5000);
      } else {
        const body = new FormData();
        body.append('file', image);
        let response = await fetch('/api/file/img', {
          method: 'POST',
          body,
        });
        let resp = await axios.put(`/api/file/img/${uid}`, {
          url: `/assets/profile/${image.name.replace(/\s/g, '_')}`,
        });
      }
    } else {
      setAlertshow('Subir una imagen');
      setTimeout(() => {
        setAlertshow('');
      }, 5000);
    }
  };
  const [state, setstate] = useState({ loading: false });
  const [update, setupdate] = useState(false);
  const [btntype, setbtntype] = useState('dark');
  const getUser = async () => {
    setstate({ ...state, loading: true });
    let res = await axios.post('/api/profile', { id: uid });
    let datas = res.data;

    setstate({ ...state, udta: datas.data, loading: false });
    setCreateObjectURL(data.url);
  };
  return (
    <div className={profileStyles.contenido}>
      {Alertshow != '' ? (
        <Alert variant="danger" className={profileStyles.alert}>
          {Alertshow}
        </Alert>
      ) : null}
      {state.loading === true ? (
        <div className={mainStyles.preloadCard}>
          <p className={mainStyles.preloadTitle2}>Loading...</p>
          <HashLoader />
        </div>
      ) : state.udta ? (
        <>
          {' '}
          <img
            className={profileStyles.profilePicture}
            src={createObjectURL}
            alt={`profile picture of ${state.udta[0].name}`}
          />
          <div className={profileStyles.cardProfile}>
            <span>{`${state.udta[0].name} ${state.udta[0].lastname}`}</span>
            <div className={profileStyles.continue}>
              <h2>E-mail:</h2> <p>{state.udta[0].mail}</p>
            </div>
            <div className={profileStyles.continue}>
              <h2>Password:</h2>
              <input
                type="password"
                disabled="true"
                name="pws"
                value={state.udta[0].password}
              ></input>
            </div>
            <Button
              onClick={() => {
                setbtntype('success');
                if (btntype === 'success') {
                  setbtntype('dark');
                  uploadToServer();
                }
              }}
              className={profileStyles.BTN}
              variant={btntype}
            >
              {btntype === 'dark' ? 'Cambiar imagen' : 'Confirmar'}
            </Button>
            {btntype === 'success' ? (
              <>
                <input
                  type="file"
                  name="url"
                  className={profileStyles.inputfile}
                  accept="image/png, image/jpeg, .gif"
                  onChange={uploadToClient}
                />
              </>
            ) : null}
          </div>
        </>
      ) : (
        <div className={mainStyles.preloadCard}>
          <p className={mainStyles.preloadTitle2}>Loading...</p>
          <HashLoader />
        </div>
      )}
    </div>
  );
};

export default Profile;
