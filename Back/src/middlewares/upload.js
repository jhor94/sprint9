import util from "util";
import multer from "multer"
import path from "path"
const maxSize = 2* 1024 *1024

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads/");
    },
    filename: (req, file, cb) => {
        console.log("file.originalname: " + file.originalname);
        cb(null, file.filename + "-" + Date.now()+ path.extname(file.originalname));
    }
})

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

export const uploadFileMiddleware = util.promisify(uploadFile)