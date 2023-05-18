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
exports.FetchTheReview = exports.DeleteTheReview = exports.updateTheReview = exports.postReviewData = exports.destinfetchHelper = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingModel_1 = __importDefault(require("../../model/bookingModel"));
const reviewModel_1 = __importDefault(require("../../model/reviewModel"));
const destinfetchHelper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingModel_1.default.find({ userDetails: id }).populate('Destination').populate('ReviewId');
        return response;
    }
    catch (error) {
        console.log(error);
    }
});
exports.destinfetchHelper = destinfetchHelper;
const postReviewData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, userId, textarea, serviceRate, valueMoney, communication, planing } = data;
        const destinId = new mongoose_1.default.Types.ObjectId(id);
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const reviewCollection = new reviewModel_1.default({
            DestinationId: destinId,
            UserId: userID,
            rating: {
                serviceRate,
                valueMoney,
                communication,
                planing
            },
            textarea
        });
        yield reviewCollection.save();
        const reviewId = reviewCollection._id;
        const updateBookingCollection = yield bookingModel_1.default.updateOne({ Destination: destinId }, { $set: { ReviewId: reviewId } });
        console.log(updateBookingCollection);
        return reviewCollection;
    }
    catch (error) {
        console.log(error);
    }
});
exports.postReviewData = postReviewData;
const updateTheReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, textarea, serviceRate, valueMoney, communication, planing } = data;
        let update;
        update = {
            rating: {
                serviceRate,
                valueMoney,
                communication,
                planing
            },
            textarea
        };
        const response = yield reviewModel_1.default.findByIdAndUpdate(id, update, { new: true }).exec();
        return response;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateTheReview = updateTheReview;
const DeleteTheReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedReview = yield reviewModel_1.default.findByIdAndDelete(id);
        return deletedReview;
    }
    catch (error) {
        console.log(error);
    }
});
exports.DeleteTheReview = DeleteTheReview;
const FetchTheReview = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetch = yield reviewModel_1.default.find().populate('UserId').populate('DestinationId');
        return fetch;
    }
    catch (error) {
        console.log(error);
    }
});
exports.FetchTheReview = FetchTheReview;
