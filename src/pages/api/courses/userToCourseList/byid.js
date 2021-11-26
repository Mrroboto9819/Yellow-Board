import { dbConnect } from '../../../../utils/db';
import { Types } from 'mongoose';
import Courses from 'models/coursesandusers';
const ObjectId = Types.ObjectId;

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  const { id } = body;

  // console.log(req.method, req.url);

  switch (method) {
    case 'POST':
      try {
        // // console.log('body: ', body);
        const userCourses = await Courses.aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'listUsers',
            },
          },
          {
            $lookup: {
              from: 'courses',
              localField: 'courseId',
              foreignField: '_id',
              as: 'listCourse',
            },
          },
          { $unwind: '$listCourse' },
          { $unwind: '$listUsers' },

          { $match: { sta: 1, userId: ObjectId(id) } },
        ]);
        //para condiciones dentro del query
        // { $match: { teacher: ObjectId(teacher) } },

        // // console.log('data', userCourses);

        return res.status(201).json({ msg: 'Data found', data: userCourses });
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }

    case 'DELETE':
      try {
        const deletedUser = await Courses.findByIdAndDelete(id);
        if (!deletedUser)
          return res
            .status(200)
            .json({ Success: 0, data: null, msg: 'Usuario no existente' });
        return res.status(200).json({
          Success: 1,
          data: deletedUser,
          msg: 'Usuario borrado de este curso',
        });
      } catch (err) {
        return res.status(200).json({
          Success: 0,
          data: null,
          msg: '⚠️ Error al comunicarse',
        });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
