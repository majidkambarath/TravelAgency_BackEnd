"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const destination_1 = require("../../controllers/userController/destination");
const authController_1 = require("../../controllers/userController/authController");
const authGoogleSignup_1 = require("../../controllers/userController/authGoogleSignup");
const BookingController_1 = require("../../controllers/userController/BookingController");
const JWT_Check_1 = require("../../middelware/JWT_Check");
const uploadCloudinary_1 = __importDefault(require("../../utils/uploadCloudinary"));
const router = (0, express_1.Router)();
router.patch('/package_cate', destination_1.packageCategory);
router.get('/destinationView', JWT_Check_1.JWT_Check, destination_1.destinViewData);
router.post('/formSignup', authController_1.authSignup);
router.post('/otpVerifiy', authController_1.otpVerifiyy);
router.post('/authLogin', authController_1.authLoginApi);
router.post('/googleSign', authGoogleSignup_1.authenticateUser);
router.get('/fillterPackage', destination_1.fillterContorl);
router.patch('/userPatch', uploadCloudinary_1.default.single('file'), JWT_Check_1.JWT_Check, BookingController_1.userDetailsPatch);
//payment
router.post('/payment', JWT_Check_1.JWT_Check, BookingController_1.paymentProcessing);
router.post('/paymentSuccess', JWT_Check_1.JWT_Check, BookingController_1.paymentSuccess);
exports.default = router;
