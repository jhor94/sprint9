import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import Book from "./bookModel.js";
import User from "./userModel.js";


const Exchange = sequelize.define('Exchanges',{
    id_exchange: {//nada
        type: DataTypes.INTEGER(8).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    book_id:{ //search
        type: DataTypes.INTEGER(8).UNSIGNED,
        allowNull: false
    },
    requested_book_id:{//nada
        type:DataTypes.INTEGER(8).UNSIGNED,
        allowNull: false
    },
    from_user_id:{//nada
        type:DataTypes.INTEGER(8).UNSIGNED,
        allowNull: false
    },
    to_user_id:{//nada
        type:DataTypes.INTEGER(8).UNSIGNED,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('pending','accepted','rejected','completed'),
        allowNull: true,
        defaultValue: 'pending'
    },
    review_rating:{
        type: DataTypes.TINYINT(1),
        allowNull: true,
    },
    review_comment:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
    points: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
    },
},
{ 
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

//hasmnay relacion de 1 a muchos en este caso un usuario muchos libros
User.hasMany(Exchange, {foreignKey: 'from_user_id'});// Un usuario puede tener muchos intercambios como "from_user_id"
User.hasMany(Exchange, {foreignKey: 'to_user_id'});// Un usuario puede tener muchos intercambios como "to_user_id"
Book.hasMany(Exchange, {foreignKey: 'book_id'}); // Un libro puede estar en muchos intercambios


//belogsto es de muchos a uno 
Exchange.belongsTo(Book, {foreignKey: 'book_id'});// Un intercambio pertenece a un libro
Exchange.belongsTo(User, {foreignKey: 'from_user_id'}); // Un intercambio pertenece a un usuario como "from_user_id"
Exchange.belongsTo(User, {foreignKey: 'to_user_id'}); // Un intercambio pertenece a un usuario como "to_user_id"

export default Exchange
