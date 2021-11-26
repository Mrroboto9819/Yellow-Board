import { dbConnect } from '../../../utils/db';
import { Types } from 'mongoose';
import Courses from 'models/courses';
const ObjectId = Types.ObjectId;

dbConnect();
export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case 'GET':
      try {
        const allCourses = await Courses.find({ userType: 'm' });
        return res
          .status(200)
          .json({ Success: 3, data: allCourses, msg: `Cursos encontrados` });
      } catch (err) {
        return res
          .status(400)
          .json({ Success: 0, data: null, msg: err.message });
      }
    case 'POST':
      try {
        const newCourse = new Courses(body);
        const savedCourse = await newCourse.save();
        return res
          .status(200)
          .json({ Success: 1, data: savedCourse, msg: `Curso agregado` });
      } catch (err) {
        return res
          .status(200)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
