"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const reviewSchema = new mongoose_1.Schema({
    DestinationId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Destination'
    },
    UserId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        serviceRate: {
            type: Number,
            required: true
        },
        valueMoney: {
            type: Number,
            required: true
        },
        communication: {
            type: Number,
            required: true
        },
        planing: {
            type: Number,
            required: true
        }
    },
    textarea: {
        type: String,
        required: true
    }
});
const Review = mongoose_1.default.model('Review', reviewSchema);
exports.default = Review;
