"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const socket_io_1 = require("socket.io");
exports.io = new socket_io_1.Server({
    cors: {
        // origin: 'https://travio.online',
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
});
