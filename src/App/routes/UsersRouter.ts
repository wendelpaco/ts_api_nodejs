import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import { TokenValidation } from '../middlewares/VerifyToken'

const router: Router = Router()

router.get('/users', TokenValidation, AuthController.GetAllUsers)
router.post('/create/user', AuthController.CreateUser)
router.post('/login', AuthController.Login)
router.delete('/delete/user/:id', TokenValidation, AuthController.Destroy)

export default router;