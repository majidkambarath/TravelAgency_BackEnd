import express from "express";
import dotenv from "dotenv";
import mongodb from "./config/connaction";
import cors from "cors";
import adminRouter from "./api_router/adminRouter/routerApi";
import useRouter from './api_router/userRouter/routerApi'
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cors connecting
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))
//database connecting
mongodb();

app.use('/',useRouter)
app.use("/admin", adminRouter);
app.listen(port, () => {
  console.log("server running !!!!!");
  console.log(`http://localhost:2000`);
});
