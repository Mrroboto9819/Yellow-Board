import { IncomingForm } from 'formidable-serverless';
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const { method, body, url } = req;
  switch (method) {
    case 'POST':
      const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();

        form.on('fileBegin', function (name, file) {
          //rename the incoming file to the file's name
          let documentOriginalName = file.name;
          let docChange = documentOriginalName.replace(/\s/g, '_');
          file.path = form.uploadDir + '/' + docChange;
        });
        form.uploadDir = './public/assets/profile/';
        form.keepExtensions = true;
        form.keepFilesnames = true;
        form.parse(req, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
          // // console.log(err, fields, files);
        });
      });
      return res.status(200).json({
        Success: 1,
        data: null,
        msg: `Archivo subido con exito`,
      });
    case 'PUT':
      console.log(body);
      try {
        const updatedUsers = await Users.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        });
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
