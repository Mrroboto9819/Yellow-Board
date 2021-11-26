import { Schema, model, models, Types } from 'mongoose';

const coursesAndUsersSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: [true, 'Title is required'],
    },
    courseId: {
      type: Types.ObjectId,
      required: [true, 'Title is required'],
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

export default models.coursesAndUsers ||
  model('coursesAndUsers', coursesAndUsersSchema);
