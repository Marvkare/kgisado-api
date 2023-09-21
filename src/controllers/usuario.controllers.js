import {pool} from "../db.js"
import  jwt  from "jsonwebtoken"
import bcrypt from"bcryptjs"
import {conf} from "../config.js"

export const getUsuarios = async(req, res) =>{
    try {
        const [rows] = await pool.query("SELECT * FROM usuario")
        if(rows.length <= 0){
            res.status(404).json({message:"No hay registros en la tabla Usuario"})
        }
        res.json(rows)
    } catch (error) {
        res.status(500).json({message:"Hubo un erro "+ error})
    }
}

export const getUsuario = async (req, res) =>{
    try {
        const {idUsuario} = req.params
        const [rows] = await pool.query("SELECT * FROM usuario WHERE idUsuario =?",
        [idUsuario])
        if(rows.length == 0){
            res.status(404).json({message: "No se encontro proveedor"})
        }
    } catch (error) {
        
    }
}

export const agregarUsuario = async (req, res) =>{
    try {
        //obtenemos datos
        const {Nombre, Apellido, Direccion, Usuariocol, NumTelefono, NombreUsuario, Contrasena, Rol_idRol} = req.body
        console.log(req.body)
        const salt =  await bcrypt.genSalt(10);
        const ContraseñaEncriptada = await bcrypt.hash(Contrasena, salt)
        
        const [rows] = await pool.query(
            "INSERT INTO usuario (Nombre, Apellido, Direccion, UsuarioCol, NumTelefono, NombreUsuario, Contrasena, Rol_idRol) VALUES(?,?,?,?,?,?,?,?) ",
            [Nombre, Apellido, Direccion, Usuariocol, NumTelefono, NombreUsuario, ContraseñaEncriptada, parseInt(Rol_idRol)]) 

        const token = jwt.sign({ id: rows.insertId }, conf.secretUsuario, {
            expiresIn: 60 * 60 * 24
        })
        
        res.status(201).json({idUsuario: rows.insertId, Nombre, Apellido, Direccion, Usuariocol, NumTelefono, NombreUsuario, ContraseñaEncriptada, Rol_idRol, token})

    }catch (error) {
        console.log(error)
        return res.status(500).json({message:"Ocurrio un error"+ error})        
    }
}

export const actualizarUsuario = async(req,res) =>{
    try {
        const {idUsuario} = req.params;
        const {Nombre, Apellido, Direccion, UsuarioCol, NumTelefono, NombreUsuario, Contrasena, Rol_idRol} = req.body;
        const [result] = await pool.query(
            "UPDATE usuario SET Nombre = IFNULL(?, Nombre), Apellido = IFNULL(?,Apellido), Direccion = IFNULL(?,Direccion), UsuarioCol = IFNULL(?, UsuarioCol), NumTelefono = IFNULL (?,NumTelefono), NombreUsuario = IFNULL(?,NombreUsuario), Contrasena = IFNULL(?,Contrasena), Rol_idRol = IFNULL(?,Rol_idRol) WHERE idUsuario =?",
            [Nombre, Apellido, Direccion, UsuarioCol, NumTelefono, NombreUsuario, Contrasena, Rol_idRol, idUsuario])
        if(result.affectedRows === 0){
            return res.status(404).json({message:"No se encontro Proveedor"})
        }
        const [rows] = await pool.query(
            "SELECT * FROM Usuario WHERE idUsuario = ? ",
            [idUsuario]
        )
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({message:"Hubo un erro"+ error})
    }
}

export const eliminarUsuario = async(req, res) =>{
    try {
        const {idUsuario} = req.params;
        const [rows] = await pool.query(
            "DELETE FROM usuario WHERE idUsuario = ?",
            [idUsuario]
        )
        if(rows.affectedRows === 0){
            res.status(404).json({message:"No se encontro Proveeedor"})
        }
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message:"Hubo un error :c\n"+error})
    }
}

export const inicioSesionUsuario = async(req, res)=>{
    try {
    const {NombreUsuario, Contrasena} = req.body;
    //ver si el Usuario esta en nuestra base de datos
    console.log(NombreUsuario)
    const [row] = await pool.query("SELECT * FROM usuario WHERE NombreUsuario = ?",
    [NombreUsuario])
    console.log(row.length)
    const userData = row[0]
    if (row.length==0) {
        return res.status(404).send("Su nombre de Usuario no existe");
    }
    const match = await bcrypt.compare(Contrasena, userData.Contrasena);
    console.log(match)
    if(!match) {
        res.status(401).send({ auth: false, token: null });
        return res.status(404).send("Tu contraseña no es correcta")
    }
    
  //validamos la contraseña

    const token =  jwt.sign({ id: userData.idUsuario, rol: userData.Rol_idRol }, conf.secretUsuario, {
    expiresIn: 60 * 60 * 24,
  });
  
  res.status(200).json({ auth: true, token, rol: userData.Rol_idRol,idUsuario: userData.idUsuario });
    }catch(error){
        res.status(200).json({message: error, });
    }
}
