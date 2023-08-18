import {Router } from "express"
import {
    getPlatillos,
    getPlatillo,
    agregarPlatillo,
    acutalizarPlatillo,
    deletePlatillo
} from "../controllers/platillos.controllers.js"
import { verifyToken, esProveedor, esAdministrador} from "../controllers/auth/verifyToken.js";
const router = Router()

router.get("/platillos/", [verifyToken, esAdministrador], getPlatillos);
router.get("/platillos/:idPlatillo",[verifyToken, esProveedor], getPlatillo);
router.post("/platillos/", [verifyToken, esProveedor],agregarPlatillo);
router.patch("/platillos/:idPlatillo", [verifyToken, esProveedor] ,acutalizarPlatillo);
router.delete("/platillos/:idPlatillo", [verifyToken, esProveedor], deletePlatillo)

export default router;