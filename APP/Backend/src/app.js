import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swaggerConfig.js'



//rutas de los controladores
import authRouter from './routes/auth.routes.js'
import projectRoutes from './routes/project.routes.js'
import userRoutes from './routes/user.routes.js'
import categoriesRoutes from './routes/categories.routes.js'
const app = express()

// Middlewares y complementos
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,{explorer: true}));


// Rutas
app.use('/auth', authRouter )
app.use('/user', userRoutes)
app.use('/project', projectRoutes)
app.use('/category', categoriesRoutes)

export default app;