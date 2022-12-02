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

/**
 * TODO Swagger 작성
 * TODO request 유효성 검사
 */
userController.get("/users/current", authRequired, wrapAsyncFunc(user.getCurrentUser));
userController.post("/users/login", bodyValidator(userLoginSchema), wrapAsyncFunc(user.login));
userController.post("/users/register", bodyValidator(userLoginSchema), wrapAsyncFunc(user.create));
userController.put(
    "/users",
    authRequired,
    bodyValidator(userLoginSchema),
    wrapAsyncFunc(user.update),
);
userController.delete("/users", authRequired, wrapAsyncFunc(user.delete));

export default userController;
