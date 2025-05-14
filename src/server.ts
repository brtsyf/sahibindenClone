import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.router";
import { authMiddleware } from "./middlewares/auth.middleware";
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/users", authMiddleware);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
