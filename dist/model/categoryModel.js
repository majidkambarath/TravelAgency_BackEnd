"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    packageCategory: {
        type: String
    },
    file: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Packagecategory', categorySchema);
