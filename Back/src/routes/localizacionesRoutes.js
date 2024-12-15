import {Router} from 'express';
import { getLocalizaciones } from '../controllers/localizacionesController.js'; 

const router = Router()

router.get('/',getLocalizaciones)
/*router.get('/:id',getLocalizacion)
router.delete('/:id',deleteLocalizacion)
router.post('/',postLocalizacion)
router.put('/:id',updateLocalizacion)*/


export default router;