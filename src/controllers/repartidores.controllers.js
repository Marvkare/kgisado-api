import { query } from "express";
import {pool} from "../db.js";

export const getRepartidores = async (req, res) =>{
    try {
       const [rows] = await  pool.query("SELECT * FROM repartidor")
       res.json(rows)
       if(rows.length <= 0){
        return res.status(500).json({messge:"Tu tabla esta bacia"})
       }
       
    } catch (error) {
        return res.status(500).json({message:"Ocurrio algo",error}) 
    }
}

export const getRepartidor = async (req, res)=>{
    try {
       const {idRepartidor} = req.params 
       const [rows] = await pool.query("SELECT * FROM repartidor WHERE idRepartidor = ?",[idRepartidor])
       if(rows.length <= 0){
        return res.status(500).json({message:"Tu tabla esta vacia"})
       }
       res.json(rows);
    } catch (error) {
        
    }
}

export const agregarRepartidor = async(req, res)=>{
     try {
        const {PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, NumTelefono} = req.body
        const [rows] = await pool.query(
            "INSERT INTO repartidor (PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, NumTelefono ) Values (?,?,?,?,?)",
            [PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, NumTelefono]
        )
        res.status(201).json({idRepartidor: rows.insertId,PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, NumTelefono})
     } catch (error) {
       res.status(500).json({message:"Algo courrio\n"+error}) 
     }
}

export const updateRepartidor = async (req, res)=>{
    try {
       const {idRepartidor}  = req.params;
console.log(idRepartidor)
       const {PrimerNombre, SegundoNombre, PrimerApellido, SegunodApellido, NumTelefono}= req.body
       const [result] = await pool.query(
        "UPDATE repartidor SET PrimerNombre= IFNULL(?,PrimerNombre), SegundoNombre = IFNULL (?,SegundoNombre), PrimerApellido = IFNULL(?,PrimerApellido), SegundoApellido = IFNULL(?,SegundoApellido), NumTelefono = IFNULL(?,NumTelefono) WHERE idRepartidor = ?  ",
       [PrimerNombre, SegundoNombre, PrimerApellido, SegunodApellido, NumTelefono,idRepartidor])
       if(result.affectedRows <=0){
        res.status(404).json({message:"No se encontro repartidor"})
       }
       const [rows] = await pool.query(
        "SELECT * FROM repartidor WHERE idRepartidor = ?",
        [idRepartidor]
       )
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({message:"Algo paso/n"+error})
        
    }
}

export const deleteRepartidor = async(req, res) =>{
    try {
       const {idRepartidor} = req.params
       const [rows]  = await pool.query(
        "DELETE FROM repartidor WHERE idRepartidor =?",
        [idRepartidor] )
       if(rows.affectedRows<=0){
        return res.status(404).json({messge:"No se encontro repartidor"})
       }
       res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message:"Hubo un error"+error})
       
    }
}