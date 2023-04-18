"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const destinSchema = new mongoose_1.default.Schema({
    title: {
        type: String
    },
    descrption: {
        type: String
    },
    Highlights: {
        type: String
    },
    price: {
        type: Number
    },
    file: [String],
    Included: [String],
    Excluded: [String],
    packageCategory: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Packagecategory'
    },
    activity: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Packageactivity'
    },
    priceCategory: {
        type: String
    },
    duration: {
        day: Number,
        night: Number
    },
    packageService: {
        Hotels: String,
        Flight: String,
        Sightseeing: String,
        Meals: String,
        Transfers: String,
    }
});
exports.default = mongoose_1.default.model('Destination', destinSchema);
