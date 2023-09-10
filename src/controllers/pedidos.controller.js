import { query } from 'express'
import {pool} from '../db.js'

export const obtenerPedidos = async (req, res) =>{
    try {
      const [row] = await pool.query(
        "SELECT * FROM pedidos"
      )
      if(row.length ==0){
        res.status(404).json({message:"No hay pedidos en la tabla"})
      }
      res.json(row)
    } catch (error) { res.status(500).json({message:"Hubo un error"+ error}) 
    }
}

export const obtenerPedido = async (req, res) =>{
    try {
       const {idPedido} = req.params 
       const [rows] = await pool.query(
        "SELECT * FROM platillos WHERE id = ?  ",
        [idPedido]
       )

       if(idPedido.length == 0){
        res.status(404).json({message:"no se encontro platillo"})
       }
       res.json(rows[0])
    } catch (error) {
        res.status(500).json({message:error})
    }
}
export const pedidoProveedor= async(req, res) =>{
    try {
        const {idPlatillos, pedidosId, idUsuario, idPlatillo}= req.body;
        const {idProveedor} = req.params;
        
        const [row] = await pool.query(
          "SELECT php.Platillos_idPlatillos FROM platillos_has_pedidos AS php JOIN usuario_has_platillos AS uhp ON php.Platillos_idPlatillos = uhp.Platillos_idPlatillos WHERE uhp.Usuario_idUsuario = ?",
          [idProveedor]);
          const data = []
        for(let i=0; i< row.length; i++){

          const [platillos] =  await pool.query("SELECT * FROM platillos WHERE idPlatillos =?",
          [row[i].Platillos_idPlatillos]);
          data.push(platillos[0])
        }
        res.status(200).json(data);

    } catch (error) {
      
    }
}

export const nuevoPedido = async (req, res) => {

try {
   const {idPlatillo, CostoDeEnvio, DireccionEntrega, DescripcionDeEnvio, Tipo_de_pago_idTipo_de_pago, idComprador, PEDIDO_STATUS_idPedidoStatus} = req.body;
   "Agregar idCompradores idplatillos idRepartidorR en la tabla pedidos"
   const [rows] = await  pool.query(
    "INSERT INTO Pedidos (CostoDeEnvio, DireccionEntrega, DescripcionDeEnvio, PEDIDO_STATUS_idPedidoStatus, Tipo_de_pago_idTipo_de_pago) VALUES (?,?,?,?,?) ",
    [CostoDeEnvio, DireccionEntrega, DescripcionDeEnvio, PEDIDO_STATUS_idPedidoStatus, Tipo_de_pago_idTipo_de_pago]
   )  
   console.log(rows)
   const [rows2] = await pool.query(
    "INSERT INTO platillos_has_pedidos (Platillos_idPlatillos, Pedidos_idPedidos) VALUES (?,?)",
    [idPlatillo, rows.insertId]
   )
   console.log("hola")
   const [rows3] = await pool.query(
    "INSERT INTO  pedidos_has_Usuario (pedidos_idPedidos, Usuario_idUsuario) VALUES(?,?)",
    [rows.insertId, idComprador]
   )
  res.status(202).json({idPedido : rows.insertId,idPlatillo, idComprador, DescripcionDeEnvio, CostoDeEnvio })
} catch (error) {
  res.status(500).json({message:"error"+ error})   
}
}

export const editarPedido = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}

export const eliminarPedido = async (req, res) =>{
    try {
        
    } catch (error) {
        
    }
}