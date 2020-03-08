import { Router } from 'express'
import AdmistratorController from '../../controllers/Admistrator/AdmistratorController';


const router: Router = Router()

router.get('/queue/client/:id', AdmistratorController.index)

export default router;