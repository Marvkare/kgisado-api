import  jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "../db.js" 

export const inicioSesion = async (req, res)=>{
    try {
        // resivimos data
        const {username, email, password} = req.body;
        //encriptamos la contraseña
        encryptPassword(password);
        // Creamos el usuario
    } catch (error) {
        
    }
}



export const obtenerUsuario = async (req, res) =>{

}
export const cerrarSesion = async (req, res) => {

}

