import {Router} from "express"
import {
    obtenerPedidos,
    obtenerPedido,
    nuevoPedido,
    editarPedido,
    eliminarPedido,
    pedidoProveedor
} from "../controllers/pedidos.controller.js"

const router = Router()

router.get("/pedidos/", obtenerPedidos)
router.get("/pedido/:idPedido", obtenerPedidos)
router.get("/pedidos/:idProveedor",pedidoProveedor)
router.post("/pedido/nuevo/", nuevoPedido)
router.patch("/pedido/:idPedido", editarPedido)
router.delete("/pedido/:idPedido", eliminarPedido)


export default router;