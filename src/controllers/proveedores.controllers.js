import {pool} from "../db.js"
import  jwt  from "jsonwebtoken"
import bcrypt from"bcryptjs"

export const getProveedores = async(req, res) =>{
    try {
        const [rows] = await pool.query("SELECT * FROM proveedores")
        if(rows.length <= 0){
            res.status(404).json({message:"No hay registros en la tabla proveedores"})
        }
        res.json(rows)
    } catch (error) {
        res.status(500).json({message:"Hubo un erro "+ error})
    }
}

export const getProveedor = async (req, res) =>{
    try {
        const {idProveedor} = req.params
        const [rows] = await pool.query("SELECT * FROM proveedores WHERE id =?",
        [idProveedor])
        if(rows.length == 0){
            res.status(404).json({message: "No se encontro proveedor"})
        }
    } catch (error) {
        
    }
}

export const agregarProveedor = async (req, res) =>{
    try {
        //obtenemos datos
        const {Nombre, Apellido, Direccion, Proveedorescol, NumTelefono, NombreUsuario, Contrasena} = req.body
        console.log(req.body)
        const salt =  await bcrypt.genSalt(10);
        const ContraseñaEncriptada = await bcrypt.hash(Contrasena, salt)
        
        const [rows] = await pool.query(
            "INSERT INTO proveedores (Nombre, Apellido, Direccion, Proveedorescol, NumTelefono, NombreUsuario, Contrasena) VALUES(?,?,?,?,?,?,?) ",
            [Nombre, Apellido, Direccion, Proveedorescol, NumTelefono, NombreUsuario, ContraseñaEncriptada]) 

        res.status(201).json({idProveedor: rows.insertedId, Nombre, Apellido, Direccion, Proveedorescol, NumTelefono, NombreUsuario, ContraseñaEncriptada})

    } catch (error) {
        return res.status(500).json({message:"Ocurrio un error"+ error})        
    }
}

export const actualizarProveedor = async(req,res) =>{
    try {
        const {idProveedores} = req.params;
        const {Nombre, Apellido, Direccion, Proveedorescol, NumTelefono} = req.body;
        const [result] = await pool.query(
            "UPDATE proveedores SET Nombre = IFNULL(?, Nombre), Apellido = IFNULL(?,Apellido), Direccion = IFNULL(?,Direccion), Proveedorescol = IFNULL(?, Proveedorescol), NumTelefono = IFNULL (?,NumTelefono) WHERE idProveedores =?",
            [Nombre, Apellido, Direccion, Proveedorescol, NumTelefono, idProveedores])
        if(result.affectedRows === 0){
            return res.status(404).json({message:"No se encontro Proveedor"})
        }
        const [rows] = await pool.query(
            "SELECT * FROM proveedores WHERE idProveedores = ? ",
            [idProveedores]
        )
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({message:"Hubo un erro"+ error})
    }
}

export const eliminarProveedor = async(req, res) =>{
    try {
        const {idProveedores} = req.params;
        const [rows] = await pool.query(
            "DELETE FROM proveedores    WHERE idProveedores = ?",
            [idProveedores]
        )
        if(rows.affectedRows === 0){
            res.status(404).json({message:"No se encontro Proveeedor"})
        }
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message:"Hubo un error :c\n"+error})
    }
}

const encryptPassword = async (password) =>{
    
}