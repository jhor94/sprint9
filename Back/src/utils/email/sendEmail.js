import { createTransport } from "nodemailer";
import pkg from "handlebars";
const { compile } = pkg;
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (email,subject, payload, template) => {

    const transporter = createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure:true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
    })
    const _filename = fileURLToPath(import.meta.url);
    const _dirname = dirname(_filename)

    const root = join(_dirname, "../", template)
    console.log("esta es la ruta: ", root)
    try{
        const source = readFileSync(root,"utf8");
        const compiledTemplate = compile(source);
        const options = () => {
            return {
                from: process.env.FROM_EMAIL,
                to: email,
                subject: subject,
                html: compiledTemplate(payload)
            };
        };
    
        //envio de email
        return new Promise ((resolve,reject)=>{
            transporter.sendMail(options(), (error, info) => {
                if (error) {
                    reject(error);
                }else{
                    resolve('OK');
                }
            })
        })
    }catch (error){
        console.error("error al leer el archivo del template", error);
        throw error;
    }
    
}


export default sendEmail