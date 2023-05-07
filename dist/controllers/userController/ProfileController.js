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
exports.bookingCancel = exports.bookingDetailsShow = exports.bookingDetailsFetch = exports.userPasswordChange = exports.userProfileUpdate = void 0;
const profileUpdation_1 = require("../../helper/user/profileUpdation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../../model/userModel");
const passwordChange_1 = require("../../helper/user/passwordChange");
const userProfileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.Token;
        const { fname, lname, address, phone, email } = req.body;
        const { path } = req.file;
        const data = {
            fname,
            lname,
            address,
            phone,
            email,
            path,
            userId,
        };
        const userData = yield (0, profileUpdation_1.profileUpdation)(data);
        res.json({ success: true, userData }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.userProfileUpdate = userProfileUpdate;
const userPasswordChange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.Token;
        const { cpassword, conformPassword } = req.body;
        const data = {
            conformPassword,
            userId,
        };
        const userCollection = yield userModel_1.UserModel.findOne({ _id: userId });
        const match = yield bcrypt_1.default.compare(cpassword, userCollection === null || userCollection === void 0 ? void 0 : userCollection.password);
        if (match) {
            const userpasswordChange = yield (0, passwordChange_1.passwordChange)(data);
            res.json({ success: true }).status(200);
        }
        else {
            res.json({ error: "Incorrect current password.." }).status(401);
            throw new Error("Incorrect current password");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.userPasswordChange = userPasswordChange;
const bookingDetailsFetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.Token;
        const bookingData = yield (0, profileUpdation_1.bookingDetails)(userId);
        res.json({ success: true, bookingData }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.bookingDetailsFetch = bookingDetailsFetch;
const bookingDetailsShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const BookingID = req.query.id;
        const detailsShow = yield (0, profileUpdation_1.bookingDetailsShowsHelper)(BookingID);
        console.log(detailsShow);
        res.json({ success: true, detailsShow }).status(200);
    }
    catch (error) {
    }
});
exports.bookingDetailsShow = bookingDetailsShow;
const bookingCancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const BookingID = req.query.id;
        const bookingData = yield (0, profileUpdation_1.bookingDetailsCancel)(BookingID);
        res.json({ success: true, bookingData }).status(200);
    }
    catch (error) {
    }
});
exports.bookingCancel = bookingCancel;
