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
exports.fetchingData = exports.category_manage = void 0;
const categoryHelper_1 = require("../../helper/admin/categoryHelper");
const category_manage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        yield categoryHelper_1.categoryHelper.categoryCreate(data).then(() => {
            res.status(200).json({ success: true });
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.category_manage = category_manage;
const fetchingData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetch = yield categoryHelper_1.fetchHelper.fetchCreate();
        res.json({ success: true, fetch }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchingData = fetchingData;
