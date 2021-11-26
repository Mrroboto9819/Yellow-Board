import { Schema, model, models, Types } from 'mongoose';

const postsSchema = new Schema(
  {
    course: {
      type: Types.ObjectId,
      required: [true, 'Course is required'],
    },
    athor: {
      type: Types.ObjectId,
      required: [true, 'Author is required'],
    },
    activityNum: {
      type: Number,
      required: [true, 'Activity Number is required'],
    },
    postTitle: {
      type: String,
      required: [true, 'Title is required'],
    },
    content: {
      type: String,
    },
    extraResource: [],
    file: {
      type: String,
    },
    date: {
      type: String,
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

export default models.posts || model('posts', postsSchema);
