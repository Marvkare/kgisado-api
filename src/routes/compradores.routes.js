import { Router } from "express";

import {
    getCompradores,
    getComprador,
    createComprador,
    updateComprador,
    deleteComprador,
    inicioSesionComprador

} from "../controllers/usuario.controllers.js"
import { verifyToken } from "../controllers/auth/verifyTokenComprador.js";
const router = Router();

router.get("/compradores", getCompradores);
router.get("/compradores/:idCompradores", getComprador, verifyToken);
router.post("/compradores/", createComprador)
router.patch("/compradores/:idCompradores", updateComprador)
router.delete("/compradores/:idCompradores", deleteComprador)
router.post("/compradores/inicio-sesion",inicioSesionComprador )


export default router;