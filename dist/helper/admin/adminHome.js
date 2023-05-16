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
exports.userBlockORUnblockingHelper = exports.adminDashboardBookingReport = exports.fetchBookingDateAndTotal = exports.fetchUserDetails = exports.fetchTotalRevenueCount = exports.fetchClientsCount = exports.fetchBookingCount = exports.AdminLoginHelper = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminModel_1 = __importDefault(require("../../model/adminModel"));
const bookingModel_1 = __importDefault(require("../../model/bookingModel"));
const userModel_1 = require("../../model/userModel");
const AdminLoginHelper = (values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = values;
        const adminCollection = yield adminModel_1.default.findOne({ email: email });
        return adminCollection;
    }
    catch (error) {
        console.log(error);
    }
});
exports.AdminLoginHelper = AdminLoginHelper;
const fetchBookingCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bookingModel_1.default.find().count();
    }
    catch (error) { }
});
exports.fetchBookingCount = fetchBookingCount;
const fetchClientsCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield userModel_1.UserModel.find().count();
    }
    catch (error) { }
});
exports.fetchClientsCount = fetchClientsCount;
const fetchTotalRevenueCount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield bookingModel_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$SubTotal" },
                },
            },
            {
                $project: {
                    _id: 0,
                    total: 1,
                },
            },
        ]);
        return totalRevenue[0].total;
    }
    catch (error) { }
});
exports.fetchTotalRevenueCount = fetchTotalRevenueCount;
const fetchUserDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield userModel_1.UserModel.find();
    }
    catch (error) { }
});
exports.fetchUserDetails = fetchUserDetails;
const fetchBookingDateAndTotal = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingData = yield bookingModel_1.default.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$BookingData" } },
                    totalAmount: { $sum: "$SubTotal" },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);
        return bookingData;
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchBookingDateAndTotal = fetchBookingDateAndTotal;
const adminDashboardBookingReport = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mostBookedDestinations = yield bookingModel_1.default.aggregate([
            {
                $lookup: {
                    from: "Destinations",
                    localField: "Destination",
                    foreignField: "_id",
                    as: "destinationDetails",
                },
            },
            {
                $group: {
                    _id: "$Destination",
                    destinationName: { $first: "$Title" },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
        ]);
        console.log(mostBookedDestinations);
        return mostBookedDestinations;
    }
    catch (error) {
        console.log(error);
    }
});
exports.adminDashboardBookingReport = adminDashboardBookingReport;
const userBlockORUnblockingHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongoose_1.default.Types.ObjectId(id);
        const userBlock = yield userModel_1.UserModel.findOne({ _id: userId });
        if ((userBlock === null || userBlock === void 0 ? void 0 : userBlock.action) === true) {
            yield userModel_1.UserModel.findByIdAndUpdate({ _id: userId }, { $set: { action: false } });
            return false;
        }
        else {
            yield userModel_1.UserModel.findByIdAndUpdate({ _id: userId }, { $set: { action: true } });
            return true;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.userBlockORUnblockingHelper = userBlockORUnblockingHelper;
