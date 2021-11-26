import { dbConnect } from '../../../utils/db';
import Ques from '../../../models/questions';

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  // console.log(req.method, req.url);
  // console.log(body);
  switch (method) {
    case 'POST':
      try {
        // const extraRes = { $push: { extraResource } };
        const newQues = new Ques(body);
        const savedQues = await newQues.save();
        return res
          .status(200)
          .json({ Success: 1, data: savedQues, msg: `Tarea creada` });
      } catch (err) {
        return res
          .status(200)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
