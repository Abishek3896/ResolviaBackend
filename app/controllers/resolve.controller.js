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

const getResolves = async (req, res, next) => {
  try {

    // const startIndex = parseInt(req.query.startIndex) || 0;
    // const limit = parseInt(req.query.limit) || 9;
    // const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const resolves = await Resolve.find({
      ...(req.query.resolveId && { _id: req.query.resolveId }),
      ...(req.query.content && { content: req.query.content }),
      ...(req.query.title && { userId: req.query.title }),
      ...(req.query.media_content && {media_content: req.query.media_content}),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.post_as && {post_as:req.query.post_as})   
    })

    // .sort({ updatedAt: sortDirection })
    // .skip(startIndex)
    // .limit(limit);
    res.status(200).json({
      resolves,
    });
  } catch (error) {
    next(error);
  }
};

module.exports={create, getResolves}