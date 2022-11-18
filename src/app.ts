import "dotenv/config";
import cors from "cors";
import express, { Response } from "express";
import indexController from "@src/api";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "@src/middlewares/errorHandler";
import { logger } from "@src/utils/configLogger";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    const originJson = res.json;
    res.json = function (data): Response {
        function logging(data: any) {
            logger.data(`RequestParams \n ${JSON.stringify(req.params, null, "\t")}`);
            logger.data(`RequestQuery \n ${JSON.stringify(req.query, null, "\t")}`);
            logger.data(`RequestBody \n ${JSON.stringify(req.body, null, "\t")}`);
            logger.data(`ResponseBody \n ${JSON.stringify(data, null, "\t")}`);
        }
        logging(data);
        return originJson.call(this, data);
    };
    next();
});
indexController(app);
app.use(errorMiddleware);

export default app;
