import { Router } from "express";
import {packageCategory,destinViewData } from "../../controllers/userController/destination";
import {authSignup,otpVerifiyy,authLoginApi} from '../../controllers/userController/authController'
import {authenticateUser} from '../../controllers/userController/authGoogleSignup'
const router = Router();

router.patch('/package_cate',packageCategory)
router.get('/destinationView',destinViewData)
router.post('/formSignup',authSignup)
router.post('/otpVerifiy',otpVerifiyy)
router.post('/authLogin',authLoginApi)
router.post('/googleSign',authenticateUser)
export default router;
 