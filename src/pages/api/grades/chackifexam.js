import { dbConnect } from '../../../utils/db';
import Grades from '../../../models/grades';
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  // console.log(body);
  let ip = fetch(
    'https://geolocation-db.com/json/654aaa90-4bc7-11ec-9d30-415d30341005'
  )
    .then((res) => {
      return res.json();
    })
    .then((data) =>
      console.log('from: ', data.country_code, 'ip: ', data.IPv4)
    );

  // console.log(req.method, req.url, 'ip', ip);
  switch (method) {
    case 'POST':
      try {
        const NewGrades = await Grades.find({
          $and: [
            { courseGrade: ObjectId(body.courseGrade) },
            { userGrade: ObjectId(body.userGrade) },
            { sta: 4 },
          ],
        });
        // // console.log(NewGrades);
        return res.status(200).json({
          Success: 4,
          data: NewGrades,
          msg: `Calificacion encontrados`,
        });
      } catch (err) {
        return res
          .status(400)
          .json({ Success: 0, data: null, msg: err.message });
      }
    default:
      return res.status(200).json({ msg: 'method not suported 🐣' });
  }
}
