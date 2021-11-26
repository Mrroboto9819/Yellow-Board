import { dbConnect } from '../../../utils/db';
import { Types } from 'mongoose';
import Delivery from 'models/delivery';
const ObjectId = Types.ObjectId;

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  // console.log(req.method, req.url);

  const { id, activityDeliver } = body;
  // console.log(activityDeliver.OnePost._id);
  switch (method) {
    case 'POST':
      try {
        // const extraRes = { $push: { extraResource } };
        const userDelivery = await Delivery.aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'userDeliver',
              foreignField: '_id',
              as: 'userDatas',
            },
          },
          {
            $lookup: {
              from: 'courses',
              localField: 'courseDeliver',
              foreignField: '_id',
              as: 'CoursData',
            },
          },
          { $unwind: '$CoursData' },
          { $unwind: '$userDatas' },
          // { $unwind: '$ActivityGrade' },

          {
            $match: {
              sta: 1,
              courseDeliver: ObjectId(id),
              activityDeliver: ObjectId(activityDeliver.OnePost._id),
            },
          },
        ]);
        return res
          .status(200)
          .json({ Success: 1, data: userDelivery, msg: `Tarea creada` });
      } catch (err) {
        return res
          .status(200)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
