"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const socket_io_1 = require("socket.io");
exports.io = new socket_io_1.Server({
    cors: {
        origin: 'https://travio.online',
        methods: ["GET", "POST"],
    },
});
