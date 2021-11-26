import { useEffect, useState } from 'react';
import Navbar from 'pages/components/Utils/Navbar';
import Footer from 'pages/components/Utils/Footer';
import mainStyles from '../../../../styles/main.module.scss';
import axios from 'axios';
import { Button, Card, Modal, Alert } from 'react-bootstrap';
import AdminStyles from '../../../../styles/admin.module.scss';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { HashLoader } from 'react-spinners';

const adminUsers = ({ cookies }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState([]);
  const [RespUsers, setRespUsers] = useState([]);
  const [uptade, setuptade] = useState(false);
  const [Succes, setSucces] = useState(3);
  const [MSG, setMSG] = useState('');
  const session = Cookies.get('session');
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

  const removealert = () => {
    setTimeout(() => {
      setSucces(3);
    }, 4000);
  };

  const [oneUser, setOneUser] = useState({});

  const [defaultval, setDefault] = useState({
    birthday: '',
    courses: [],
    direccion: '',
    lastname: '',
    mail: '',
    name: '',
    password: '',
    phone: '',
    updatedAt: '',
    url: '/assets/profile/default.png',
    userType: '',
    username: '',
    _id: '',
  });

  const [state, setstate] = useState({
    data: {},
    session: false,
    loading: false,
    error: null,
  });

  const onSearch = (e) => {
    const data = RespUsers;
    const query = e.target.value;
    const usersFiltere = data.filter((names) => {
      return (
        names.name.toLowerCase().includes(query.toLowerCase()) ||
        names.lastname.toLowerCase().includes(query.toLowerCase()) ||
        names.username.toLowerCase().includes(query.toLowerCase())
      );
    });

    if (query === '') {
      setUsers(RespUsers);
    } else {
      setUsers(usersFiltere);
    }
  };

  const [AlertEdit, setAlertEdit] = useState(false);
  const showAlertEdit = () => setAlertEdit(true);
  const hideAlertEdit = () => setAlertEdit(false);

  const [AlertState, setAlertState] = useState(false);
  const showAlert = () => setAlertState(true);
  const hideAlert = () => setAlertState(false);

  useEffect(async () => {
    setstate({ ...state, loading: true });
    if (cookies.userData) {
      setcookiedata(JSON.parse(cookies.userData));
    }
    let res = await axios.get('/api/getUsers/');
    let data = res.data;
    setUsers(data.data);
    setRespUsers(data.data);
    setTimeout(() => setstate({ ...state, loading: false }), 1000);
  }, []);

  useEffect(async () => {
    setstate({ ...state, loading: true });
    let res = await axios.get('/api/getUsers/');
    let data = res.data;
    setUsers(data.data);
    setRespUsers(data.data);
    setTimeout(() => setstate({ ...state, loading: false }), 1000);
  }, [uptade]);

  const setValue = (e) => {
    setstate({
      ...state,
      data: { ...state.data, [e.target.name]: e.target.value },
    });
  };

  const setValueEdit = (e) => {
    setOneUser({
      ...oneUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar cookies={cookies} />
      <div className={AdminStyles.bgcolor}>
        {Succes === 1 ? (
          <Alert className={AdminStyles.alert} variant="dark">
            {MSG}
          </Alert>
        ) : Succes === 0 ? (
          <Alert className={AdminStyles.alert} variant="danger">
            {MSG}
          </Alert>
        ) : null}
        <Modal
          size="m"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={AlertState}
          onHide={hideAlert}
        >
          <Modal.Header className={AdminStyles.ModalHeader}>
            <Modal.Title className={AdminStyles.Title}>
              Borrar Usuario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className={AdminStyles.Text}>
              Si borra este usuario se elimanara por completo del sistema,
              seguro que desea continuar?
            </p>
          </Modal.Body>
          <Modal.Footer className={AdminStyles.ModalFooter}>
            <Button
              variant="danger"
              className={AdminStyles.HeaderBtn}
              onClick={async () => {
                hideAlert();
                let res = await axios.delete(`/api/getUsers/${oneUser._id}`);
                let data = res.data;
                setSucces(data.Success);
                setMSG(JSON.stringify(data.msg));
                setuptade(!uptade);
                setOneUser(defaultval);
                removealert();
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
          show={show}
          onHide={handleClose}
        >
          <Modal.Header className={AdminStyles.ModalHeader}>
            <Modal.Title className={AdminStyles.Title}>
              Crear Usuario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className={AdminStyles.forms}>
              <div className={AdminStyles.formstwo}>
                <label>
                  <span>Name</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="text"
                    name="name"
                    onChange={(e) => setValue(e)}
                    required
                  />
                </label>
                <label>
                  <span>LastName</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="text"
                    name="lastname"
                    onChange={(e) => setValue(e)}
                    required
                  />
                </label>
              </div>
              <div className={AdminStyles.formstwo}>
                <label>
                  <span>Matricula</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="text"
                    name="username"
                    onChange={(e) => setValue(e)}
                    required
                  />
                </label>
                <label>
                  <span>Password</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="password"
                    name="password"
                    onChange={(e) => setValue(e)}
                    required
                  />
                </label>
              </div>
              <label>
                <span>Type</span>

                <select
                  className={AdminStyles.addInputs}
                  autoComplete="off"
                  name="userType"
                  onChange={(e) => setValue(e)}
                  required
                >
                  <option value="u">Alumno</option>
                  <option value="m">Maestro</option>
                  <option value="a">Administrador</option>
                </select>
              </label>
              <label>
                <span>Email</span>
                <input
                  className={AdminStyles.addInputs}
                  autoComplete="off"
                  type="email"
                  name="mail"
                  onChange={(e) => setValue(e)}
                  required
                />
              </label>
              <label>
                <span>Direccion</span>
                <textarea
                  className={AdminStyles.addInputs}
                  autoComplete="off"
                  type="text"
                  name="direccion"
                  onChange={(e) => setValue(e)}
                  required
                ></textarea>
              </label>
              <div className={AdminStyles.formstwo}>
                <label>
                  <span>Phone</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="tel"
                    name="phone"
                    onChange={(e) => setValue(e)}
                    required
                  />
                </label>
                <label>
                  <span>Birthday</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="date"
                    name="birthday"
                    onChange={(e) => setValue(e)}
                    required
                  />
                </label>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer className={AdminStyles.ModalFooter}>
            <Button
              variant="secondary"
              className={AdminStyles.HeaderBtn}
              onClick={handleClose}
            >
              Cancelar
            </Button>

            <Button
              variant="primary"
              className={AdminStyles.HeaderBtn}
              onClick={async () => {
                handleClose();
                let res = await axios.post('/api/signup', state.data);
                let data = res.data;
                setSucces(data.Success);
                setMSG(JSON.stringify(data.msg));
                setuptade(!uptade);
                setOneUser(defaultval);
                removealert();
              }}
            >
              Agregar
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
              Editar Usuario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className={AdminStyles.forms}>
              <div className={AdminStyles.formstwo}>
                <label>
                  <span>Name</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="text"
                    name="name"
                    onChange={(e) => setValueEdit(e)}
                    value={oneUser.name}
                    required
                  />
                </label>
                <label>
                  <span>LastName</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="text"
                    name="lastname"
                    onChange={(e) => setValueEdit(e)}
                    value={oneUser.lastname}
                    required
                  />
                </label>
              </div>
              <div className={AdminStyles.formstwo}>
                <label>
                  <span>Matricula</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="text"
                    name="username"
                    onChange={(e) => setValueEdit(e)}
                    value={oneUser.username}
                    required
                  />
                </label>
                <label>
                  <span>Password</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="password"
                    name="password"
                    onChange={(e) => setValueEdit(e)}
                    value={oneUser.password}
                    required
                  />
                </label>
              </div>
              <label>
                <span>Type</span>

                <select
                  className={AdminStyles.addInputs}
                  autoComplete="off"
                  name="userType"
                  onChange={(e) => setValueEdit(e)}
                  value={oneUser.userType}
                  required
                >
                  <option value="u">Alumno</option>
                  <option value="m">Maestro</option>
                  <option value="a">Administrador</option>
                </select>
              </label>
              <label>
                <span>Email</span>
                <input
                  className={AdminStyles.addInputs}
                  autoComplete="off"
                  type="email"
                  name="mail"
                  onChange={(e) => setValueEdit(e)}
                  value={oneUser.mail}
                  required
                />
              </label>
              <label>
                <span>Direccion</span>
                <textarea
                  className={AdminStyles.addInputs}
                  autoComplete="off"
                  type="text"
                  name="direccion"
                  onChange={(e) => setValueEdit(e)}
                  value={oneUser.direccion}
                  required
                ></textarea>
              </label>
              <div className={AdminStyles.formstwo}>
                <label>
                  <span>Phone</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="tel"
                    name="phone"
                    onChange={(e) => setValueEdit(e)}
                    value={oneUser.phone}
                    required
                  />
                </label>
                <label>
                  <span>Birthday</span>
                  <input
                    className={AdminStyles.addInputs}
                    autoComplete="off"
                    type="date"
                    name="birthday"
                    onChange={(e) => setValueEdit(e)}
                    value={oneUser.birthday}
                    required
                  />
                </label>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer className={AdminStyles.ModalFooter}>
            <Button
              variant="danger"
              className={AdminStyles.HeaderBtn}
              onClick={hideAlertEdit}
            >
              Cerrar
            </Button>
            <Button
              variant="dark"
              className={AdminStyles.HeaderBtn}
              onClick={async () => {
                hideAlertEdit();
                // console.log(oneUser);
                let res = await axios.put(
                  `/api/getUsers/${oneUser._id}`,
                  oneUser
                );
                let data = res.data;
                setSucces(data.Success);
                setMSG(JSON.stringify(data.msg));
                setuptade(!uptade);
                setOneUser(defaultval);
                removealert();
              }}
            >
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>

        <div className={AdminStyles.usersGobal}>
          <div className={AdminStyles.Header}>
            <p className={AdminStyles.HeaderTitle}>Usuarios</p>
            <div className={AdminStyles.HeaderButtonCont}>
              <Button
                className={AdminStyles.HeaderBtn}
                onClick={handleShow}
                variant="dark"
              >
                Crear Usuario
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
          <div className={AdminStyles.adminUsers}>
            <div className={AdminStyles.adminUsersContSearch}>
              <input
                placeholder="Buscar usuario | Nombre Apellido | Matricula"
                onChange={(e) => onSearch(e)}
                className={AdminStyles.adminUsersSearch}
                autoComplete="off"
              />
              <div className={AdminStyles.adminUsersLeft}>
                <div className={AdminStyles.adminUsersCont}>
                  {state.loading === true ? (
                    <div className={AdminStyles.loadingUsers}>
                      <HashLoader size={50} />
                    </div>
                  ) : users.length === 0 ? (
                    <div className={AdminStyles.coursesAlert}>
                      <Alert
                        className={AdminStyles.coursesAlertText}
                        variant="info"
                      >
                        No hay usuarios registrados 🦐
                      </Alert>
                    </div>
                  ) : (
                    users.map((item, key) => (
                      <div key={key}>
                        <Card
                          className={AdminStyles.Card}
                          onClick={async (e) => {
                            let res = await axios.get(
                              `/api/getUsers/${item._id}`
                            );
                            let data = res.data;
                            setOneUser(data.data);
                          }}
                        >
                          <Card.Img
                            className={AdminStyles.CardImage}
                            variant="top"
                            src={item.url}
                          />
                          <Card.Body className={AdminStyles.CardBody}>
                            <Card.Title>{`${item.name} ${item.lastname}`}</Card.Title>
                          </Card.Body>
                        </Card>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className={AdminStyles.adminUsersRight}>
              {Object.keys(oneUser).length > 0 ? (
                <Card className={AdminStyles.CardProfile}>
                  <Card.Img
                    className={AdminStyles.CardProfileImg}
                    variant="top"
                    src={oneUser.url}
                  />
                  <Card.Body className={AdminStyles.CardProfileBody}>
                    <Card.Text>
                      <div>
                        <div>
                          <div className={AdminStyles.userInfo}>
                            <p>ID: </p>
                            <p>{oneUser._id}</p>
                          </div>
                          <p>Datos personales</p>
                          <hr />
                          <div className={AdminStyles.userInfo}>
                            <p>Nombre: </p>
                            <p>{`${oneUser.name} ${oneUser.lastname}`}</p>
                          </div>
                          <div className={AdminStyles.userInfo}>
                            <p>Matricula: </p>
                            <p>{oneUser.username}</p>
                          </div>
                          <div className={AdminStyles.userInfo}>
                            <p>Fecha de Nacimiento: </p>
                            <p>{oneUser.birthday}</p>
                          </div>
                          <div className={AdminStyles.userInfo}>
                            <p>Rol: </p>
                            {oneUser.userType === 'u' ? (
                              <p>Alumno</p>
                            ) : oneUser.userType === 'm' ? (
                              <p>Maestro</p>
                            ) : oneUser.userType === 'a' ? (
                              <p>Administrador</p>
                            ) : (
                              <p>Rol desconocido 🦐</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <p>Datos de contacto</p>
                          <hr />

                          <div className={AdminStyles.userInfo}>
                            <p>E-Mail: </p>
                            <p>{oneUser.mail}</p>
                          </div>
                          <div className={AdminStyles.userInfoDireccion}>
                            <p>Direccion: </p>
                            <p>{oneUser.direccion}</p>
                          </div>
                          <div className={AdminStyles.userInfo}>
                            <p>Telefono: </p>
                            <p>{oneUser.phone}</p>
                          </div>
                        </div>
                        <hr />
                        <div className={AdminStyles.userInfo}>
                          <p>ultima modificacion: </p>
                          <p>{oneUser.updatedAt}</p>
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className={AdminStyles.CardFooter}>
                    {oneUser.name === 'Admin' ? (
                      <>
                        <Button disabled variant="danger">
                          Borrar
                        </Button>
                        <Button disabled variant="dark">
                          Editar
                        </Button>
                      </>
                    ) : oneUser._id === '' ? (
                      <>
                        {oneUser._id != cookieData.id ? (
                          <Button disabled variant="danger">
                            Borrar
                          </Button>
                        ) : null}
                        <Button disabled variant="dark">
                          Editar
                        </Button>
                      </>
                    ) : (
                      <>
                        {oneUser._id != cookieData.id ? (
                          <Button
                            variant="danger"
                            onClick={() => {
                              showAlert();
                            }}
                          >
                            Borrar
                          </Button>
                        ) : null}
                        <Button
                          variant="dark"
                          onClick={() => {
                            showAlertEdit();
                          }}
                        >
                          Editar
                        </Button>
                      </>
                    )}
                  </Card.Footer>
                </Card>
              ) : (
                <Card className={AdminStyles.CardProfile}>
                  <Card.Img
                    className={AdminStyles.CardProfileImg}
                    variant="top"
                    src={defaultval.url}
                  />
                  <Card.Body className={AdminStyles.CardProfileBody}>
                    <Card.Text>
                      <div>
                        <div>
                          <div className={AdminStyles.userInfo}>
                            <p>ID: </p>
                            <p>{defaultval._id}</p>
                          </div>
                          <p>Datos personales</p>
                          <hr />
                          <div className={AdminStyles.userInfo}>
                            <p>Nombre: </p>
                            <p>{`${defaultval.name} ${defaultval.lastname}`}</p>
                          </div>
                          <div className={AdminStyles.userInfo}>
                            <p>Matricula: </p>
                            <p>{defaultval.username}</p>
                          </div>
                          <div className={AdminStyles.userInfo}>
                            <p>Fecha de Nacimiento: </p>
                            <p>{defaultval.birthday}</p>
                          </div>
                          <div className={AdminStyles.userInfo}>
                            <p>Rol: </p>
                            {defaultval.userType === 'u' ? (
                              <p>Alumno</p>
                            ) : defaultval.userType === 'm' ? (
                              <p>Maestro</p>
                            ) : defaultval.userType === 'a' ? (
                              <p>Administrador</p>
                            ) : (
                              <p>Rol desconocido 🦐</p>
                            )}
                          </div>
                        </div>
                        <div>
                          <p>Datos de contacto</p>
                          <hr />

                          <div className={AdminStyles.userInfo}>
                            <p>E-Mail: </p>
                            <p>{defaultval.mail}</p>
                          </div>
                          <div className={AdminStyles.userInfoDireccion}>
                            <p>Direccion: </p>
                            <p>{defaultval.direccion}</p>
                          </div>
                          <div className={AdminStyles.userInfo}>
                            <p>Telefono: </p>
                            <p>{defaultval.phone}</p>
                          </div>
                        </div>
                        <hr />
                        <div className={AdminStyles.userInfo}>
                          <p>ultima modificacion: </p>
                          <p>{defaultval.updatedAt}</p>
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className={AdminStyles.CardFooter}>
                    <Button variant="danger" disabled>
                      Borrar
                    </Button>
                    <Button variant="dark" disabled>
                      Editar
                    </Button>
                  </Card.Footer>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default adminUsers;
