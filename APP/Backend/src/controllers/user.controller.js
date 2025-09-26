import { execQuery } from "../config/db.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import querys from "../querys/querys.js";

dotenv.config()

export const deleteUser = async (req, res) =>{    
    const id_user = req.user.id_user
    if (!id_user){
        return res.status(400).json({ message: 'es necesario el id_user' })
    }

    try{
    //elimina el usuario y sus registros hijo    
        await execQuery(querys.user.delete, [id_user])
        res.json({
            message: 'Se ha eliminado el usuario correctamente'
        })

    }catch(e){
        console.error(e)
        return res.status(500).json({ message: 'Error interno del servidor '})
    }
}

export const alterUser = async (req, res) =>{
    const id_user = req.user.id_user
    const {first_name , last_name , mail} = req.body

    if (!first_name){
        return res.status(400).json({ message: 'El campo first_name es necesario' })
    }
    if (!last_name){
        return res.status(400).json({ message: 'El campo last_name es necesario' })
    }
    if (!mail){
        return res.status(400).json({ message: 'El campo mail es necesario' })
    }

    try{
        //busca los datos del usuario para comparar el mail
        const response = await execQuery(querys.user.getById, [id_user])
        console.log(response)
        if (response.length === 0){
             return res.status(400).json({ message: 'El usuario no existe'})
        }

        //valida si hubo cambio de email y de ser asi valida si no existe otro con el mismo
        if (response.mail !== mail){
            const invalidMail = await execQuery(querys.user.getBymail, [mail])
            if (invalidMail.length > 0){
                return res.status(400).json({ message: 'El correo ya se encuentra registrado'})
            }
        }

        await execQuery(querys.user.update, [first_name , last_name , mail, id_user])
        res.json({
            message: 'Se han actualizado los datos correctamente'
        })

    }catch(e){
        console.error(e)
        return res.status(500).json({ message: 'Error interno del servidor '})
    }

}

export const changePass = async (req, res) => {
    const id_user = req.user.id_user
    const {old_password ,new_password} = req.body

    if(!old_password){
        return res.status(400).json({ message: 'contraseña anterior es necesaria' })
    }
    if(!new_password){
        return res.status(400).json({message: 'La nueva contraseña es necesaria'})
    }

    try{
        //busca el usuario para poder comparar contraseñas
        const [old_user] = await execQuery(querys.user.getById, [id_user])
        if (old_user.length == 0){
            return res.status(400).json({ message: 'Error al recuperar el usuario' })
        }
        const validPass = await bcrypt.compare(old_password, old_user.password_hash)
        if (!validPass){
            return res.status(400).json({ message: 'La contraseña anterior es invalida' })
        }
        //encrypta la contraseña
        const saltRounds = 10;
        const hashed_pass = await bcrypt.hash(new_password, saltRounds) 
        await execQuery(querys.user.updatePassword, [hashed_pass, id_user])     
        await execQuery(querys.sessions.closeAllSessionsByUser, [id_user])  
        res.json({
            message: 'Ha actualizado la contraseña correctamente'
        })


    }catch(e){
        console.error(e)
        return res.status(500).json({ message: 'Error interno del servidor '})
        
    }

}