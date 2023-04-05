"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const appError_1 = __importDefault(require("./appError"));
const cloudStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: {
        folder: "TravelAgency/services",
    },
});
const uploadCloudinary = (0, multer_1.default)({
    storage: cloudStorage,
    //image validation
    fileFilter: (req, file, callback) => {
        if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
            callback(null, true);
        }
        else {
            return callback(new appError_1.default(400, 'only jpg jpeg png and gif files are allowed '));
        }
    }
});
exports.default = uploadCloudinary;
