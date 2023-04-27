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
exports.fillerHelper = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const activityModel_1 = __importDefault(require("../../model/activityModel"));
const destinModel_1 = __importDefault(require("../../model/destinModel"));
const fillerHelper = (title, activity, guests, priceCategory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activityCollection = yield activityModel_1.default.findOne({
            activtiy: activity,
        });
        console.log(activityCollection);
        const Id = activityCollection === null || activityCollection === void 0 ? void 0 : activityCollection._id;
        const ObjectID = new mongoose_1.default.Types.ObjectId(Id);
        const preGuest = +guests;
        const query = {
            title: { $regex: new RegExp(title, "i") },
            activity: { $eq: ObjectID },
            guests: { $eq: preGuest },
            priceCategory: { $regex: new RegExp(priceCategory, "i") },
        };
        const fillter = yield destinModel_1.default.find(query);
        console.log(fillter);
        return fillter;
    }
    catch (error) { }
});
exports.fillerHelper = fillerHelper;
