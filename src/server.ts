import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { createServer } from "node:http";
import { Server } from "socket.io";

//Routers
import authRouter from "./routers/auth.router";
import advertRouter from "./routers/advert.router";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SellEverything API",
      version: "1.0.0",
      description: "A RESTful API for eCommerce",
      contact: {
        name: "API Support",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "User authentication and authorization endpoints",
      },
      {
        name: "Adverts",
        description: "Advertisement management endpoints",
      },
    ],
  },
  apis: ["./src/routers/*"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

dotenv.config();

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  // options
});

//Middlewares
import { authMiddleware } from "./middlewares/auth.middleware";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/", authRouter);
app.use("/api/adverts", authMiddleware, advertRouter);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("http://localhost:3000/api-docs");
});
