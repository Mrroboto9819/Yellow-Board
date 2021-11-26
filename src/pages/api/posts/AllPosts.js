import { dbConnect } from '../../../utils/db';
import { Types } from 'mongoose';
import Posts from '../../../models/posts';
const ObjectId = Types.ObjectId;

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  // console.log(req.method, req.url);

  const { courseId } = body;
  // console.log(courseId);
  switch (method) {
    case 'POST':
      try {
        // const extraRes = { $push: { extraResource } };
        const userPosts = await Posts.aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'athor',
              foreignField: '_id',
              as: 'userDatas',
            },
          },
          {
            $lookup: {
              from: 'courses',
              localField: 'course',
              foreignField: '_id',
              as: 'CoursData',
            },
          },
          { $unwind: '$CoursData' },
          { $unwind: '$userDatas' },

          { $match: { sta: 1, course: ObjectId(courseId) } },
        ]);
        return res
          .status(200)
          .json({ Success: 1, data: userPosts, msg: `Tarea creada` });
      } catch (err) {
        return res
          .status(200)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
