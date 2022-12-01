import jwt from "jsonwebtoken";
import { Types } from "mongoose";

/* istanbul ignore next */
const secretKey = process.env.JWT_SECRET_KEY || "JWT_TOKEN";
/* istanbul ignore next */
const publicKey = process.env.JWT_PUBLIC_KEY || "JWT_TOKEN";

export const createAccessToken = (userId: Types.ObjectId) => {
    return jwt.sign({ userId }, secretKey, {
        algorithm: "RS256",
        issuer: "naru.handwoong.com",
    });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, publicKey);
    } catch (error: any) {
        return error;
    }
};
