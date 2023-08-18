import {pool} from "../db.js";
import bcrypt from "bcryptjs"

export const getUsers = async( req, res)=>{
    try {
       const [rows] = await pool.query("SELECT * FROM Usuario"); 
       res.json(rows);
       if (rows.length <=0){
        return res.status(500).json({message:"Tu tabla esta bacia"})
       }
    } catch (error) {
       return res.status(500).json({message:"Hubo un error\n", error}) 
    }
};

export const getUser = async (req, res) =>{
    try {
       const {id} = req.params; 
       const [rows] = await pool.query("SELECT * FROM Usuario WHERE idUsuario = ?",[id])
       if (rows.length <= 0){
        return res.status(404).json({message:"No se encontro el empleado"})
       }
       res.json(rows[0])
    } catch (error) {
       return res.status(500).json({message:"Hubo un error\n", error}) 
    }
};

export const createUser = async (req, res) =>{
    try {
        const {PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Direccion, NumTelefono, NombreUsuario, Contrasena} = req.body; 
        const salt =  await bcrypt.genSalt(10);
        const ContraseñaEncriptada = await bcrypt.hash(Contrasena, salt)
        console.log(ContraseñaEncriptada)
        const [rows] = await pool.query(
        "INSERT INTO Usuario (PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Direccion, NumTelefono, NombreUsuario, Contrasena) VALUES(?,?,?,?,?,?,?,?)",
        [PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Direccion, NumTelefono, NombreUsuario, ContraseñaEncriptada]
       )
       res.status(201).json({idCompradores: rows.insertId, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Direccion, NumTelefono, NombreUsuario, ContraseñaEncriptada})
    } catch (error) {
       console.log(error)
       return res.status(500).json({message:"Algo paso", error}) 
    }
};

export const updateUser = async (req, res) =>{
    try {
        const {PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Direccion, NumTelefono} = req.body;
        const {idUsuario } = req.params  
        console.log(idUsuario)  
        const [result] =await pool.query(
            "UPDATE Usuario SET PrimerNombre= IFNULL(?,PrimerNombre), SegundoNombre = IFNULL (?,SegundoNombre), PrimerApellido = IFNULL(?,PrimerApellido), SegundoApellido = IFNULL(?,SegundoApellido), Direccion = IFNULL(?, Direccion), NumTelefono = IFNULL(?,NumTelefono) WHERE idUsuario = ? ", [PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Direccion, NumTelefono,idCompradores]
            );
        if(result.affectedRows === 0){
            return res.status(404).json({message:"Comprador no encontrado"});
        }
        const [rows] = await pool.query("SELECT * FROM Usuario WHERE idCompradores = ?",[idCompradores]);
        res.json(rows[0]) 
       }
    catch (error) {
        return res.status(500).json({message:"Algo a ocurrido\n", error})
    }
}

export const deleteUser = async (req, res ) =>{
    try {
        const {idUsuarios} = req.params
        const [rows] = await pool.query("DELETE FROM Usuario WHERE idUsuario = ?",[idCompradores])       
        if(rows.affectedRows <=0){
        return res.status(404).json({message:"Comprador no encontrado"})
        }
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message:"Algo salio mal\n",error})
    }
}

export const inicioSesionUser = async(req, res)=>{
    const {NombreUsuario, Contrasena} = req.body;
    //ver si el Usuario esta en nuestra base de datos
    const user = await pool.query("SELECT * FROM Usuario WHERE NombreUsuario = ?",
    [NombreUsuario])
    const userData = user[0]
    const match = await bcrypt.compare(Contrasena, userData[0].Contrasena);
    console.log(match)
    if(!match) {
        res.status(401).send({ auth: false, token: null });
        return res.status(404).send("Tu contraseña no es correcta")
    }
    if (!user) {
        return res.status(404).send("Su nombre de Usuario no existe");
    }
  //validamos la contraseña
  const token = jwt.sign({ id: userData[0].Contrasena}, conf.secretUsuario, {
    expiresIn: 60 * 60 * 24,
  });
  res.status(200).json({ auth: true, token });
}