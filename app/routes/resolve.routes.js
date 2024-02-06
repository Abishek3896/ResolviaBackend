const express = require('express');
const verifyToken = require('../middleware/verifyUser.js');
const { create, uploadFile,  getResolves} = require('../controllers/resolve.controller.js');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});


const router = express.Router();

router.post('/create', verifyToken, create);
router.post('/upload', upload.single('document'), uploadFile);
router.get('/getresolves', getResolves);

module.exports = router;
