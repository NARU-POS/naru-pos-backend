import { RequestHandler } from "express";

const wrapAsyncFunc = (controllerFunction: RequestHandler): RequestHandler => {
    return async (req, res, next) => {
        try {
            await controllerFunction(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

export default wrapAsyncFunc;
