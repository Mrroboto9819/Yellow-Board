import { dbConnect } from '../../../utils/db';
import Users from '../../../models/users';

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  const { type } = body;

  // console.log(req.method, req.url);
  // console.log(body);

  switch (method) {
    case 'POST':
      try {
        const typeUsers = await Users.find({ userType: `${type}` });
        return res
          .status(200)
          .json({ Success: 1, data: typeUsers, msg: `User found` });
      } catch (err) {
        return res
          .status(200)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
