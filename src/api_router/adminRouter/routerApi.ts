import { Router } from "express";
import { activtiyManage, fetchingActivity } from "../../controllers/adminController/activtityManage";
import { category_manage,fetchingData,} from "../../controllers/adminController/categoryManage";
import { add_destina,fetchDestin } from "../../controllers/adminController/destin_manage";
import uploadCloudinary from "../../utils/uploadCloudinary";
const router = Router();

router.post("/category", uploadCloudinary.single('file'), category_manage);
router.get("/getCategory", fetchingData);
router.post('/activity',activtiyManage)
router.get('/getActivity',fetchingActivity)
router.post('/add_destin',uploadCloudinary.array('file'),add_destina)
router.get('/getDestin',fetchDestin)
export default router;
