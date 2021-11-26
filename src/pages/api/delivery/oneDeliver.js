import { dbConnect } from '../../../utils/db';
import Delivery from '../../../models/delivery';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  // console.log(req.method, req.url);
  // console.log(body);
  switch (method) {
    case 'POST':
      try {
        const Deliverys = await Delivery.findOne({
          $and: [
            { activityDeliver: ObjectId(body.activityDeliver) },
            { userDeliver: ObjectId(body.userDeliver) },
          ],
        });
        // console.log(Deliverys);
        return res
          .status(200)
          .json({ Success: 4, data: Deliverys, msg: `Cursos encontrados` });
      } catch (err) {
        return res
          .status(400)
          .json({ Success: 0, data: null, msg: err.message });
      }
    // try {
    //   const Deliverys = new Delivery({
    //     activityDeliver: ObjectId(body.activityDeliver),
    //     userDeliver: ObjectId(body.userDeliver),
    //   });
    //   return res
    //     .status(200)
    //     .json({ Success: 1, data: Deliverys, msg: `Tarea creada` });
    // } catch (err) {
    //   return res
    //     .status(200)
    //     .json({ Success: 0, data: null, msg: err.message });
    // }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
