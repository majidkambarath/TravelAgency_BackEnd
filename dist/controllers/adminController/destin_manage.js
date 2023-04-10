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
exports.fetchDestin = exports.add_destina = void 0;
const destinHelper_1 = require("../../helper/admin/destinHelper");
const add_destina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { title, descrption, price, packageCategory, activity, priceCategory, day, night, Hotels, Flight, Sightseeing, Meals, Transfers, } = req.body;
        const imgArray = [];
        const multiImg = req.files;
        multiImg.map((el) => {
            const em = el.path;
            imgArray.push(em);
        });
        const packageID = yield destinHelper_1.packageIdFetch.packageId(packageCategory);
        const activityID = yield destinHelper_1.activityIdFetch.activityId(activity);
        const data = {
            title,
            descrption,
            price,
            priceCategory,
            day,
            night,
            Hotels,
            Flight,
            Sightseeing,
            Meals,
            Transfers,
            activityID,
            packageID,
            imgArray
        };
        const createCollections = yield destinHelper_1.createCollection.destinCollection(data);
        res.json({ success: true }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.add_destina = add_destina;
const fetchDestin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetch = yield destinHelper_1.fetchHelper.destinData();
        res.json({ success: true, fetch }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchDestin = fetchDestin;
