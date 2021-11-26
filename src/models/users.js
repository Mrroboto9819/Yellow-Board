import { Schema, model, models } from 'mongoose';

const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
      trim: true,
      maxlength: [40, 'Title must be less then 40 characters'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'Name must be less then 200 characters'],
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      maxlength: [300, 'Name must be less then 200 characters'],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      maxlength: [20, 'Password must be less then 20 characters'],
    },
    userType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1,
      default: 'u',
    },
    mail: {
      type: String,
      required: true,
      trim: true,
      maxlength: [120, 'Password must be less then 120 characters'],
    },
    url: {
      type: String,
      trim: true,
      default: '/assets/profile/default.png',
    },
    direccion: {
      type: String,
      trim: true,
      maxlength: [500, 'Direccion must be less then 120 characters'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [15, 'Phonenumber must be less then 15 characters'],
    },
    birthday: {
      type: String,
      trim: true,
      maxlength: [11, 'Date must be less then 11 characters'],
    },
    sta: {
      type: Number,
      default: 1,
    },
    courses: [
      {
        type: String,
        trim: true,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Users || model('Users', usersSchema);
