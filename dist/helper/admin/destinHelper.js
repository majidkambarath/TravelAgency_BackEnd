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
exports.fetchHelper = exports.createCollection = exports.activityIdFetch = exports.packageIdFetch = void 0;
const activityModel_1 = __importDefault(require("../../model/activityModel"));
const categoryModel_1 = __importDefault(require("../../model/categoryModel"));
const destinModel_1 = __importDefault(require("../../model/destinModel"));
exports.packageIdFetch = {
    packageId: (packageCategory) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const IDFetch = yield categoryModel_1.default.findOne({ packageCategory });
            const categoryID = IDFetch === null || IDFetch === void 0 ? void 0 : IDFetch._id;
            return categoryID;
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.activityIdFetch = {
    activityId: (activity) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const activiFetch = yield activityModel_1.default.findOne({ activtiy: activity });
            const activityId = activiFetch === null || activiFetch === void 0 ? void 0 : activiFetch._id;
            return activityId;
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.createCollection = {
    destinCollection: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let prePrice = +data.price;
            let preDay = +data.day;
            let preNight = +data.night;
            const destinCreation = new destinModel_1.default({
                title: data.title,
                descrption: data.descrption,
                price: prePrice,
                file: data.imgArray,
                packageCategory: data.packageID,
                activity: data.activityID,
                priceCategory: data.priceCategory,
                duration: {
                    day: preDay,
                    night: preNight
                },
                packageService: {
                    Hotels: data.Hotels,
                    Flight: data.Flight,
                    Sightseeing: data.Sightseeing,
                    Meals: data.Meals,
                    Transfers: data.Transfers
                }
            });
            yield destinCreation.save();
            return destinCreation;
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.fetchHelper = {
    destinData: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const fetchData = yield destinModel_1.default.find();
            return fetchData;
        }
        catch (error) {
            console.log(error);
        }
    })
};
