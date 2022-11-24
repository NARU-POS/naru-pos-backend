import { Router } from "express";
import { MenuService } from "@src/service";
import wrapAsyncFunc from "@src/utils/catchAsync";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";
import { bodyValidator, paramsValidator } from "@src/middlewares/requestValidator";
import {
    menuBodySchema,
    menuPutBodySchema,
    menuCategorySchema,
    menuIdSchema,
} from "@src/utils/requestValidate/menu.validate";

const menuController = Router();

menuController.get(
    "/menus/category",
    wrapAsyncFunc(async (_req, res, _next) => {
        /*
            #swagger.tags = ["menu"]
            #swagger.description = "메뉴 카테고리 조회"
            #swagger.responses[200] = {
                schema: { $ref: "#/definitions/getMenuCategoryResponse" },
                description: "메뉴들의 카테고리와 세부 카테고리를 반환"
            }
         */
        const foundCategory = await MenuService.getCategoryList();
        res.status(STATUS_200_OK).json(foundCategory);
    }),
);

menuController.get(
    "/menus/:mainCategory/:detailCategory",
    paramsValidator(menuCategorySchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*
            #swagger.tags = ["menu"]
            #swagger.description = "카테고리에 맞는 메뉴 조회"
            #swagger.parameters["mainCategory"] = {
                in: "path",
                description: "조회할 메뉴의 메인 카테고리",
                required: true,
                schema: { $ref: "#/definitions/pathMainCategory" }
            }
            #swagger.parameters["detailCategory"] = {
                in: "path",
                description: "조회할 메뉴의 세부 카테고리",
                required: true,
                schema: { $ref: "#/definitions/pathDetailCategory" }
            }
            #swagger.responses[200] = {
                schema: { $ref: "#/definitions/getMenuListResponse" },
                description: "카테고리에 맞는 메뉴 목록을 반환"
            }
         */
        const { mainCategory, detailCategory } = req.params;
        const foundCategoryMenu = await MenuService.getCategoryMenu(mainCategory, detailCategory);
        res.status(STATUS_200_OK).json(foundCategoryMenu);
    }),
);

menuController.post(
    "/menus",
    bodyValidator(menuBodySchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*
            #swagger.tags = ["menu"]
            #swagger.description = "메뉴 생성"
            #swagger.parameters["body"] = {
                in: "body",
                description: "생성하고자 하는 메뉴의 정보를 Request Body에 담아 요청",
                required: true,
                schema: { $ref: "#/definitions/postMenuRequest" }
            }
            #swagger.responses[200] = {
                schema: { $ref: "#/definitions/postMenuResponse" },
                description: "생성된 메뉴 정보를 반환"
            }
         */
        const createdMenu = await MenuService.addMenu(req.body);
        res.status(STATUS_201_CREATED).json(createdMenu);
    }),
);

menuController.put(
    "/menus/:menuId",
    paramsValidator(menuIdSchema),
    bodyValidator(menuPutBodySchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*
            #swagger.tags = ["menu"]
            #swagger.description = "메뉴 수정"
            #swagger.parameters["menuId"] = {
                in: "path",
                description: "수정하고자 하는 메뉴의 Id를 Request Path에 담아 요청",
                required: true,
                schema: { $ref: "#/definitions/pathPutMenu" }
            }
            #swagger.parameters["body"] = {
                in: "body",
                description: "수정하고자 하는 메뉴의 정보를 Request Body에 담아 요청",
                required: true,
                schema: { $ref: "#/definitions/putMenuRequest" }
            }
            #swagger.responses[200] = {
                schema: { $ref: "#/definitions/putMenuResponse" },
                description: "수정된 메뉴 정보를 반환"
            }
         */
        const { menuId } = req.params;
        const updatedMenu = await MenuService.updateMenu(menuId, req.body);
        res.status(STATUS_200_OK).json(updatedMenu);
    }),
);

menuController.delete(
    "/menus/:menuId",
    paramsValidator(menuIdSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["menu"]
            #swagger.description = "메뉴 삭제"
            #swagger.parameters["menuId"] = {
                in: "path",
                description: "삭제하고자 하는 메뉴의 Id를 Request Path에 담아 요청",
                required: true,
                schema: { $ref: "#/definitions/deleteMenuId" }
            }
            #swagger.responses[200] = {
                schema: { "$ref": "#/definitions/deleteMenuResponse" },
                description: "삭제 메시지를 반환"
            }
        */
        const { menuId } = req.params;
        const deletedMenu = await MenuService.deleteMenu(menuId);
        res.status(STATUS_200_OK).json(deletedMenu);
    }),
);

export default menuController;
