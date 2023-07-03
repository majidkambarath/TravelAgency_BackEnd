import { Server } from "socket.io";

export const io = new Server( {
    cors: {
        origin: 'https://travio.online',
        // origin: 'http://localhost:3000',

        methods: ["GET", "POST"],
      },
      
});