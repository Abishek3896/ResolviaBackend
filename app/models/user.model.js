const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNum: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://i.pinimg.com/originals/07/66/d1/0766d183119ff92920403eb7ae566a85.png',
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model('user', userSchema);
