const express = require('express');
const verifyToken = require('../middleware/verifyUser.js');
const { createComment , getResolveComments} = require('../controllers/comment.contoller.js');

const router = express.Router();

router.post('/createComment', verifyToken, createComment);
router.get('/getResolveComments/:resolveId', getResolveComments);

module.exports = router;