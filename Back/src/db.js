import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config();

const sequelize = new Sequelize (
    process.env.DATABASE,
    process.env.USER_NAME,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    }
);

const syncroModel = async () =>{
    try{
    await sequelize.sync({ force: false }).then(() => {
        console.log('Modelo sincronizado correctamente');
    });
    }catch (error){
        console.log("no se ha sincronizado",error)
    }
}

const testConnection = async ()=>{
    try {
        await sequelize.authenticate();
        await syncroModel()
    } catch (error) {
        console.error('Error al conectar con la base de datos',error)
    }
}

export { sequelize, testConnection};