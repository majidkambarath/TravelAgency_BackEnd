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
exports.updateCollection = exports.edit_Collection = exports.fetchDestin = exports.add_destina = void 0;
const destinHelper_1 = require("../../helper/admin/destinHelper");
const mongoose_1 = __importDefault(require("mongoose"));
const activityModel_1 = __importDefault(require("../../model/activityModel"));
const categoryModel_1 = __importDefault(require("../../model/categoryModel"));
const add_destina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { title, descrption, price, guests, packageCategory, activity, priceCategory, day, night, Hotels, Flight, Sightseeing, Meals, Transfers, Highlights, } = req.body;
        const imgArray = [];
        const multiImg = req.files;
        multiImg.map((el) => {
            const em = el.path;
            imgArray.push(em);
        });
        console.log(req.body);
        let { Included1, Included2, Included3, Included4, Included5 } = req.body;
        const Included = [Included1, Included2, Included3, Included4, Included5];
        let { Excluded1, Excluded2, Excluded3, Excluded4, Excluded5 } = req.body;
        const Excluded = [Excluded1, Excluded2, Excluded3, Excluded4, Excluded5];
        const packageID = yield destinHelper_1.packageIdFetch.packageId(packageCategory);
        const activityID = yield destinHelper_1.activityIdFetch.activityId(activity);
        const data = {
            title,
            descrption,
            price,
            guests,
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
            imgArray,
            Included,
            Excluded,
            Highlights,
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
const edit_Collection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Id = req.query.id;
        const DestinQuery = yield (0, destinHelper_1.editCollectionHelper)(Id);
        const activity = DestinQuery === null || DestinQuery === void 0 ? void 0 : DestinQuery.activity;
        const packages = DestinQuery === null || DestinQuery === void 0 ? void 0 : DestinQuery.packageCategory;
        const activityID = new mongoose_1.default.Types.ObjectId(activity);
        const packageID = new mongoose_1.default.Types.ObjectId(packages);
        const fetchActicvitID = yield activityModel_1.default.findOne({ _id: activityID });
        const fetchPackageID = yield categoryModel_1.default.findOne({ _id: packageID });
        const data = {
            activityy: fetchActicvitID === null || fetchActicvitID === void 0 ? void 0 : fetchActicvitID.activtiy,
            packagee: fetchPackageID === null || fetchPackageID === void 0 ? void 0 : fetchPackageID.packageCategory,
        };
        res.json({ success: true, DestinQuery, data }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.edit_Collection = edit_Collection;
const updateCollection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { Included1, Included2, Included3, Included4, Included5 } = req.body;
        const Included = [Included1, Included2, Included3, Included4, Included5];
        let { Excluded1, Excluded2, Excluded3, Excluded4, Excluded5 } = req.body;
        const Excluded = [Excluded1, Excluded2, Excluded3, Excluded4, Excluded5];
        const imgArray = [];
        const multiImg = req.files;
        multiImg.map((el) => {
            const em = el.path;
            imgArray.push(em);
        });
        let title = req.body.title;
        let descrptionn = req.body.descrption;
        let Highlights = req.body.Highlights;
        let price = req.body.price;
        let packageCategory = req.body.packageCategory;
        let activity = req.body.activity;
        let priceCategory = req.body.priceCategory;
        let guests = req.body.guests;
        let Id = req.body._id;
        let { day, night } = req.body;
        const data = {
            Id,
            title,
            descrptionn,
            price,
            guests,
            priceCategory,
            day,
            night,
            packageCategory,
            activity,
            imgArray,
            Included,
            Excluded,
            Highlights,
        };
        const updateCollection = yield (0, destinHelper_1.updateCollectionHelper)(data);
        res.json({ success: true }).status(200);
        console.log(updateCollection);
    }
    catch (error) { }
});
exports.updateCollection = updateCollection;
