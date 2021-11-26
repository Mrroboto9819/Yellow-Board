import { dbConnect } from '../../../../utils/db';
import Users from '../../../../models/users';

dbConnect();
export default async (req, res) => {
  const {
    method,
    query: { id },
    body,
  } = req;

  console.log(id);

  switch (method) {
    case 'PUT':
      console.log(body);
      try {
        const updatedUsers = await Users.findByIdAndUpdate(id, body);
        if (!updatedUsers) return res.status(200).json();
        return res.status(200).json({
          Success: 1,
          data: updatedUsers,
          msg: `Users actualizado`,
        });
      } catch (err) {
        return res.status(200).json({
          Success: 0,
          data: null,
          msg: '⚠️ Error algun campo esta vacio',
        });
      }
    default:
      return res.status(400).json({ msg: 'method not suported 🐣' });
  }
};
