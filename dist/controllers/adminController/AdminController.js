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
exports.getUSerApi = exports.TotalRevenueCountApi = exports.ClientCountApi = exports.bookingCountApi = exports.AdminVerificationApi = exports.AdminLogin = void 0;
const adminHome_1 = require("../../helper/admin/adminHome");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_generator_1 = require("../../utils/JWT_generator");
const adminModel_1 = __importDefault(require("../../model/adminModel"));
const AdminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        const data = {
            email
        };
        const admin = yield (0, adminHome_1.AdminLoginHelper)(data);
        if (!admin) {
            res.json({ action: true }).status(200);
        }
        else {
            const encryptPassword = admin.password;
            const matchPassword = yield bcrypt_1.default.compare(password, encryptPassword);
            if (matchPassword) {
                const token = (0, JWT_generator_1.createToken)(admin._id);
                res.status(200).json({
                    success: true,
                    token,
                    admin
                });
            }
            else {
                res.status(200).json({ success: false });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.AdminLogin = AdminLogin;
const AdminVerificationApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token;
        if (!token) {
            res.json({ admin: false });
        }
        else {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const adminId = decoded.id;
            const admin = yield adminModel_1.default.findById(adminId);
            if (admin) {
                res.status(200).json({ admin: true });
            }
            else {
                res.json({ admin: false });
            }
        }
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
});
exports.AdminVerificationApi = AdminVerificationApi;
const bookingCountApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingCount = yield (0, adminHome_1.fetchBookingCount)();
        res.status(200).json({ sucess: true, bookingCount });
    }
    catch (error) {
        console.log(error);
    }
});
exports.bookingCountApi = bookingCountApi;
const ClientCountApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ClientsCount = yield (0, adminHome_1.fetchBookingCount)();
        res.status(200).json({ sucess: true, ClientsCount });
    }
    catch (error) {
        console.log(error);
    }
});
exports.ClientCountApi = ClientCountApi;
const TotalRevenueCountApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield (0, adminHome_1.fetchTotalRevenueCount)();
        res.status(200).json({ sucess: true, totalRevenue });
    }
    catch (error) {
        console.log(error);
    }
});
exports.TotalRevenueCountApi = TotalRevenueCountApi;
const getUSerApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetch = yield (0, adminHome_1.fetchUserDetails)();
        res.status(200).json({ sucess: true, fetch });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUSerApi = getUSerApi;
