"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const destination_1 = require("../../controllers/userController/destination");
const router = (0, express_1.Router)();
router.patch('/package_cate', destination_1.packageCategory);
exports.default = router;
