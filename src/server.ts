import express from "express";
import dotenv from "dotenv";
import mongodb from "./config/connaction";
import cors from "cors";
import adminRouter from "./api_router/adminRouter/routerApi";
import useRouter from './api_router/userRouter/routerApi'
import chatRouter from './api_router/chatRouter/routerApi'
import { io } from "./config/socket_io";
import socketApi from "./utils/sockectApi";
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cors connecting
app.use(cors({
    origin:["http://travio.online"],
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))
//database connecting
mongodb();

app.use('/api/',useRouter)
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);

const server = app.listen(port, () => {
  console.log("server running !!!!!");
  console.log(`http://localhost:2000`);
});

io.attach(server)
socketApi()