import "dotenv/config";
import cors from "cors";
import express from "express";
import indexController from "@src/api";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "@src/middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

indexController(app);
app.use(errorMiddleware);

export default app;
