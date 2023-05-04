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
exports.fillterContorl = exports.destinViewData = exports.packageCategory = void 0;
const packageCateHelper_1 = require("../../helper/user/packageCateHelper");
const destinViewHelper_1 = require("../../helper/user/destinViewHelper");
const fetchID_1 = require("../../helper/user/fetchID");
const fillterHelper_1 = require("../../helper/user/fillterHelper");
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
        const fetch = yield destinViewHelper_1.destinViewHelper.destinViewApi(id);
        const packageID = yield fetch.packageCategory;
        console.log(packageID);
        const activityID = yield fetch.activity;
        const packageCategoryID = yield fetchID_1.packageIdfetch.packageApi(packageID);
        const activityDataID = yield fetchID_1.activityIdfetch.activityApi(activityID);
        const packageCategory = packageCategoryID.packageCategory;
        const activities = activityDataID.activtiy;
        res.json({ success: true, fetch, packageCategory, activities }).status(200);
    }
    catch (error) {
        console.log(error);
        res.json({ error: "not fsfs" }).status(401);
    }
});
exports.destinViewData = destinViewData;
const fillterContorl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let activity = req.query.activity;
        let title = req.query.descrption;
        let guests = req.query.guests;
        let priceCategory = req.query.priceCategory;
        const fillterData = yield (0, fillterHelper_1.fillerHelper)(title, activity, guests, priceCategory);
        res.json({ success: true, fillterData }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.fillterContorl = fillterContorl;
