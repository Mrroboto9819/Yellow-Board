import { dbConnect } from '../../../utils/db';
import { Types } from 'mongoose';
import Courses from 'models/coursesandusers';
const ObjectId = Types.ObjectId;

dbConnect();

export default async function handler(req, res) {
  const { method, body, url } = req;
  // console.log(method + ' ' + url);
  const { id } = body;
  switch (method) {
    case 'POST':
      try {
        const userCourses = await Courses.aggregate([
          {
            $lookup: {
              from: 'users', //colection
              localField: 'userId', // profesor
              foreignField: '_id', //id user users
              as: 'userCourses',
            },
          },
          {
            $lookup: {
              from: 'courses', //colection
              localField: 'courseId', // profesor
              foreignField: '_id', //id user course
              as: 'userCourses',
            },
          },
          { $unwind: '$userCourses' },
          { $match: { sta: 1, userId: ObjectId(id) } },
        ]);
        //para condiciones dentro del query
        // { $match: { teacher: ObjectId(teacher) } },

        return res.status(201).json({ msg: 'Data found', data: userCourses });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    default:
      return res.status(400).json({ msg: 'method not suported 🐣' });
  }
}
