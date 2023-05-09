import {pool} from "../db.js";

export const getCompradores = async( req, res)=>{
    try {
       const [rows] = await pool.query("SELECT * FROM compradores"); 
       res.json(rows);
       if (rows.length <=0){
        return res.status(500).json({message:"Tu tabla esta bacia"})
       }
    } catch (error) {
       return res.status(500).json({message:"Hubo un error\n", error}) 
    }
};

export const getComprador = async (req, res) =>{
    try {
       const {id} = req.params; 
       const [rows] = await pool.query("SELECT * FROM compradores WHERE idCompradores = ?",[id])
       if (rows.length <= 0){
        return res.status(404).json({message:"No se encontro el empleado"})
       }
       res.json(rows[0])
    } catch (error) {
       return res.status(500).json({message:"Hubo un error\n", error}) 
    }
};

export const createComprador = async (req, res) =>{
    try {
       const {PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Direccion, NumTelefono} = req.body; 
       const [rows] = await pool.query(
        "INSERT INTO compradores (PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Direccion, NumTelefono) VALUES(?,?,?,?,?,?)",
        [PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Direccion, NumTelefono]
       )
       res.status(201).json({idCompradores: rows.insertId, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Direccion, NumTelefono})
    } catch (error) {
       console.log(error)
       return res.status(500).json({message:"Algo paso", error}) 
    }
};

export const updateComprador = async (req, res) =>{
    try {
        const {PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Direccion, NumTelefono} = req.body;
        const {idCompradores } = req.params  
        console.log(idCompradores)  
        const [result] =await pool.query(
            "UPDATE compradores SET PrimerNombre= IFNULL(?,PrimerNombre), SegundoNombre = IFNULL (?,SegundoNombre), PrimerApellido = IFNULL(?,PrimerApellido), SegundoApellido = IFNULL(?,SegundoApellido), Direccion = IFNULL(?, Direccion), NumTelefono = IFNULL(?,NumTelefono) WHERE idCompradores = ? ", [PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, Direccion, NumTelefono,idCompradores]
            );
        if(result.affectedRows === 0){
            return res.status(404).json({message:"Comprador no encontrado"});
        }
        const [rows] = await pool.query("SELECT * FROM compradores WHERE idCompradores = ?",[idCompradores]);
        res.json(rows[0]) 
       }
    catch (error) {
        return res.status(500).json({message:"Algo a ocurrido\n", error})
    }
}

export const deleteComprador = async (req, res ) =>{
    try {
        const {idCompradores} = req.params
        const [rows] = await pool.query("DELETE FROM compradores WHERE idCompradores = ?",[idCompradores])       
        if(rows.affectedRows <=0){
        return res.status(404).json({message:"Comprador no encontrado"})
        }
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message:"Algo salio mal\n",error})
    }
}