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
exports.authenticateUser = void 0;
const google_auth_library_1 = require("google-auth-library");
const userModel_1 = require("../../model/userModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const googleClient = new google_auth_library_1.OAuth2Client({
    clientId: `${process.env.REACT_GOOGLE_CLIENTID}`,
    clientSecret: `${process.env.REACT_GOOGLE_CLIENT_SECRET}`,
});
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const ticket = yield googleClient.verifyIdToken({
            idToken: token,
            audience: `${process.env.REACT_GOOGLE_CLIENTID}`,
        });
        const payload = ticket.getPayload();
        let user = yield userModel_1.UserModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
        if (!user) {
            user = yield new userModel_1.UserModel({
                email: payload === null || payload === void 0 ? void 0 : payload.email,
                name: payload === null || payload === void 0 ? void 0 : payload.name,
                profile: payload === null || payload === void 0 ? void 0 : payload.picture,
            });
            yield user.save();
            res.json({ user, token, action: true });
        }
        else {
            res.json({ user, token, status: true });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.authenticateUser = authenticateUser;
