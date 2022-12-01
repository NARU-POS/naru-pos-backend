import morgan from "morgan";
import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { stream } from "@src/utils/configLogger";
import swaggerFile from "../../swagger-output.json";
import menuController from "@src/api/menu.controller";
import userController from "@src/api/user.controller";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_200_OK, STATUS_404_NOTFOUND } from "@src/utils/statusCode";

const indexController = (app: Express) => {
    app.use(morgan("combined", { stream }));

    app.use(menuController);
    app.use(userController);

    app.get("/", (_req, res) => {
        res.status(STATUS_200_OK).json({ message: "Naru POS backend" });
    });
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
    app.use("*", (_req, _res) => {
        throw new RequestError("요청하신 페이지를 찾을 수 없습니다.", STATUS_404_NOTFOUND);
    });
};

export default indexController;
