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
exports.fetchHelper = exports.categoryHelper = void 0;
const categoryModel_1 = __importDefault(require("../../model/categoryModel"));
exports.categoryHelper = {
    categoryCreate: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categoryCreate = new categoryModel_1.default({ packageCategory: data });
            yield categoryCreate.save();
            return categoryCreate;
        }
        catch (error) {
            console.log(error);
        }
    }),
};
exports.fetchHelper = {
    fetchCreate: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categoryFetch = yield categoryModel_1.default.find();
            return categoryFetch;
        }
        catch (error) {
            console.log(error);
        }
    })
};
