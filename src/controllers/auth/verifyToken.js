import jwt from 'jsonwebtoken'
import {conf} from '../../config.js'
import { pool } from '../../db.js';

export const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    console.log(conf)
    try {
    const decoded = jwt.verify(token, conf.secretUsuario, (err,decoded,req)=>{
        if(err){
            return res.status(200).json(err)
        }
        
        return decoded
    });
   
    next();   
    } catch (error) {
       console.log(error) 
    }
    

}

export const esAdministrador = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    const decoded = jwt.verify(token, conf.secretUsuario, (err,decoded)=>{
        if(err){
            return res.status(200).json(err)
        }
        return decoded
    });  
    const [rol]  = await pool.query("SELECT * FROM Rol")
    console.log(decoded)
    console.log(rol.length)
    
     for (let i = 0; i < rol.length; i++) {
      if (decoded.rol === 0 ) {
        next();
        return;
      }
      if(rol[i.idRol > rol.length]){
        return res.status(403).json({message:"No existe ese Rol"})
      }if(!(decoded.rol === 2)) {
        return res.status(403).json({message:"No tienes autorizacion para esta ruta"})
      }
    }
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const esComprador = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    const decoded = jwt.verify(token, conf.secretUsuario, (err,decoded)=>{
        if(err){
            return res.status(200).json(err)
        }
        return decoded
    });  
    const [rol]  = await pool.query("SELECT * FROM Rol")
    console.log(decoded)
    console.log(rol.length)
    for (let i = 0; i < rol.length; i++) {
      if (decoded.rol === 1 ) {
        next();
        return;
      }
      if(rol[i.idRol > rol.length]){
        return res.status(403).json({message:"No existe ese Rol"})
      }if(!(decoded.rol === 2)) {
        return res.status(403).json({message:"No tienes autorizacion para esta ruta"})
      }
    }
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const esProveedor = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    const decoded = jwt.verify(token, conf.secretUsuario, (err,decoded)=>{
        if(err){
            return res.status(200).json(err)
        }
        return decoded
    });  
    const [rol]  = await pool.query("SELECT * FROM Rol")
    console.log(decoded)
    console.log(rol.length)
    for (let i = 0; i < rol.length; i++) {
      if (decoded.rol === 2 ) {
        next();
        return;
      }
      if(rol[i.idRol > rol.length]){
        return res.status(403).json({message:"No existe ese Rol"})
      }if(!(decoded.rol === 2)) {
        return res.status(403).json({message:"No tienes autorizacion para esta ruta"})
      }
    }
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

