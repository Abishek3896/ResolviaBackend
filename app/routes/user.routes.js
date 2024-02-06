const express= require("express");

const { signout, test }= require("../controllers/user.controller.js");

const router = express.Router();

// router.post('/createProfile', addUser);
// router.delete('/deleteProfile', DeleteUser);
// router.put('/updateProfile', UpdateUser);
router.get("/test", test);
router.post("/signout", signout);

module.exports= router;