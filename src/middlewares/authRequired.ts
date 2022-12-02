import { RequestHandler } from "express";
import { USER_ROLE } from "@src/interfaces";
import { verifyToken } from "@src/utils/jwt";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_401_UNAUTHORIZED, STATUS_403_FORBIDDEN } from "@src/utils/statusCode";

export const authRequired: RequestHandler = (req, _res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1] ?? null;
    if (!accessToken)
        throw new RequestError("로그인이 필요한 서비스입니다.", STATUS_401_UNAUTHORIZED);

    const userToken = verifyToken(accessToken);
    if (userToken instanceof Error) {
        throw new RequestError("인증에 실패하였습니다.", STATUS_401_UNAUTHORIZED);
    }

    req.cookies.userId = userToken.userId;
    req.cookies.role = userToken.role;
    next();
};

export const permission: RequestHandler = (req, _res, next) => {
    const userRole = req.cookies.role;

    if (userRole !== USER_ROLE.ADMIN)
        throw new RequestError("접근 권한이 없습니다.", STATUS_403_FORBIDDEN);
    next();
};
