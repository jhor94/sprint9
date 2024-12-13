import { body, check } from 'express-validator';
//body():se utiliza para validar los campos en el cuerpo (body)
//check():se utiliza para validar los campos en el cuerpo (body), los parámetros de la ruta (params)

export const bookValidator = [
    body("title")
        .exists()
        .withMessage("Title is required")
        .isString()
        .withMessage("Title should be a string")
        .isLength({ min: 5 })
        .withMessage("Title should be at least 5 characters"),
]