import { Router } from "express";
import { activtiyManage, fetchingActivity } from "../../controllers/adminController/activtityManage";
import { category_manage,fetchingData,} from "../../controllers/adminController/categoryManage";
import { add_destina } from "../../controllers/adminController/destin_manage";
import uploadCloudinary from "../../utils/uploadCloudinary";
const router = Router();

router.post("/category", category_manage);
router.get("/getCategory", fetchingData);
router.post('/activity',activtiyManage)
router.get('/getActivity',fetchingActivity)
router.post('/add_destin',uploadCloudinary.single('file'),add_destina)
export default router;
