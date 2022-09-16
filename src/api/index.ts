import { Express } from "express";
import menuController from "@src/api/menu.controller";
import { STATUS_404_NOTFOUND } from "@src/utils/statusCode";
import { RequestError } from "@src/middlewares/errorHandler";

const indexController = (app: Express) => {
    app.use(menuController);
    app.get("/", (_req, res) => {
        res.send("Naru POS backend");
    });
    app.use("*", (_req, _res) => {
        throw new RequestError("요청하신 페이지를 찾을 수 없습니다.", STATUS_404_NOTFOUND);
    });
};

export default indexController;
