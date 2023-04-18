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
exports.destinViewData = exports.packageCategory = void 0;
const packageCateHelper_1 = require("../../helper/user/packageCateHelper");
const destinViewHelper_1 = require("../../helper/user/destinViewHelper");
const fetchID_1 = require("../../helper/user/fetchID");
const packageCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        console.log(req.query.id);
        const fetch = yield packageCateHelper_1.fetchPackage.fetchCategoryApi(id);
        res.json({ success: true, fetch }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.packageCategory = packageCategory;
const destinViewData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        console.log(id);
        const fetch = yield destinViewHelper_1.destinViewHelper.destinViewApi(id);
        console.log(fetch);
        const packageID = fetch === null || fetch === void 0 ? void 0 : fetch.packageCategory;
        const activityID = fetch === null || fetch === void 0 ? void 0 : fetch.activity;
        const packageCategoryID = yield fetchID_1.packageIdfetch.packageApi(packageID);
        const activityDataID = yield fetchID_1.activityIdfetch.activityApi(activityID);
        console.log(activityDataID);
        const packageCategory = packageCategoryID.packageCategory;
        console.log(packageCategory);
        const activities = activityDataID.activtiy;
        console.log(activities);
        res.json({ success: true, fetch, packageCategory, activities }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.destinViewData = destinViewData;
