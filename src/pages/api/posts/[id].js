import { dbConnect } from '../../../utils/db';
import Posts from '../../../models/posts';
import Coursesandusers from 'models/coursesandusers';
import Courses from 'models/courses';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

dbConnect();

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const OnePost = await Posts.findOne({ _id: ObjectId(id) });
        const CourseData = await Courses.findOne({
          _id: ObjectId(OnePost.course),
        });
        let merge = {
          OnePost,
          CourseData,
        };
        return res.status(200).json({ Success: 1, data: merge, msg: `--` });
      } catch (err) {
        return res
          .status(200)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res
        .status(200)
        .json({ Success: 0, data: null, msg: 'method not suported 🐣' });
  }
}
