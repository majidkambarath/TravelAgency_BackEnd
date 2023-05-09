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
exports.AdminLogin = void 0;
const adminLogin_1 = require("../../helper/admin/adminLogin");
const AdminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        const data = {
            email, password
        };
        const admin = yield (0, adminLogin_1.AdminLoginHelper)(data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.AdminLogin = AdminLogin;
