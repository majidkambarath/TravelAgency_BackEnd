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
exports.bookingDetailsCancel = exports.bookingDetailsShowsHelper = exports.bookingDetails = exports.profileUpdation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingModel_1 = __importDefault(require("../../model/bookingModel"));
const userModel_1 = require("../../model/userModel");
const profileUpdation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prePhone = +data.phone;
        const updateData = {
            first: data.fname,
            last: data.lname,
            address: data.address,
            email: data.email,
            phone: prePhone,
            profile: data.path,
        };
        const filter = { _id: data.userId };
        const update = { $set: updateData };
        const userCollectionUpdate = yield userModel_1.UserModel.findOneAndUpdate(filter, update, { new: true });
        return userCollectionUpdate;
    }
    catch (error) {
        console.log(error);
    }
});
exports.profileUpdation = profileUpdation;
const bookingDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserID = new mongoose_1.default.Types.ObjectId(id);
        const response = yield bookingModel_1.default.find({ userDetails: UserID });
        return response;
    }
    catch (error) {
    }
});
exports.bookingDetails = bookingDetails;
const bookingDetailsShowsHelper = (BookingID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingModel_1.default.findOne({ _id: BookingID });
        return response;
    }
    catch (error) {
    }
});
exports.bookingDetailsShowsHelper = bookingDetailsShowsHelper;
const bookingDetailsCancel = (BookingID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchDetails = yield bookingModel_1.default.findOneAndUpdate({ _id: BookingID }, { $set: { BookingStatus: 'Cancelled' } }, { new: true });
        return fetchDetails;
    }
    catch (error) {
    }
});
exports.bookingDetailsCancel = bookingDetailsCancel;
