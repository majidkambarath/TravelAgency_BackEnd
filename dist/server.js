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
const routerApi_2 = __importDefault(require("./api_router/userRouter/routerApi"));
const routerApi_3 = __importDefault(require("./api_router/chatRouter/routerApi"));
const socket_io_1 = require("./config/socket_io");
const sockectApi_1 = __importDefault(require("./utils/sockectApi"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//cors connecting
app.use((0, cors_1.default)({
    origin: ["https://travio.online", "http://localhost:300"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
//database connecting
(0, connaction_1.default)();
app.use('/api/', routerApi_2.default);
app.use("/api/admin", routerApi_1.default);
app.use("/api/chat", routerApi_3.default);
const server = app.listen(port, () => {
    console.log("server running !!!!!");
    console.log(`http://localhost:2000`);
});
socket_io_1.io.attach(server);
(0, sockectApi_1.default)();
