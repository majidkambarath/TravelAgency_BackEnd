"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateModel = void 0;
const mongoose_1 = require("mongoose");
const dateSchema = new mongoose_1.Schema({
    date: { type: Date, required: true, unique: true },
    isBooked: { type: Boolean, required: true, default: false },
});
const DateModel = (0, mongoose_1.model)("Date", dateSchema);
exports.DateModel = DateModel;
