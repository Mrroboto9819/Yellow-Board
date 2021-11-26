import { dbConnect } from '../../../utils/db';
import exmas from '../../../models/exams';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  // console.log(req.method, req.url);
  // console.log(body._id);
  const { _id } = body;
  switch (method) {
    case 'POST':
      try {
        const Listexmas = await exmas.find({ course: ObjectId(_id) });

        return res.status(200).json({
          Success: 1,
          data: Listexmas,
          msg: `User found`,
        });
      } catch (err) {
        return res.status(400).json({ Success: false, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
