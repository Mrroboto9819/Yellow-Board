import { Schema, model, models, Types } from 'mongoose';

const deliverySchema = new Schema(
  {
    userDeliver: {
      type: Types.ObjectId,
      required: [true, 'User id is require is required'],
    },
    courseDeliver: {
      type: Types.ObjectId,
      required: [true, 'Cours id is required'],
    },
    activityDeliver: {
      type: Types.ObjectId,
      required: [true, 'Activity id is required'],
    },
    file: {
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

export default models.delivery || model('delivery', deliverySchema);
