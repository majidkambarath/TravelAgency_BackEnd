"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("../config/socket_io");
function socketApi() {
    let users = [];
    let adminId;
    // adding new user into user array
    const addUser = (userId, socketId) => {
        // checking if user id already exists in the array or not
        !users.some((user) => user.userId === userId) &&
            users.push({ userId, socketId });
    };
    const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
    };
    const findUser = (userId) => {
        return users.find((user) => user.userId === userId);
    };
    socket_io_1.io.on("connection", (socket) => {
        console.log(`user connected with id:${socket.id}`);
        // event to add users into user array
        socket.on("addUsers", (data) => {
            data.role == "admin"
                ? (adminId = socket.id)
                : addUser(data.userId, socket.id);
        });
        socket.on("send-message", ({ userId, message, sender }) => {
            console.log(message);
            const messageData = {
                senderId: userId,
                sender,
                message,
            };
            const user = findUser(userId);
            user && socket_io_1.io.to(user === null || user === void 0 ? void 0 : user.socketId).emit("getMessage", messageData);
            socket_io_1.io.to(adminId).emit("getMessage", messageData);
        });
        // user disconnect
        socket.on("disconnect", () => {
            console.log(`user with id:${socket.id} has disconnected`);
            removeUser(socket.id);
            socket_io_1.io.emit("getUsers", users);
        });
    });
}
exports.default = socketApi;
