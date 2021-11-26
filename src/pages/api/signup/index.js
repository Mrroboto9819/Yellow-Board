import { dbConnect } from 'utils/db';
import Users from 'models/users';
import cookie from 'cookie';

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  // console.log(method, req.url);

  switch (method) {
    case 'POST':
      try {
        const newUser = new Users(body);
        const savedUser = await newUser.save();
        return res
          .status(200)
          .json({ Success: 1, data: savedUser, msg: 'Usuario creado' });
      } catch (err) {
        return res.status(200).json({
          Success: 0,
          data: null,
          msg: '⚠️ Error algun campo esta vacio',
        });
      }
    default:
      return res
        .status(200)
        .json({ Success: 0, data: null, msg: 'method not suported 🐣' });
  }
}
