import { Router } from "express";
import{
getRepartidores,
getRepartidor,
agregarRepartidor,
deleteRepartidor,
updateRepartidor
}from '../controllers/repartidores.controllers.js'
import { verifyToken,esProveedor } from "../controllers/auth/verifyToken.js";
const router = Router();

router.get("/repartidores/",getRepartidores);
router.get("/repartidor/:idRepartidor", getRepartidor);
router.post("/repartidor/", agregarRepartidor);
router.delete("/repartidor/:idRepartidor", deleteRepartidor);
router.patch("/repartidor/:idRepartidor", updateRepartidor);
export default router;
