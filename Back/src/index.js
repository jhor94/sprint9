//imports
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import { testConnection } from './db.js';
import bookRoutes from './routes/bookRoutes.js'
import exchangeRoutes from './routes/exchangeRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config()

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
  }));

await testConnection();

app.use(express.json());
//ruteo
app.use('/books', bookRoutes)
app.use('/exchanges', exchangeRoutes)
app.use('/messages', messageRoutes)
app.use('/wishlist', wishlistRoutes)
app.use('/users', userRoutes)

app.listen('3000', () => {
    console.log("Servidor funcionando en el puerto 3000");
})

