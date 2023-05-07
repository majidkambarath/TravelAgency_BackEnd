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
exports.bookingCollectionHelper = exports.bookingUserCollectionUpdate = void 0;
const userModel_1 = require("../../model/userModel");
const bookingModel_1 = __importDefault(require("../../model/bookingModel"));
const bookingUserCollectionUpdate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prePhone = +data.phone;
        const updateData = {
            first: data.fname,
            last: data.lname,
            address: data.address,
            email: data.email,
            phone: prePhone,
            idCard: {
                number: data.idCard,
                image: data.path,
            },
        };
        const filter = { _id: data.userId };
        const update = { $set: updateData };
        const userCollectionUpdate = yield userModel_1.UserModel.updateOne(filter, update);
        return userCollectionUpdate;
    }
    catch (error) {
        console.log(error);
    }
});
exports.bookingUserCollectionUpdate = bookingUserCollectionUpdate;
const bookingCollectionHelper = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingCollaction = new bookingModel_1.default({
            userDetails: data.userID,
            Destination: data.destinId,
            ArrivedDate: data.Arrived,
            Participants: data.Participants,
            BookingData: data.BookingData,
            ExtraService: data.ExtraService,
            SubTotal: data.SubTotal,
            Title: data.Title,
            Price: data.price,
            priceCate: data.priceCate,
        });
        yield bookingCollaction.save();
        return bookingCollaction;
    }
    catch (error) {
        console.log(error);
    }
});
exports.bookingCollectionHelper = bookingCollectionHelper;
