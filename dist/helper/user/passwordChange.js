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
exports.passwordChange = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../../model/userModel");
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield bcrypt_1.default.hash(password, 10);
        return hash;
    }
    catch (error) {
        console.log(error);
    }
});
const passwordChange = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const encrypt = yield hashPassword(data.conformPassword);
        const passwordUpdate = yield userModel_1.UserModel.updateOne({ _id: data.userId }, { $set: { password: encrypt } });
        return passwordUpdate;
    }
    catch (error) {
        console.log(error);
    }
});
exports.passwordChange = passwordChange;
