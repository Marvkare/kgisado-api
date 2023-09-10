import { Router } from "express";
import {
    getUsuario,
    getUsuarios,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    inicioSesionUsuario
} from "../controllers/usuario.controllers.js";
const router = Router()
import path from 'path'
import { verifyToken, esAdministrador} from "../controllers/auth/verifyToken.js";
import fileDirname from '../file-dir-name.js'
const { __dirname, __filename } = fileDirname(import.meta);

router.get("/usuario", [ ],getUsuarios);
router.post("/usuario/login", inicioSesionUsuario)
router.get("/usuario/:idUsuario", getUsuario);
router.post("/usuario", agregarUsuario);
router.patch("/usuario/:idUsuario",  actualizarUsuario);
router.delete("/usuario/:idUsuario",  eliminarUsuario);
router.post("/inicio-session-Usuario", inicioSesionUsuario)

router.get('/getImage/:id', (req, res) => {
   const {id} =  req.params
  // Envía el nombre de una imagen como respuesta
  console.log(path.join(__dirname,'../uploads'))
  res.sendFile(path.join(__dirname,'../uploads')+'/'+id)
});

export default router;
