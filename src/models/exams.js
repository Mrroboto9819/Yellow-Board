import { Schema, model, models, Types } from 'mongoose';

const examsSchema = new Schema(
  {
    course: {
      type: Types.ObjectId,
      required: [true, 'Course is required'],
    },
    sta: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.exams || model('exams', examsSchema);
