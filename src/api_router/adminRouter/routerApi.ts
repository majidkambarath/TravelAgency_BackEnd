import { Router } from "express";
import { activtiyManage, fetchingActivity } from "../../controllers/adminController/activtityManage";
import { category_manage,fetchingData,} from "../../controllers/adminController/categoryManage";
import { add_destina,fetchDestin,edit_Collection,updateCollection } from "../../controllers/adminController/destin_manage";
import { AdminLogin,AdminVerificationApi,bookingCountApi,ClientCountApi,userBlockingApi,TotalRevenueCountApi,getUSerApi,fetchBookingDate,fetchAdminDashBoardCount} from "../../controllers/adminController/AdminController";
import uploadCloudinary from "../../utils/uploadCloudinary";
import { bookingManageApi } from "../../controllers/adminController/bookingManage";
const router = Router();

router.post("/category", uploadCloudinary.single('file'), category_manage);
router.get("/getCategory", fetchingData);
router.post('/activity',activtiyManage)
router.get('/getActivity',fetchingActivity)
router.post('/add_destin',uploadCloudinary.array('file'),add_destina)
router.get('/getDestin',fetchDestin)
router.get('/edit_IDFetch',edit_Collection)
router.post('/edit_Destin',uploadCloudinary.array('file'),updateCollection)
router.post('/login',AdminLogin)
router.post('/verify-token',AdminVerificationApi)
router.get('/bookingCount',bookingCountApi)
router.get('/clientsCount',ClientCountApi)
router.get('/totalRevenueCount',TotalRevenueCountApi)
router.get('/getUser',getUSerApi)
router.get('/fetchBookingDate',fetchBookingDate)
router.get('/fetchAdminDashboardBookingCount',fetchAdminDashBoardCount)
router.get('/bookingMangement',bookingManageApi)
router.patch('/userBlockingApi',userBlockingApi)
export default router;
