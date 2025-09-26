import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { execQuery } from '../config/db.js'
import querys from '../querys/querys.js'

dotenv.config()

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado' })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'Token inválido' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const [session] = await execQuery(querys.sessions.getByToken, [token])

        if (session.length === 0) {
            return res.status(401).json({ message: 'Sesión inválida o expirada' })
        }

        //valida que el token corresponde al usuario de la sesion activa
        if (decoded.id_user != session.id_user){
            return res.status(401).json({ message: 'Token invalido' })
        }

        req.user = decoded
        req.session = session

        next();

    } catch (err) {
        console.error('Error en verifyToken:', err.message)

        // Si el error es por expiración del token
        if (err.name === 'TokenExpiredError') {
            try {
                // Cierra la sesión en la tabla marcándola como inactiva
                await execQuery(querys.sessions.closeSessionByToken, [token])

                console.log('Sesión cerrada por expiración del token')
            } catch (dbErr) {
                console.error('Error actualizando sesión expirada:', dbErr.message)
            }

            return res.status(401).json({ message: 'Sesión expirada. Vuelve a iniciar sesión.' })
        }

        return res.status(403).json({ message: 'Token inválido' })
    }
}
