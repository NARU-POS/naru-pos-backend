import { ErrorRequestHandler } from "express";
import { logger } from "@src/utils/configLogger";
import { STATUS_500_INTERNALSERVERERROR, STATUS_400_BADREQUEST } from "@src/utils/statusCode";

class RequestError extends Error {
    status: number;
    message: string;

    constructor(message = "잘못된 요청입니다.", status = STATUS_400_BADREQUEST) {
        super();
        this.status = status;
        this.message = message;
    }
}

const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
    if (error instanceof RequestError) {
        const { status, message } = error;
        logger.error(message);
        return res.status(status).json({ message });
    }

    logger.error(error);
    return res.status(STATUS_500_INTERNALSERVERERROR).json({ message: error.message });
};

export { errorMiddleware, RequestError };
