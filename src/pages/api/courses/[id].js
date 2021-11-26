import { dbConnect } from '../../../utils/db';
import Courses from 'models/courses';

dbConnect();

export default async (req, res) => {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const oneCourses = await Courses.findById(id);
        if (!oneCourses)
          return res
            .status(404)
            .json({ Success: 0, data: {}, msg: 'Courses does not exists' });
        return res
          .status(200)
          .json({ Success: 1, data: oneCourses, msg: `Course found` });
      } catch (err) {
        return res.status(200).json({
          Success: 0,
          data: null,
          msg: '⚠️ Error al comunicarse',
        });
      }
    case 'PUT':
      // console.log(body);
      try {
        const updatedCourses = await Courses.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!updatedCourses) return res.status(200).json();
        return res.status(200).json({
          Success: 1,
          data: updatedCourses,
          msg: `Usuario actualizado`,
        });
      } catch (err) {
        return res.status(200).json({
          Success: 0,
          data: null,
          msg: '⚠️ Error algun campo esta vacio',
        });
      }
    case 'DELETE':
      try {
        const deletedCourses = await Courses.findByIdAndDelete(id);
        if (!deletedCourses)
          return res
            .status(200)
            .json({ Success: 0, data: null, msg: 'Courses does not exists' });
        return res
          .status(200)
          .json({ Success: 1, data: null, msg: 'Usuario borrado' });
      } catch (err) {
        return res.status(200).json({
          Success: 0,
          data: null,
          msg: '⚠️ Error al comunicarse',
        });
      }
    default:
      return res
        .status(200)
        .json({ Success: 0, data: null, msg: 'method not suported 🐣' });
  }
};
