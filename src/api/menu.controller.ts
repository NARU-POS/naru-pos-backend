import { Router } from "express";
import { MenuService } from "@src/service";
import wrapAsyncFunc from "@src/utils/catchAsync";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";

const menuController = Router();

menuController.get(
    "/menus/category",
    wrapAsyncFunc(async (_req, res, _next) => {
        const foundCategory = await MenuService.getCategoryList();
        res.status(STATUS_200_OK).json(foundCategory);
    }),
);

menuController.get(
    "/menus/:category",
    wrapAsyncFunc(async (req, res, _next) => {
        const { category } = req.params;
        const foundCategoryMenu = await MenuService.getCategoryMenu(category);
        res.status(STATUS_200_OK).json(foundCategoryMenu);
    }),
);

menuController.get(
    "/menus",
    wrapAsyncFunc(async (_req, res, _next) => {
        const foundMenuList = await MenuService.getMenuList();
        res.status(STATUS_200_OK).json(foundMenuList);
    }),
);

menuController.post(
    "/menus",
    wrapAsyncFunc(async (req, res, _next) => {
        const createdMenu = await MenuService.addMenu(req.body);
        res.status(STATUS_201_CREATED).json(createdMenu);
    }),
);

menuController.put(
    "/menus/:menuId",
    wrapAsyncFunc(async (req, res, _next) => {
        const { menuId } = req.params;
        const updatedMenu = await MenuService.updateMenu(menuId, req.body);
        res.status(STATUS_200_OK).json(updatedMenu);
    }),
);

menuController.delete(
    "/menus/:menuId",
    wrapAsyncFunc(async (req, res, _next) => {
        const { menuId } = req.params;
        const deletedMenu = await MenuService.deleteMenu(menuId);
        res.status(STATUS_200_OK).json(deletedMenu);
    }),
);

export default menuController;
