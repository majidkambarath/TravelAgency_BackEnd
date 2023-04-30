"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createToken(id) {
    return (0, jsonwebtoken_1.sign)({ id }, process.env.JWT_SECRET, { expiresIn: '2d' });
}
exports.createToken = createToken;
