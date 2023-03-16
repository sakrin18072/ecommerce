import express from 'express'
import { registerController , loginController , forgotPasswordController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register',registerController)

router.post('/login',loginController)


router.get('/admin-auth',requireSignIn,isAdmin,(request,response)=>{
    return response.status(200).send({ok:true})
})

router.post('/forgot-password',forgotPasswordController)

export default router