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
exports.JWT_CheckAdmin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminModel_1 = __importDefault(require("../model/adminModel"));
exports.JWT_CheckAdmin = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (typeof decoded !== "string") {
                const admin = yield adminModel_1.default.findById(decoded.id);
                const adminID = admin === null || admin === void 0 ? void 0 : admin._id;
                if (!admin) {
                    res.status(401).json({ message: "Invalid token" });
                }
                else {
                    req.Token = adminID;
                    next();
                }
            }
        }
        else {
            res.status(401).json({ message: "No authorization" });
        }
    }
    catch (error) {
        next(error);
    }
}));
