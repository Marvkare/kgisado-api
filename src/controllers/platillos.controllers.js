import {pool} from '../db.js'

export const getPlatillos = async (req, res)=>{
    try {
        const [rows] = await pool.query(
            "SELECT * FROM platillos")
        if(rows.length<=0){
            return res.status(404).json({message:"No hay platillos en la tabla"})
        }
        res.json(rows)
    } catch (error) {
       res.status(500).json({message:"Ocurrio algo",error}) 
    }
}

export const getPlatillo = async (req, res)=>{
    try {
        const {idPlatillo} = req.params
        const [rows] = await pool.query("SELECT * FROM platillos WHERE idPlatillos = ?",
        [idPlatillo])
        if(rows.length <=0){
            return res.status(404).json({message:"No se encontro platillo"})
        }
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message:"Hubo un error",error})
    }
}

export const agregarPlatillo = async (req, res)=>{
    try {
        const {Platillo, Descripcion, Imagen, Horarios, Costos, Direccion, Calificacion, idProveedor} = req.body
        const [rows] = await pool.query(
            "INSERT INTO platillos (Platillo, Descripcion, Imagen, Horarios, Costos, Direccion, Calificacion)   VALUES(?,?,?,?,?,?,?)",
            [Platillo, Descripcion, Imagen, Horarios, Costos, Direccion,Calificacion]
        )
        const [plati] = await pool.query(
            "INSERT INTO Usuario_has_platillos (Usuario_idUsuario, Platillos_idPlatillos) VALUES(?,?) ",
            [idProveedor, rows.insertId]
        )   
        
        res.status(201).json({idPlatillo: rows.insertId, Platillo, Descripcion, Imagen, Horarios, Costos, Direccion, Calificacion})
    } catch (error) {
        res.status(500).json({message:"Hubo un error",error})
    }
}

export const acutalizarPlatillo = async (req, res) =>{
    try {
        const {idPlatillo} = req.params;
        const {Platillo, Descripcion, Imagen, Horarios, Costos, Direccion, Calificacion} = req.body;
        const [result] =await pool.query(
            "UPDATE  platillos SET Platillo = IFNULL (?,Platillo), Descripcion = IFNULL (?,Descripcion), Imagen = IFNULL (?, Imagen), Horarios = IFNULL (?,Horarios), Costos = IFNULL (?,Costos), Direccion = IFNULL(?,Direccion), Calificacion = IFNULL (?,Calificacion) WHERE idPlatillos = ?",
            [Platillo, Descripcion, Imagen, Horarios, Costos, Direccion, Calificacion, idPlatillo]
        );
        if(result.affectedRows === 0){
            return res.status(404).json({message:"Platillo no encontrado"})
        }
        const row = await pool.query("SELECT * FROM  platillos WHERE idPlatillos = ?", [idPlatillo])
        res.json(row[0])
        
    } catch (error) {
            return res.status(404).json({message:"hubo un error"+error})
    } 
}

export const deletePlatillo = async (req, res) =>{
    try {
        const {idPlatillo} = req.params;
        const [row] = await pool.query(
            "DELETE FROM platillos WHERE idPlatillos= ?",
            [idPlatillo])
        if(row.affectedRows == 0){
            res.status(404).json({message:"No se encontro platillo"})
        }
        res.sendStatus(204)
    } catch (error) {
       res.sendStatus(500).json({message:"Algo salio mal"+error}) 
    }
}