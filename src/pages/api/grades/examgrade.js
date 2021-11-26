import { dbConnect } from '../../../utils/db';
import Grades from '../../../models/grades';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  // console.log(req.method, req.url);
  switch (method) {
    case 'POST':
      try {
        const newGrades = new Grades(body);
        const savedGrades = await newGrades.save();
        return res.status(200).json({
          Success: 1,
          data: savedGrades,
          msg: `Calificacion subida creada`,
        });
      } catch (err) {
        return res
          .status(200)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
