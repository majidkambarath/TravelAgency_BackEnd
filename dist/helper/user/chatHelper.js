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
exports.conversationsHelper = void 0;
const chatModel_1 = __importDefault(require("../../model/chatModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const conversationsHelper = (id, message, sender) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongoose_1.default.Types.ObjectId(id);
        const userCollection = yield chatModel_1.default.findOne({ user:  });
        const chatMessage = {
            user: userId,
            conversation: [
                {
                    message: message,
                    sender: sender,
                    time: new Date(),
                },
            ],
        };
        // Save the new chat message to the database
        const result = yield chatModel_1.default.create(chatMessage);
        // Extract the conversation data from the result and return it
        const conversation = {
            id: result.user.toString(),
            messages: result.conversation.map((item) => item.message),
        };
        return conversation;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to save chat message");
    }
});
exports.conversationsHelper = conversationsHelper;
