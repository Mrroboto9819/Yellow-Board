import React, { useEffect, useState } from 'react';
import cursosActivos from '../../../styles/cursos.module.scss';
import Router from 'next/router';
import axios from 'axios';
import AdminStyles from '../../../styles/admin.module.scss';
import { Button, Modal, Alert, Table } from 'react-bootstrap';

const Cursos = ({ userCourses, cookieData, id, uid }) => {
  const [userList, setuserList] = useState([]);
  const [show, setshow] = useState(false);
  const [calList, setcalList] = useState({ calLists: [] });

  const handleOpen = () => setshow(true);
  const handleClose = () => setshow(false);

  useEffect(() => {
    const getusers = async () => {
      let obj = {
        _id: id,
      };
      let res = await axios.post('/api/getUsers/bycourse', obj);
      let data = res.data;
      setuserList(data.data.length);
    };
    getusers();
    Getcal();
  }, []);

  const [fn, setfn] = useState(0);

  const Getcal = async () => {
    let obj = {
      userGrade: uid,
    };
    let res = await axios.post('/api/grades/userGrades', obj);
    let datass = res.data;
    setcalList({ calLists: datass.data });
    console.log('datacoming', datass.data);
  };

  return (
    <div className={cursosActivos.Main}>
      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className={AdminStyles.ModalHeader}>
          <Modal.Title className={AdminStyles.Title}>
            Resumen de Calificaciones
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr className={cursosActivos.CalCont}>
                <th>#</th>
                <th>Actividad</th>
                <th>Calificacion</th>
              </tr>
            </thead>
            <tbody>
              {calList.calLists.length > 0 ? (
                calList.calLists.map((item, key) => (
                  <tr className={cursosActivos.CalCont}>
                    <td>{key + 1}</td>
                    <td>{item.gradesTitle}</td>
                    <td>{item.grades}</td>
                  </tr>
                ))
              ) : (
                <Alert>No hay calificaciones</Alert>
              )}
              <tr className={cursosActivos.CalCont}>
                <td />
                <td>Promedio Fina:</td>
                <td>{fn}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={cursosActivos.CalCont}
            variant="dark"
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={cursosActivos.MainCard}>
        <div className={cursosActivos.MainCardOptions}>
          <Button
            variant="dark"
            onClick={() => Router.push(`/dashboard/courses/${id}`)}
            className={cursosActivos.MainCardOptionsViewcourses}
          >
            Ver cursos
          </Button>
          {cookieData === 'm' ? (
            <Button
              variant="ligth"
              onClick={() => Router.push(`/dashboard/Exams/${id}`)}
              className={cursosActivos.MainCardOptionsCreateExam}
            >
              Crear exámen
            </Button>
          ) : (
            <Button
              variant="ligth"
              onClick={() => Router.push(`/dashboard/Exams/do/${id}`)}
              className={cursosActivos.MainCardOptionsCreateExam}
            >
              Hacer examen
            </Button>
          )}
        </div>
        <div className={cursosActivos.MainCardData}>
          <div>
            <p className={cursosActivos.MainCardDataName}>
              {userCourses.courseName}
            </p>
            {cookieData === 'u' ? (
              <Button
                variant="dark"
                onClick={() => {
                  Getcal();

                  let svg;
                  if (calList.calLists.length === 1) {
                    svg = calList.calLists[0].grades;
                  } else if (calList.calLists.length === 0) {
                    svg = 0;
                  } else {
                    let sum = calList.calLists.reduce(
                      (current, previous) => (current.grades += previous.grades)
                    );
                    console.log(sum);
                    svg = sum / calList.calLists.length;
                    console.log(svg);
                  }
                  setfn(svg);
                  handleOpen();
                }}
              >
                Ver calificaciones
              </Button>
            ) : null}
            {cookieData === 'm' ? (
              <p className={cursosActivos.MainCardDataStudents}>
                {userList} / 15
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cursos;
