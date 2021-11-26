import { dbConnect } from '../../../../utils/db';
var fs = require('fs');
import Delivery from '../../../../models/delivery';
import Grade from '../../../../models/grades';
dbConnect();

export default async (req, res) => {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case 'DELETE':
      try {
        // console.log(body);
        const deletedPosts = await Delivery.findByIdAndDelete(id);
        fs.unlink(`./public${body.filePath}`, function (err) {
          if (err) console.log(err);
          console.log('File deleted!');
        });
        const deleteGrade = await Grade.findByIdAndDelete();
        if (!deletedPosts)
          return res
            .status(200)
            .json({ Success: 0, data: null, msg: 'Users does not exists' });
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

    case 'PUT':
      try {
        const updatedPosts = await Posts.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
        if (!updatedPosts) return res.status(200).json();
        return res.status(200).json({
          Success: 1,
          data: updatedPosts,
          msg: `Post actualizado`,
        });
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
};
