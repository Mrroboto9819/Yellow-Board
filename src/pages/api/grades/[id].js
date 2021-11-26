import { dbConnect } from '../../../utils/db';
import Grades from '../../../models/grades';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

dbConnect();

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;

  console.log(id);
  switch (method) {
    case 'DELETE':
      try {
        const deletedCourses = await Grades.findByIdAndDelete(id);
        if (!deletedCourses)
          return res
            .status(200)
            .json({ Success: 0, data: null, msg: 'no existe' });
        return res
          .status(200)
          .json({ Success: 1, data: null, msg: 'Calificacion borrado' });
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
