import { Router } from "express";
import { activtiyManage, fetchingActivity } from "../../controllers/adminController/activtityManage";
import { category_manage,fetchingData,} from "../../controllers/adminController/categoryManage";
const router = Router();

router.post("/category", category_manage);
router.get("/getCategory", fetchingData);
router.post('/activity',activtiyManage)
router.get('/getActivity',fetchingActivity)
export default router;
