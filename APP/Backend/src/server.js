import app from './app.js';
import dotenv from 'dotenv';
import { pool } from './config/db.js'

dotenv.config()

const PORT = process.env.PORT || 8000;

const testConection = async () => {
    try{
        const conection = await pool.getConnection()
        console.log('CONEXION EXITOSA')
        conection.release()
    }catch (err){
        console.error('no se conecto a la bd: ', err)
        process.exit(1)
    }
}

app.listen(PORT, async () => {
    await testConection()
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
})
