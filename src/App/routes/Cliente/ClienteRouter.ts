import { TokenValidation as Authenticator } from './../../middlewares/VerifyToken';
import { Router } from 'express'
import ClienteController from './../../controllers/Cliente/ClienteController';

const router: Router = Router();

router.get('/client', Authenticator, ClienteController.Index)
router.post('/client/find', Authenticator, ClienteController.Show)
router.post('/client', Authenticator, ClienteController.Store)
router.put('/client/update/:id', Authenticator, ClienteController.Update)
router.delete('/client/delete/:id', Authenticator, ClienteController.Destroy)

export default router;