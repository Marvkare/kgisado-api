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
        
    }
}

export const nuevoPedido = async (req, res) => {
try {
   const {Platillo, Descripcion, Imagen, Horarios, Costos, Direccion, idCompradores, idPlatillos} = req.body;
   "Agregar idCompradores idplatillos idRepartidorR en la tabla pedidos"
   const [rows] = await  pool.query(
    "INSERT INTO Pedidos (CostoDeEnvio, DireccionEntrega, DescripcionDeEnvio,idCompradoresC,idPlatillosPL,idTipoDePago,idRepartidorR) VALUES (?,?,?,?,?,?,?) ",
    [Platillo, Descripcion, Imagen, Horarios, Costos, Direccion, idCompradores, idPlatillos]
   )  
  res.status(202).json({idPedido : rows.insertId,Platillo, Descripcion, Imagen, Horarios, Costos, Direccion, idCompradores, idPlatillos })
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