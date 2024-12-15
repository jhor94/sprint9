import { DataTypes }  from "sequelize";
import { sequelize } from "../db.js";

const Localizacion = sequelize.define('Localizaciones',{
    id_localizacion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitud: {
        type: DataTypes.DECIMAL(10,8),
        allowNull: false
    },
    longitud: {
        type: DataTypes.DECIMAL(11,8),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    createdAt: false,
    updatedAt:false
})

export default Localizacion