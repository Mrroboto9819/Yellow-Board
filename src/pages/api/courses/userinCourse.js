import { dbConnect } from '../../../utils/db';
import Courses from 'models/coursesandusers';

dbConnect();

export default async function handler(req, res) {
  const { method, body, url } = req;
  // console.log(method + ' ' + url);
  const { id } = body;
  switch (method) {
    case 'POST':
      try {
        const userCourses = await Courses.find({ userId: id });
        return res.status(201).json({ msg: 'Data found', data: userCourses });
      } catch (err) {
        const userCourses = {
          _id: 404,
          teacher: 'Not Found',
          courseName: 'Not Found',
          description: 'Not Found',
          students: 0,
          startDate: 'Not Found',
        };
        return res.status(400).json({ data: userCourses, msg: err.message });
      }
    default:
      return res.status(400).json({ msg: 'method not suported 🐣' });
  }
}
