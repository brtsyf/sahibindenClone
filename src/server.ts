import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

//Routers
import authRouter from "./routers/auth.router";
import advertRouter from "./routers/advert.router";

dotenv.config();

const app = express();

//Middlewares
import { authMiddleware } from "./middlewares/auth.middleware";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/adverts", authMiddleware, advertRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
