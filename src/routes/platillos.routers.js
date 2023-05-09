import {Router } from "express"
import {
    getPlatillos,
    getPlatillo,
    agregarPlatillo,
    acutalizarPlatillo,
    deletePlatillo
} from "../controllers/platillos.controllers.js"

const router = Router()

router.get("/platillos/", getPlatillos);
router.get("/platillos/:idPlatillo", getPlatillo);
router.post("/platillos/", agregarPlatillo);
router.patch("/platillos/:idPlatillo", acutalizarPlatillo);
router.delete("/platillos/:idPlatillo", deletePlatillo)

export default router;