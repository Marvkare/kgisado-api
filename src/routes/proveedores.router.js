import { Router } from "express";
import {
    getProveedores,
    getProveedor,
    agregarProveedor,
    actualizarProveedor,
    eliminarProveedor,
    inicioSesionProveedor
} from "../controllers/proveedores.controllers.js";
const router = Router()
import { verifyToken } from "../controllers/auth/verifyToken.js";

router.get("/proveedores", verifyToken, getProveedores);
router.post("/proveedores/login", inicioSesionProveedor)
router.get("/proveedores/:idProveedor",verifyToken, getProveedor);
router.post("/proveedores", agregarProveedor);
router.patch("/proveedores/:idProveedor", verifyToken, actualizarProveedor);
router.delete("/proveedores/:idProveedor", verifyToken, eliminarProveedor);
router.post("/inicio-session-proveedor", inicioSesionProveedor)

export default router;