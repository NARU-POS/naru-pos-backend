import { UserService } from "@src/service";
import wrapAsyncFunc from "@src/utils/catchAsync";
import { authRequired } from "@src/middlewares/authRequired";
import { bodyValidator } from "@src/middlewares/requestValidator";
import { NextFunction, Request, Response, Router } from "express";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";
import { userLoginSchema } from "@src/utils/requestValidate/user.validate";

class UserController {
    private readonly userService = new UserService();

    constructor() {
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.login = this.login.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async getCurrentUser(req: Request, res: Response, _next: NextFunction) {
        const { userId } = req.cookies;
        const foundUser = await this.userService.getUserInfo(userId);
        res.status(STATUS_200_OK).json(foundUser);
    }

    async login(req: Request, res: Response, _next: NextFunction) {
        const loginUser = await this.userService.login(req.body);
        res.status(STATUS_200_OK).json(loginUser);
    }

    async create(req: Request, res: Response, _next: NextFunction) {
        const createdUser = await this.userService.createUser(req.body);
        res.status(STATUS_201_CREATED).json(createdUser);
    }

    async update(req: Request, res: Response, _next: NextFunction) {
        const { userId } = req.cookies;
        const updatedUser = await this.userService.updateUser(userId, req.body);
        res.status(STATUS_200_OK).json(updatedUser);
    }

    async delete(req: Request, res: Response, _next: NextFunction) {
        const { userId } = req.cookies;
        const deletedUser = await this.userService.deleteUser(userId);
        res.status(STATUS_200_OK).json(deletedUser);
    }
}

const userController = Router();
const user = new UserController();

userController.get(
    "/users/current",
    authRequired,
    wrapAsyncFunc(
        /*
            #swagger.tags = ["user"]
            #swagger.description = "현재 로그인 되어 있는 유저의 정보를 조회"
            #swagger.security = [{
                "token": []
            }]
            #swagger.parameters["authorization"] = {
                in: "header",
                description: "
                    사용자의 accessToken을 예제와 같이 header에 담아 요청\n
                    권한 : **GUEST** 이상 필요
                ",
                required: true,
                schema: { $ref: "#/definitions/requestToken" }
            }
            #swagger.responses[200] = {
                schema: { $ref: "#/definitions/currentUserResponse" },
                description: "현재 로그인 되어 있는 유저의 정보를 반환"
            }
            #swagger.responses[401] = {
                schema: { $ref: "#/definitions/unauthorization" },
                description: "로그인 필요"
            }
         */
        user.getCurrentUser,
    ),
);
userController.post(
    "/users/login",
    bodyValidator(userLoginSchema),
    wrapAsyncFunc(
        /*
            #swagger.tags = ["user"]
            #swagger.description = "유저 로그인"
            #swagger.parameters["body"] = {
                in: "body",
                description: "
                    로그인하고자 하는 유저의 정보를 Request Body에 담아 요청\n
                    아래 예제에 있는 필드는 필수로 보내야 함
                ",
                required: true,
                schema: { $ref: "#/definitions/loginUserRequest" }
            }
            #swagger.responses[200] = {
                schema: { $ref: "#/definitions/loginUserResponse" },
                description: "로그인 한 유저의 토큰을 발급"
            }
         */
        user.login,
    ),
);
userController.post(
    "/users/register",
    bodyValidator(userLoginSchema),
    wrapAsyncFunc(
        /*
            #swagger.tags = ["user"]
            #swagger.description = "유저 생성"
            #swagger.parameters["body"] = {
                in: "body",
                description: "
                    생성하고자 하는 유저의 정보를 Request Body에 담아 요청\n
                    아래 예제에 있는 필드는 필수로 보내야 함
                ",
                required: true,
                schema: { $ref: "#/definitions/postUserRequest" }
            }
            #swagger.responses[200] = {
                schema: { $ref: "#/definitions/postUserResponse" },
                description: "생성된 유저 정보를 반환"
            }
         */
        user.create,
    ),
);
userController.put(
    "/users",
    authRequired,
    bodyValidator(userLoginSchema),
    wrapAsyncFunc(
        /*
            #swagger.tags = ["user"]
            #swagger.description = "유저 정보 수정"
            #swagger.security = [{
                "token": []
            }]
            #swagger.parameters["authorization"] = {
                in: "header",
                description: "
                    사용자의 accessToken을 예제와 같이 header에 담아 요청\n
                    권한 : **GUEST** 이상 필요
                ",
                required: true,
                schema: { $ref: "#/definitions/requestToken" }
            }
            #swagger.parameters["body"] = {
                in: "body",
                description: "
                    수정하고자 하는 유저의 정보를 Request Body에 담아 요청\n
                    아래 예제에 있는 필드는 필수로 보내야 함
                ",
                required: true,
                schema: { $ref: "#/definitions/putUserRequest" }
            }
            #swagger.responses[200] = {
                schema: { $ref: "#/definitions/putUserResponse" },
                description: "수정된 유저 정보를 반환"
            }
            #swagger.responses[401] = {
                schema: { $ref: "#/definitions/unauthorization" },
                description: "로그인 필요"
            }
         */
        user.update,
    ),
);
userController.delete(
    "/users",
    authRequired,
    wrapAsyncFunc(
        /*
            #swagger.tags = ["user"]
            #swagger.description = "유저 삭제"
            #swagger.security = [{
                "token": []
            }]
            #swagger.parameters["authorization"] = {
                in: "header",
                description: "
                    사용자의 accessToken을 예제와 같이 header에 담아 요청\n
                    권한 : **GUEST** 이상 필요
                ",
                required: true,
                schema: { $ref: "#/definitions/requestToken" }
            }
            #swagger.responses[200] = {
                schema: { $ref: "#/definitions/deleteUserResponse" },
                description: "삭제 완료 메시지를 반환"
            }
            #swagger.responses[401] = {
                schema: { $ref: "#/definitions/unauthorization" },
                description: "로그인 필요"
            }
         */
        user.delete,
    ),
);

export default userController;
