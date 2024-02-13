const errorHandler = require('../middleware/error.js');
const Resolve = require('../models/resolve.model.js');
const { uploadFile } = require('../utils/uploadFile');

const create = async (req, res, next) => {
  //console.log(req.user);
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const uploadMediaContent = async () => {
    const media = [];

    try {
      for (const file of Array.from(req.files)) {
        const content = await uploadFile(file);
        media.push(content);
        //console.log('Inside func', media);
      }

      //console.log('Outside func', media);
      return media;
    } catch (err) {
      next(err);
    }
  };
  const media_content = await uploadMediaContent();
  //console.log(media_content);
  const newResolve = new Resolve({
    ...req.body,
    slug,
    media_content,
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
     const startIndex = parseInt(req.query.startIndex) || 0;
     const limit = parseInt(req.query.limit) ;
   // const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const resolves = await Resolve.find({
      ...(req.query.resolveId && { _id: req.query.resolveId }),
      ...(req.query.content && { content: req.query.content }),
      ...(req.query.title && { userId: req.query.title }),
      ...(req.query.media_content && {
        media_content: req.query.media_content,
      }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.post_as && { post_as: req.query.post_as }),
    })

    .limit(limit)
    //.sort({ updatedAt: sortDirection })
    .skip(startIndex)
    res.status(200).json({
      resolves,
    });
  } catch (error) {
    next(error);
  }
};

const likeResolve = async (req, res, next) => {
  try {
    const resolve = await Resolve.findById(req.params.resolveId);

    if (!resolve) {
      return next(errorHandler(404, "Resolve not found"));
    }

    const userIndex = resolve.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      resolve.numberOfLikes += 1;
      resolve.likes.push(req.user.id);
    } else {
      resolve.numberOfLikes -= 1;
      resolve.likes.splice(userIndex, 1);
    }

    await resolve.save();
    res.status(200).json(resolve);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getResolves, likeResolve };
