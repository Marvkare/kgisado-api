import { Router } from "express";
import {
    getUsuario,
    getUsuarios,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    inicioSesionUsuario
} from "../controllers/usuario.controllers.js";
const router = Router()
import { verifyToken, esAdministrador} from "../controllers/auth/verifyToken.js";

router.get("/usuario", [verifyToken, esAdministrador],getUsuarios);
router.post("/usuario/login", inicioSesionUsuario)
router.get("/usuario/:idUsuario",verifyToken, getUsuario);
router.post("/usuario", agregarUsuario);
router.patch("/usuario/:idUsuario", verifyToken, actualizarUsuario);
router.delete("/usuario/:idUsuario", verifyToken, eliminarUsuario);
router.post("/inicio-session-Usuario", inicioSesionUsuario)

export default router;