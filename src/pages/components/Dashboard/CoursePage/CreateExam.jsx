import React, { useState, useEffect, useLayoutEffect } from 'react';
import StylesoneCourse from 'styles/oneCourse.module.scss';
import Styles from 'styles/Exam.module.scss';
import { Button, Alert, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import router from 'next/router';
import { HashLoader } from 'react-spinners';
import axios from 'axios';

const CreateExam = ({ state, course, cookies, courseId }) => {
  const [NoPreguntas, setNoPreguntas] = useState(0);
  const [Errors, setErrors] = useState('');
  const [alertType, setalertType] = useState('');
  const [NQ, setNQ] = useState([]);
  const [Questi, setQuesti] = useState([]);
  const [IfExist, setIfExist] = useState([]);
  const [states, setstates] = useState({
    exam: course._id,
    question: 'Aqui se vera tu pregunta',
    answers: [],
    correctAns: null,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const [onNext, setonNext] = useState(false);

  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (cookies.userData) {
      setcookiedata(JSON.parse(cookies.userData));
    }

    // GetPosts(courseId);
    setLoading(false);
  }, [courseId]);

  useEffect(() => {
    setLoading(true);

    const GetQues = async () => {
      let obj = {
        _id: course._id,
      };

      let res = await axios.post('/api/questions/getFromExam', obj);
      let datas = res.data;
      let pres = datas.data;
      setQuesti(pres);
      setNQ(datas.length);
    };
    if (course) GetQues();
    setLoading(false);
  }, [onNext]);

  useEffect(() => {
    setLoading(true);

    const GetQues = async () => {
      let obj = {
        _id: course._id,
      };

      let res = await axios.post('/api/questions/getFromExam', obj);
      let datas = res.data;
      let pres = datas.data;
      setQuesti(pres);
      setNQ(datas.length);
    };

    const CheckExam = async () => {
      let obj = {
        _id: course._id,
      };

      let res = await axios.post('/api/exams/ifexist', obj);
      let datas = res.data;
      let pres = datas.data;
      setIfExist(pres);
    };
    if (course) {
      CheckExam();
      GetQues();
    }
    setLoading(false);
  }, []);

  const setAnswer = (e, next, targ) => {
    let val = e.target.value;
    setstates({ ...states, [e.target.name]: val });
    let b = document.getElementById(next);
    if (val.length > 0) {
      b.disabled = false;
    } else {
      b.disabled = true;
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" className={Styles.tooltip} {...props}>
      <h3>⚠️ Aviso</h3>
      <hr />
      <p>Una vez confirmada su pregunta no se podra editar</p>
    </Tooltip>
  );

  if (course._id != 404) {
    if (state.userCourses.some((el) => el.courseId == course._id) === true) {
      return (
        <div className={StylesoneCourse.Main}>
          <Modal show={show} size="lg" onHide={handleClose}>
            <Modal.Header>
              <p className={Styles.MainContentQTitle}>Anteriores preguntas</p>
            </Modal.Header>
            <Modal.Body>
              <div className={Styles.MainContentQuestions}>
                {Questi.length > 0 ? (
                  Questi.map((items, key) => {
                    return (
                      <div className={Styles.MainContentQuestion} key={key}>
                        <div>
                          <p className={Styles.MainContentQTitle}>{`Pregunta ${
                            key + 1
                          }`}</p>
                          <p
                            className={Styles.MainContentQuestionPreRCTitle}
                          >{`¿ ${items.question} ?`}</p>
                        </div>
                        <div className={Styles.MainContentQuestionPre}>
                          <label
                            className={Styles.MainContentPInput}
                            htmlFor={key}
                          >
                            <input autoComplete="off" name={key} type="radio" />

                            <span>{` A) ${items.answers[0]}`}</span>
                          </label>
                          <label
                            className={Styles.MainContentPInput}
                            htmlFor={key}
                          >
                            <input autoComplete="off" name={key} type="radio" />

                            <span>{` B) ${items.answers[1]}`}</span>
                          </label>
                          <label
                            className={Styles.MainContentPInput}
                            htmlFor={key}
                          >
                            <input autoComplete="off" name={key} type="radio" />

                            <span>{` C) ${items.answers[2]}`}</span>
                          </label>
                          <label
                            className={Styles.MainContentPInput}
                            htmlFor={key}
                          >
                            <input autoComplete="off" name={key} type="radio" />

                            <span>{` D) ${items.answers[3]}`}</span>
                          </label>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <Alert className={Styles.nalert} variant="info">
                    {' '}
                    No hay Anteriores preguntas
                  </Alert>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className={Styles.MainBTN}
                variant="dark"
                onClick={handleClose}
              >
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          {Errors != '' ? (
            <Alert variant={alertType} className={Styles.alert}>
              {Errors}
            </Alert>
          ) : null}
          <div className={Styles.MainContainer}>
            <div className={StylesoneCourse.MainHeader}>
              <p className={StylesoneCourse.MainHeaderTitle}>
                Examen de {course.courseName}
              </p>
              <div>
                <Button
                  variant="dark"
                  onClick={() => router.push('/dashboard')}
                >
                  Regresar
                </Button>
              </div>
            </div>

            <hr />
            {IfExist.length > 0 ? (
              <Alert variant="info" className={Styles.nalert}>
                Ya existe un examen para esta materia
              </Alert>
            ) : Loading === true ? (
              <div className={Styles.Loading}>
                <HashLoader />
              </div>
            ) : (
              <div className={Styles.MainContent}>
                <p className={Styles.MainContentQ}>
                  {' '}
                  <Button
                    className={Styles.MainBTN}
                    variant="dark"
                    onClick={handleShow}
                  >
                    Preguntas Anteriores
                  </Button>
                  {`Pregunta ${NQ} / 25 `}
                </p>
                <div className={Styles.MainContentQuestion}>
                  <div className={Styles.MainContentP}>
                    <span className={Styles.MainContentPTitle}>¿</span>
                    <input
                      autoComplete="off"
                      className={Styles.MainContentPInput}
                      placeholder="Cuanto es 2 + 2"
                      type="text"
                      id="question"
                      onChange={(e) => {
                        let p = e.target.value;
                        setstates({ ...states, question: p });
                      }}
                    />
                    <span className={Styles.MainContentPTitle}>?</span>
                  </div>
                  <div className={Styles.MainContentQuestionPre}>
                    <p className={Styles.MainContentQTitle}>Respuestas</p>
                    <div className={Styles.MainContentQuestionPreRC}>
                      <p className={Styles.MainContentQuestionPreRCTitle}>
                        Respuesta correcta:
                      </p>
                      <select
                        name="correctAns"
                        id="correctAns"
                        className={Styles.MainContentQuestionPreRCSel}
                        onChange={(e) => {
                          let val = e.target.value;
                          setstates({ ...states, [e.target.name]: val });
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          --
                        </option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                    <div>
                      <div className={Styles.Respuesta}>
                        <p className={Styles.RespuestaTitle}>A)</p>
                        <input
                          autoComplete="off"
                          className={Styles.MainContentPInput}
                          type="text"
                          id="QA"
                          name="QA"
                          onChange={(e) => {
                            setAnswer(e, 'QB', 'Respuesta 1');
                          }}
                        />
                      </div>
                      <div className={Styles.Respuesta}>
                        <p className={Styles.RespuestaTitle}>B)</p>
                        <input
                          autoComplete="off"
                          className={Styles.MainContentPInput}
                          type="text"
                          id="QB"
                          name="QB"
                          onChange={(e) => {
                            setAnswer(e, 'QC', 'Respuesta 2');
                          }}
                          disabled
                        />
                      </div>
                      <div className={Styles.Respuesta}>
                        <p className={Styles.RespuestaTitle}>C)</p>
                        <input
                          className={Styles.MainContentPInput}
                          type="text"
                          id="QC"
                          name="QC"
                          disabled
                          onChange={(e) => {
                            setAnswer(e, 'QD', 'Respuesta 3');
                          }}
                        />
                      </div>
                      <div className={Styles.Respuesta}>
                        <p className={Styles.RespuestaTitle}>D)</p>
                        <input
                          autoComplete="off"
                          className={Styles.MainContentPInput}
                          type="text"
                          id="QD"
                          name="QD"
                          disabled
                          onChange={(e) => {
                            let val = e.target.value;
                            setstates({ ...states, [e.target.name]: val });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={Styles.MainContentActivitys}>
                  <div>
                    <p className={Styles.MainContentQTitle}>Vista previa</p>
                    <p
                      className={Styles.MainContentQuestionPreRCTitle}
                    >{`¿ ${states.question} ?`}</p>
                  </div>
                  <div className={Styles.MainContentQuestionPre}>
                    <label
                      className={Styles.MainContentPInput}
                      htmlFor="answare"
                    >
                      <input name="answare" type="radio" />
                      <span>{` A) ${
                        states.QA ? states.QA : 'Respuesta A'
                      }`}</span>
                    </label>
                    <label
                      className={Styles.MainContentPInput}
                      htmlFor="answare"
                    >
                      <input name="answare" type="radio" />
                      <span>{` B) ${
                        states.QB ? states.QB : 'Respuesta B'
                      }`}</span>
                    </label>
                    <label
                      className={Styles.MainContentPInput}
                      htmlFor="answare"
                    >
                      <input name="answare" type="radio" />
                      <span>{` C) ${
                        states.QC ? states.QC : 'Respuesta C'
                      }`}</span>
                    </label>
                    <label
                      className={Styles.MainContentPInput}
                      htmlFor="answare"
                    >
                      <input name="answare" type="radio" />
                      <span>{` D) ${
                        states.QD ? states.QD : 'Respuesta D'
                      }`}</span>
                    </label>
                  </div>
                  <div className={Styles.Footer}>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 100, hide: 100 }}
                      overlay={renderTooltip}
                    >
                      <Button
                        variant="success"
                        id="confirm"
                        onClick={() => {
                          let btn1 = document.getElementById('next');
                          let btn2 = document.getElementById('end-exam');
                          let btn3 = document.getElementById('confirm');
                          let inp1 = document.getElementById('QA');
                          let inp2 = document.getElementById('QB');
                          let inp3 = document.getElementById('QC');
                          let inp4 = document.getElementById('QD');
                          let can = document.getElementById('correctAns');
                          let question = document.getElementById('question');

                          if (
                            states.QA &&
                            states.QA != '' &&
                            states.QB &&
                            states.QB != '' &&
                            states.QC &&
                            states.QC != '' &&
                            states.QD &&
                            states.QD != '' &&
                            states.question != '' &&
                            states.correctAns != '' &&
                            states.correctAns != null
                          ) {
                            states.answers.push(states.QA);
                            states.answers.push(states.QB);
                            states.answers.push(states.QC);
                            states.answers.push(states.QD);

                            setErrors('Pregunta Guardada correctamente');
                            setalertType('success');
                            setTimeout(() => {
                              setErrors('');
                            }, 4000);
                            btn3.disabled = true;
                            inp1.disabled = true;
                            inp2.disabled = true;
                            inp3.disabled = true;
                            inp4.disabled = true;
                            can.disabled = true;
                            question.disabled = true;
                            btn1.disabled = false;
                            if (NoPreguntas < 25) {
                              btn1.disabled = false;
                            } else {
                              btn1.disabled = true;
                            }
                            setNoPreguntas(NoPreguntas + 1);
                            btn1.onclick = () => {
                              setLoading(true);
                              btn3.disabled = false;
                              inp1.disabled = false;
                              inp1.value = '';
                              inp2.disabled = false;
                              inp2.value = '';
                              inp3.disabled = false;
                              inp3.value = '';
                              inp4.disabled = false;
                              inp4.value = '';
                              can.disabled = false;
                              can.value = '--';
                              question.disabled = false;
                              question.value = '';
                              btn1.disabled = true;

                              setonNext(!onNext);

                              setTimeout(() => {
                                setLoading(false);
                              }, 2000);
                            };
                            setstates({
                              exam: course._id,
                              question: 'Aqui se vera tu pregunta',
                              answers: [],
                              correctAns: null,
                            });
                            axios.post('/api/questions', states);
                          } else {
                            setErrors('Falta algun campo favor de verificar');
                            setalertType('danger');
                            setTimeout(() => {
                              setErrors('');
                            }, 4000);
                          }
                        }}
                      >
                        Confirmar
                      </Button>
                    </OverlayTrigger>
                  </div>
                </div>
                <div className={Styles.Footer}>
                  <div className={Styles.FooterBtn}>
                    <Button id="next" variant="dark" disabled>
                      Siguiente
                    </Button>
                    <Button
                      id="end-exam"
                      variant="dark"
                      onClick={async () => {
                        let obj = {
                          _id: course._id,
                        };

                        let res = await axios.post('/api/exams', obj);
                        router.push('/dashboard');
                      }}
                    >
                      Finalizar Examen
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
  return (
    <>
      {Loading === true ? (
        <div className={Styles.Main}>
          <div className={Styles.MainContainer}>
            <div className={Styles.Loading}>
              <HashLoader />
            </div>
          </div>
        </div>
      ) : (
        <div className={Styles.Main}>
          <div className={Styles.MainContainer}>
            <div className={Styles.the404}>
              <div className={Styles.MainHeader}></div>
              <center>
                <p className={Styles.the404Text}>No Existe este curso</p>
                <p className={Styles.the404TextSmall}>
                  Si crees que es un error contacta a tu administrador
                </p>
                <br />
                <img
                  className={Styles.the404Img}
                  src="https://cdn-images-1.medium.com/max/800/1*qdFdhbR00beEaIKDI_WDCw.gif"
                  alt="404"
                />
                <br />
                <br />
                <Button
                  variant="dark"
                  onClick={() => router.push('/dashboard')}
                >
                  Regresar
                </Button>
              </center>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateExam;
