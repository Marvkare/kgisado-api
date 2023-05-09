import { Router } from "express";
import {
    inicioSesion,
    registrarUsuario,
    obtenerUsuario,
    cerrarSesion
} from "../controllers/auth.controller.js"

const router = Router()

router.post("/inicioSesion", inicioSesion);
router.post("/registrarUsuario", registrarUsuario);
router.get("/miusuario", obtenerUsuario);
router.get("/cerrarSesion", cerrarSesion)

export default router;