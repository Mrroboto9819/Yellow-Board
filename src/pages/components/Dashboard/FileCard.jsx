import React, { useState, useEffect } from 'react';
import Styles from 'styles/oneCourse.module.scss';
import ModalsS from 'styles/Exam.module.scss';
import { Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

const FileCard = ({ GetFiles2, file, key, activity, cookieData }) => {
  let titulo = `${activity.CourseData.courseName} - Actividad ${activity.OnePost.activityNum}`;
  const [show, setShow] = useState(false);
  const [theAlert, settheAlert] = useState(null);
  const [Alertype, setAlertype] = useState('success');
  const [Alertype2, setAlertype2] = useState('success');
  const [theAlert2, settheAlert2] = useState(null);

  const [onegrade, setonegrade] = useState({});
  const [state, setstate] = useState({
    userGrade: file.userDatas._id,
    courseGrade: file.CoursData._id,
    activityId: activity.OnePost._id,
    gradesTitle: titulo,
  });
  const [ongrade, setongradec] = useState('');

  useEffect(() => {
    GetGrades();
  }, []);

  // console.log('file:', file);

  const GetGrades = async () => {
    let res = await axios.post('/api/grades/oneGrade', state);
    let data = res.data;
    setonegrade(data.data);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };
  return (
    <div className={Styles.Filess}>
      {theAlert2 != null ? (
        <Alert variant={Alertype2} className={Styles.alert}>
          {theAlert2}
        </Alert>
      ) : null}
      <Modal
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        {theAlert != null ? (
          <Alert variant={Alertype} className={Styles.alert}>
            {theAlert}
          </Alert>
        ) : null}
        <Modal.Header>
          <p className={ModalsS.MainContentQTitle}>Anteriores preguntas</p>
        </Modal.Header>
        <Modal.Body>
          <div className={ModalsS.MainContentQuestions}>
            <label className={ModalsS.MainContentPInput} htmlFor="grades">
              {onegrade ? (
                <>
                  <span
                    className={ModalsS.MainContentQuestionPreRCTitle}
                  >{`Calificacion de ${file.userDatas.name}: ${onegrade.grades}`}</span>
                  <Button
                    className={Styles.BTN}
                    variant="danger"
                    onClick={() => {
                      let res = axios.delete(`/api/grades/${onegrade._id}`);
                      settheAlert2('Calificacion borrada');
                      setAlertype2('success');

                      setTimeout(() => {
                        settheAlert2(null);
                      }, 3000);
                      GetGrades();
                    }}
                  >
                    Borrar
                  </Button>
                </>
              ) : (
                <>
                  <span
                    className={ModalsS.MainContentQuestionPreRCTitle}
                  >{`Calificacion de ${file.userDatas.name}`}</span>
                  <input
                    name="grades"
                    id="grades"
                    type="number"
                    max="10"
                    min="0"
                    autoComplete="false"
                    onChange={(e) => {
                      setstate({ ...state, [e.target.name]: e.target.value });
                    }}
                    placeholder="Maximo 10 minimo 0"
                    className={Styles.Inputs}
                  />
                </>
              )}
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {onegrade ? (
            <Button
              className={ModalsS.MainBTN}
              variant="danger"
              onClick={handleClose}
            >
              Cancelar
            </Button>
          ) : (
            <>
              <Button
                className={ModalsS.MainBTN}
                variant="danger"
                onClick={handleClose}
              >
                Regresar
              </Button>
              <Button
                className={ModalsS.MainBTN}
                variant="dark"
                onClick={async () => {
                  if (state.grades) {
                    if (state.grades > 10 || state.grades < 0) {
                      settheAlert('El valor debe ser menor a 10 o mayor a 0');
                      setAlertype('danger');

                      setTimeout(() => {
                        settheAlert(null);
                      }, 3000);
                    } else {
                      settheAlert2('Calificacion asignada');
                      setAlertype2('success');
                      let res = await axios.post('/api/grades', state);

                      setTimeout(() => {
                        settheAlert2(null);
                      }, 3000);
                      GetGrades();
                    }
                  } else {
                    settheAlert('El campo esta vacio');
                    setAlertype('danger');
                    setTimeout(() => {
                      settheAlert(null);
                    }, 3000);
                  }
                }}
              >
                Confirmar
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      <div className={Styles.FilessCont}>
        <div className={Styles.FilessContData}>
          <img src="/assets/icons/file.png" alt="entrega de " />
          <div>
            <p className={Styles.FilessContDataTitle}>De:</p>
            <p
              className={Styles.FilessContDataText}
            >{`${file.userDatas.name} ${file.userDatas.lastname}`}</p>
          </div>
        </div>
        <a className={Styles.FilessContDescargas} href={file.file} download>
          Descargar archivo
        </a>
        <div>
          <Button
            variant="dark"
            onClick={() => {
              handleOpen();
              GetGrades();
            }}
          >
            Asignar calificacion
          </Button>
          {cookieData.userType === 'a' ? (
            <Button
              variant="danger"
              onClick={async (e) => {
                let res3 = await axios.delete(`/api/file/deliver/${file._id}`, {
                  data: {
                    filePath: file.file,
                    gradefor: file.activityDeliver,
                  },
                });
                if (!ongrade) null;
                if (ongrade && onegrade._id != null) {
                  let res2 = await axios.delete(`/api/grades/${onegrade._id}`);
                  settheAlert2('Archivo borrada');
                  setAlertype2('success');

                  setTimeout(() => {
                    settheAlert2(null);
                  }, 3000);
                }
                GetGrades();
                GetFiles2();
              }}
            >
              Borrar
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FileCard;
