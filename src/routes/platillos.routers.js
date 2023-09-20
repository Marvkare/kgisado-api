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
router.get("/platillos/proveedor/platillos/",[verifyToken], getPlatillosProveedor);
router.post("/platillos/", [verifyToken ],agregarPlatillo);
router.patch("/platillos/:idPlatillo", [verifyToken, esProveedor] ,acutalizarPlatillo);
router.delete("/platillos/:idPlatillo", [verifyToken, esProveedor], deletePlatillo)

export default router;