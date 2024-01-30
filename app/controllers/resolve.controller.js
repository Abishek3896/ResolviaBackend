const errorHandler = require('../middleware/error.js');
const Resolve = require('../models/resolve.model.js');
const create = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newResolve = new Resolve({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedResolve = await newResolve.save();
    res.status(201).json(savedResolve);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
