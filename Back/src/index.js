//imports
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import { testConnection } from './db.js';
import bookRoutes from './routes/bookRoutes.js'
import bookWishRoutes from './routes/bookWishlistRoutes.js'
import exchangeRoutes from './routes/exchangeRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import wishlistRoutes from './routes/bookWishlistRoutes.js'
import userRoutes from './routes/userRoutes.js'
import rolesRoutes from './routes/rolesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import localizacionesRoutes from './routes/localizacionesRoutes.js'
dotenv.config()

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
  }));

app.use(cookieParser())

await testConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//ruteo
app.use('/books', bookRoutes)
app.use('/booksWish', bookWishRoutes)
app.use('/exchanges', exchangeRoutes)
app.use('/messages', messageRoutes)
app.use('/wishlists', wishlistRoutes)
app.use('/users', userRoutes)
app.use('/roles', rolesRoutes)
app.use('/auth', authRoutes)
app.use('/localizaciones', localizacionesRoutes)

app.listen('3000', () => {
    console.log("Servidor funcionando en el puerto 3000");
})


