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
exports.authLoginHelper = exports.userCollection = void 0;
const userModel_1 = require("../../model/userModel");
exports.userCollection = {
    userHelper: (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existData = yield userModel_1.UserModel.findOne({ phone: values.phone });
            console.log(existData);
            if (!existData) {
                const authCollection = new userModel_1.UserModel({
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    password: values.encrypt,
                });
                yield authCollection.save();
                return authCollection;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error.message);
            // throw new Error (error.message as string)
        }
    }),
};
const authLoginHelper = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authLogin = yield userModel_1.UserModel.findOne({ email: email });
        return authLogin;
    }
    catch (error) {
        console.log(error);
    }
});
exports.authLoginHelper = authLoginHelper;
