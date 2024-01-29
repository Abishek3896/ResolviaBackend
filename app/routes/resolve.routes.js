const express = require('express');
const verifyToken = require('../middleware/verifyUser.js');
const create = require('../controllers/resolve.controller.js');

const router = express.Router();

router.post('/create', verifyToken, create);

module.exports = router;
