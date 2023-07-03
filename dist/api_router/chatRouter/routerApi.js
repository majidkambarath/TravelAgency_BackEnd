"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = require("../../controllers/userController/chatController");
const router = (0, express_1.Router)();
router.post('/conversations', chatController_1.conversationsStore);
router.get('/userLisit', chatController_1.chatUserLisit);
router.get('/messages', chatController_1.fetchMessageDetails);
exports.default = router;
