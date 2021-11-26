import { useEffect, useState } from 'react';
import Navbar from 'pages/components/Utils/Navbar';
import Footer from 'pages/components/Utils/Footer';
import Cursos from 'pages/components/Admin/AdminCursos';
import AdminStyles from '../../../../styles/admin.module.scss';
import { Button, Card, Modal, Alert, Table } from 'react-bootstrap';
import Router from 'next/router';
import axios from 'axios';

const adminCourses = ({ cookies }) => {
  const [MSG, setMSG] = useState('');
  const [Courses, setCourses] = useState([]);
  const [RespCourses, setRespCourses] = useState([]);
  const [Succes, setSucces] = useState(3);
  const [uptade, setuptade] = useState(false);
  const [usersList, setusersList] = useState([]);
  const [UserResp, setUserResp] = useState([]);
  const [NList, setNList] = useState([]);

  const removealert = () => {
    setTimeout(() => {
      setSucces(3);
    }, 4000);
  };
  const [ifchange, setifchange] = useState(true);

  const deleteCourse = async () => {
    hideAlert();
    let res = await axios.delete(`/api/courses/${state.oneCourse._id}`);
    await axios.delete(`/api/courses/delete/${state.oneCourse._id}`);
    let data = res.data;
    setSucces(data.Success);
    setMSG(JSON.stringify(data.msg));
    setuptade(!uptade);
    removealert();
  };

  const [Teachers, setTeachers] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
  };

  const [AlertEdit, setAlertEdit] = useState(false);
  const showAlertEdit = async () => {
    setAlertEdit(true);
  };
  const hideAlertEdit = () => {
    setAlertEdit(false);
  };

  const [AlertStateUsers, setAlertStateUsers] = useState(false);
  const showAlertAddUser = async () => {
    setAlertStateUsers(true);
    let defaultType = { type: state.AddUser.type };
    callUsers(defaultType);
  };
  const hideAlertAddUser = () => {
    setAlertStateUsers(false);
  };

  const [AlertList, setAlertList] = useState(false);
  const showAlertUserList = async (id) => {
    setAlertList(true);
    listUsersCourse(id);
  };
  const hideAlertUserList = () => {
    setAlertList(false);
  };

  const [AlertState, setAlertState] = useState(false);
  const showAlert = () => setAlertState(true);
  const hideAlert = () => {
    setAlertState(false);
  };

  const listUsersCourse = async (id) => {
    let model = {
      id: id,
    };

    // console.log('the id:', model);

    let res = await axios.post('/api/courses/userToCourseList', model);
    let data = res.data;
    setusersList(data.data);
    setUserResp(data.data);
    setNList(data.data.length);
  };

  const callUsers = async (type) => {
    let res = await axios.post('/api/getUsers/typeUser', type);
    let data = res.data;
    setTeachers(data.data);
  };

  const DeleteUserCourse = async (id) => {
    let res = await axios.delete(`/api/courses/userToCourseList/${id}`);
    let data = res.data;
    setSucces(data.Success);
    setMSG(JSON.stringify(data.msg));
    setuptade(!uptade);
    removealert();
  };

  const [state, setstate] = useState({
    data: {
      teacher: '63847a07ec30209240abbf1a',
    },
    oneCourse: {},
    AddUser: {
      type: 'm',
    },
    session: false,
    loading: false,
    error: null,
  });

  useEffect(async () => {
    setstate({ ...state, loading: true });
    let res = await axios.get('/api/courses/addCourse');
    let data = res.data;
    setCourses(data.data);
    setRespCourses(data.data);
    setTimeout(() => setstate({ ...state, loading: false }), 1000);
  }, []);

  useEffect(async () => {
    setstate({ ...state, loading: true });
    let res = await axios.get('/api/courses/addCourse');
    let data = res.data;
    setCourses(data.data);
    setRespCourses(data.data);
    setTimeout(() => setstate({ ...state, loading: false }), 1000);
  }, [uptade]);

  useEffect(async () => {
    let types = { type: state.AddUser.type };
    let res = await axios.post('/api/getUsers/typeUser', types);
    let data = res.data;
    setTeachers(data.data);
  }, [state.AddUser.type]);

  const changeType = (e) => {
    setstate({
      ...state,
      AddUser: {
        ...state.AddUser,
        type: e.target.value,
      },
    });
  };
  const setValue = (e) => {
    setstate({
      ...state,
      data: { ...state.data, [e.target.name]: e.target.value },
    });
  };

  const setValueEdit = (e) => {
    setstate({
      ...state,
      oneCourse: {
        ...state.oneCourse,
        [e.target.name]: e.target.value,
      },
    });
  };

  const setValueAddUser = (e) => {
    setstate({
      ...state,
      AddUser: {
        ...state.AddUser,
        [e.target.name]: e.target.value,
      },
    });
  };

  const searchUsersCourses = (e) => {
    const data = UserResp;
    const query = e.target.value;
    // console.log(data);
    const userFiltere = data.filter((data) => {
      let fullname = `${data.listUsers.username} ${data.listUsers.lastname}`;
      return (
        data.listUsers.name.toLowerCase().includes(query.toLowerCase()) ||
        data.listUsers.lastname.toLowerCase().includes(query.toLowerCase()) ||
        data.listUsers.username.toLowerCase().includes(query.toLowerCase())
      );
    });

    if (query === '') {
      setusersList(UserResp);
    } else {
      setusersList(userFiltere);
    }
  };

  const onSearch = (e) => {
    const data = RespCourses;
    const query = e.target.value;
    const courseFiltere = data.filter((data) => {
      return data.courseName.toLowerCase().includes(query.toLowerCase());
    });

    if (query === '') {
      setCourses(RespCourses);
    } else {
      setCourses(courseFiltere);
    }
  };

  return (
    <>
      <Navbar cookies={cookies} />
      <div className={AdminStyles.bgcolor}>
        {Succes === 1 ? (
          <Alert className={AdminStyles.alert} variant="primary">
            {MSG}
          </Alert>
        ) : Succes === 0 ? (
          <Alert className={AdminStyles.alert} variant="danger">
            {MSG}
          </Alert>
        ) : null}

        <Modal
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={AlertList}
          onHide={hideAlertUserList}
        >
          <Modal.Header className={AdminStyles.ModalHeader}>
            <Modal.Title className={AdminStyles.Title}>
              {`Lista de usuarios
              ${NList} / 15`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={AdminStyles.ModalList}>
              <div>
                <input
                  placeholder="Buscar usuario | Nombre | Apellido | Matricula"
                  onChange={(e) => searchUsersCourses(e)}
                  className={AdminStyles.adminUsersSearch}
                  autoComplete="off"
                />
              </div>
              {usersList.length > 0 ? (
                <Table bordered hover className={AdminStyles.Tables}>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Matricula</th>
                      <th>Rol</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((item, key) => (
                      <tr key={key}>
                        <td>{item.listUsers.name}</td>
                        <td>{item.listUsers.lastname}</td>
                        <td>{item.listUsers.username}</td>
                        <td>
                          {item.listUsers.userType === 'm' ? (
                            <p>Maestro</p>
                          ) : item.listUsers.userType === 'u' ? (
                            <p>Alumno</p>
                          ) : (
                            <p>Rol desconocido 🦐</p>
                          )}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            className={AdminStyles.HeaderBtnPath}
                            onClick={() => {
                              let id = item._id;
                              DeleteUserCourse(id);
                              listUsersCourse(item.courseId);
                            }}
                          >
                            Borrar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <>
                  <p className={AdminStyles.nothing}>
                    No hay usuarios en este curso
                  </p>
                  <br />
                  <center>
                    <iframe
                      src="https://giphy.com/embed/l0HU99Q4OEUCjTl3W"
                      width="480"
                      height="359"
                      frameBorder="0"
                      class="giphy-embed"
                    ></iframe>
                  </center>
                </>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer className={AdminStyles.ModalFooter}>
            <Button
              variant="danger"
              className={AdminStyles.HeaderBtn}
              onClick={() => hideAlertUserList()}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={AlertStateUsers}
          onHide={hideAlertAddUser}
        >
          <Modal.Header className={AdminStyles.ModalHeader}>
            <Modal.Title className={AdminStyles.Title}>
              Agregar Usuario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className={AdminStyles.forms}>
              <div className={AdminStyles.formstwo}>
                <label>
                  <span>Usuarios</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="text"
                    name="userId"
                    onChange={(e) => setValueAddUser(e)}
                    list="data"
                    value={state.oneCourse.teacher}
                    required
                  />
                </label>
                <label>
                  <span>Tipo</span>
                  <select
                    name="type"
                    className={AdminStyles.addInputs}
                    defaultValue={state.AddUser.type}
                    onChange={(e) => changeType(e)}
                  >
                    <option value="m">Maestros</option>
                    <option value="u">Alumnos</option>
                  </select>
                  <datalist id="data">
                    {Teachers.map((item, key) => (
                      <option
                        key={key}
                        value={item._id}
                      >{`${item.name} ${item.lastname}`}</option>
                    ))}
                  </datalist>
                </label>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer className={AdminStyles.ModalFooter}>
            <Button
              variant="danger"
              className={AdminStyles.HeaderBtn}
              onClick={() => hideAlertAddUser()}
            >
              Cancelar
            </Button>

            <Button
              variant="dark"
              className={AdminStyles.HeaderBtn}
              onClick={async () => {
                if (NList >= 15) {
                  alert('No puede agregar mas de 15 usuarios');
                } else {
                  let dataSend = {
                    courseId: state.AddUser._id,
                    userId: state.AddUser.userId,
                  };

                  let res = await axios.post(
                    `/api/courses/userToCourse`,
                    dataSend
                  );

                  setstate({
                    ...state,
                    AddUser: {
                      type: 'm',
                      userId: '',
                      _id: '',
                    },
                  });
                  let data = res.data;
                  setSucces(data.Success);
                  setMSG(JSON.stringify(data.msg));
                  setuptade(!uptade);
                  removealert();
                  hideAlertAddUser();
                }
              }}
            >
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          size="m"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={AlertState}
          onHide={hideAlert}
        >
          <Modal.Header className={AdminStyles.ModalHeader}>
            <Modal.Title className={AdminStyles.Title}>
              Borrar Curso
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className={AdminStyles.Text}>
              Si borra este Curso se elimanara por completo del sistema, seguro
              que desea continuar?
            </p>
          </Modal.Body>
          <Modal.Footer className={AdminStyles.ModalFooter}>
            <Button
              variant="danger"
              className={AdminStyles.HeaderBtn}
              onClick={async () => {
                hideAlert();
                deleteCourse();
              }}
            >
              Borrar
            </Button>
            <Button
              variant="dark"
              className={AdminStyles.HeaderBtn}
              onClick={async () => {
                hideAlert();
              }}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={AlertEdit}
          onHide={hideAlertEdit}
        >
          <Modal.Header className={AdminStyles.ModalHeader}>
            <Modal.Title className={AdminStyles.Title}>
              Editar Curso
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className={AdminStyles.forms}>
              <label></label>
              <label>
                <span>Nombre del Curso</span>
                <input
                  className={AdminStyles.addInputs}
                  autoComplete="off"
                  type="text"
                  name="courseName"
                  onChange={(e) => setValueEdit(e)}
                  value={state.oneCourse.courseName}
                  required
                />
              </label>
              <label>
                <span>Decripcion</span>
                <textarea
                  className={AdminStyles.addInputs}
                  autoComplete="off"
                  type="text"
                  name="description"
                  onChange={(e) => setValueEdit(e)}
                  value={state.oneCourse.description}
                  required
                ></textarea>
              </label>
              <label>
                <span>Fecha de inicio</span>
                <input
                  className={AdminStyles.addInputs}
                  autoComplete="off"
                  type="date"
                  name="startDate"
                  onChange={(e) => setValueEdit(e)}
                  value={state.oneCourse.startDate}
                  required
                />
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer className={AdminStyles.ModalFooter}>
            <Button
              variant="danger"
              className={AdminStyles.HeaderBtn}
              onClick={() => hideAlertEdit()}
            >
              Cancelar
            </Button>

            <Button
              variant="dark"
              className={AdminStyles.HeaderBtn}
              onClick={async () => {
                setstate({
                  ...state,
                  oneCourse: {
                    ...state.oneCourse,
                    teacher: '63847a07ec30209240abbf1a',
                  },
                });
                let res = await axios.put(
                  `/api/courses/${state.oneCourse._id}`,
                  state.oneCourse
                );

                setstate({
                  ...state,
                  oneCourse: {
                    ...state.oneCourse,
                    teacher: '',
                  },
                });
                let data = res.data;
                setSucces(data.Success);
                setMSG(JSON.stringify(data.msg));
                setuptade(!uptade);
                removealert();
                hideAlertEdit();
              }}
            >
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header className={AdminStyles.ModalHeader}>
            <Modal.Title className={AdminStyles.Title}>Crear Curso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className={AdminStyles.forms}>
              <label>
                <span>Nombre del Curso</span>
                <input
                  className={AdminStyles.addInputs}
                  autoComplete="off"
                  type="text"
                  name="courseName"
                  onChange={(e) => setValue(e)}
                  required
                />
              </label>
              <label>
                <span>Decripcion</span>
                <textarea
                  className={AdminStyles.addInputs}
                  autoComplete="off"
                  type="text"
                  name="description"
                  onChange={(e) => setValue(e)}
                  required
                ></textarea>
              </label>
              <label>
                <span>Fecha de inicio</span>
                <input
                  className={AdminStyles.addInputs}
                  autoComplete="off"
                  type="date"
                  name="startDate"
                  onChange={(e) => setValue(e)}
                  required
                />
              </label>
            </form>
          </Modal.Body>
          <Modal.Footer className={AdminStyles.ModalFooter}>
            <Button
              variant="danger"
              className={AdminStyles.HeaderBtn}
              onClick={handleClose}
            >
              Cancelar
            </Button>

            <Button
              variant="dark"
              className={AdminStyles.HeaderBtn}
              onClick={async () => {
                let res = await axios.post(
                  '/api/courses/addCourse',
                  state.data
                );
                let data = res.data;
                setSucces(data.Success);
                setMSG(JSON.stringify(data.msg));
                setuptade(!uptade);
                removealert();
                handleClose();
              }}
            >
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>

        <div className={AdminStyles.usersGobal}>
          <div className={AdminStyles.Header}>
            <p className={AdminStyles.HeaderTitle}>Cursos</p>
            <div className={AdminStyles.HeaderButtonCont}>
              <Button
                className={AdminStyles.HeaderBtn}
                onClick={handleShow}
                variant="dark"
              >
                Crear Curso
              </Button>
              <Button
                className={AdminStyles.HeaderBtn}
                onClick={() => {
                  Router.push('/admin');
                }}
                variant="dark"
              >
                Regresar
              </Button>
            </div>
          </div>

          <div className={AdminStyles.admin}>
            <input
              placeholder="Buscar curso"
              onChange={(e) => onSearch(e)}
              className={AdminStyles.adminUsersSearch}
              autoComplete="off"
            />
            {Courses.length > 0 ? (
              <div className={AdminStyles.coursesCont}>
                {Courses.map((item, key) => (
                  <div key={key}>
                    <Cursos
                      // setifchange={setifchange}
                      // ifchange={ifchange}
                      showAlertUserList={showAlertUserList}
                      showAlertAddUser={showAlertAddUser}
                      showAlert={showAlert}
                      state={state}
                      setstate={setstate}
                      showAlertEdit={showAlertEdit}
                      item={item}
                      usersList={usersList}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className={AdminStyles.nothing}>No hay Cursos...</p>
                <br />
                <center>
                  <iframe
                    src="https://giphy.com/embed/l0HU99Q4OEUCjTl3W"
                    width="480"
                    height="359"
                    frameBorder="0"
                    className="giphy-embed"
                  ></iframe>
                </center>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default adminCourses;
