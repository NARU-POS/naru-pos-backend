import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { USER_ROLE } from "@src/interfaces";

/* istanbul ignore next */
const secretKey = process.env.JWT_SECRET_KEY || "JWT_TOKEN";
/* istanbul ignore next */
const publicKey = process.env.JWT_PUBLIC_KEY || "JWT_TOKEN";

export const createAccessToken = (userId: Types.ObjectId, role: USER_ROLE) => {
    return jwt.sign({ userId, role }, secretKey, {
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
