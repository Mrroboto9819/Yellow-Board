import { dbConnect } from '../../../utils/db';
import Users from '../../../models/users';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  const { id } = body;
  switch (method) {
    case 'POST':
      try {
        const User = await Users.find({ _id: ObjectId(id) });
        console.log(User);
        return res
          .status(200)
          .json({ Success: 1, data: User, msg: `Perfil encontrado` });
      } catch (err) {
        return res
          .status(200)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
