const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resolveSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    media_content: {
      type: String,
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    post_as: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

{/*resolveSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
}); */}

const Resolve = mongoose.model('Resolve', resolveSchema);
module.exports = Resolve;
