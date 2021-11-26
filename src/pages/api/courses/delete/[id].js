import { dbConnect } from '../../../../utils/db';
import Courses from 'models/coursesandusers';

dbConnect();

export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case 'DELETE':
      try {
        const deletedUsers = await Courses.deleteMany({ courseId: id });
        if (!deletedUsers)
          return res
            .status(200)
            .json({ Success: 0, data: null, msg: 'Courses does not exists' });
        return res
          .status(200)
          .json({ Success: 1, data: null, msg: 'Usuario borrado' });
      } catch (err) {
        return res.status(200).json({
          Success: 0,
          data: null,
          msg: '⚠️ Error al comunicarse',
        });
      }
    default:
      return res
        .status(200)
        .json({ Success: 0, data: null, msg: 'method not suported 🐣' });
  }
};
