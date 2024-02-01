import express from "express";

import { signout, test } from "../controllers/user.controller.js";

const router = express.Router();

// router.post('/createProfile', addUser);
// router.delete('/deleteProfile', DeleteUser);
// router.put('/updateProfile', UpdateUser);
router.get("/test", test);
router.post("/signout", signout);

export default router;