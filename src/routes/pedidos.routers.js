import {Router} from "express"
import {
    obtenerPedidos,
    obtenerPedido,
    nuevoPedido,
    editarPedido,
    eliminarPedido,
    pedidoProveedor,
    pedidoComprador,
    pedidoStatuA
} from "../controllers/pedidos.controller.js"

const router = Router()

router.get("/pedidos/", obtenerPedidos)
router.get("/pedido/:idPedido", obtenerPedidos)
router.get("/proveedor/pedidos/:idProveedor",pedidoProveedor)
router.get("/proveedor/pedido/aceptar/:idPedido",pedidoProveedor)
router.patch("/proveedor/pedido/statusA/:id", pedidoStatuA)
router.get("/comprador/pedidos/:miId", pedidoComprador)
router.post("/pedido/nuevo/:idPlatillo", nuevoPedido)
router.patch("/pedido/:idPedido", editarPedido)
router.delete("/pedido/:idPedido", eliminarPedido)


export default router;