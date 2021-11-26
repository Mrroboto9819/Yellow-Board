import { dbConnect } from '../../../utils/db';
import Users from '../../../models/users';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  // console.log(req.method, req.url);

  switch (method) {
    case 'GET':
      try {
        const allUsers = await Users.find({ userType: 'm' });
        return res
          .status(200)
          .json({ Success: 1, data: allUsers, msg: `User found` });
      } catch (err) {
        return res.status(400).json({ Success: false, msg: err.message });
      }
    default:
      return res.status(400).json({ msg: 'method not suported 🐣' });
  }
}
