const express = require('express');
const verifyToken = require('../middleware/verifyUser.js');
const {create, getResolves} = require('../controllers/resolve.controller.js');


const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getresolves', getResolves);

module.exports = router;
