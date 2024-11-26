//imports
import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './db.js';
import bookRoutes from './routes/bookRoutes.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config()

const app = express();


await testConnection();

app.use(express.json());
//ruteo
app.use('/books', bookRoutes)
app.use('/users', userRoutes)

app.listen('3000', () => {
    console.log("Servidor funcionando en el puerto 3000");
})

