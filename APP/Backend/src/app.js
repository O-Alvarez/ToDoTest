import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//rutas de los controladores
import authRouter from './routes/auth.routes.js'
import projectRoutes from './routes/project.routes.js'
import userRoutes from './routes/user.routes.js'
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// Rutas
app.use('/auth', authRouter )
app.use('/project', projectRoutes)
app.use('/user', userRoutes)

export default app;