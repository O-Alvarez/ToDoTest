import { execQuery } from "../config/db.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import querys from '../querys/querys.js'

dotenv.config()

export const authUser = async (req, res) => {

    const { mail, password } = req.body

    if (!mail || !password) {
        return res.status(400).json({ message: 'mail y password son requeridos' })
    }

    try {
        const [user] = await execQuery(querys.user.getBymail, [mail])

        if (!user || user.length === 0) {
            return res.status(401).json({ message: 'Correo o contraseña incorrecta' })
        }

        const validPass = await bcrypt.compare(password, user.password_hash)

        if (!validPass) {
            return res.status(401).json({ message: 'Correo o contraseña incorrecta' })
        }
        //genera JWT
        const payload = {
            id_user: user.id_user,
            mail: user.mail
        }

        //genera el token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION || '1h'
        })

        //elimina todas las sesiones anteriores
        await execQuery(querys.sessions.closeAllSessionsByUser, [user.id_user]);

        //variables para insertar en la tabla sesiones
        const parseExpiration = () => {
            const exp = process.env.JWT_EXPIRATION
            const regex = /^(\d+)([smhd])$/
            const match = exp.match(regex)
            if (!match) {
                throw new Error("Formato inválido en JWT_EXPIRATION. Usa por ejemplo: '15m', '1h', '2d'");
            }
            const value = parseInt(match[1]);
            const unit = match[2];

            const multipliers = {
                s: 1000,
                m: 60 * 1000,
                h: 60 * 60 * 1000,
                d: 24 * 60 * 60 * 1000
            }
            return value * multipliers[unit]
        }

        const expiration = new Date(Date.now() + parseExpiration())
        const userAgent = req.headers['user-agent'] || ''
        const ip = req.ip || req.connection.remoteAddress;
        
        await execQuery(querys.sessions.create, [user.id_user, token, userAgent, ip, expiration] )
        const session = await execQuery(querys.sessions.getByToken, [token]) 
        if (session.length == 0) {
            return res.status(401).json({ message: 'Error al generar token' })
        }

        res.json({
            message: 'Login exitoso',
            token,
        })

    }
    catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error inesperado del servidor' })
    }

}

export const registerUser = async (req, res) => {
    const { first_name, last_name, mail, password } = req.body

    if (!first_name) {
        return res.status(400).json({ message: 'nombres son requeridos' })
    }
    if (!last_name) {
        return res.status(400).json({ message: 'apellidos son requeridos' })
    }
    if (!mail) {
        return res.status(400).json({ message: 'mail requerido' })
    }
    if (!password) {
        return res.status(400).json({ message: 'contraseña necesaria' })
    }

    try {
        const result = await execQuery(querys.user.getBymail, [mail])
        if (result.length > 0) {
            return res.status(400).json({ message: 'El correo ya se encuentra registrado a otra cuenta' })
        }
        const saltRounds = 10;
        const hashed_pass = await bcrypt.hash(password, saltRounds)
        //crea el usuario
        await execQuery(querys.user.create, [first_name, last_name, mail, hashed_pass])
        //crea un proyecto inicial

        //crea categorias para el proyecto inicial

        //crea una tarea para una categoria

        res.json({
            message: 'se ha registrado el usuario correctamente'
        })


    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Error inesperado del servidor : ' + e })
    }


}
