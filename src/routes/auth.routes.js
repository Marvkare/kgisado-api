import { Router } from "express";
import {
  signinController,
  signupController,
  logout,
} from "../controllers/auth/authController.js";
import { verifyToken } from "../controllers/auth/verifyToken.js";

const router = Router();

router.post("/signup", signupController);

router.post("/signin", signinController);

router.get("/logout", logout);

export default router;