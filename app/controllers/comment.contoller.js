const Comment = require("../models/comment.model.js");
const error = require("../middleware/error.js");

 const createComment = async (req, res, next) => {
 try{
    const { content, resolveId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        error(403, "You are not allowed to create this comment")
        );
      }
      
      if (!req.body.content) {
        return next(error(400, 'Please add your comment'));
      }
    const newComment = new Comment({
      content,
      resolveId ,
      userId ,
    });
    
     const savedComment=await newComment.save();

    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};

const getResolveComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ resolveId: req.params.resolveId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

module.exports={createComment, getResolveComments}
