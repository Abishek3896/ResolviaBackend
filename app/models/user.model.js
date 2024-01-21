const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    mobileNum: Number,
    password: String,
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    education: String,
    profession: String,
    country: String,
    tags: Array,
  },
  {
    timestamps: true,
  }
);

userSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("user", userSchema);
