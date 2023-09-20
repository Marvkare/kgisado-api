import {pool} from '../db.js'
import fs from 'fs-extra'
import {v4 as uuid} from 'uuid'
import jwt from 'jsonwebtoken'
import { conf , online} from '../config.js'
import {uploadImage} from '../utils/cloudinary.js'

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
export const getPlatillosProveedor = async (req, res)=>{
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
        let Imagen =""
        const token  = req.headers['x-access-token']
        console.log(token)
        const decoded = jwt.verify(token, conf.secretUsuario, (err,decoded,req)=>{
            if(err){
            return res.status(200).json(err)
        }
        
        return decoded
        }); 
        console.log(req.files);
        if(await online()){
            if(req.files?.Imagen){
                
                const result = await uploadImage(req.files.Imagen.tempFilePath)
                console.log(result)
                console.log(req.files.Imagen.tempFilePath)
                Imagen = result.secure_url
                await fs.unlink(req.files.Imagen.tempFilePath)      
            }
        }else{
            console.log(req.files.Imagen)
            console.log("recursos sin linea")
            const oldPath = req.files.Imagen.tempFilePath;
            const ext = req.files.Imagen.mimetype
            const imgName =uuid()+'.'+ext.slice(6);
             
        
            const newPath = './src/uploads/'+ imgName 
            
            fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error('Error al cambiar el nombre de la imagen:', err);
            } else {
                console.log('Nombre de la imagen cambiado exitosamente');
            }
            });
            Imagen = 'http://localhost:3000/api/getImage/'+imgName
        }
        console.log(req.body) 
        const {Platillo, Descripcion, Horarios, Costos, Direccion, Calificacion} = req.body
        const [rows] = await pool.query(
            "INSERT INTO platillos (Platillo, Descripcion, Imagen, Horarios, Costos, Direccion, Calificacion, Fecha)   VALUES(?,?,?,?,?,?,?, NOW()) ",
            [Platillo, Descripcion, Imagen, Horarios, Costos, Direccion,Calificacion]
        )
        console.log(rows)
        const [plati] = await pool.query(
            "INSERT INTO usuario_has_platillos (Usuario_idUsuario, Platillos_idPlatillos) VALUES(?,?) ",
            [decoded.id, rows.insertId]
        )   
        console.log(plati)
        res.status(201).json({idPlatillo: rows.insertId, Platillo, Descripcion, Imagen, Horarios, Costos, Direccion, Calificacion})
    } catch (error) {
        res.status(500).json({message:"Hubo un error"+ error})
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
