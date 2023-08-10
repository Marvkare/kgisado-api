import jwt from 'jsonwebtoken'
import {conf} from '../../config.js'

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
     const decoded = jwt.verify(token, conf.secretProveedores);
    req.userId = decoded.id
    console.log(req.userId)
    next();   
    } catch (error) {
       console.log(error) 
    }
    

}
