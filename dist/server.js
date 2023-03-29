"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connaction_1 = __importDefault(require("./config/connaction"));
const cors_1 = __importDefault(require("cors"));
const routerApi_1 = __importDefault(require("./api_router/adminRouter/routerApi"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//cors connecting
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
//database connecting
(0, connaction_1.default)();
app.use("/admin", routerApi_1.default);
app.listen(port, () => {
    console.log("server running !!!!!");
    console.log(`http://localhost:2000`);
});
