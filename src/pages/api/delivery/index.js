import { dbConnect } from '../../../utils/db';
import Delivery from '../../../models/delivery';

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  // console.log(req.method, req.url);
  switch (method) {
    case 'POST':
      try {
        // const extraRes = { $push: { extraResource } };
        const newDelivery = new Delivery(body);
        const savedDelivery = await newDelivery.save();
        return res
          .status(200)
          .json({ Success: 1, data: savedDelivery, msg: `Tarea creada` });
      } catch (err) {
        return res
          .status(200)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
