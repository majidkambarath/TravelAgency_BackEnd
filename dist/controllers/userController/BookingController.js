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
exports.paymentSuccess = exports.paymentProcessing = exports.userDetailsPatch = void 0;
const BookingHelper_1 = require("../../helper/user/BookingHelper");
const razorpay_1 = require("../../config/razorpay");
const crypto_1 = __importDefault(require("crypto"));
const userDetailsPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const userId = req.Token;
        const { fname, lname, address, idCard, phone, email } = req.body;
        const { path } = req.file;
        const data = {
            fname,
            lname,
            address,
            idCard,
            phone,
            email,
            path,
            userId,
        };
        yield (0, BookingHelper_1.bookingUserCollectionUpdate)(data);
        res.json({ success: true }).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.userDetailsPatch = userDetailsPatch;
const paymentProcessing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { total } = req.body;
        const receiptId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; // random reciept id generating
        const options = {
            amount: total * 100,
            currency: "INR",
            receipt: `receipt_order_${receiptId}`,
            payment_capture: 1,
        };
        const order = yield razorpay_1.instance.orders.create(options);
        if (!order) {
            res.status(401).json({ message: "something went wrong" });
        }
        else {
            res.status(200).json({
                sucess: true,
                order,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.paymentProcessing = paymentProcessing;
const paymentSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderCreationId, razorpayPaymentId, razorpaySignature } = req.body;
        const signature = crypto_1.default
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(`${orderCreationId}|${razorpayPaymentId}`)
            .digest("hex");
        if (signature !== razorpaySignature) {
            res.json({ message: "Transcation is not legit" }).status(400);
        }
        else {
            const { Arrived, Participants, BookingData, ExtraService, SubTotal, Title, Price, priceCate, userID, destinId } = req.body;
            const data = {
                Arrived, Participants, BookingData, ExtraService, SubTotal, Title, Price, priceCate, userID, destinId
            };
            const bookingCollection = yield (0, BookingHelper_1.bookingCollectionHelper)(data);
            res.status(200).json({
                success: true,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.paymentSuccess = paymentSuccess;
