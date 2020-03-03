import { Router } from 'express'
import LoginController from '../controllers/LoginController'
import { TokenValidation } from '../middlewares/VerifyToken'

const router: Router = Router()

router.get('/profile', TokenValidation , LoginController.GetPerfil)
router.post('/signup', LoginController.Signup)
router.post('/signin', LoginController.Signin)

export default router;