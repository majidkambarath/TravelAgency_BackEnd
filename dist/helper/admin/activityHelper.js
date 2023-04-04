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
exports.fetchingHelper = exports.activityHelper = void 0;
const activityModel_1 = __importDefault(require("../../model/activityModel"));
exports.activityHelper = {
    activityCreate: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const activtiyManage = new activityModel_1.default({ activtiy: data });
            yield activtiyManage.save();
            return activtiyManage;
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.fetchingHelper = {
    fetchingApi: () => __awaiter(void 0, void 0, void 0, function* () {
        const fetchingData = yield activityModel_1.default.find();
        return fetchingData;
    })
};
