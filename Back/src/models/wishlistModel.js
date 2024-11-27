import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Book from "./bookModel.js";
import User from "./userModel.js";


const Wishlist = sequelize.define('Wishlists',{
    id_wishlist: {
        type: DataTypes.INTEGER(8).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER(8).UNSIGNED,
        allowNull: false
    },
    book_id:{ 
        type: DataTypes.INTEGER(8).UNSIGNED,
        allowNull: false
    },
    added_at:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true
    }
},
{ 
    timestamps: false,
});

//belogsto es de muchos a uno 
Wishlist.belongsTo(User, {foreignKey: 'user_id'}); // Un libro en Wishlist pertenece a un usuario.
Wishlist.belongsTo(Book, {foreignKey: 'book_id'}); // Un libro en Wishlist pertenece a un libro.

export default Exchange
