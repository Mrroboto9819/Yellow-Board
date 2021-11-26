import { dbConnect } from '../../../utils/db';
import exmas from '../../../models/exams';

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  // console.log(req.method, req.url);
  // console.log(body);
  const { _id } = body;
  switch (method) {
    case 'POST':
      try {
        // const extraRes = { $push: { extraResource } };
        const newExam = new exmas({ course: _id });
        const savedExam = await newExam.save();
        return res
          .status(200)
          .json({ Success: 1, data: savedExam, msg: `Tarea creada` });
      } catch (err) {
        return res
          .status(200)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
