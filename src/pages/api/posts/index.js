import { dbConnect } from '../../../utils/db';
import Posts from '../../../models/posts';

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  // console.log(req.method, req.url);
  // console.log(body);
  const { extraResource } = body;
  // console.log(extraResource);
  switch (method) {
    case 'POST':
      try {
        // const extraRes = { $push: { extraResource } };
        const newPosts = new Posts({
          ...body,
          extraResource: req.body.extraResource,
        });
        const savedPosts = await newPosts.save();
        return res
          .status(200)
          .json({ Success: 1, data: savedPosts, msg: `Tarea creada` });
      } catch (err) {
        return res
          .status(200)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
