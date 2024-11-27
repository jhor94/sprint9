import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import User from "./userModel.js";


const RecoveryToken = sequelize.define('RecoveryToken',{
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    user_id:{
        type:DataTypes.INTEGER(8).UNSIGNED,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},
{ 
    timestamps: false,
});
//un usuario puede tener muchos tokens
User.hasMany(RecoveryToken, { foreignKey: 'user_id' });
//un token pertenece a un usuario
RecoveryToken.belongsTo(User, { foreignKey: 'user_id' });

export default RecoveryToken;
