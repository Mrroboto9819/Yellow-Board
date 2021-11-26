import { dbConnect } from '../../../utils/db';
import Grades from '../../../models/grades';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  // console.log(req.method, req.url);
  // console.log(body);
  switch (method) {
    case 'POST':
      try {
        const NewGrades = await Grades.find({
          userGrade: ObjectId(body.userGrade),
        });
        // console.log(NewGrades);
        return res.status(200).json({
          Success: 4,
          data: NewGrades,
          msg: `Calificacion encontrados`,
        });
      } catch (err) {
        return res
          .status(400)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
