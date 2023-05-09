import { Router } from "express";
import { conversationsStore,chatUserLisit,fetchMessageDetails } from "../../controllers/userController/chatController";
import { JWT_Check } from "../../middelware/JWT_Check";
import { JWT_CheckAdmin } from "../../middelware/Admin_JWT";

const router = Router();
router.post('/conversations',JWT_Check,conversationsStore)
router.get('/userLisit',chatUserLisit)
router.get('/messages',fetchMessageDetails)
export default router; 