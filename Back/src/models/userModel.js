import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


const User = sequelize.define('Users',{
    id_user: {
        type: DataTypes.INTEGER(8).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email:{
        type:DataTypes.STRING(255),
        allowNull: false
    },
    password:{
        type:DataTypes.STRING(255),
        allowNull: false
    },
    roles: {
        type: DataTypes.STRING(30),
        allowNull: false,
        get(){
            const rawValue = this.getDataValue('roles');
            if(!rawValue){
                console.log("valos role nulo o undefined");
                return []
            }
            return rawValue.split(',')
        },
        set(value){
            this.setDataValue('roles', value.join(','))
        }
    },
    photo: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
},{   
    indexes:[{unique: true, fields: ['email']}],
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

export default User
