import { MenuService } from "@src/service";
import { ICategory } from "@src/interfaces";
import wrapAsyncFunc from "@src/utils/catchAsync";
import { permission } from "@src/middlewares/authRequired";
import { authRequired } from "@src/middlewares/authRequired";
import { NextFunction, Request, Response, Router } from "express";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";
import { bodyValidator, paramsValidator } from "@src/middlewares/requestValidator";
import {
    menuBodySchema,
    menuPutBodySchema,
    menuCategorySchema,
    menuIdSchema,
} from "@src/utils/requestValidate/menu.validate";

class MenuController {
    private readonly menuService = new MenuService();

    constructor() {
        this.getCategory = this.getCategory.bind(this);
        this.getCategoryMenu = this.getCategoryMenu.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getCategory(_req: Request, res: Response, _next: NextFunction) {
        const foundCategory = await this.menuService.getCategoryList();
        res.status(STATUS_200_OK).json(foundCategory);
    }

    async getCategoryMenu(req: Request, res: Response, _next: NextFunction) {
        const { mainCategory, detailCategory } = req.params;
        const foundCategoryMenu = await this.menuService.getCategoryMenuList({
            category: mainCategory,
            detailCategory,
        } as ICategory);
        res.status(STATUS_200_OK).json(foundCategoryMenu);
    }

    async create(req: Request, res: Response, _next: NextFunction) {
        const createdMenu = await this.menuService.createMenu(req.body);
        res.status(STATUS_201_CREATED).json(createdMenu);
    }

    async update(req: Request, res: Response, _next: NextFunction) {
        const { menuId } = req.params;
        const updatedMenu = await this.menuService.updateMenu(menuId, req.body);
        res.status(STATUS_200_OK).json(updatedMenu);
    }

    async delete(req: Request, res: Response, _next: NextFunction) {
        const { menuId } = req.params;
        const deletedMenu = await this.menuService.deleteMenu(menuId);
        res.status(STATUS_200_OK).json({ deletedMenu, message: "삭제가 완료되었습니다." });
    }
}

const menuController = Router();
const menu = new MenuController();

menuController.get(
    "/menus/category",
    wrapAsyncFunc(
        /*
            #swagger.tags = ["menu"]
            #swagger.description = "메뉴 카테고리 조회"
            #swagger.responses[200] = {
                schema: { $ref: "#/definitions/getMenuCategoryResponse" },
                description: "메뉴들의 카테고리와 세부 카테고리를 반환"
            }
         */
        menu.getCategory,
    ),
);
menuController.get(
    "/menus/:mainCategory/:detailCategory",
    paramsValidator(menuCategorySchema),
    wrapAsyncFunc(
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
        menu.getCategoryMenu,
    ),
);
menuController.post(
    "/menus",
    authRequired,
    permission,
    bodyValidator(menuBodySchema),
    wrapAsyncFunc(
        /*
            #swagger.tags = ["menu"]
            #swagger.description = "메뉴 생성"
            #swagger.security = [{
                "token": []
            }]
            #swagger.parameters["authorization"] = {
                in: "header",
                description: "
                    사용자의 accessToken을 예제와 같이 header에 담아 요청\n
                    권한 : **ADMIN** 이상 필요
                ",
                required: true,
                schema: { $ref: "#/definitions/requestToken" }
            }
            #swagger.parameters["body"] = {
                in: "body",
                description: "
                    생성하고자 하는 메뉴의 정보를 Request Body에 담아 요청\n
                    아래 예제에 있는 필드는 필수로 보내야 함
                ",
                required: true,
                schema: { $ref: "#/definitions/postMenuRequest" }
            }
            #swagger.responses[200] = {
                schema: { $ref: "#/definitions/postMenuResponse" },
                description: "생성된 메뉴 정보를 반환"
            }
            #swagger.responses[401] = {
                schema: { $ref: "#/definitions/unauthorization" },
                description: "로그인 필요"
            }
            #swagger.responses[403] = {
                schema: { $ref: "#/definitions/forbidden" },
                description: "권한 필요"
            }
         */
        menu.create,
    ),
);
menuController.put(
    "/menus/:menuId",
    authRequired,
    permission,
    paramsValidator(menuIdSchema),
    bodyValidator(menuPutBodySchema),
    wrapAsyncFunc(
        /*
            #swagger.tags = ["menu"]
            #swagger.description = "메뉴 수정"
            #swagger.security = [{
                "token": []
            }]
            #swagger.parameters["authorization"] = {
                in: "header",
                description: "
                    사용자의 accessToken을 예제와 같이 header에 담아 요청\n
                    권한 : **ADMIN** 이상 필요
                ",
                required: true,
                schema: { $ref: "#/definitions/requestToken" }
            }
            #swagger.parameters["menuId"] = {
                in: "path",
                description: "수정하고자 하는 메뉴의 Id를 Request Path에 담아 요청",
                required: true,
                schema: { $ref: "#/definitions/pathPutMenu" }
            }
            #swagger.parameters["body"] = {
                in: "body",
                description: "
                    수정하고자 하는 메뉴의 정보를 Request Body에 담아 요청\n
                    아래 예제에 있는 필드는 필수로 보내야 함
                ",
                required: true,
                schema: { $ref: "#/definitions/putMenuRequest" }
            }
            #swagger.responses[200] = {
                schema: { $ref: "#/definitions/putMenuResponse" },
                description: "수정된 메뉴 정보를 반환"
            }
            #swagger.responses[401] = {
                schema: { $ref: "#/definitions/unauthorization" },
                description: "로그인 필요"
            }
            #swagger.responses[403] = {
                schema: { $ref: "#/definitions/forbidden" },
                description: "권한 필요"
            }
         */
        menu.update,
    ),
);
menuController.delete(
    "/menus/:menuId",
    authRequired,
    permission,
    paramsValidator(menuIdSchema),
    wrapAsyncFunc(
        /*  #swagger.tags = ["menu"]
            #swagger.description = "메뉴 삭제"
            #swagger.security = [{
                "token": []
            }]
            #swagger.parameters["authorization"] = {
                in: "header",
                description: "
                    사용자의 accessToken을 예제와 같이 header에 담아 요청\n
                    권한 : **ADMIN** 이상 필요
                ",
                required: true,
                schema: { $ref: "#/definitions/requestToken" }
            }
            #swagger.parameters["menuId"] = {
                in: "path",
                description: "삭제하고자 하는 메뉴의 Id를 Request Path에 담아 요청",
                required: true,
                schema: { $ref: "#/definitions/deleteMenuId" }
            }
            #swagger.responses[200] = {
                schema: { "$ref": "#/definitions/deleteMenuResponse" },
                description: "삭제 메시지 및 삭제된 데이터 반환"
            }
            #swagger.responses[401] = {
                schema: { $ref: "#/definitions/unauthorization" },
                description: "로그인 필요"
            }
            #swagger.responses[403] = {
                schema: { $ref: "#/definitions/forbidden" },
                description: "권한 필요"
            }
        */
        menu.delete,
    ),
);

export default menuController;
