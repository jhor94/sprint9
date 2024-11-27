import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Book from "./bookModel.js";
import User from "./userModel.js";


const Message = sequelize.define('Messages',{
    id_message: {
        type: DataTypes.INTEGER(8).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    book_id:{
        type: DataTypes.INTEGER(8).UNSIGNED,
        allowNull: false
    },
    from_user_id:{
        type:DataTypes.INTEGER(8).UNSIGNED,
        allowNull: false
    },
    to_user_id:{
        type:DataTypes.INTEGER(8).UNSIGNED,
        allowNull: false
    },
    message:{
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'pending'
    },
},
{ 
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

//belogsto es de muchos a uno 
Message.belongsTo(Book, {foreignKey: 'book_id'});// muchos mensajes pertenece a un libro
Message.belongsTo(User, {foreignKey: 'from_user_id'});// muchos mensajes pertenece a un usuario como from_user_id
Message.belongsTo(User, {foreignKey: 'to_user_id'});// muchos mensajes pertenece a un usuario como to_user_id

export default Message
