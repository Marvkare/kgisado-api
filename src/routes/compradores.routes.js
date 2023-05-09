import { Router } from "express";

import {
    getCompradores,
    getComprador,
    createComprador,
    updateComprador,
    deleteComprador

} from "../controllers/compradores.controller.js"

const router = Router();

router.get("/compradores", getCompradores);
router.get("/compradores/:idCompradores", getComprador);
router.post("/compradores/", createComprador)
router.patch("/compradores/:idCompradores", updateComprador)
router.delete("/compradores/:idCompradores", deleteComprador)


export default router;