//aqui se hace la logica para autetificacion
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'

export const authenticateToken = (allowedRoles) => async (req,res,next) => {
    try {
        const {cookies} = req
        const accessToken = cookies.token

        if(!accessToken){
            return res.status(401).json({
                code: -50,
                message: 'No hay token de acceso'})
        }

        const decodedToken = jwt.verify(accessToken, process.env.SECRET_KEY)//se verifica la clave secreta que es está en env con jwt
        console.log(decodedToken.id_user)
        const user = await User.findByPk(decodedToken.id_user)//se busca el usuario en la base de datos
       
        if(!user){
            return res.status(401).json({
                code: -70,
                msg:'Token no valido para acceso'
            })
        }

        const hasPermission = user.roles.some(role => allowedRoles.includes(role));
        if(!hasPermission){
            return res.status(403).json({
                code: -10,
                msg:'No tiene permisos necesarios'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            code: -100,
            msg: 'Error al verificar token'
        })
    }

}

