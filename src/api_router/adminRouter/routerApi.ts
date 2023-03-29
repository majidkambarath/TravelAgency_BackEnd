import { Router } from "express";
import {category_manage} from '../../controllers/adminController/categoryManage'
const router = Router()

router.post('/admin/category',category_manage)

export default router