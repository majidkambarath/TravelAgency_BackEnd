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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchReviewCollection = exports.DeleteTheReviewCollection = exports.patchTheReviewCollection = exports.postReviewController = exports.fetchDestinDetails = void 0;
const reviewHelper_1 = require("../../helper/user/reviewHelper");
const fetchDestinDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.Token;
        const fetch = yield (0, reviewHelper_1.destinfetchHelper)(userId);
        // console.log(fetch);
        res.json({ success: true, fetch }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchDestinDetails = fetchDestinDetails;
const postReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.Token;
        const { id, rating, textarea } = req.body;
        const { serviceRate, valueMoney, communication, planing } = rating;
        const data = { id, userId, textarea, serviceRate, valueMoney, communication, planing };
        const review = yield (0, reviewHelper_1.postReviewData)(data);
        console.log(review);
        // const fetch = await Review.find({UserId:userId})
        res.json({ success: true }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.postReviewController = postReviewController;
const patchTheReviewCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, rating } = req.body;
        const textarea = req.body.update;
        const { serviceRate, valueMoney, communication, planing } = rating;
        const data = { id, textarea, serviceRate, valueMoney, communication, planing };
        yield (0, reviewHelper_1.updateTheReview)(data);
        res.json({ success: true }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.patchTheReviewCollection = patchTheReviewCollection;
const DeleteTheReviewCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        yield (0, reviewHelper_1.DeleteTheReview)(id);
        res.json({ success: true }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.DeleteTheReviewCollection = DeleteTheReviewCollection;
const FetchReviewCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetch = yield (0, reviewHelper_1.FetchTheReview)();
        res.json({ success: true, fetch }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.FetchReviewCollection = FetchReviewCollection;
