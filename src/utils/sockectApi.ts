import { io } from "../config/socket_io";
interface IUser {
  userId: string;
  socketId: string;
}

export default function socketApi() {
  let users: IUser[] = [];
  let adminId: string;
  // adding new user into user array
  const addUser = (userId: string, socketId: string): void => {
    // checking if user id already exists in the array or not
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const findUser = (userId: string): IUser | undefined => {

    return users.find((user) => user.userId === userId);

    
    
  };
  io.on("connection", (socket) => {
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

      user && io.to(user?.socketId).emit("getMessage", messageData);
      io.to(adminId).emit("getMessage", messageData);
    });

    // user disconnect
    socket.on("disconnect", () => {
      console.log(`user with id:${socket.id} has disconnected`);
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
}
