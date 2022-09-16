import { Router } from "express";
// import { MenuServie } from "@src/service";
import wrapAsyncFunc from "@src/utils/catchAsync";
// import { STATUS_200_OK } from "@src/utils/statusCode";

const menuController = Router();

menuController.get(
    "/menus",
    wrapAsyncFunc(async (req, res, _next) => {
        res.send("메뉴컨트롤러 get");
    }),
);

menuController.post(
    "/menus",
    wrapAsyncFunc(async (req, res, _next) => {
        res.send("메뉴컨트롤러 post");
    }),
);

menuController.put(
    "/menus/:menuId",
    wrapAsyncFunc(async (req, res, _next) => {
        res.send("메뉴컨트롤러 put");
    }),
);

menuController.delete(
    "/menus/:menuId",
    wrapAsyncFunc(async (req, res, _next) => {
        res.send("메뉴컨트롤러 delete");
    }),
);

export default menuController;
