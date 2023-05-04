import { Router } from "express";
import {packageCategory,destinViewData,fillterContorl } from "../../controllers/userController/destination";
import {authSignup,otpVerifiyy,authLoginApi} from '../../controllers/userController/authController'
import {authenticateUser} from '../../controllers/userController/authGoogleSignup'
import {userDetailsPatch,paymentProcessing,paymentSuccess} from '../../controllers/userController/BookingController'
import { JWT_Check } from "../../middelware/JWT_Check";
import uploadCloudinary from "../../utils/uploadCloudinary";
const router = Router();

router.patch('/package_cate',packageCategory)
router.get('/destinationView',JWT_Check,destinViewData)
router.post('/formSignup',authSignup)
router.post('/otpVerifiy',otpVerifiyy)
router.post('/authLogin',authLoginApi)
router.post('/googleSign',authenticateUser)
router.get('/fillterPackage',fillterContorl)
router.patch('/userPatch',uploadCloudinary.single('file'),JWT_Check,userDetailsPatch)

//payment
router.post('/payment',JWT_Check, paymentProcessing);
router.post('/paymentSuccess',JWT_Check,paymentSuccess)
export default router;
 