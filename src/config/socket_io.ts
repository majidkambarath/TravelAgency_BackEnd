import { Server } from "socket.io";

export const io = new Server( {
    cors: {
        origin: 'https://travio.online',
        methods: ["GET", "POST"],
      },
      
});