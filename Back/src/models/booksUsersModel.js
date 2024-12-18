import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import User from "./userModel.js";
import Book from "./bookModel.js"

const BooksUsers = sequelize.define('BooksUsers',{
    id_bookUser: {
        type: DataTypes.INTEGER(8).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id:{ 
        type: DataTypes.INTEGER(8),
        allowNull: false
    },
    book_id:{ 
        type: DataTypes.INTEGER(8),
        allowNull: false
    },
    action:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
},
{   
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

// Relación muchos a uno con User (un BooksUser está asociado a un único usuario)
//BooksUsers.belongsTo(User, { foreignKey: 'user_id' });
// Relación muchos a uno con Book (un BooksUser está asociado a un único libro)
//Book.belongsTo(BooksUsers, { foreignKey: 'book_id' });


//Book.hasMany(BooksUsers, { foreignKey: 'book_id' });
//User.hasMany(BooksUsers, { foreignKey: 'user_id' });


export default BooksUsers
