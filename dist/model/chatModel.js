"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: [true, "user id is required"],
    },
    conversation: [
        {
            message: { type: String, required: [true, "message is required"] },
            sender: { type: String, required: [true, "sender is required"] },
            time: { type: Date, default: Date.now() }
        },
    ],
});
exports.default = (0, mongoose_1.model)("chat", chatSchema);
