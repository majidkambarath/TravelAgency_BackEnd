"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryManage_1 = require("../../controllers/adminController/categoryManage");
const router = (0, express_1.Router)();
router.post('/admin/category', categoryManage_1.category_manage);
exports.default = router;
