import {Router} from "express"
import {
    obtenerPedidos,
    obtenerPedido,
    nuevoPedido,
    editarPedido,
    eliminarPedido
} from "../controllers/pedidos.controller.js"

const router = Router()

router.get("pedidos/", obtenerPedido)
router.get("pedidos/:idPedido", obtenerPedidos)
router.put("pedidos/", nuevoPedido)
router.patch("pedidos/:idPedido", editarPedido)
router.delete("pedidos/:idPedido", eliminarPedido)


export default router;