import { Router } from "express";
import {packageCategory } from "../../controllers/userController/destination";
const router = Router();

router.patch('/package_cate',packageCategory)

export default router;