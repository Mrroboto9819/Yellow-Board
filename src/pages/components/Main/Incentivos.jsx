import React from 'react';
import Dstyles from '../../../styles/incentivos.module.scss';

const Incentivos = () => {
  return (
    <div className={Dstyles.contIncentivos}>
      <h2 className={Dstyles.hdos}>
        Tu plataforma educativa de <b>refuerzo</b>
      </h2>
      <section className={Dstyles.informacion}>
        <article className={Dstyles.article}>
          <p className={Dstyles.intro}>Conoce mas sobre el proyecto Avocados</p>
          <hr />
          <img
            src="https://st2.depositphotos.com/1017986/8512/i/950/depositphotos_85126502-stock-photo-group-of-school-kids-writing.jpg"
            alt="Labs"
          />
          <hr />
        </article>
        <article className={Dstyles.article}>
          <p className={Dstyles.intro}>Combate el atraso educativo</p>
          <hr />
          <img
            src="https://cdn.wallapop.com/images/10420/6y/ms/__/c10420p420967059/i1272352552.jpg?pictureSize=W640"
            alt="Study"
          />
          <hr />
        </article>
        <article className={Dstyles.article}>
          <p className={Dstyles.intro}>Especialistas en niños de 6 a 12 años</p>
          <hr />
          <img
            src="https://estaticos.serpadres.es/media/cache/1140x_thumb/uploads/images/article/5fdc905c5cafe8d4f2f7975e/nino-pintando_0.jpg"
            alt="Books"
          />
          <hr />
        </article>
      </section>
    </div>
  );
};

export default Incentivos;
