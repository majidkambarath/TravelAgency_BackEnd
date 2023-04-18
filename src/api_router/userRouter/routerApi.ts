import { Router } from "express";
import {packageCategory,destinViewData } from "../../controllers/userController/destination";
import {authSignup} from '../../controllers/userController/authController'
const router = Router();

router.patch('/package_cate',packageCategory)
router.get('/destinationView',destinViewData)
router.post('/formSignup',authSignup)
export default router;
 