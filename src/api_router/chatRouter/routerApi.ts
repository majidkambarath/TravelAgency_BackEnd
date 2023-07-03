import { Router } from "express";
import { conversationsStore,chatUserLisit,fetchMessageDetails } from "../../controllers/userController/chatController";


const router = Router();
router.post('/conversations',conversationsStore)
router.get('/userLisit',chatUserLisit)
router.get('/messages',fetchMessageDetails)
export default router; 