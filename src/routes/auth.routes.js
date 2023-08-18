import { Router } from "express";
import {
  signinController,
  signupController,
  logout,
} from "../controllers/auth/authController.js";
import { verifyToken, esProveedor } from "../controllers/auth/verifyToken.js";

const router = Router();
//La ruta de platillos solo puede ser accesda por proveedores
router.post("/signup",[verifyToken], signupController);

router.post("/signin", signinController);

router.get("/logout", logout);

export default router;