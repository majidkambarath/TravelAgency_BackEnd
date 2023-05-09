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
exports.messageHelperApi = exports.chatUserLisitHelper = exports.conversationsHelper = void 0;
const chatModel_1 = __importDefault(require("../../model/chatModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const conversationsHelper = (id, message, sender) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongoose_1.default.Types.ObjectId(id);
        const userCollection = yield chatModel_1.default.findOne({ user: userId });
        if (!userCollection) {
            const chatMessage = new chatModel_1.default({
                user: userId,
                conversation: [
                    {
                        message: message,
                        sender: sender,
                        time: new Date(),
                    },
                ],
            });
            const result = yield chatMessage.save();
            return result;
        }
        else {
            const update = {
                $push: {
                    conversation: {
                        message: message,
                        sender: sender,
                        time: new Date(),
                    },
                },
            };
            const options = { new: true }; // Return the updated document
            const result = yield chatModel_1.default.findOneAndUpdate({ user: userId }, update, options);
            return result;
        }
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to save chat message");
    }
});
exports.conversationsHelper = conversationsHelper;
const chatUserLisitHelper = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield chatModel_1.default.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userDetails", // The name of the field to add to the output documents
                },
            },
            {
                $group: {
                    _id: "$user",
                    name: { $first: "$userDetails.name" },
                    profile: { $first: "$userDetails.profile" }, // Get the profile of the user
                },
            },
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    name: 1,
                    profile: 1,
                },
            },
        ]);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.chatUserLisitHelper = chatUserLisitHelper;
const messageHelperApi = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongoose_1.default.Types.ObjectId(id);
        const result = yield chatModel_1.default.findOne({ user: userId });
        // const result = await chatModel.aggregate([
        //   {
        //      $match :{
        //       user: userId
        //      }
        //   },
        //   {
        //     $lookup: {
        //       from: "users", // The collection to join
        //       localField: "user", // The field in this collection to match
        //       foreignField: "_id", // The field in the "users" collection to match
        //       as: "userDetails", // The name of the field to add to the output documents
        //     },
        //   },
        //   {
        //     $group: {
        //       _id: "$_id", // group by the chatModel id
        //       userId: { $first: "$user" }, // get the userId
        //       name: { $first: "$userDetails.name" }, // get the user name
        //       profile: { $first: "$userDetails.profile" }, // get the user profile
        //       sender: { $first: "$conversation.sender" }, // get the sender
        //       message: { $first: "$conversation.message" }, // get the message
        //       time: { $first: "$conversation.time" }, // get the time
        //     },
        //   },
        //   {
        //     $project: {
        //       _id: 0,
        //       userId: 1,
        //       name: 1,
        //       profile: 1,
        //       sender: 1,
        //       message: 1,
        //       time: 1,
        //     },
        //   },
        // ]);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.messageHelperApi = messageHelperApi;
