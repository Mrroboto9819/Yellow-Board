import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ActivityCardStyles from '../../../styles/activitycard.module.scss';
import buttonNew from '../../../styles/buttonnew.module.scss';
import axios from 'axios';
import Link from 'next/link';
import { Modal, Alert } from 'react-bootstrap';
import router from 'next/router';

const ActivityCard = ({
  item,
  cookieData,
  setLoading,
  setCourseList,
  course,
}) => {
  const [btnblock, setbtnblock] = useState(false);
  const [ifChange, setifChange] = useState(false);
  let date = new Date(item.createdAt);
  const [FormError, setFormError] = useState('');
  const [AlertType, setAlerType] = useState('');
  const [theFile, settheFile] = useState('');
  let PostDate = `${date.getMonth()} / ${date.getDate()} / ${date.getFullYear()}`;
  const [show, setShow] = useState(false);
  const [subshow, setsubshow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleClosesub = () => {
    setsubshow(false);
  };

  const [toSend, settoSend] = useState({
    activityDeliver: item._id,
    userDeliver: cookieData.id,
    courseDeliver: course._id,
  });
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      let documentOriginalName = i.name;
      let docChange = documentOriginalName.replace(/\s/g, '_');
      settoSend({
        ...toSend,
        file: `/delivery/${docChange}`,
      });
      settheFile(i);
    }
  };

  const [Errormsg, setErrormsg] = useState(false);

  const [state, setstate] = useState({
    _id: item._id,
    activityNum: item.activityNum,
    postTitle: item.postTitle,
    content: item.content,
    extraResources: '',
    extraResource: item.extraResource,
    course: item.course,
    file: item.file,
    athor: cookieData.id,
    date: item.date,
  });
  const [Temp, setTemp] = useState(null);
  const [itchange, setitchange] = useState(false);

  useEffect(() => {
    let activity = item._id;
    let ursid = cookieData.id;
    Usertask(activity, ursid);
    // setTemp(result);
  }, []);

  const Usertask = async () => {
    let res = await axios.post('/api/delivery/oneDeliver', {
      activityDeliver: item._id,
      userDeliver: cookieData.id,
    });
    let data = res.data;
    let Temp = data.data;
    // setifChange(!ifChange);
    // return Temp;
    setTemp(Temp);
    // console.log('oneDeliver', Temp);
  };

  useEffect(() => {
    setstate({
      _id: item._id,
      activityNum: item.activityNum,
      postTitle: item.postTitle,
      content: item.content,
      extraResources: '',
      extraResource: item.extraResource,
      course: item.course,
      file: item.file,
      athor: cookieData.id,
      date: item.date,
    });
  }, []);

  useEffect(() => {
    getpost();
  }, [ifChange]);

  const getpost = async () => {
    let obj = {
      courseId: course._id,
    };
    let res = await axios.post('/api/posts/AllPosts', obj);
    let data = res.data;
    setCourseList(data.data);
  };

  const setValues = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const uploadToServer = async (e) => {
    if (
      (!state.activityNum &&
        !state.content &&
        !state.data &&
        !state.file &&
        !state.postTitle) ||
      state.activityNum === '' ||
      state.content === '' ||
      state.data === '' ||
      state.file === '' ||
      state.postTitle === ''
    ) {
      setFormError('⚠️ Algun campo esta vacio');
      setAlerType('danger');

      setTimeout(() => {
        setFormError('');
      }, 3000);
    } else {
      setFormError('Tarea Editada');
      setAlerType('success');

      let res = await axios.put(`/api/file/${state._id}`, state);

      handleClose();

      setTimeout(() => {
        setFormError('');
      }, 4000);
    }
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal
        show={subshow}
        centered
        size="lg"
        onHide={handleClosesub}
        className={buttonNew.Modal}
      >
        {FormError != '' ? (
          <Alert className={buttonNew.alert} variant={AlertType}>
            {FormError}
          </Alert>
        ) : null}
        <Modal.Header className={buttonNew.ModalHeader}>
          <Modal.Title className={buttonNew.ModalHeaderTitle}>
            Agregar actividad
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className={buttonNew.ModalBodyActividad} htmlFor="myFile">
            <span>Sube tu actividad (PDF, DOCX , PPTX)</span>

            <input
              type="file"
              name="myFile"
              accept=".pptx, .pdf, .docx"
              onChange={uploadToClient}
              className={buttonNew.ModalBodyFormsInput}
            />
          </label>
        </Modal.Body>
        <Modal.Footer className={buttonNew.ModalFooter}>
          <Button
            className={buttonNew.HeaderBtn}
            variant="danger"
            onClick={handleClosesub}
          >
            Cerrar
          </Button>
          <Button
            className={buttonNew.HeaderBtn}
            variant="dark"
            type="submit"
            onClick={(e) => {
              uploadToServer(e);
              if (toSend.file === '' || !toSend.file) {
                setFormError('⚠️ Algun campo esta vacio');

                setTimeout(() => {
                  setFormError('');
                }, 6000);
              } else {
                setbtnblock(true);
                const body = new FormData();
                body.append('file', theFile);
                setFormError('Actividad subida');
                let resFile = axios.post('/api/file/deliver', body);
                let res = axios.post('/api/delivery', toSend);
                handleClose();
                settoSend({
                  activityDeliver: item._id,
                  userDeliver: cookieData.id,
                  courseDeliver: course._id,
                  sta: 2,
                });
                handleClosesub(false);
                setTimeout(() => {
                  setFormError('');
                }, 6000);
              }
              setifChange(!ifChange);
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show}
        centered
        size="lg"
        onHide={handleClose}
        className={buttonNew.Modal}
      >
        <Modal.Header className={buttonNew.ModalHeader}>
          <Modal.Title className={buttonNew.ModalHeaderTitle}>
            Agregar actividad
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={buttonNew.ModalBody}>
          <form className={buttonNew.ModalBodyForms}>
            <div className={buttonNew.ModalBodyFormstwo}>
              <label htmlFor="activityNum">
                <span>Numero de Actividad</span>
                <div className={buttonNew.ModalBodyFormstwo}>
                  <p className={buttonNew.ModalBodyActividad}>Actividad </p>

                  <input
                    autoComplete="off"
                    onChange={(e) => {
                      setValues(e);
                    }}
                    placeholder="1,2,3..."
                    type="number"
                    min="0"
                    value={state.activityNum}
                    name="activityNum"
                    className={buttonNew.ModalBodyFormsInput}
                  />
                </div>
              </label>
              <label htmlFor="postTitle">
                <span>Titulo</span>

                <input
                  autoComplete="off"
                  onChange={(e) => {
                    setValues(e);
                  }}
                  placeholder="Titulo"
                  value={state.postTitle}
                  type="text"
                  name="postTitle"
                  className={buttonNew.ModalBodyFormsInput}
                />
              </label>
            </div>
            <label htmlFor="course">
              <span>Materia</span>
              <input
                autoComplete="off"
                name="course"
                placeholder="Materia"
                id="coursesList"
                list="data"
                defaultValue={state.course}
                disabled
                className={buttonNew.ModalBodyFormsInput}
              />
            </label>
            <label htmlFor="content">
              <span>Instrucciones | Explicacion</span>

              <textarea
                autoComplete="off"
                onChange={(e) => {
                  setValues(e);
                }}
                value={state.content}
                placeholder="Intrucciones de la actividad"
                name="content"
                className={buttonNew.ModalBodyFormsInput}
              ></textarea>
            </label>
            <label htmlFor="extraResources">
              <span>Material Extra</span>
              {Errormsg != false ? (
                <Alert variant="danger" className={buttonNew.AlertTextDgr}>
                  No es un enlace
                </Alert>
              ) : null}
              <div className={buttonNew.ModalBodyFormsthree}>
                <input
                  autoComplete="off"
                  id="extrares"
                  onChange={(e) => {
                    setValues(e);
                  }}
                  placeholder="Link de Youtube o paginas web"
                  name="extraResources"
                  className={buttonNew.ModalBodyFormsInput}
                />

                <div>
                  <Button
                    className={buttonNew.HeaderBtn}
                    onClick={() => {
                      let inputextra = document.getElementById('extrares');
                      let match = '';

                      try {
                        match = new URL(inputextra.value);
                      } catch (_) {
                        setErrormsg(true);
                        setTimeout(() => {
                          setErrormsg(false);
                        }, 5000);
                      }

                      if (
                        match.protocol === 'http:' ||
                        match.protocol === 'https:'
                      ) {
                        setstate({
                          ...state,
                          extraResource: [
                            ...state.extraResource,
                            state.extraResources,
                          ],
                          extraResources: '',
                        });
                      }
                      inputextra.value = '';
                    }}
                    variant="dark"
                  >
                    Agregar
                  </Button>
                </div>
              </div>

              <div className={buttonNew.Extra}>
                <Button
                  variant="dark"
                  className={buttonNew.buttonnew}
                  onClick={() => {
                    setstate({
                      ...state,
                      extraResource: [],
                    });
                  }}
                >
                  Limpiar
                </Button>
                {state.extraResource.length > 0 ? (
                  <div className={buttonNew.ExtraLinks}>
                    {state.extraResource.map((link, key) => (
                      <div key={key} className={buttonNew.ExtraLinks}>
                        <Link target="_blank" href={link}>
                          <div className={buttonNew.ExtraLinksCard}>
                            <p
                              className={buttonNew.ExtraLinksCardTitle}
                            >{`Material Extra ${key + 1}`}</p>
                            <p
                              className={buttonNew.ExtraLinksCardDescription}
                            >{`Material de clase con el que te podras apoyar visita: ${link}`}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Alert className={buttonNew.AlertText} variant="info">
                    No hay material extra
                  </Alert>
                )}
              </div>
            </label>
            <label htmlFor="date">
              <span>Fecha limite</span>

              <input
                autoComplete="off"
                onChange={(e) => {
                  setValues(e);
                }}
                name="date"
                type="date"
                value={state.date}
                placeholder="mm/dd/yyyy"
                className={buttonNew.ModalBodyFormsInput}
              />
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer className={buttonNew.ModalFooter}>
          <Button
            className={buttonNew.HeaderBtn}
            variant="danger"
            onClick={handleClose}
          >
            Cerrar
          </Button>
          <Button
            className={buttonNew.HeaderBtn}
            variant="dark"
            type="submit"
            onClick={(e) => {
              uploadToServer(e);
              handleClose();
              setifChange(!ifChange);
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={ActivityCardStyles.activityCard}>
        <div className={ActivityCardStyles.header1}>
          <span>{`Actividad ${item.activityNum}`}</span>
          <span id="done"></span>
          <span>{item.CoursData.courseName}</span>
        </div>
        <div className={ActivityCardStyles.metadata}>
          <p>
            <span>Fecha de publicación:</span>
            {PostDate}
          </p>
          <p>
            <span>Subido por:</span>{' '}
            {`${item.userDatas.name} ${item.userDatas.lastname}`}
          </p>
        </div>
        <h3>{item.postTitle}</h3>
        <p className={ActivityCardStyles.contend}>{item.content}</p>
        <b>
          <p className={ActivityCardStyles.contend} style={{ color: 'red' }}>
            Sube tu documento con #A_INICIALES ejemplo A1_PCC
          </p>
        </b>
        <p className={ActivityCardStyles.ext}>Material Extra </p>
        {item.extraResource.length > 0 ? (
          item.extraResource.map((link, key) => (
            <div key={key} className={ActivityCardStyles.ExtraLinks}>
              <Link target="_blank" href={link}>
                <div className={ActivityCardStyles.ExtraLinksCard}>
                  <p
                    className={ActivityCardStyles.ExtraLinksCardTitle}
                  >{`Material Extra ${key + 1}`}</p>
                  <p
                    className={ActivityCardStyles.ExtraLinksCardDescription}
                  >{`Material de clase con el que te podras apoyar visita: ${link}`}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <Alert className={buttonNew.AlertText} variant="info">
            No hay material extra
          </Alert>
        )}
        <div className={ActivityCardStyles.footerAct}>
          <a className={ActivityCardStyles.showfile} href={item.file} download>
            Click para descargar documento
          </a>
          {cookieData.userType === 'm' || cookieData.userType === 'a' ? (
            <div className={ActivityCardStyles.ButtonsTeacher}>
              <Button
                onClick={() => {
                  handleShow(true);
                  getpost(course._id);
                }}
                variant="dark"
              >
                Editar
              </Button>
              <Button
                onClick={() => {
                  router.push(`/dashboard/courses/activity/${item._id}`);
                  getpost(course._id);
                }}
                variant="dark"
              >
                Ver entregas
              </Button>
              <Button
                onClick={() => {
                  const DeletePost = async () => {
                    let resfile = await axios.delete(`/api/file/${item._id}`, {
                      data: {
                        filePath: item.file,
                      },
                    });
                    let data = resfile.data;
                    setifChange(!ifChange);
                  };
                  DeletePost();
                  getpost(course._id);
                }}
                variant="danger"
              >
                Borrar
              </Button>
            </div>
          ) : Temp ? (
            Temp.file ? (
              <Button
                className={ActivityCardStyles.btn}
                id="subiract"
                onClick={() => {
                  setsubshow(true);
                }}
                disabled
                variant="dark"
              >
                Entregada ✅
              </Button>
            ) : (
              <Button
                className={ActivityCardStyles.btn}
                id="subiract"
                onClick={() => {
                  setsubshow(true);
                }}
                variant="dark"
              >
                Subir archivo
              </Button>
            )
          ) : (
            <Button
              className={ActivityCardStyles.btn}
              id="subiractor"
              onClick={() => {
                setsubshow(true);
              }}
              disabled={btnblock}
              variant="dark"
            >
              {btnblock == false ? 'Subir archivo' : 'Entregada ✅'}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ActivityCard;
