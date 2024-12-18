import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import BooksUsers from "./booksUsersModel.js";


const Book = sequelize.define('Books',{
    id_book: {//nada
        type: DataTypes.INTEGER(8).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    external_id_api:{ //search
        type: DataTypes.STRING(255),
        allowNull: false
    },
    title:{//search
        type: DataTypes.STRING(255),
        allowNull: false
    },
    author:{//search
        type: DataTypes.TEXT(255),
    },
    isbn:{
        type: DataTypes.STRING(255),
    },
    number_of_pages:{
        type: DataTypes.NUMBER(50),
    },
    cover:{//search
        type: DataTypes.TEXT(255),
    },
    publishers: {
        type: DataTypes.STRING(255),
    },
    subject: {//nada
        type: DataTypes.TEXT(400),
    },
    favorite: {//nada
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
},
{   
    indexes:[{unique: true, fields:['external_id_api']}],
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});
//hasmnay relacion de 1 a muchos en este caso un usuario muchos libros
//User.hasMany(Book, {foreignKey: 'user_id'});
//belogsto es de muchos a uno 
//Book.belongsTo(User, {foreignKey: 'user_id'});
//Book.hasMany(BooksUsers, { foreignKey: 'book_id' });


export default Book
