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
exports.activityIdfetch = exports.packageIdfetch = void 0;
const categoryModel_1 = __importDefault(require("../../model/categoryModel"));
const activityModel_1 = __importDefault(require("../../model/activityModel"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.packageIdfetch = {
    packageApi: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ID = new mongoose_1.default.Types.ObjectId(id);
            const packageCatefetch = yield categoryModel_1.default.findById({ _id: ID });
            return packageCatefetch;
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.activityIdfetch = {
    activityApi: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const ID = new mongoose_1.default.Types.ObjectId(id);
            const activtityfetch = yield activityModel_1.default.findById({ _id: ID });
            return activtityfetch;
        }
        catch (error) {
            console.log(error);
        }
    })
};
