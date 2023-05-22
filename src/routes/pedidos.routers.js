import {Router} from "express"
import {
    obtenerPedidos,
    obtenerPedido,
    nuevoPedido,
    editarPedido,
    eliminarPedido
} from "../controllers/pedidos.controller.js"

const router = Router()

router.get("pedido/", obtenerPedido)
router.get("pedidos/:idPedido", obtenerPedidos)
router.post("/pedido/", nuevoPedido)
router.patch("pedido/:idPedido", editarPedido)
router.delete("pedido/:idPedido", eliminarPedido)


export default router;