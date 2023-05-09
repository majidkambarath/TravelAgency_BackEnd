import { Server } from "socket.io";

export const io = new Server( {
    cors: {
        origin: process.env.FRONTEND_URL as string,
        methods: ["GET", "POST"],
      },
      
});