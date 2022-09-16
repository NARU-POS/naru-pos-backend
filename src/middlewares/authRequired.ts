import { RequestHandler } from "express";
import { verifyToken } from "@src/utils/jwt";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_401_UNAUTHORIZED } from "@src/utils/statusCode";

export const authRequired: RequestHandler = (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1] ?? null;
    if (!accessToken)
        throw new RequestError("로그인이 필요한 서비스입니다.", STATUS_401_UNAUTHORIZED);

    const userToken = verifyToken(accessToken);
    if (userToken instanceof Error) {
        throw new RequestError("인증에 실패하였습니다.", STATUS_401_UNAUTHORIZED);
    }

    req.cookies.currentUserId = userToken.userId;
    next();
};
