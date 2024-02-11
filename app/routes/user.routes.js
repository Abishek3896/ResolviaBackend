const express= require("express");
const verifyToken = require('../middleware/verifyUser.js');
const { signout, test, getUser,updateUser }= require("../controllers/user.controller.js");

const router = express.Router();

router.get("/test", test);
router.post("/signout", signout);
router.get("/getUser/:userId", getUser);

router.put('/update/:userId', verifyToken, updateUser);

module.exports= router;