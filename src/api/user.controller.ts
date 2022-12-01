import { UserService } from "@src/service";
import wrapAsyncFunc from "@src/utils/catchAsync";
import { authRequired } from "@src/middlewares/authRequired";
import { NextFunction, Request, Response, Router } from "express";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";

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
        const { userId } = req.params;
        const updatedUser = await this.userService.updateUser(userId, req.body);
        res.status(STATUS_200_OK).json(updatedUser);
    }

    async delete(req: Request, res: Response, _next: NextFunction) {
        const { userId } = req.params;
        const deletedUser = await this.userService.deleteUser(userId);
        res.status(STATUS_200_OK).json(deletedUser);
    }
}

const userController = Router();
const user = new UserController();

userController.get("/users/current", authRequired, wrapAsyncFunc(user.getCurrentUser));
userController.post("/users/login", wrapAsyncFunc(user.login));
userController.post("/users/register", wrapAsyncFunc(user.create));
userController.put("/users/:userId", authRequired, wrapAsyncFunc(user.update));
userController.delete("/users/:userId", authRequired, wrapAsyncFunc(user.delete));

export default userController;
