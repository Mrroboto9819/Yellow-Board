import { dbConnect } from '../../../utils/db';
import Courses from 'models/coursesandusers';

dbConnect();

export default async function handler(req, res) {
  const { method, body, url } = req;
  // console.log(method + ' ' + url);
  // console.log(body);

  switch (method) {
    case 'POST':
      try {
        const newCourse = new Courses(body);
        const savedCourse = await newCourse.save();
        return res
          .status(201)
          .json({ Success: 1, data: savedCourse, msg: `Usuario agregardo` });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case 'GET':
      try {
        const allCourses = await Courses.find();
        return res
          .status(200)
          .json({ Success: 1, data: allCourses, msg: `Cursos encontrados` });
      } catch (err) {
        return res
          .status(400)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(400).json({ msg: 'method not suported 🐣' });
  }
}
