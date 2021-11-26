import { Schema, model, models, Types } from 'mongoose';

const coursesSchema = new Schema(
  {
    teacher: {
      type: Types.ObjectId,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    students: {
      type: Number,
      required: true,
      default: 0,
    },
    startDate: {
      type: String,
      required: true,
      default: 'no date set',
    },
    sta: {
      type: Number,
      trim: true,
      default: '1',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Courses || model('Courses', coursesSchema);
