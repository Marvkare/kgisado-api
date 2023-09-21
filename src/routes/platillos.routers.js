import {Router } from "express"
import {
    getPlatillos,
    getPlatillo,
    agregarPlatillo,
    acutalizarPlatillo,
    deletePlatillo,
    getPlatillosProveedor
} from "../controllers/platillos.controllers.js"
import { verifyToken, esProveedor, esAdministrador} from "../controllers/auth/verifyToken.js";
const router = Router()

router.get("/platillos/", [ ], getPlatillos);
router.get("/platillos/:idPlatillo",[verifyToken], getPlatillo);
router.get("/platillos/proveedor/platillos/:idProveedor",[verifyToken], getPlatillosProveedor);
router.post("/platillos/", [verifyToken ],agregarPlatillo);
router.patch("/platillos/:idPlatillo", [verifyToken] ,acutalizarPlatillo);
router.delete("/platillos/:idPlatillo", [verifyToken], deletePlatillo)

export default router;