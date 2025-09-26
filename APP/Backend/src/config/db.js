import mysql from 'mysql2/promise'
import donenv from 'dotenv'

donenv.config()

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0
})

export const execQuery = async (sql, params = []) => {
  const [rows] = await pool.execute(sql, params)
  return rows
}

