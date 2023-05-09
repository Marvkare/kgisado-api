import { Router } from "express";
import {
    getProveedores,
    getProveedor,
    agregarProveedor,
    actualizarProveedor,
    eliminarProveedor
} from "../controllers/proveedores.controllers.js";
const router = Router()

router.get("/proveedores", getProveedores);
router.get("/proveedores/:idProveedores", getProveedor);
router.post("/proveedores", agregarProveedor);
router.patch("/proveedores/:idProveedores", actualizarProveedor);
router.delete("/proveedores/:idProveedores", eliminarProveedor);
router.get("/inicionsesionProveedor")

export default router;