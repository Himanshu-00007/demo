import {Router} from "express";
import {loginUser, logoutUser, registerUser} from "../controllers/user.controllers.js";
import {verifyJwt} from "../middlewares/userAuth.js"
const router=Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt,logoutUser);

export default router;