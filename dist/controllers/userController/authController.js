"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userVerificationApi = exports.authLoginApi = exports.otpVerifiyy = exports.authSignup = void 0;
const auth_schema_1 = require("../../validation/auth_schema");
const userModel_1 = require("../../model/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authHelper_1 = require("../../helper/user/authHelper");
const twilio_1 = require("../../config/twilio");
const JWT_generator_1 = require("../../utils/JWT_generator");
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield bcrypt_1.default.hash(password, 10);
        return hash;
    }
    catch (error) {
        console.log(error);
    }
});
const authSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = req.body;
        console.log(typeof req.body.phone);
        auth_schema_1.signupSchema.validate(formData)
            .then((validationData) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, email, phone, password } = validationData;
            const encrypt = yield hashPassword(password);
            const values = {
                name,
                email,
                phone,
                encrypt
            };
            const userData = yield authHelper_1.userCollection.userHelper(values);
            if (!userData) {
                res.json({ action: true }).status(200);
            }
            else {
                (0, twilio_1.sendVerificationToken)(req.body.phone);
                res.json({ success: true, userData }).status(200);
            }
        }));
    }
    catch (error) {
        // console.log('7777777');
        // res.status(401).json({message:'exist'})
        console.log(error);
    }
});
exports.authSignup = authSignup;
const otpVerifiyy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, phone } = req.body;
        const check = yield (0, twilio_1.checkVerificationToken)(code, phone);
        if (check) {
            res.status(200).json({ success: true });
        }
        else {
            res.status(200).json({ action: false });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.otpVerifiyy = otpVerifiyy;
const authLoginApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userData = yield (0, authHelper_1.authLoginHelper)(email);
        console.log(userData);
        if (userData) {
            const encryptPassword = userData.password;
            const matchPassword = yield bcrypt_1.default.compare(password, encryptPassword);
            if (userData.action === true) {
                if (matchPassword) {
                    const token = (0, JWT_generator_1.createToken)(userData._id);
                    res.status(200).json({
                        success: true,
                        token,
                        userData
                    });
                }
                else {
                    res.status(200).json({ success: false });
                }
            }
            else {
                res.status(200).json({ action: true });
            }
        }
        else {
            res.status(200).json({ action: false });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.authLoginApi = authLoginApi;
const userVerificationApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token;
        if (!token) {
            res.json({ user: false });
        }
        else {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
            const user = yield userModel_1.UserModel.findById(userId);
            console.log(user);
            if (user) {
                res.status(200).json({ user: true });
            }
            else {
                res.json({ user: false });
            }
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(200).json({ error: error.message, action: true });
    }
});
exports.userVerificationApi = userVerificationApi;
