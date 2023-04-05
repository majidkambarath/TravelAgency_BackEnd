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
exports.add_destina = void 0;
const destinHelper_1 = require("../../helper/admin/destinHelper");
const add_destina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let { title, descrption, price, packageCategory, activity, priceCategory, day, night, Hotels, Flight, Sightseeing, Meals, Transfers, } = req.body;
        const path = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
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
            path,
        };
        const createCollections = yield destinHelper_1.createCollection.destinCollection(data);
        res.json({ success: true }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.add_destina = add_destina;
