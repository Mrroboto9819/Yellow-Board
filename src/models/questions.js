import { Schema, model, models, Types } from 'mongoose';

const questionSchema = new Schema(
  {
    exam: {
      type: Types.ObjectId,
      required: [true, 'CourseId is required'],
    },
    question: {
      type: String,
    },
    answers: [],
    correctAns: {
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

export default models.question || model('question', questionSchema);
