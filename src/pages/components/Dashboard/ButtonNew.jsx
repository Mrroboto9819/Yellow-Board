import React, { useCallback, useState, useEffect } from 'react';
import { Modal, Button, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import buttonNew from '../../../styles/buttonnew.module.scss';
// import Dropzone from 'react-dropzone';
// import { ReactTinyLink } from 'react-tiny-link';
import axios from 'axios';
import Link from 'next/link';
// import FileUp from './Fileupload/Fileupload';

const ButtonNew = ({
  cookieData,
  course,
  setLoading,
  setCourseList,
  getpost,
}) => {
  const [ifChange, setifChange] = useState(false);
  const [FormError, setFormError] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    // getpost();
    setShow(false);
    setstate({
      extraResources: '',
      extraResource: [],
      course: course._id,
      file: '',
      athor: cookieData.id,
    });
  };

  useEffect(() => {
    setLoading(true);
    setstate({
      ...state,
      course: course._id,
    });
    setLoading(false);
  }, []);

  // useEffect(() => {

  // }, [ifChange]);

  // const getpost = async () => {
  //   let obj = {
  //     courseId: course._id,
  //   };
  //   let res = await axios.post('/api/posts/AllPosts', obj);
  //   let data = res.data;
  //   setCourseList(data.data);
  // };

  const handleShow = () => setShow(true);
  const [Errormsg, setErrormsg] = useState(false);
  const [theFile, settheFile] = useState('');
  const [state, setstate] = useState({
    extraResources: '',
    extraResource: [],
    course: course._id,
    file: '',
    athor: cookieData.id,
  });

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      let documentOriginalName = i.name;
      let docChange = documentOriginalName.replace(/\s/g, '_');
      setstate({
        ...state,
        file: `/documents/${docChange}`,
      });
      settheFile(i);
    }
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

      setTimeout(() => {
        setFormError(null);
      }, 3000);
    } else {
      const body = new FormData();
      body.append('file', theFile);
      setFormError('Tarea Creada');
      let resFile = axios.post('/api/file', body);
      let res = axios.post('/api/posts', state);
      handleClose();
      setstate({
        extraResources: '',
        extraResource: [],
        course: course._id,
        file: '',
        athor: cookieData.id,
      });
      setifChange(!ifChange);
      setTimeout(() => {
        setFormError(null);
      }, 6000);
    }
  };

  const setValues = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" className={buttonNew.tooltip} {...props}>
      <h3>🟢 Tip</h3>
      <hr />
      <p>Escribe solo el numero de la actividad</p>
    </Tooltip>
  );
  const renderTooltiptwo = (props) => (
    <Tooltip id="button-tooltip" className={buttonNew.tooltip} {...props}>
      <h3>🟢 Tip</h3>
      <hr />
      <p>La materia se selecciona automaticamente</p>
    </Tooltip>
  );
  const renderTooltipthree = (props) => (
    <Tooltip id="button-tooltip" className={buttonNew.tooltip} {...props}>
      <h3>🟢 Tip</h3>
      <hr />
      <p>
        Puedes agregar cualquier link como material extra para ayudar a tus
        estudiantes
      </p>
    </Tooltip>
  );
  const renderTooltipfour = (props) => (
    <Tooltip id="button-tooltip" className={buttonNew.tooltip} {...props}>
      <h3>🟢 Tip</h3>
      <hr />
      <p>Solo puede agregar 1 archivo ⚠️ ES OBLIGATORIO SUBIR UN ARCHIVO</p>
    </Tooltip>
  );

  return (
    <>
      <Button
        variant="dark"
        onClick={() => {
          handleShow();
        }}
      >
        Agregar tarea
      </Button>
      {FormError === 'Tarea Creada' ? (
        <Alert className={buttonNew.alert} variant="primary">
          {FormError}
        </Alert>
      ) : FormError === null ? null : (
        <Alert className={buttonNew.alert} variant="danger">
          {FormError}
        </Alert>
      )}

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
              <OverlayTrigger
                placement="left"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
              >
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
                      name="activityNum"
                      className={buttonNew.ModalBodyFormsInput}
                    />
                  </div>
                </label>
              </OverlayTrigger>
              <label htmlFor="postTitle">
                <span>Titulo</span>

                <input
                  autoComplete="off"
                  onChange={(e) => {
                    setValues(e);
                  }}
                  placeholder="Titulo"
                  type="text"
                  name="postTitle"
                  className={buttonNew.ModalBodyFormsInput}
                />
              </label>
            </div>
            <OverlayTrigger
              placement="right"
              delay={{ show: 100, hide: 100 }}
              overlay={renderTooltiptwo}
            >
              <label htmlFor="course">
                <span>Materia</span>
                <input
                  autoComplete="off"
                  name="course"
                  placeholder="Materia"
                  id="coursesList"
                  defaultValue={state.course}
                  disabled
                  className={buttonNew.ModalBodyFormsInput}
                />
              </label>
            </OverlayTrigger>
            <label htmlFor="content">
              <span>Instrucciones | Explicacion</span>

              <textarea
                autoComplete="off"
                onChange={(e) => {
                  setValues(e);
                }}
                placeholder="Intrucciones de la actividad"
                name="content"
                className={buttonNew.ModalBodyFormsInput}
              ></textarea>
            </label>
            <OverlayTrigger
              placement="left"
              delay={{ show: 100, hide: 100 }}
              overlay={renderTooltipthree}
            >
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
                          {/* <ReactTinyLink
                            key={key}
                            cardSize="small"
                            showGraphic={true}
                            maxLine={2}
                            minLine={1}
                            header={`Material Extra ${key + 1}`}
                            url={link}
                            autoPlay={true}
                            proxyUrl={link}
                            requestHeaders={true}
                            description={`Material de clase con el que te podras apoyar visita: ${link}`}
                          ></ReactTinyLink> */}
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
            </OverlayTrigger>
            <label htmlFor="date">
              <span>Fecha limite</span>

              <input
                autoComplete="off"
                onChange={(e) => {
                  setValues(e);
                }}
                name="date"
                type="date"
                placeholder="mm/dd/yyyy"
                className={buttonNew.ModalBodyFormsInput}
              />
            </label>

            <OverlayTrigger
              placement="left"
              delay={{ show: 100, hide: 100 }}
              overlay={renderTooltipfour}
            >
              <label htmlFor="myFile">
                <span>Actividad (PDF, DOCX , PPTX)</span>

                <input
                  type="file"
                  name="myFile"
                  accept=".pptx, .pdf, .docx"
                  onChange={uploadToClient}
                  className={buttonNew.ModalBodyFormsInput}
                />
                {/* <Dropzone
                  accept=".pptx, .pdf, .docx"
                  onDrop={handleOnDrop}
                  maxSize={maxFilesize}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div className={buttonNew.Dropzone}>
                      <div
                        className={buttonNew.DropzoneBorder}
                        {...getRootProps()}
                      >
                        <input name="filetoupload" {...getInputProps()} />
                        <p>
                          Arrastre su archivo que desee subir o click para subir
                          uno
                        </p>
                      </div>
                    </div>
                  )}
                </Dropzone>
                <div className={buttonNew.FilesCont}>
                  {filelist.length > 0 ? (
                    <div className={buttonNew.FilesContFiles}>
                      {filelist.map((file, key) => (
                        <div key={key} className={buttonNew.Files}>
                          <div className={buttonNew.FilesCard}>
                            <p>{file.name}</p>
                            <div className={buttonNew.FilesCardLeft}>
                              <p>
                                {((file.size * 10) / 10000000).toFixed(2)} MB
                              </p>
                              <ProgressBar striped variant="success" now={40} />
                              <Button
                                variant="danger"
                                className={buttonNew.buttonnew}
                                onClick={() => {
                                  removeItem(file, key);
                                }}
                              >
                                Borrar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Alert className={buttonNew.AlertText} variant="info">
                      Sube algun archivo para verlo aqui 🦐
                    </Alert>
                  )}
                </div> */}
                {/* <Fileupload /> */}
              </label>
            </OverlayTrigger>
          </form>
        </Modal.Body>
        <Modal.Footer className={buttonNew.ModalFooter}>
          <Button
            className={buttonNew.HeaderBtn}
            variant="danger"
            onClick={() => {
              handleClose();
              getpost(course._id);
            }}
          >
            Cerrar
          </Button>
          <Button
            className={buttonNew.HeaderBtn}
            variant="dark"
            type="submit"
            onClick={(e) => {
              uploadToServer(e);
              getpost(course._id);
            }}
          >
            Publicar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ButtonNew;
