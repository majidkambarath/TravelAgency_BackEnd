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
exports.fetchingActivity = exports.activtiyManage = void 0;
const activityHelper_1 = require("../../helper/admin/activityHelper");
const activtiyManage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = (req.body);
        yield activityHelper_1.activityHelper.activityCreate(data);
        res.json({ success: true }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.activtiyManage = activtiyManage;
const fetchingActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetch = yield activityHelper_1.fetchingHelper.fetchingApi();
        res.json({ success: true, fetch }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchingActivity = fetchingActivity;
