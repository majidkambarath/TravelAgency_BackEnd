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
exports.fetchMessageDetails = exports.chatUserLisit = exports.conversationsStore = void 0;
const chatHelper_1 = require("../../helper/chat/chatHelper");
const conversationsStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const { message, sender } = req.body;
        yield (0, chatHelper_1.conversationsHelper)(id, message, sender);
        res.json({ success: true }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.conversationsStore = conversationsStore;
const chatUserLisit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uselisit = yield (0, chatHelper_1.chatUserLisitHelper)();
        res.json({ success: true, uselisit }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.chatUserLisit = chatUserLisit;
const fetchMessageDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const result = yield (0, chatHelper_1.messageHelperApi)(id);
        res.json({ success: true, result }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchMessageDetails = fetchMessageDetails;
